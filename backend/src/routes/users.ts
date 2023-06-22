import { Router } from 'express';
import * as controller from '../controllers/users';

export const usersRouter = Router();

usersRouter.get('/', controller.getAll);
usersRouter.post('/login', controller.login);
usersRouter.get('/:userId', controller.get);
usersRouter.delete('/:userId', controller.deleteOne);
