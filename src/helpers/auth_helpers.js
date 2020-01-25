const crypto = require('crypto');
const httpStatus = require('http-status');
const redisHelpers = require('./redis_helpers');

const createToken = () => {
  return crypto.randomBytes(64).toString('hex');
};

const getAuthToken = (authorization) => {
  let accessToken = authorization || '';
  accessToken = accessToken.replace('Bearer', '').trim();
  return accessToken;
};

const isRequestContainsAuthHeader = (req, res, next) => {
  const accessToken = getAuthToken(req.headers.authorization);
  if (!accessToken) {
    return res.status(httpStatus.UNAUTHORIZED).json({
      data: null,
      errors: ['Access Token is missing!'],
    });
  }
  res.locals.accessToken = accessToken;
  return next();
};  

const isUserAuthenticated = async (req, res, next) => {
  const userData = await redisHelpers.getUserData(res.locals.accessToken);
  if (userData === null) {
    return res.status(httpStatus.UNAUTHORIZED).json({
      data: null,
      errors: ['Please Log in!'],
    });
  }
  res.locals.userData = userData;
  return next();
};

module.exports = {
  getAuthToken,
  isRequestContainsAuthHeader,
  isUserAuthenticated,
  createToken,
};
