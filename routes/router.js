// Imports & destructures the Router function
const { Router } = require("express");
const controller = require("../controllers/controllers");
const validateUser = require("../validators/validateUser");
const passport = require("passport");

// Create instance of the Express router
const router = Router();

// GET routes
router.get("/", controller.getHomePage);
router.get("/login", controller.getLoginForm);

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);
router.post("/logout", (req, res, next) => {
  // Passport adds a logout property to the req object
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

router.get("/sign-up", controller.getSignUpForm); // GET sign up form
router.post("/sign-up", validateUser, controller.addUser); // POST sign up form

router.get("/messages", controller.getMessages);

module.exports = router;
