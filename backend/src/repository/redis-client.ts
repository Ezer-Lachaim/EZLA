import { createClient } from 'redis';
import config from '../config';

const client = createClient({
  socket: {
    host: config.redis.host,
    port: parseInt(config.redis.port.toString(), 10),
    tls: !!config.redis.caCert,
    cert: config.redis.caCert.replace(/\\n/g, '\n')
  },
  username: config.redis.user,
  password: config.redis.pass
});

export const connect = async () => client.connect();

export default client;
