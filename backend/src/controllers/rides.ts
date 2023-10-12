import { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { getUserByUid, incDriverNumOfDrives } from '../repository/user';
import { User, UserRoleEnum } from '../models/user';
import { sendNewRideNotificationToDrivers, sendPushNotification } from '../utils/firebase-config';
import redisClient from '../repository/redis-client';
import { Ride, RideStateEnum } from '../models/ride';
import { CustomRequest } from '../middlewares/CustomRequest';
import { populateRideDetails } from '../repository/ride';

/**
 * GET /rides
 * Get all rides.
 * can be filtered by state (if given)
 */
export const getAll = async (req: CustomRequest, res: Response): Promise<void> => {
  const isEligble = req.user.role === UserRoleEnum.Admin || req.user.role === UserRoleEnum.Driver;
  if (isEligble) {
    try {
      const keys = await redisClient.keys('ride:*');
      let rides: Ride[] = (await redisClient.json.mGet(keys, '$')) as Ride[];

      const populatedRides = await Promise.all(
        [].concat(...rides).map((ride) => populateRideDetails(ride))
      );

      rides = populatedRides;
      if (req.query.state) {
        rides = rides.filter((item) => item.state === req.query.state);
      }
      res.status(200).json(rides);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(401).send();
  }
};

/**
 * GET /active_ride
 * Get active ride for user.
 */
export const getActiveRide = async (req: CustomRequest, res: Response): Promise<void> => {
  const userIdFromToken = req.user.userId;
  try {
    const activeRideId = await redisClient.get(`active_ride:${userIdFromToken}`);
    if (activeRideId) {
      const activeRide = await redisClient.json.get(`ride:${activeRideId}`);
      res.status(200).json(await populateRideDetails(activeRide as unknown));
    } else {
      res.status(404).json({ error: 'Active ride not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * GET /rides/{rideId}
 * Get ride by ID.
 */
export const getRideById = async (req: CustomRequest, res: Response): Promise<void> => {
  const isAdmin = req.user.role === UserRoleEnum.Admin;
  if (isAdmin) {
    const { rideId } = req.params;
    try {
      const ride: Ride = (await redisClient.json.get(`ride:${rideId}`)) as Ride;
      if (ride) {
        res.status(200).json(ride);
      } else {
        res.status(404).json({ error: `Ride: ${rideId} not found` });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(401);
  }
};

/**
 * POST /rides
 * Create a new ride.
 */
export const createRide = async (req: CustomRequest, res: Response): Promise<void> => {
  const rideId = uuidv4();
  const ride = req.body as Ride;
  ride.rideId = rideId;
  ride.requestTimeStamp = new Date();

  try {
    const result = await redisClient.json.set(`ride:${rideId}`, '$', { ...(ride as Ride) });
    if (ride.rideRequester?.userId) {
      await redisClient.set(`active_ride:${ride.rideRequester.userId}`, rideId);
    }
    if (result) {
      await sendNewRideNotificationToDrivers();
      res.status(200).json(ride);
    } else {
      res.status(404).json({ error: `Couldn't create new ride` });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const sendPushByUserId = async (userId: string, title: string, body: string) => {
  const user: User = await getUserByUid(userId);
  try {
    await sendPushNotification(user.fcmToken, {
      notification: { title, body }
    });
  } catch (e) {
    console.log(e);
  }
};

export const confirmCompleteRide = async (req: CustomRequest, res: Response): Promise<void> => {
  const userIdFromToken = req.user.userId;

  try {
    await redisClient.del(`active_ride:${userIdFromToken}`);

    res.status(200).json({ message: 'Ride completed successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * PUT /rides/{rideId}
 * Update an existing ride.
 */
export const updateRide = async (req: CustomRequest, res: Response): Promise<void> => {
  const { rideId } = req.params;
  const userIdFromToken = req.user.userId;
  const rideUpdateValues = req.body;

  try {
    const currentRide = (await redisClient.json.get(`ride:${rideId}`)) as Ride;
    if (currentRide) {
      const updatedRide = Object.assign(currentRide, rideUpdateValues);
      await redisClient.json.set(`ride:${rideId}`, '$', { ...updatedRide });

      if (updatedRide.state === RideStateEnum.DriverCanceled) {
        await redisClient.del(`active_ride:${currentRide.driver?.userId}`);
        if (currentRide.rideRequester?.userId) {
          await sendPushByUserId(
            currentRide.rideRequester?.userId,
            'עדכון על הנסיעה',
            'הנסיעה בוטלה על ידי נהג'
          );
        }
      }

      if (updatedRide.state === RideStateEnum.RequesterCanceled) {
        if (updatedRide.driver) {
          if (currentRide.rideRequester?.userId) {
            await redisClient.del(`active_ride:${currentRide.rideRequester?.userId}`);
          }
          if (currentRide.driver?.userId) {
            await sendPushByUserId(
              currentRide.driver?.userId,
              'עדכון על הנסיעה',
              'הנסיעה בוטלה על ידי הנוסע'
            );
          }
        } else {
          // If canceled before driver accepted then we need to cancel the ride
          updatedRide.state = RideStateEnum.Canceled;
        }
      }

      if (updatedRide.state === RideStateEnum.Canceled) {
        await redisClient.del(`active_ride:${userIdFromToken}`);
      }

      if (updatedRide.state === RideStateEnum.Booked) {
        await redisClient.set(`active_ride:${currentRide.driver.userId}`, rideId);
        if (currentRide.rideRequester?.userId) {
          await sendPushByUserId(
            currentRide.rideRequester?.userId,
            'עדכון על הנסיעה',
            'הנסיעה שלך התקבלה על ידי נהג'
          );
        }
      }

      if (updatedRide.state === RideStateEnum.DriverArrived) {
        if (currentRide.rideRequester?.userId) {
          await sendPushByUserId(
            currentRide.rideRequester?.userId,
            'עדכון על הנסיעה',
            'הנהג הגיע לנקודת האיסוף'
          );
        }
      }

      if (updatedRide.state === RideStateEnum.Riding) {
        if (currentRide.rideRequester?.userId) {
          await sendPushByUserId(
            currentRide.rideRequester?.userId,
            'עדכון על הנסיעה',
            'נוסעים ליעד'
          );
        }
      }

      if (updatedRide.state === RideStateEnum.Completed) {
        if (currentRide.rideRequester?.userId) {
          await incDriverNumOfDrives(currentRide.rideRequester?.userId);
          await redisClient.json.set(`ride:${rideId}`, '$.completedTimeStamp', new Date());
          await sendPushByUserId(
            currentRide.rideRequester?.userId,
            'עדכון על הנסיעה',
            'הגעתם ליעד'
          );
        }
      }
      res.status(200).json(updatedRide);
    } else {
      res.status(404).json({ error: `Ride ${rideId} not found` });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * DELETE /rides/{rideId}
 * Delete ride by ID.
 */
export const deleteRide = async (req: CustomRequest, res: Response): Promise<void> => {
  const { rideId } = req.params;

  try {
    const result = await redisClient.del(`ride:${rideId}`);
    if (result) {
      res.status(200).json({ message: 'Ride deleted successfully' });
    } else {
      res.status(404).json({ error: `Ride: ${rideId} not found` });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
