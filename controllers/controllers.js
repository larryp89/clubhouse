const { validationResult } = require("express-validator");

function getHomePage(req, res) {
  res.render("home");
}

function getSignUpForm(req, res) {
  res.render("sign-up.ejs");
}

function addUser(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
  } else {
    const { firstName, lastName, email, password, repeatPassword } = req.body;
    console.log(req.body);
  }

  res.redirect("/");
}

module.exports = {
  getHomePage,
  getSignUpForm,
  addUser,
};
