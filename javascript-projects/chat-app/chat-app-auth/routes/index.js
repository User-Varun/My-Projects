const express = require("express");
const router = express.Router();

router.get("/", (req, res) => res.render("index"));

router.get("/dashboard", ensureAuthenticated, (req, res) =>
  res.render("dashboard", { user: req.user })
);

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

module.exports = router;
