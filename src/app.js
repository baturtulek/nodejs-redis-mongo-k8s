require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });
const express = require('express');
const morgan = require('morgan');
const { connectToDatabase } = require('./monogoDb-client');
const authRoute = require('./routes/auth.route.js');
const healtcheckRoute = require('./routes/healthCheck.route.js');
const handleError = require('./middlewares/error-handler');
const app = express();

connectToDatabase();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'));
}

app.use('/v1/auth', authRoute);
app.use('/healthcheck', healtcheckRoute);
app.use(handleError.resourceNotFound);
app.use(handleError.internalServerError);

module.exports = app;
