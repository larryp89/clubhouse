const { body } = require("express-validator");

const validateMember = [
  body("riddleAnswer")
    .trim()
    .notEmpty()
    .withMessage("Field cannot be empty")
    .isAlpha()
    .withMessage("First must only contain letters."),
];

module.exports = validateMember;
