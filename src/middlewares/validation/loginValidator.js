const { body } = require('express-validator');

const validationRules = () => [
  body('email')
    .trim()
    .isEmail(),
  body('password')
    .trim()
    .not()
    .isEmpty(),
];

module.exports = {
  validationRules,
};
