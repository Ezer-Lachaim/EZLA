import redisClient, { connect } from '../utils/redis-client';

export const getAll = async () => {
  await connect();
  const allUsersKeys = await redisClient.keys('user:*');
  return Promise.all(
    allUsersKeys.map((key) => {
      return redisClient.json.get(key);
    })
  );
};

export default {
  getAll
};
