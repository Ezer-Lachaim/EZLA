import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();
const client = createClient({
  socket: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
    tls: !!process.env.REDIS_CA_CERT,
    cert: (process.env.REDIS_CA_CERT || '').replace(/\\n/g, '\n')
  },
  username: process.env.REDIS_USER || '',
  password: process.env.REDIS_PASS || ''
});

export const connect = async () => client.connect();

export default client;
