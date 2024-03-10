import { Router } from 'express';
<<<<<<< HEAD
=======
import { authHandler } from '../middlewares/auth';
>>>>>>> 1020485c3582dc37a337a52d1b7d60eaa048b0b7
import * as controller from '../controllers/settings';

export const settingsRouter = Router();

<<<<<<< HEAD
settingsRouter.get('/', controller.getSettingsHandler);
settingsRouter.put('/', controller.updateSettings);
=======
settingsRouter.get('/', controller.getSettings);
settingsRouter.put('/', authHandler(), controller.updateSettings);
>>>>>>> 1020485c3582dc37a337a52d1b7d60eaa048b0b7
