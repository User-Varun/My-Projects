const express = require("express");
const http = require("http");
const path = require("path");
const mongoose = require("./config/database");
const socketSetup = require("./config/socket");
const authRoutes = require("./routes/authRoutes");
const chatRoutes = require("./routes/chatRoutes");
const userRoutes = require("./routes/userRoutes");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/User");

const app = express();
const server = http.createServer(app);
const io = socketSetup(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(
  session({ secret: "yourSecret", resave: false, saveUninitialized: false })
);
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy(function (username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Incorrect username." });
      }
      if (user.password !== password) {
        return done(null, false, { message: "Incorrect password." });
      }
      return done(null, user);
    });
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// Use routes
app.use("/auth", authRoutes);
app.use("/chat", chatRoutes);
app.use("/user", userRoutes);

// Fallback route to serve HTML files
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/html/index.html"));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
