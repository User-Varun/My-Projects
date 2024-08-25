const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Import CORS middleware
const app = express();
const port = 3000;
const path = require("path");

// Connect to MongoDB
mongoose.connect("mongodb://localhost:8000/chat-app");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Middleware to parse JSON and urlencoded request bodies
app.use(cors()); // Enable CORS for all routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Models
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, unique: true },
  lastName: { type: String, required: true, unique: true },
  // dateOfBirth: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: true },
});
const signup = mongoose.model("signup", userSchema);

// Route to handle form submission for signup
app.post("/signup", async (req, res) => {
  try {
    // Check if username or email already exists
    const existingUser = await signup.findOne({
      $or: [{ firstName: req.body.firstName }, { email: req.body.email }],
    });
    if (existingUser) {
      return res.status(400).send("Username or email already exists");
    }

    // Create a new user object with form data
    const newUser = new signup({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      dateOfBirth: req.body.dataOfBirth,
      password: req.body.password,
    });

    // Save user to MongoDB
    await newUser.save();
    res.status(200).send("user created successfully!");
    console.log("user Created successfully");
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).send("error creating user");
  }
});

app.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname, "public/html/get-started.html"));
});

// Start server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
