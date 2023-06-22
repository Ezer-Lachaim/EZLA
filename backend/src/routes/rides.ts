import { Router } from 'express';
import * as controller from '../controllers/rides';

export const ridesRouter = Router();

ridesRouter.get('/', controller.getAll);
ridesRouter.get('/:rideId', controller.getRideById);
ridesRouter.put('/:rideId', controller.updateRide);