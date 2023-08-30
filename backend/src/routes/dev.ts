import { Router } from 'express';
import * as controller from '../controllers/dev';

export const devRouter = Router();
devRouter.get('/init', controller.initDevData);
