import { Response } from 'express';
import { CustomRequest } from '../middlewares/CustomRequest';

/**
 * GET /
 * Home page.
 */
export const getAll = async (req: CustomRequest, res: Response): Promise<void> => {
  res.send({ ride: 'world' });
};

export const get = async (req: CustomRequest, res: Response): Promise<void> => {
  res.send({ rideOne: req.params.rideId });
};
