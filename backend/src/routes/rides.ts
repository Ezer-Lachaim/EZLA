import { Router } from 'express';
import { authHandler } from '../middlewares/auth';
import * as controller from '../controllers/rides';

export const ridesRouter = Router();

ridesRouter.get('/', authHandler(), controller.getAll);
ridesRouter.get('/active_ride', authHandler(true), controller.getActiveRide);
ridesRouter.get('/:rideId', authHandler(), controller.getRideById);
ridesRouter.post('/', authHandler(true), controller.createRide);
ridesRouter.post('/confirm_complete', authHandler(true), controller.confirmCompleteRide);
ridesRouter.put('/:rideId', authHandler(true), controller.updateRide);
// ridesRouter.delete('/:rideId', authHandler(), controller.deleteRide);
