const { redis } = require('../redis-client');
const expireTimeInSec = 60 * 20;

const writeToken = (accessToken, user) => {
  return redis.set(accessToken, JSON.stringify(user),'EX', expireTimeInSec);
};

const deleteToken = (accessToken) => {
  return redis.del(accessToken);
};

const getUserData = (accessToken) => {
  return redis.get(accessToken);
};

module.exports = {
  writeToken,
  deleteToken,
  getUserData,
};
