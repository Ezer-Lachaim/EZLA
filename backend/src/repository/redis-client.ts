import { createClient } from 'redis';
import dotenv from 'dotenv';
import { readFileSync } from 'fs';

dotenv.config();

const client = createClient({
  socket: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
    tls: process.env.REDIS_TLS_ENABLED === 'true',
    cert: readFileSync('redis-ca.crt')
  },
  username: process.env.REDIS_USER || '',
  password: process.env.REDIS_PASS || ''
});

export const connect = async () => client.connect();

export default client;
