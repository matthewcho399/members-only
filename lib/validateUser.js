const { body } = require("express-validator");

const validNameErr = "Must only contain letters";
const nameLengthErr = "Must be between 2 and 30 characters";
const validUsernameErr =
  "Must only contain letters, numbers, underscores, periods, and hyphens";
const usernameLengthErr = "Must be between 5 and 20 characters";
const passwordReqErr =
  "Password must include at least one uppercase letter, one number, and one special character (e.g., @$!%*?&).";
const passwordLengthErr = "Must contain at least 7 characters";
const confirmPasswordErr = "Passwords must match";

const validateUser = [
  body("firstName")
    .trim()
    .isAlpha()
    .withMessage(validNameErr)
    .isLength({ min: 2, max: 30 })
    .withMessage(nameLengthErr),
  body("lastName")
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
    .matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/)
    .withMessage(passwordReqErr)
    .isLength({ min: 7, max: 20 })
    .withMessage(passwordLengthErr),
  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error(confirmPasswordErr);
    }
    return true;
  }),
];

module.exports = { validateUser };
