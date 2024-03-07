import { Router } from 'express';
import { authHandler } from '../middlewares/auth';
import * as controller from '../controllers/settings';

export const settingsRouter = Router();

settingsRouter.get('/', controller.getSettings);
settingsRouter.put('/', authHandler(), controller.updateSettings);
