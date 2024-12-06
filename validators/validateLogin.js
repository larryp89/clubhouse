const { body } = require("express-validator");

const validateLogin = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email cannot be empty")
    .isEmail()
    .withMessage("Must be a valid email"),

  body("password").notEmpty().withMessage("Password cannot be empty"),
];

module.exports = validateLogin;
