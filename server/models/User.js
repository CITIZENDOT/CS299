const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
  },
  passwordHash: {
    type: String,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  accessToken: {
    type: String,
    default: null,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
