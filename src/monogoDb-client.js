const mongoose = require('mongoose');

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

module.exports = { connectToDatabase };
