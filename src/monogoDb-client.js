const mongoose = require('mongoose');
const chalk = require('chalk');

let dbConnection = null;

mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);

const connectToDatabase = async () => {
  if (dbConnection === null) {
    if (process.env.NODE_ENV === 'lambda') {
      dbConnection = await mongoose.connect(process.env.MONGODB_URI, {
        bufferCommands: false,
        bufferMaxEntries: 0,
      });
    } else {
      dbConnection = await mongoose.connect(process.env.MONGODB_URI);
    }
  }
  return dbConnection;
};

mongoose.connection.on('connected', () => {
  console.log(chalk.green.bold('Connected to Database!'));
});

mongoose.connection.on('error', (error) => {
  console.log(chalk.red.bold(`DATABASE Connection Error: ${error}`));
  process.exit();
});

module.exports = { connectToDatabase };
