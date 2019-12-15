const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const crypto        = require("crypto");

const UserSchema = mongoose.Schema({
    username: {type: String,required: true},
    password: {type: String,required: true},
});

UserSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

UserSchema.statics.findByCredentials = async (username, password) => {
    const user = await User.findOne({ username } );
    if (!user) {
        return null;
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
        return null;
    }
    return user
}

const User = mongoose.model('User', UserSchema);
module.exports = User;
