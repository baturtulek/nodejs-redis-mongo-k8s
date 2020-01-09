const Redis  = require('ioredis');

const redis  = new Redis({
    port   : process.env.REDIS_PORT,
    host   : process.env.REDIS_HOST
});

module.exports = { redis };
