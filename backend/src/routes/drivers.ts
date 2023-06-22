import { Router } from 'express';
import * as controller from '../controllers/drivers';

export const driversRouter = Router();

driversRouter.post('/', controller.create);
