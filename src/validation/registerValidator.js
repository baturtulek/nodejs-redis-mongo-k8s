const { body } = require('express-validator');

const validationRules = () => {
    return [
        body('email')
            .isEmail()
            .normalizeEmail(),
        body('username')
            .trim()
            .not().isEmpty()
            .escape(),
        body('password').isLength({ min: 5 })
    ];
};

module.exports = {
    validationRules
};
