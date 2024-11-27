const { Router } = require("express");
const controller = require("../controllers/indexController");
const router = Router();

router.get("/", (req, res) => {
  res.send("hew");
});

router.get("/sign-up", (req, res) => res.render("sign-up-form"));
router.post("/sign-up", controller.signUpPost);

module.exports = router;
