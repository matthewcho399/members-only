const { Router } = require("express");
const controller = require("../controllers/indexController");
const passport = require("passport");
const router = Router();
const { isAuth, isMember } = require("../lib/authMiddleware");

router.get("/", (req, res) => {
  res.redirect("/login");
});

router.get("/sign-up", (req, res) => res.render("sign-up-form"));
router.post("/sign-up", controller.signUpPost);

router.get("/login", (req, res) => res.render("login-form"));
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login-failure",
  })
);

router.get("/membership", isAuth, (req, res) => res.render("membership"));
router.post("/membership", isAuth, controller.membershipPost);

router.get("/login-failure", (req, res) => {
  res.send("Wrong username or password");
});

router.get("/logout", function (req, res, next) {
  //maybe change this to a POST request?
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
  });
});

router.get("/dashboard", isAuth, controller.dashboardGet);

router.get("/new-message", isAuth, (req, res) => res.render("message-form"));
router.post("/new-message", isAuth, controller.newMessagePost);

module.exports = router;
