// Imports & destructures the Router function
const { Router } = require("express");

const controller = require("../controllers/controllers");

// Create instance of the Express router
const indexRouter = Router();

// Main GET index route
indexRouter.get("/", controller.getHomePage);
indexRouter.get("/sign-up", controller.getSignUpForm);
indexRouter.post("/sign-up", controller.addUser);

module.exports = indexRouter;
