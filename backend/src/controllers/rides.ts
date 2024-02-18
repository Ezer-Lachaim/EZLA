import { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import { getUserByUid, incDriverNumOfDrives } from '../repository/user';
import { User, UserRoleEnum } from '../models/user';
import { sendNewRideNotificationToDrivers, sendPushNotification } from '../utils/firebase';
import { sendSMS } from '../utils/sms-util';
import { formatDate } from '../utils/date-utils';
import redisClient from '../repository/redis-client';
import { Ride, RideStateEnum } from '../models/ride';
import { CustomRequest } from '../middlewares/CustomRequest';
import { populateRideDetails } from '../repository/ride';

const SUPPORT_PHONE_NUMBER = '033-730440';
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
      rides = await Promise.all([].concat(...rides).map((ride) => populateRideDetails(ride)));

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
  const activeRideToken = req.user?.userId ?? req.get('guest-token');

  try {
    const activeRideId = await redisClient.get(`active_ride:${activeRideToken}`);
    if (activeRideId) {
      const activeRide = await redisClient.json.get(`ride:${activeRideId}`);
      res.status(200).json(await populateRideDetails(activeRide as unknown));
    } else {
      res.status(404).json({ error: 'Active ride not found' });
    }
  } catch (error) {
    console.log(error);
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
const fixTimeUpDayjs = () => {
  let today = dayjs(dayjs(), 'Asia/Jerusalem');
  today = today.add(3, 'hour');
  const minutes = today.minute() % 10;
  if (minutes < 5) {
    today = today.add(5 - minutes, 'minute');
  } else {
    today = today.add(10 - minutes, 'minute');
  }
  // Convert Day.js object to Date object
  return today.toDate();
};
export const createRide = async (req: CustomRequest, res: Response): Promise<void> => {
  const guestToken = req.get('guest-token');
  const rideId = uuidv4();
  const ride = req.body as Ride;

  ride.rideId = rideId;
  ride.requestTimeStamp = new Date();

  if (ride.pickupDateTime) {
    ride.pickupDateTime = new Date(ride.pickupDateTime);
  } else {
    ride.pickupDateTime = new Date(fixTimeUpDayjs());
  }

  if (ride.relevantTime) {
    ride.relevantTime = ride.relevantTime || req.body.ride.relevantTime;
  } else {
    ride.relevantTime = 3;
  }

  if (req.user?.role === UserRoleEnum.Requester) {
    ride.rideRequester = { userId: req.user.userId };
    ride.firstName = req.user.firstName;
    ride.lastName = req.user.lastName;
    ride.guestToken = undefined;
  } else {
    ride.guestToken = guestToken ?? undefined;
    ride.rideRequester = undefined;
  }

  try {
    const result = await redisClient.json.set(`ride:${rideId}`, '$', { ...(ride as Ride) });
    if (ride.rideRequester?.userId) {
      await redisClient.set(`active_ride:${ride.rideRequester.userId}`, rideId);
    } else if (ride.guestToken) {
      await redisClient.set(`active_ride:${ride.guestToken}`, rideId);
    }
    if (result) {
      await Promise.all([
        sendNewRideNotificationToDrivers(),
        sendSMS(ride.cellphone, getNewRidePassengerSMSMessage(ride))
      ]);
      res.status(200).json(ride);
    } else {
      res.status(404).json({ error: `Couldn't create new ride` });
    }
  } catch (error) {
    console.log(error);
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
  const activeRideToken = req.user?.userId ?? req.get('guest-token');

  try {
    await redisClient.del(`active_ride:${activeRideToken}`);

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
  const activeRideToken = req.user?.userId ?? req.get('guest-token');
  const rideUpdateValues = req.body;

  try {
    const currentRide = (await redisClient.json.get(`ride:${rideId}`)) as Ride;
    if (currentRide) {
      if (!validateUpdateRideAccess(req, currentRide)) {
        res.status(403).json({ error: 'Forbidden access' });
        return;
      }

      const updatedRide = Object.assign(currentRide, rideUpdateValues);
      await redisClient.json.set(`ride:${rideId}`, '$', { ...updatedRide });

      if (updatedRide.state === RideStateEnum.DriverCanceled) {
        await redisClient.del(`active_ride:${currentRide.driver?.userId}`);
        await Promise.all([
          currentRide.rideRequester?.userId &&
            sendPushByUserId(
              currentRide.rideRequester?.userId,
              'עדכון על הנסיעה',
              'הנסיעה בוטלה על ידי נהג'
            ),
          sendSMS(updatedRide.cellphone, getRideCanceledPassengerSMSMessage(updatedRide))
        ]);
      }

      if (updatedRide.state === RideStateEnum.RequesterCanceled) {
        if (activeRideToken) {
          await redisClient.del(`active_ride:${activeRideToken}`);
        }

        if (updatedRide.driver?.userId) {
          await Promise.all([
            sendPushByUserId(
              updatedRide.driver?.userId,
              'עדכון על הנסיעה',
              'הנסיעה בוטלה על ידי הנוסע'
            ),
            sendSMS(updatedRide.driver.cellPhone, getRideCanceledDriverSMSMessage(updatedRide))
          ]);
        }
      }

      // if (updatedRide.state === RideStateEnum.Booked) {
      //   await redisClient.set(`active_ride:${currentRide.driver.userId}`, rideId);
      //   await Promise.all([
      //     currentRide.rideRequester?.userId &&
      //       sendPushByUserId(
      //         currentRide.rideRequester?.userId,
      //         'עדכון על הנסיעה',
      //         'הנסיעה שלך התקבלה על ידי נהג'
      //       ),
      //     sendSMS(updatedRide.cellphone, getRideBookedPassengerSMSMessage(updatedRide))
      //   ]);
      // }

      if (updatedRide.state === RideStateEnum.DriverEnroute) {
        await redisClient.set(`active_ride:${currentRide.driver.userId}`, rideId);
        await Promise.all([
          currentRide.rideRequester?.userId &&
            sendPushByUserId(
              currentRide.rideRequester?.userId,
              'עדכון על הנסיעה',
              'המתנדב/ת בדרך אליך'
            ),
          sendSMS(updatedRide.cellphone, getRideDriverEnroutePassengerSMSMessage(updatedRide))
        ]);
      }

      if (updatedRide.state === RideStateEnum.DriverArrived) {
        await Promise.all([
          currentRide.rideRequester?.userId &&
            sendPushByUserId(
              currentRide.rideRequester?.userId,
              'עדכון על הנסיעה',
              'הנהג הגיע לנקודת האיסוף'
            ),
          sendSMS(updatedRide.cellphone, getRideDriverArrivedPassengerSMSMessage(updatedRide))
        ]);
      }

      if (updatedRide.state === RideStateEnum.Riding && currentRide.rideRequester?.userId) {
        await sendPushByUserId(currentRide.rideRequester?.userId, 'עדכון על הנסיעה', 'נוסעים ליעד');
      }

      if (updatedRide.state === RideStateEnum.Completed) {
        await redisClient.json.set(`ride:${rideId}`, '$.completedTimeStamp', new Date());

        if (currentRide.rideRequester?.userId) {
          await incDriverNumOfDrives(currentRide.rideRequester?.userId);
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
/* export const deleteRide = async (req: CustomRequest, res: Response): Promise<void> => {
  const { rideId } = req.params;

  // todo add permission validation once used
  try {
    const result = await redisClient.del(`ride:${rideId}`);
    if (result) {
      res.status(200).json({ message: 'Ride deleted successfully' });
    } else {
      res.status(404).json({ error: `Ride: ${rideId} not found` });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}; */

function validateUpdateRideAccess(req: CustomRequest, ride: Ride): boolean {
  // admin can update any ride
  if (req.user?.role === UserRoleEnum.Admin) {
    return true;
  }

  // a driver can either update a ride with no driver on it or one where he is the driver of
  if (
    req.user?.role === UserRoleEnum.Driver &&
    (!ride.driver || ride.driver.userId === req.user.userId)
  ) {
    return true;
  }

  // a requester can only update his own ride
  if (req.user?.role === UserRoleEnum.Requester && ride.rideRequester?.userId === req.user.userId) {
    return true;
  }

  // a guest can only access his own ride
  const reqGuestToken = req.get('guest-token');
  return !!(ride.guestToken && reqGuestToken) && reqGuestToken === ride.guestToken;
}

function getNewRidePassengerSMSMessage(ride: Ride): string {
  return (
    `${ride.firstName} שלום, פנייתכם התקבלה בהצלחה.\n` +
    `נקודת איסוף ${ride.origin}.\n` +
    `אנחנו נעדכן אתכם כאשר יימצא מתנדב פנוי.\n` +
    `ליצירת קשר עם המוקד הקישו כאן ${SUPPORT_PHONE_NUMBER}. צוות עזר לחיים`
  );
}

function getRideBookedPassengerSMSMessage(ride: Ride): string {
  return (
    `${ride.firstName} שלום, ` +
    `${ride.driver.firstName} נמצא מתנדב.ת` +
    `מועד איסוף בין ???? ${formatDate(ride.destinationArrivalTime, 'HH:mm')} ` +
    `סוג רכב ${ride.driver.carManufacturer} ${ride.driver.carModel} ${ride.driver.carColor}, ` +
    `מספר רכב ${ride.driver.carPlateNumber}.\n` +
    `נקודת איסוף ${ride.origin}.\n` +
    `ליצירת קשר הקישו כאן ${ride.driver.cellPhone}. צוות עזר לחיים`
  );
}

function getRideDriverEnroutePassengerSMSMessage(ride: Ride): string {
  return (
    `${ride.firstName} שלום, ` +
    `${ride.driver.firstName} המתנדב.ת בדרך אליך` +
    `זמן הגעה ${formatDate(ride.destinationArrivalTime, 'HH:mm')} ` +
    `סוג רכב ${ride.driver.carManufacturer} ${ride.driver.carModel} ${ride.driver.carColor}, ` +
    `מספר רכב ${ride.driver.carPlateNumber}.\n` +
    `נקודת איסוף ${ride.origin}.\n` +
    `ליצירת קשר הקישו כאן ${ride.driver.cellPhone}. צוות עזר לחיים`
  );
}



function getRideDriverArrivedPassengerSMSMessage(ride: Ride): string {
  return (
    `${ride.firstName} שלום, ` +
    `${ride.driver.firstName} המתנדב.ת ממתינ.ה לכם בנקודת האיסוף ${ride.origin}. ` +
    `סוג רכב ${ride.driver.carManufacturer} ${ride.driver.carModel} ${ride.driver.carColor}, ` +
    `מספר רכב ${ride.driver.carPlateNumber}.\n` +
    `ליצירת קשר הקישו כאן ${ride.driver.cellPhone}. צוות עזר לחיים`
  );
}

function getRideCanceledPassengerSMSMessage(ride: Ride): string {
  return (
    `${ride.firstName} שלום,\n` +
    `לצערנו המתנדב.ת ביטל.ה את הנסיעה שהזמנתם. אנחנו מחפשים עבורכם הסעה חלופית.\n` +
    `ליצירת קשר עם המוקד הקישו כאן ${SUPPORT_PHONE_NUMBER}. צוות עזר לחיים`
  );
}

function getRideCanceledDriverSMSMessage(ride: Ride): string {
  return (
    `${ride.driver.firstName} שלום,\n` +
    `לצערנו הנוסע.ת ביטל.ה את הנסיעה.\n` +
    `כנסו לאפליקציה לצפייה ברשימת בקשות להסעה. צוות עזר לחיים`
  );
}
