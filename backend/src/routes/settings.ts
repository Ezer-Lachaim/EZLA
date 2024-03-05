import { Router } from 'express';
import * as controller from '../controllers/settings';

export const settingsRouter = Router();

settingsRouter.get('/', controller.getSettingsHandler);
settingsRouter.put('/', controller.updateSettings);
