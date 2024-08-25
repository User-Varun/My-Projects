const User = require("../models/User");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy(function (username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      if (user.password !== password) {
        return done(null, false);
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

exports.register = (req, res) => {
  const newUser = new User({
    username: req.body.username,
    password: req.body.password,
  });
  newUser.save((err) => {
    if (err) return res.status(500).json({ message: err.message });
    res.status(201).json({ message: "User registered successfully" });
  });
};

exports.login = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res
        .status(401)
        .json({ message: "Incorrect username or password" });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.json({ user });
    });
  })(req, res, next);
};

exports.logout = (req, res) => {
  req.logout();
  res.json({ message: "Logged out successfully" });
};
