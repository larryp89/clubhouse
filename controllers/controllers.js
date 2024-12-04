const { validationResult } = require("express-validator");
const { hashPassword } = require("../utils/hashPassword");

function getHomePage(req, res) {
  res.render("home");
}

function getSignUpForm(req, res) {
  res.render("sign-up.ejs");
}

async function addUser(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
  } else {
    const { firstName, lastName, email, password, repeatPassword } = req.body;
    if (password !== repeatPassword) {
      console.log("Passwords do not match");
    } else {
      const hashedPassword = await hashPassword(password);
      console.log(hashedPassword);
    }
  }
  res.redirect("/");
}

module.exports = {
  getHomePage,
  getSignUpForm,
  addUser,
};
