const mongoose = require("mongoose");
/*
userName 
password
email
date_created
*/
const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    active: {
        type: Boolean,
        default: false
    },
    date_created: {
        type: String,
        default: Date.now,

    },
});


module.exports = mongoose.model("User", UserSchema); 