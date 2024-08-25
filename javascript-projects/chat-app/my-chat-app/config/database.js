const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/my-chat-app");

mongoose.connection.on("connected", () => {
  console.log("Mongoose is connected");
});

module.exports = mongoose;
