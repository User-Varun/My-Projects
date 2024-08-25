// routes/api.js

const express = require("express");
const router = express.Router();
const Account = require("../models/Account"); // Adjust the path as needed

// GET all accounts
router.get("/accounts", async (req, res) => {
  try {
    const accounts = await Account.find();
    res.json(accounts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
