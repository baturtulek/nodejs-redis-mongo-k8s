const express       = require("express");
const User          = require("../models/User");
const authHelpers   = require("../helpers/auth_helpers");
const router        = express.Router();

router.post("/register", async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        authHelpers.writeToken(req, res);
    } catch (error) {
        return res.status(401).json({
            status          : "fail",
            authorization   : null,
            errors          : ["An unexpected error occured!"]
        });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findByCredentials(username, password);
        if (!user) {
            return res.status(401).json({
                status          : "fail",
                authorization   : null,
                errors          : ["Username or password is wrong!"]
            });
        }
        authHelpers.writeToken(req, res);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get("/logout", authHelpers.isReqestContainsAuthHeader, authHelpers.isUserAuthenticated, (req, res) => {
    authHelpers.deleteToken(req, res);
});

module.exports = router;
