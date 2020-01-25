const httpStatus = require('http-status');

const resourceNotFound = (req, res, next) => {
  return res.status(httpStatus.NOT_FOUND).json({
  data: null,
  errors: ['Resource not found!'],
  });
};

const internalServerError = (err, req, res, next) => {
  return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
  data: null,
  errors: [err.type],
  });
};

module.exports = {
  resourceNotFound,
  internalServerError,
};
