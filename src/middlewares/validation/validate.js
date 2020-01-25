const { validationResult } = require('express-validator');
const httpStatus = require('http-status');

const defineValidationErrors = (validationErrors) => {
  const extractedErrors = [];
  validationErrors.array().map((err) => {
    extractedErrors.push({ [err.param]: err.msg });
  });
  return extractedErrors;
};

const validate = (req, res, next) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    const extractedErrors = defineValidationErrors(validationErrors);
    return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
      errors: extractedErrors,
    });
  }
  return next();
};

module.exports = { validate };
