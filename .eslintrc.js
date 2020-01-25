module.exports = {
    "extends": "airbnb-base",
    "plugins": ["chai-friendly"],
    "rules": {
      "comma-dangle": 0,
      "consistent-return": 0,
      "function-paren-newline": ["error", "never"],
      "implicit-arrow-linebreak": ["off"],
      "no-param-reassign": 0,
      "no-underscore-dangle": 0,
      "no-shadow": 0,
      "no-console": 0,
      "no-plusplus": 0,
      "no-unused-expressions": 0,
      "no-unused-vars": ["error", { "argsIgnorePattern": "next" }],
      "chai-friendly/no-unused-expressions": 2
    }
};