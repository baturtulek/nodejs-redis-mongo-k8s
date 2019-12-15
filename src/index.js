
const dotenv        = require("dotenv").config();
const mongoose      = require("mongoose");
const express       = require('express');
const authRoute     = require('./routes/authRoute.js');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('port', process.env.PORT || 8080);

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log("Connected to Database");
}).catch((err) => {
    console.log("Database Connection Error! ", err);
});

//Routes
app.use('/v1/auth', authRoute);

app.listen(app.get('port'), () => {
    console.log(`Server listening on port ${process.env.PORT}`);
});
  