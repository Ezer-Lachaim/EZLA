import { Response } from 'express';
import { CustomRequest } from '../middlewares/CustomRequest';
import config from '../config';

export function getEnvSettings(req: CustomRequest, res: Response): void {
  res.status(200).send({
    allowGuestRideMode: config.allowGuestRideMode
  });
}
