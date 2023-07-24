import { Router } from 'express';
import * as controller from '../controllers/users';

export const usersRouter = Router();

usersRouter.get('/', controller.getAll);
usersRouter.get('/me', controller.get);
usersRouter.get('/validate_status/:userId', controller.validateStatus);
usersRouter.post('/', controller.signup);
usersRouter.post('/login', controller.login);
usersRouter.put('/update_initial_password/:userId?', controller.updateUserWithTempToken);
usersRouter.get('/reset_password', controller.getResetPasswordLinkForUser);
usersRouter.put('/:userId?', controller.updateUserFromBO);
