const db = require("../db/queries");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const validNameErr = "Must only contain letters";
const nameLengthErr = "Must be between 2 and 30 characters";
const validUsernameErr =
  "Must only contain letters, numbers, underscores, periods, and hyphens";
const usernameLengthErr = "Must be between 5 and 20 characters";
const passwordUppercaseErr = "Must include at least one uppercase letter";
const passwordSpecialCharErr =
  "Must include at least one special character (e.g., @$!%*?&)";
const passwordLengthErr = "Must contain at least 6 characters";
const confirmPasswordErr = "Passwords must match";

const validateUser = [
  body("first-name")
    .trim()
    .isAlpha()
    .withMessage(validNameErr)
    .isLength({ min: 2, max: 30 })
    .withMessage(nameLengthErr),
  body("last-name")
    .trim()
    .isAlpha()
    .withMessage(validNameErr)
    .isLength({ min: 2, max: 30 })
    .withMessage(nameLengthErr),
  body("username")
    .trim()
    .matches(/^[a-zA-Z0-9_.-]+$/)
    .withMessage(validUsernameErr)
    .isLength({ min: 5, max: 20 })
    .withMessage(usernameLengthErr),
  body("password")
    .trim()
    .matches(/[A-Z]/)
    .withMessage(passwordUppercaseErr)
    .matches(/[@$!%*?&]/)
    .withMessage(passwordSpecialCharErr)
    .isLength({ min: 6, max: 20 })
    .withMessage(passwordLengthErr),
  body("confirm-password").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error(confirmPasswordErr);
    }
    return true;
  }),
];

const signUpPost = [
  validateUser,
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).render("sign-up-form", {
          errors: errors.array(),
        });
      }
      await db.createUser();
      res.redirect("/");
    } catch (err) {
      return next(err);
    }
  },
];

module.exports = {
  signUpPost,
};
