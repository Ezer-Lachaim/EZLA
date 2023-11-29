import { Router } from 'express';
import * as controller from '../controllers/rides';

export const ridesRouter = Router();

ridesRouter.get('/', controller.getAll);
ridesRouter.get('/active_ride/:guestToken?', controller.getActiveRide);
ridesRouter.get('/:rideId', controller.getRideById);
ridesRouter.post('/', controller.createRide);
ridesRouter.post('/confirm_complete/:guestToken?', controller.confirmCompleteRide);
ridesRouter.put('/:rideId/:guestToken?', controller.updateRide);
// ridesRouter.delete('/:rideId', controller.deleteRide);
