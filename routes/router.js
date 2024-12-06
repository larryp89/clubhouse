// Imports & destructures the Router function
const { Router } = require("express");
const controller = require("../controllers/controllers");
const validateUser = require("../validators/validateUser");
const validateMessage = require("../validators/validateMessage");
const validateLogin = require("../validators/validateLogin");
const passport = require("passport");
const router = Router();

// Routes
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
router.get("/verify", controller.getVerifyForm);
router.post("/verify", controller.verifyMember);
router.post("/add-message", validateMessage, controller.addMessage);
router.post("/delete-post", controller.deletePost);
router.get("*", (req, res) => res.send("Oops, this page does not exist"));

module.exports = router;
