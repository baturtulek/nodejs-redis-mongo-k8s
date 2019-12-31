const crypto    = require('crypto');
const { redis } = require('../redis-client');

const isReqestContainsAuthHeader = (req, res, next) => {
    if (!(req.headers && req.headers.authorization)) {
        return res.status(401).json({
            data    : null,
            errors  : ['Header part is missing!']
        });
    }
    return next();
};

const isUserAuthenticated = (req, res, next) => {
    let accessToken = getAuthToken(req.headers.authorization);
    req.headers.authorization = accessToken;
    redis.get(accessToken)
        .then(result => {
            if (result === null) {
                return res.status(401).json({
                    data    : null,
                    errors  : ['Please Log in!']
                });
            }
            return next();
        });
};

const createToken = () => {
    return crypto.randomBytes(64).toString('hex');
}

const getAuthToken  = authorization => {
    let accessToken = authorization || '';
    accessToken     = accessToken.replace('Bearer ', '');
    return accessToken;
};
  
module.exports = {
    isReqestContainsAuthHeader,
    isUserAuthenticated,
    createToken,
    getAuthToken
};