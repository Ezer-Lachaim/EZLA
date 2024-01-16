import { Router } from 'express';
import * as controller from '../controllers/users';

export const usersRouter = Router();

usersRouter.get('/', controller.getAll);
usersRouter.get('/me', controller.get);
usersRouter.get('/validate_status/:userId', controller.validateStatus);
usersRouter.post('/', controller.createRequester);
usersRouter.put('/update_initial_password/:userId?', controller.updateUserInitialPassword);
usersRouter.put('/:userId?', controller.updateUserFromBO);
usersRouter.post('/registerFcmToken', controller.registerFcmToken);
