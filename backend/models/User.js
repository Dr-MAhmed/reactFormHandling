const mongoose = require("mongoose");

// Define User Schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minLength: [8, 'Password must be at least 8 characters long']},
});

// Create User Model
const User = mongoose.model("Register", userSchema);

module.exports = User;
