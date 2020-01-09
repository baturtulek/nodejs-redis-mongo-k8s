const { validationResult }  = require('express-validator');
const httpStatus            = require('http-status');

const validate = (req, res, next) => {
        const validationErrors = validationResult(req);
        if (validationErrors.isEmpty()) return next();
        const extractedErrors = [];
        validationErrors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));
        return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
            errors: extractedErrors
        });
};

module.exports = { validate };