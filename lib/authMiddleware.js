const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({ msg: "You are not authorized" });
  }
};

const isMember = (req, res, next) => {
  if (req.isAuthenticated() && req.user.membership_status) {
    next();
  } else {
    res.status(401).json({ msg: "You are not a member" });
  }
};

module.exports = {
  isAuth,
  isMember,
};