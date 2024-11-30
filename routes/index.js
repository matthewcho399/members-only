const { Router } = require("express");
const controller = require("../controllers/indexController");
const passport = require("passport");
const router = Router();

router.get("/", (req, res) => {
  res.send("hew");
});

router.get("/sign-up", (req, res) => res.render("sign-up-form"));
router.post("/sign-up", controller.signUpPost);

router.get("/login", (req, res) => res.render("login-form"));
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
  })
);

router.get("/membership", (req, res) => res.render("membership"));
router.post("/membership", controller.membershipPost);

module.exports = router;
