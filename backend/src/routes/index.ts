import { Router } from 'express';
import { authHandler } from '../middlewares/auth';
import * as controller from '../controllers/index';

export const index = Router();

index.get('/hospitals', authHandler, controller.getHospitals);
