const crypto        = require("crypto");
const redisHelpers  = require("./redis_helpers");

const isReqestContainsAuthHeader = (req, res, next) => {
    if (!(req.headers && req.headers.authorization)) {
        return res.status(401).json({
            status          : "Fail",
            authorization   :null,
            errors          : ["Please add header"]
        });
    }
    return next();
};

const isUserAuthenticated = (req, res, next) => {
    let getPromise = redisHelpers.getUserData(req.headers.authorization);
    getPromise.then(function(result){
        if (result === null) {
            return res.status(401).json({
                status          : "Fail",
                authorization   : null,
                errors          : ["Please Log in"]
            });
        }
        return next();
    });
};

const writeToken = (req, res) => {
    let userAccessToken = createToken();
    let addPromise      = redisHelpers.addToken(req.body.username, userAccessToken);
    addPromise.then(function(result) {
        if(!result) {
            return res.status(401).json({
            status          : "fail",
            authorization   : null,
            errors          : ["An unexpected error occured!"]
            });
        }
        return res.status(200).json({
            status          : "success",
            authorization   : userAccessToken,
            errors          : []
        });
    }); 
}

const deleteToken = (req, res) => {
    let deletePromise = redisHelpers.deleteToken(req.headers.authorization);
    deletePromise.then(function(result) {
        if(!result) {
            return res.status(401).json({
            status          : "fail",
            authorization   : null,
            errors          : ["An unexpected error occured!"]
            });
        }
        return res.status(200).json({
            status          : "success",
            authorization   : null,
            errors          : []
        });
    }); 
}

const createToken = () => {
    return crypto.randomBytes(64).toString("hex");
}

module.exports = {
    isReqestContainsAuthHeader,
    isUserAuthenticated,
    writeToken,
    deleteToken,
    createToken
};