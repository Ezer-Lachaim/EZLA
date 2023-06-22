import { Request, Response } from 'express';
import redisClient from '../repository/redis-client';
import {Ride} from "../models/ride";

/**
 * GET /rides
 * Get all rides.
 * can be filtered by state (if given)
 */
export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const keys = await redisClient.keys('ride:*');
    let rides: Ride[] = await redisClient.json.mGet(keys,'$') as Ride[];
    rides = [].concat(...rides);
    if (req.query.state){
      rides = rides.filter(item => item.state === req.query.state);
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
// export const getActiveRide = async (req: Request, res: Response): Promise<void> => {
//   const user: User = req.body
//
//   try {
//     const activeRide = await redisClient.get(`active_ride:${userId}`);
//     if (activeRide) {
//       res.status(200).json(activeRide);
//     } else {
//       res.status(404).json({ error: 'Active ride not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

/**
 * GET /rides/{rideId}
 * Get ride by ID.
 */
export const getRideById = async (req: Request, res: Response): Promise<void> => {
  const { rideId } = req.params;
  try {
    const ride: Ride = await redisClient.json.get(`ride:${rideId}`) as Ride;
    if (ride) {
      res.status(200).json(ride);
    } else {
      console.log("33")
      res.status(404).json({ error: `Ride: ${rideId} not found` });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * PUT /rides/{rideId}
 * Update an existing ride.
 */
export const updateRide = async (req: Request, res: Response): Promise<void> => {
  const { rideId } = req.params;
  const rideUpdateValues = req.body;

  try {
    const currentRide = await redisClient.json.get(`ride:${rideId}`);
    if (!currentRide){
      res.status(404).json({ error: `Ride ${rideId} not found` });
    }
    Object.entries(rideUpdateValues).forEach(([key, value]) => {
      if(currentRide.hasOwnProperty(key)){
        currentRide[key] = value
      }
    });
    const result = await redisClient.json.set(`ride:${rideId}`,'$', currentRide);
    console.log(result)
    if (result) {
      res.status(200).json(currentRide);
    } else {
      res.status(404).json({ error: `Ride ${rideId} not found` });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * DELETE /rides/{rideId}
 * Delete ride.
 */
// export const deleteRide = async (req: Request, res: Response): Promise<void> => {
//   const { rideId } = req.params;
//
//   try {
//     const result = await redisClient.delete(`ride:${rideId}`);
//     if (result) {
//       res.status(200).json({ message: 'Ride deleted successfully' });
//     } else {
//       res.status(404).json({ error: 'Ride not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };
