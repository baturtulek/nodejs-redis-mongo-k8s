/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const chalk = require('chalk');
const awsServerlessExpress = require('aws-serverless-express');
const errorHandler = require('errorhandler');
const authRoute = require('./routes/authRoute.js');
const handleError = require('./middlewares/error-handler');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/v1/auth', authRoute);
app.use(handleError.resourceNotFound);

if (process.env.NODE_ENV === 'development') {
  app.use(errorHandler());
} else {
  app.use(handleError.internalServerError);
}

if (process.env.NODE_ENV === 'lambda') {
  const server = awsServerlessExpress.createServer(app);
  module.exports.handler = (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;
    awsServerlessExpress.proxy(server, event, context);
  };
} else {
  app.listen(process.env.PORT, () => {
    console.log(chalk.green.bold(`App is running at http://localhost:${process.env.PORT} in ${app.get('env')} mode`));
  }).on('error', (error) => {
    console.log(chalk.red.bold(error));
    process.exit();
  });
}
