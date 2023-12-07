const mongoose = require("mongoose");

// User Schema
const userSchema = new mongoose.Schema({
    fullname: String,
    username: String,
    email: String,
    phonenumber: Number,
    password: String,
    confirmPassword: String,
    gender: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
