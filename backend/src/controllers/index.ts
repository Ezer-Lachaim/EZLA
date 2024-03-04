import { Response } from 'express';
import { CustomRequest } from '../middlewares/CustomRequest';
import client from '../repository/redis-client';

export const getHospitals = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    res.send(await client.json.get('hospitals'));
  } catch (e) {
    res.status(500).send();
  }
};;
