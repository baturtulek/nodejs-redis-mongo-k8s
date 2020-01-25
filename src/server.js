const awsServerlessExpress = require('aws-serverless-express');
const chalk = require('chalk');
const app = require('../src/app');

if (process.env.NODE_ENV === 'lambda') {
  const server = awsServerlessExpress.createServer(app);
  module.exports.handler = (event, context) => {
    awsServerlessExpress.proxy(server, event, context);
    context.callbackWaitsForEmptyEventLoop = false;
  };
} else {
  app.listen(process.env.PORT, () => {
    console.log(chalk.green.bold(`App is running at port: ${process.env.PORT} in ${app.get('env')} mode.`));
  }).on('error', (error) => {
    console.log(chalk.red.bold(error));
    process.exit();
  });
}
