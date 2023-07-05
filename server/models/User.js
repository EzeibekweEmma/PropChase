const mongoose = require("mongoose");

// Define the User schema
const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avater: String,
  description: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the User model
const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
