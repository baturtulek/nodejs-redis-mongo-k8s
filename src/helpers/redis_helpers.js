const { redis } = require('../redis-client');

const writeToken = (accessToken, user) => redis
  .pipeline()
  .set(accessToken, JSON.stringify(user))
  .expire(accessToken, 60 * 60 * 2)
  .exec();

const deleteToken = (accessToken) => redis.del(accessToken);

const getUserData = (accessToken) => redis.get(accessToken);

module.exports = {
  writeToken,
  deleteToken,
  getUserData,
};
