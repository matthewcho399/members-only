const { Router } = require("express");
const controller = require("../controllers/indexController");
const passport = require("passport");
const router = Router();
const { isAuth, isMember } = require("../lib/authMiddleware");

router.get("/", (req, res) => {
  res.send("hew");
});

router.get("/sign-up", (req, res) => res.render("sign-up-form"));
router.post("/sign-up", controller.signUpPost);

router.get("/login", (req, res) => res.render("login-form"));
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/login-success",
    failureRedirect: "/login-failure",
  })
);

router.get("/membership", isAuth, (req, res) => res.render("membership"));
router.post("/membership", isAuth, controller.membershipPost);

router.get("/login-success", (req, res) =>
  res.send(
    "<p>You've successfully logged in</p> <a href='/protected-route'>Go to protected route"
  )
);

router.get("/login-failure", (req, res) => {
  res.send("Wrong username or password");
});

router.get("/logout", function (req, res, next) {
  //maybe change this to a POST request?
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/protected-route");
  });
});

router.get("/protected-route", isAuth, (req, res) => {
  res.send("<p>You are authenticated.</p> <a href='/logout'>Logout</a>");
});

module.exports = router;
