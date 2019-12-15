
const Redis     = require('ioredis');
const redis     = new Redis({
    port   : process.env.REDIS_PORT,
    host   : process.env.REDIS_HOST,
    auth   : process.env.REDIS_PASSWORD
});

const addToken = (userData, userTokenId) => {
    return redis
        .pipeline()
        .set(userTokenId, JSON.stringify(userData))
        .expire(userTokenId, 60 * 60 * 2)
        .exec();
}

const deleteToken = (userTokenId) => {
    return redis.del(userTokenId)
}

const getUserData = (userTokenId) => {
    return redis.get(userTokenId);
}

module.exports = {addToken, deleteToken, getUserData};