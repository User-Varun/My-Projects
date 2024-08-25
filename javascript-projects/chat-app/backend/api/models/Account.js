// models/Account.js

const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  // Add more fields as needed
});

module.exports = mongoose.model("Account", accountSchema);
