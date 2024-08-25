exports.showProfile = (req, res) => {
  res.json({ user: req.user });
};
