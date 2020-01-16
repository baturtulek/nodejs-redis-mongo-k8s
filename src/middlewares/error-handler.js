/* eslint-disable no-unused-vars */
const httpStatus = require('http-status');

const resourceNotFound = (req, res, next) => res.status(httpStatus.NOT_FOUND).json({
  data: null,
  errors: ['Resource not found!'],
});

// eslint-disable-next-line max-len
const internalServerError = (err, req, res, next) => res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
  data: null,
  errors: [err.type],
});

module.exports = {
  resourceNotFound,
  internalServerError,
};
