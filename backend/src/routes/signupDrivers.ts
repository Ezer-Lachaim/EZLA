import { Router } from 'express';
import * as controller from '../controllers/driverForm';

export const signupDriversRoutes = Router();
signupDriversRoutes.post('/from', controller.getNewForm);
