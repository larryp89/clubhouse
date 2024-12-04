// Imports & destructures the Router function
const { Router } = require("express");

const controller = require("../controllers/controllers");

// Create instance of the Express router
const router = Router();

// Main GET index route
router.get("/", controller.getHomePage);
router.get("/sign-up", controller.getSignUpForm);
router.post("/sign-up", controller.addUser);

module.exports = router;
