require('dotenv').config();
const mongoose      = require('mongoose');
const express       = require('express');
const errorHandler  = require('errorhandler');
const morgan        = require('morgan');
const { redis }     = require('./redis-client'); 
const authRoute     = require('./routes/authRoute.js');
const app           = express();

mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to Database!');
    }).catch((error) => {
        console.log(`Database Connection Error! ${error}`);
    });

redis.on('connect', () => {
    console.log('Connected to Redis!');
});
redis.on('error' , (error) => {
    console.log(`Redis connection error: ${error}`);
    process.exit();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/v1/auth', authRoute);

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
    app.use(errorHandler());
}

app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
});
  