// Imports & destructures the Router function
const { Router } = require("express");

// Create instance of the Express router
const indexRouter = Router();

// Main GET index route
indexRouter.get("/", res.send("Hello"));

module.exports = indexRouter;
