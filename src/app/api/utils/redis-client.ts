import { createClient } from 'redis';

const client = createClient({
  socket: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
    tls: false // this should be set to true in deployed environments
  },
  username: process.env.REDIS_USER || '',
  password: process.env.REDIS_PASS || ''
});

export const connect = async () => {
  if (!client.isOpen) {
    await client.connect();
  }
};

export default client;
