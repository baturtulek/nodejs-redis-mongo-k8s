const { body } = require('express-validator');

const validationRules = () => [
  body('email')
    .trim()
    .isEmail()
    .normalizeEmail(),
  body('username')
    .trim()
    .isLength({ min: 3, max: 50 })
    .escape(),
  body('password')
    .trim()
    .isLength({ min: 5, max: 255 }),
];

module.exports = {
  validationRules,
};
