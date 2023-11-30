import { Router } from 'express';
import * as controller from '../controllers/env';

export const envRouter = Router();
envRouter.get('/settings', controller.getEnvSettings);
