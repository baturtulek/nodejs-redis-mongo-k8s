const Redis = require('ioredis');
const chalk = require('chalk');

const redis = new Redis({
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_HOST,
  password: process.env.REDIS_PASS,
});

redis.on('connect', () => {
  console.log(chalk.green.bold('Connected to Redis!'));
});
redis.on('error', (error) => {
  console.log(chalk.red.bold(`REDIS connection error: ${error}`));
  process.exit();
});

module.exports = { redis };
