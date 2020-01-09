const crypto        = require('crypto');
const httpStatus    = require('http-status')
const redisHelpers  = require('./redis_helpers');

const isReqestContainsAuthHeader = (req, res, next) => {
    if (!(req.headers && req.headers.authorization)) {
        return res.status(httpStatus.UNAUTHORIZED).json({
            data    : null,
            errors  : ['Header part is missing!']
        });
    }
    return next();
};

const isUserAuthenticated = async (req, res, next) => {
    const accessToken = getAuthToken(req.headers.authorization);
    replaceAccessToken(req, accessToken);
    let userData = await redisHelpers.getUserData(accessToken);    
    if (userData === null) {
        return res.status(httpStatus.UNAUTHORIZED).json({
            data    : null,
            errors  : ['Please Log in!']
        });
    }
    return next();
};

const createToken = () => {
    return crypto.randomBytes(64).toString('hex');
}

const getAuthToken  = (authorization) => {
    let accessToken = authorization || '';
    accessToken     = accessToken.replace('Bearer ', '').trim();
    return accessToken;
}

const replaceAccessToken = (req, accessToken) => {
    req.headers.authorization = accessToken;
}
  
module.exports = {
    isReqestContainsAuthHeader,
    isUserAuthenticated,
    createToken
};