// app.js

const express = require("express");
const dataBase = require("./db"); // Connect to MongoDB
const apiRoutes = require("./routes/api");
const app = express();
const cors = require("cors");

// Connect To DB
dataBase;

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// Routes
app.use("/api", apiRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
