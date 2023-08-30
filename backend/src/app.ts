import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import * as path from 'path';
import { errorHandler, errorNotFoundHandler } from './middlewares/errorHandler';
// Routes
import { usersRouter } from './routes/users';
import { index } from './routes/index';
import { ridesRouter } from './routes/rides';
import { devRouter } from './routes/dev';
import { authHandler } from './middlewares/auth';
import { driversRouter } from './routes/drivers';

export const app = express();
app.use(express.json()); // Notice express.json middleware

app.use(cors());

// Express configuration
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');

app.use(logger('dev'));

app.use(express.static(path.join(__dirname, '../../client/dist')));

if (process.env.NODE_ENV !== 'production') {
  app.use('/dev', devRouter);
}

app.use('/rides', authHandler, ridesRouter);
app.use('/users', authHandler, usersRouter);
app.use('/drivers', authHandler, driversRouter);
app.use('/rides', authHandler, ridesRouter);
app.use('/', index);

app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
});

app.use(errorNotFoundHandler);
app.use(errorHandler);
