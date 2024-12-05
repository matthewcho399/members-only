const { body } = require("express-validator");

const requiredErr = "is required";

//User validation
const validNameErr = "Name must only contain letters";
const nameLengthErr = "Name must be under 30 characters";
const validUsernameErr =
  "Username must only contain letters, numbers, underscores, periods, and hyphens";
const usernameLengthErr = "Username must be between 5 and 20 characters";
const passwordReqErr =
  "Password must include at least one uppercase letter, one number, and one special character (e.g., @$!%*?&).";
const passwordLengthErr = "Password must contain at least 7 characters";
const confirmPasswordErr = "Passwords must match";

//Message validation
const titleLengthErr = "Title must be less than 100 characters";
const textLengthErr = "Message content must be less than 500 characters";

const validateUser = [
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage(`First name ${requiredErr}`)
    .bail()
    .isLength({ max: 30 })
    .withMessage(nameLengthErr)
    .isAlpha()
    .withMessage(validNameErr),
  body("lastName")
    .trim()
    .notEmpty()
    .withMessage(`Last name ${requiredErr}`)
    .bail()
    .isLength({ max: 30 })
    .withMessage(nameLengthErr)
    .isAlpha()
    .withMessage(validNameErr),
  body("username")
    .trim()
    .notEmpty()
    .withMessage(`Username ${requiredErr}`)
    .bail()
    .isLength({ min: 5, max: 20 })
    .withMessage(usernameLengthErr)
    .matches(/^[a-zA-Z0-9_.-]+$/)
    .withMessage(validUsernameErr),
  body("password")
    .trim()
    .notEmpty()
    .withMessage(`Password ${requiredErr}`)
    .bail()
    .isLength({ min: 7, max: 20 })
    .withMessage(passwordLengthErr)
    .matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/)
    .withMessage(passwordReqErr),
  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error(confirmPasswordErr);
    }
    return true;
  }),
];

const validateMessage = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage(`Title ${requiredErr}`)
    .isLength({ max: 100 })
    .withMessage(titleLengthErr),
  body("text")
    .trim()
    .notEmpty()
    .withMessage(`Text ${requiredErr}`)
    .isLength({ max: 500 })
    .withMessage(textLengthErr),
];

module.exports = { validateUser, validateMessage };
