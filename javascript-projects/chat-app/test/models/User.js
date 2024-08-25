const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, unique: true },
  lastName: { type: String, required: true, unique: true },
  // dateOfBirth: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: true },
});

const signup = mongoose.model("signup", userSchema);

module.exports = signup;
