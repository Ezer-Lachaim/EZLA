import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import * as path from 'path';
import { rateLimit } from 'express-rate-limit';
import config from './config';
import { errorHandler, errorNotFoundHandler } from './middlewares/errorHandler';
import { authHandler } from './middlewares/auth';
// Routes
import { devRouter } from './routes/dev';
import { envRouter } from './routes/env';
import { usersRouter } from './routes/users';
import { driversRouter } from './routes/drivers';
import { ridesRouter } from './routes/rides';
import { index } from './routes';
import { signupDriversRoutes } from './routes/signupDrivers'; // Import the missing module
import checkTokenMiddleware from './middlewares/checkTokenForm';
import { settingsRouter } from './routes/settings';

export const app = express();
app.use(express.json()); // Notice express.json middleware

app.use(cors());

// Express configuration
app.set('port', config.port);
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');

app.use(logger('dev'));

app.use(express.static(path.join(__dirname, '../../client/dist')));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000 // max 100 requests per windowMs
});

// apply rate limiter to all requests
app.use(limiter);

if (config.env !== 'production') {
  app.use('/dev', devRouter);
}

app.use('/env', envRouter);
app.use('/users', authHandler(), usersRouter);
app.use('/drivers', authHandler(), driversRouter);
app.use('/rides', ridesRouter);
app.use('/settings', settingsRouter);
app.use('/signup', checkTokenMiddleware, signupDriversRoutes);
app.use('/', index);
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
});

app.use(errorNotFoundHandler);
app.use(errorHandler);
