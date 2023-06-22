import express from 'express';
import logger from 'morgan';
import * as path from 'path';
import { errorHandler, errorNotFoundHandler } from './middlewares/errorHandler';
import { authHandler } from './middlewares/auth';
// Routes
import { usersRouter } from './routes/users';
import { index } from './routes/index';
import { ridesRouter } from './routes/rides';

export const app = express();
app.use(express.json()); // Notice express.json middleware

// Express configuration
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');

app.use(logger('dev'));

app.use(express.static(path.join(__dirname, '../public')));

// if (process.env.NODE_ENV === 'production') {
app.use(authHandler);
// }

app.use('/users', usersRouter);
app.use('/rides', ridesRouter);
app.use('/', index);

app.use(errorNotFoundHandler);
app.use(errorHandler);
