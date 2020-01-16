/* eslint-disable no-console */
const mongoose = require('mongoose');
const chalk = require('chalk');

mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log(chalk.green.bold('Connected to Database!'));
  }).catch((error) => {
    console.log(chalk.red.bold(`Database Connection Error! ${error}`));
    process.exit();
  });

module.exports = { mongoose };
