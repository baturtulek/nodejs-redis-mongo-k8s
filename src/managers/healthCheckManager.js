const httpStatus = require('http-status');
const mongoose = require('mongoose');
const { redis } = require('../redis-client');

const serverStatus = (req, res) => {
  return res.status(httpStatus.OK).json({
    status: 'OK',
    release: '0.2.0',
    server: process.env.SERVER_ID,
    timestamp: getCurrentDate(),
    uptime: process.uptime(),
    dbState: getDatabaseStatus(),
    redisState: getRedisStatus(),
  });
}
  const getCurrentDate = () => {
    return new Date();
  }

  const getDatabaseStatus = () => {
    const mongoDbState = mongoose.connection.readyState;
    return mongoose.STATES[mongoDbState];
  }

  const getRedisStatus = () => {
    return redis.status;
  }

module.exports = { serverStatus };