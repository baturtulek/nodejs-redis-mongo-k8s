const { body } = require('express-validator');

const validationRules = () => {
    return [
        body('email')
            .isEmail(), 
        body('password')
            .trim()
            .not().isEmpty()
    ];
};

module.exports = {
    validationRules
};
