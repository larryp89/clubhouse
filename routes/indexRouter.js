// Imports & destructures the Router function
const { Router } = require("express");

// Create instance of the Express router
const indexRouter = Router();

// Main GET index route
indexRouter.get("/", (req, res) => {
  res.render("index.ejs");
});

indexRouter.get("/join", (req, res) => {
  res.render("join.ejs");
});

indexRouter.post("/join", (req, res) => {
    
})

module.exports = indexRouter;
