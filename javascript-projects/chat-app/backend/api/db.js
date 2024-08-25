// db.js
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:8000/chat-app");
const dataBase = mongoose.connection;
dataBase.on("error", console.error.bind(console, "MongoDB connection error:"));
dataBase.once("open", () => {
  console.log("Connected to MongoDB");
});

module.exports = dataBase;
