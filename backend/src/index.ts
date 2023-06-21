import 'reflect-metadata';
import { Application } from './app';
import * as dotenv from 'dotenv';
import { connect } from './app/utils/redis-client';

dotenv.config();

connect().then(async () => {
  const application: Application = new Application();
  application.startServer();
});
