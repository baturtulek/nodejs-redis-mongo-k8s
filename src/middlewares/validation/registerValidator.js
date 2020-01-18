const { body } = require('express-validator');

const validationRules = () => [
  body('email')
    .trim()
    .isEmail()
    .isLength({ min: 5, max: 255 })
    .normalizeEmail(),
  body('username')
    .trim()
    .isLength({ min: 3, max: 50 })
    .escape(),
  body('password')
    .isLength({ min: 5, max: 255 }),
];

module.exports = {
  validationRules,
};
