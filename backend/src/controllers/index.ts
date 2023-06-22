import { Response } from 'express';
import { CustomRequest } from '../middlewares/CustomRequest';
import client from '../repository/redis-client';

export const getHospitals = async (req: CustomRequest, res: Response): Promise<void> => {
  res.send(['תל השומר']);
};

export const getAllKeys = async (req: CustomRequest, res: Response): Promise<void> => {
  const keys = await client.keys('*');
  res.send(keys);
};
