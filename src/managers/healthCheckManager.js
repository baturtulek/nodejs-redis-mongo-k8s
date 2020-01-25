const mongoose = require('mongoose');
const { redis } = require('../redis-client');
const httpStatus = require('http-status');

const serverStatus = (req, res) => {
  return res.status(httpStatus.OK).json({
    timestamp: Date.now(),
    server: process.env.SERVER_NO,
    status: 'OK',
    uptime: process.uptime(),
    dbState: mongoose.STATES[mongoose.connection.readyState],
    redisState: redis.status,
  });
}

module.exports = { serverStatus };