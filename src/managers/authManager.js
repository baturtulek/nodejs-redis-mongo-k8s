/* eslint-disable consistent-return */
const bcrypt = require('bcrypt');
const httpStatus = require('http-status');
const User = require('../models/User');
const { mongoose } = require('../monogoDb-client');
const authHelpers = require('../helpers/auth_helpers');
const redisHelpers = require('../helpers/redis_helpers');

const login = (req, res) => {
  const credentials = req.body;
  User.find({ email: credentials.email })
    .exec()
    .then((dbResult) => {
      if (dbResult.length < 1) {
        return res.status(httpStatus.NOT_FOUND).json({
          data: null,
          errors: ['User not found!'],
        });
      }
      const dbUser = dbResult[0];
      bcrypt.compare(credentials.password, dbUser.password, async (error, result) => {
        if (error) {
          return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            data: null,
            errors: ['Internal server error!'],
          });
        }
        if (result) {
          const accessToken = authHelpers.createToken();
          const tokenResult = await redisHelpers.writeToken(accessToken, dbUser);
          if (tokenResult) {
            return res.status(httpStatus.OK).json({
              data: { accessToken },
              errors: [],
            });
          }
        }
        return res.status(httpStatus.UNAUTHORIZED).json({
          data: null,
          errors: ['Password doesnt match!'],
        });
      });
    })
    .catch(() => res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      data: null,
      errors: ['Internal server error!'],
    }));
};

const register = (req, res) => {
  const credentials = req.body;
  User.find({ email: credentials.email })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        res.status(httpStatus.CONFLICT).json({
          data: null,
          errors: ['Email address is already in use!'],
        });
      } else {
        bcrypt.hash(credentials.password, 10, (err, hashedPassword) => {
          if (err) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
              data: null,
              errors: ['Internal server error!'],
            });
          } else {
            const newUser = new User({
              _id: new mongoose.Types.ObjectId(),
              email: credentials.email,
              username: credentials.username,
              password: hashedPassword,
            });
            newUser
              .save()
              .then(() => res.status(httpStatus.CREATED).json({
                data: null,
                errors: ['User created!'],
              }))
              .catch(() => res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                data: null,
                errors: ['Internal server error!'],
              }));
          }
        });
      }
    })
    .catch((err) => res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      data: null,
      errors: [`Internal server error! ${err}`],
    }));
};

const logout = async (req, res) => {
  const accessToken = req.headers.authorization;
  const result = await redisHelpers.deleteToken(accessToken);
  if (result) {
    return res.status(httpStatus.OK).json({
      data: null,
      errors: [],
    });
  }
};

const getUserProfile = async (req, res) => {
  const accessToken = req.headers.authorization;
  const userData = await redisHelpers.getUserData(accessToken);
  if (userData) {
    return res.status(httpStatus.OK).json({
      data: { userData },
      errors: [],
    });
  }
};

module.exports = {
  login,
  register,
  logout,
  getUserProfile,
};
