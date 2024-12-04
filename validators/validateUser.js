const { body } = require("express-validator");

const validateUser = [
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("First name cannot be empty")
    .isAlpha()
    .withMessage("First name must only contain alphabet letters."),

  body("lastName")
    .trim()
    .notEmpty()
    .withMessage("Last name cannot be empty")
    .isAlpha()
    .withMessage("Last name must only contain alphabet letters."),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email cannot be empty")
    .isEmail()
    .withMessage("Must be a valid email"),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Must be minimum 8 characters")
    .matches(/[A-Z]/)
    .withMessage("Must contain an uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Must contain a lowercase letter")
    .matches(/[0-9]/)
    .withMessage("Must contain a digit")
    .matches(/[@$!%*?&#]/)
    .withMessage("Must contain a special character"),

  body("repeatPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    }
    return true;
  }),
];

module.exports = validateUser;
