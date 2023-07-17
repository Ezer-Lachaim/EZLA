import { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import redisClient from '../repository/redis-client';
import { Ride, RideStateEnum } from '../models/ride';
import { CustomRequest } from '../middlewares/CustomRequest';

/**
 * GET /rides
 * Get all rides.
 * can be filtered by state (if given)
 */
export const getAll = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const keys = await redisClient.keys('ride:*');
    let rides: Ride[] = (await redisClient.json.mGet(keys, '$')) as Ride[];
    rides = [].concat(...rides);
    if (req.query.state) {
      rides = rides.filter((item) => item.state === req.query.state);
    }
    res.status(200).json(rides);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
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
      res.status(200).json(activeRide);
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
};

/**
 * POST /rides
 * Create a new ride.
 */
export const createRide = async (req: CustomRequest, res: Response): Promise<void> => {
  const rideId = uuidv4();
  const ride = req.body;
  ride.rideId = rideId;
  const userIdFromToken = req.user.userId;

  try {
    const result = await redisClient.json.set(`ride:${rideId}`, '$', { ...ride });
    await redisClient.set(`active_ride:${userIdFromToken}`, rideId);
    if (result) {
      res.status(200).json(ride);
    } else {
      res.status(404).json({ error: `Couldn't create new ride` });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * PUT /rides/{rideId}
 * Update an existing ride.
 */
export const updateRide = async (req: CustomRequest, res: Response): Promise<void> => {
  const { rideId } = req.params;
  const rideUpdateValues = req.body;
  const userIdFromToken = req.user.userId;

  try {
    const currentRide = await redisClient.json.get(`ride:${rideId}`);
    if (currentRide) {
      if (Object.keys(rideUpdateValues).every((key) => currentRide.hasOwnProperty(key))) {
        const updatedRide = Object.assign(currentRide, rideUpdateValues);
        await redisClient.json.set(`ride:${rideId}`, '$', { ...updatedRide });

        if (
          updatedRide.state === RideStateEnum.Canceled ||
          updatedRide.state === RideStateEnum.Completed
        ) {
          await redisClient.del(`active_ride:${userIdFromToken}`);
        }
        res.status(200).json(updatedRide);
      } else {
        res.status(400).json({
          error:
            "can't update ride with the given keys - one of the fields is " +
            'not part of the ride properties'
        });
      }
    } else {
      res.status(404).json({ error: `Ride ${rideId} not found` });
    }
  } catch (error) {
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
