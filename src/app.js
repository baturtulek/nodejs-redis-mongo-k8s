/* eslint-disable no-console */
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });
const express = require('express');
const morgan = require('morgan');
const chalk = require('chalk');
const awsServerlessExpress = require('aws-serverless-express');
const { connectToDatabase } = require('./monogoDb-client');
const authRoute = require('./routes/authRoute.js');
const handleError = require('./middlewares/error-handler');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/v1/auth', authRoute);
app.use(handleError.resourceNotFound);
app.use(handleError.internalServerError);

connectToDatabase()
  .then(() => {
    console.log(chalk.green.bold('Connected to Database!'));
  }).catch((error) => {
    console.log(chalk.red.bold(`Database Connection Error! ${error}`));
    process.exit();
  });

if (process.env.NODE_ENV === 'lambda') {
  const server = awsServerlessExpress.createServer(app);
  module.exports.handler = (event, context) => {
    awsServerlessExpress.proxy(server, event, context);
    context.callbackWaitsForEmptyEventLoop = false;
  };
} else {
  app.listen(process.env.PORT, () => {
    console.log(chalk.green.bold(`App is running at http://localhost:${process.env.PORT} in ${app.get('env')} mode`));
  }).on('error', (error) => {
    console.log(chalk.red.bold(error));
    process.exit();
  });
}
