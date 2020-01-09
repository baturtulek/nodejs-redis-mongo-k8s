
const mongoose      = require('mongoose');
const bcrypt        = require('bcrypt');
const httpStatus    = require('http-status')
const User          = require("../models/User");
const authHelpers   = require("../helpers/auth_helpers");
const redisHelpers  = require('../helpers/redis_helpers');

const login = (req, res) => {
    const credentials = req.body;
    User.find({ email: credentials.email })
    .exec()
    .then(user => {
        const dbUserResult = user[0];
        if (dbUserResult.length < 1) {
            return res.status(httpStatus.NOT_FOUND).json({
                data: null,
                errors: ['User not found!']
              });
        }
        bcrypt.compare(credentials.password, dbUserResult.password, async (error, result) => {
                if (error) {
                    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                        data    : null,
                        errors  : ['Internal server error!']
                    });
                }
                if (result) {
                    let accessToken = authHelpers.createToken();
                    let result = await redisHelpers.writeToken(accessToken, dbUserResult);
                    if(result){
                        return res.status(httpStatus.OK).json({
                            data    : { accessToken },
                            errors  : []
                        });
                    }
                }
                return res.status(httpStatus.UNAUTHORIZED).json({
                    data: null,
                    errors: ['Password doesnt match!']
                });
            }
        );
    })
    .catch(error => {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            data    : null,
            errors  : ['Internal server error!']
        });
    });
}

const register = (req, res) => {
    const credentials = req.body;
    User.find({email: credentials.email})
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(httpStatus.CONFLICT).json({
                    data    : null,
                    errors  : ['Email address is already exists!']
                });
            } else {
                bcrypt.hash(credentials.password, 10, (err, hashedPassword) => {
                    if (err) {
                        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                            data    : null,
                            errors  : ['Internal server error!']
                        });
                    } else {
                        const user = new User({
                            _id     : new mongoose.Types.ObjectId(),
                            email   : credentials.email,
                            username: credentials.username,
                            password: hashedPassword
                        });
                        user.save()
                            .then(result => {
                                return res.status(httpStatus.CREATED).json({
                                    data    : null,
                                    errors  : ['User created!']
                                });
                            })
                            .catch(err => {
                                return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                                    data    : null,
                                    errors  : ['Internal server error!']
                                });
                            });
                    }
                });
            }
        })
        .catch(err => {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                data    : null,
                errors  : [`Internal server error! ${err}`]
            });
        });
}

const logout = async (req, res) => {
    let accessToken = req.headers.authorization;
    let result = await redisHelpers.deleteToken(accessToken);
    if(result) {
        return res.status(httpStatus.OK).json({
            data    : null,
            errors  : []
        });
    }
}

const getUserProfile = async (req, res) => {
    let userData = await redisHelpers.getUserData(req.headers.authorization);
    if (userData) {
        return res.status(httpStatus.OK).json({
            data    : { userData },
            errors  : []
        });
    }
}

module.exports = { 
    login,
    register,
    logout,
    getUserProfile
};