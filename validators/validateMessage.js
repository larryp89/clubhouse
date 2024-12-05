const { body } = require("express-validator");

const validateMessage = [
  body("messageTitle")
    .trim()
    .notEmpty()
    .withMessage("Title cannot be empty")
    .isLength({ min: 3, max: 50 })
    .withMessage(
      "Title length must be more than 3 characters and less than 50"
    ),

  body("messageBody")
    .trim()
    .notEmpty()
    .withMessage("Message cannot be empty")
    .isLength({ min: 3, max: 250 })
    .withMessage(
      "Message length must be more than 3 characters and less than 250"
    ),
];

module.exports = validateMessage;
