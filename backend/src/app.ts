import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import * as path from 'path';
import config from './config';
import { errorHandler, errorNotFoundHandler } from './middlewares/errorHandler';
import { authHandler } from './middlewares/auth';
// Routes
import { usersRouter } from './routes/users';
import { index } from './routes';
import { ridesRouter } from './routes/rides';
import { devRouter } from './routes/dev';
import { driversRouter } from './routes/drivers';

export const app = express();
app.use(express.json()); // Notice express.json middleware

app.use(cors());

// Express configuration
app.set('port', config.port);
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');

app.use(logger('dev'));

app.use(express.static(path.join(__dirname, '../../client/dist')));

if (config.env !== 'production') {
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
