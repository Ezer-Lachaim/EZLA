import { Router } from 'express';
import * as controller from '../controllers/users';

export const usersRouter = Router();

usersRouter.get('/', controller.getAll);
usersRouter.post('/', controller.signup);
usersRouter.post('/login', controller.login);
usersRouter.post('/:userId', controller.get);
usersRouter.get('/validate_status/:userId', controller.validateStatus);
usersRouter.put('/:userId?', controller.updateUser);
