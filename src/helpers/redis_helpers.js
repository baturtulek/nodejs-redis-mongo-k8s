const { redis } = require('../redis-client');

const writeToken = (accessToken, user) => {
    return redis
        .pipeline()
        .set(accessToken, JSON.stringify(user))
        .expire(accessToken, 60 * 60 * 2)
        .exec();
}

const deleteToken = (accessToken) => {
    return redis.del(accessToken);
}

const getUserData = (accessToken) => {
    return redis.get(accessToken);
}

module.exports = { writeToken, deleteToken, getUserData };