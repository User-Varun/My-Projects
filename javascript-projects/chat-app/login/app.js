"use strict";

const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const signup = require("./models/user");

const app = express();
const port = 3000;

// Middleware to parse JSON and urlencoded request bodies
app.use(cors()); // Enable CORS for all routes
app.use(express.json());

// connect to mongodb
mongoose.connect("mongodb://localhost:8000/chat-app");
const db = mongoose.connection;

db.once("open", () => {
  console.log("connected to mongodb");
});

app.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  const user = await signup.findOne({ email });

  if (user && user.password === password) {
    res.status(200).send("login successful");
  } else {
    res.status(401).send("invalid username or password");
  }
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
