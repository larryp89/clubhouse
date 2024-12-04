// Imports & destructures the Router function
const { Router } = require("express");
const controller = require("../controllers/controllers");
const validateUser = require("../validators/validateUser");

// Create instance of the Express router
const router = Router();

// GET routes
router.get("/", controller.getHomePage); // List the comments but show no user information
router.get("/sign-up", controller.getSignUpForm); // GET sign up form
router.post("/sign-up", validateUser, controller.addUser); // POST sign up form

module.exports = router;
