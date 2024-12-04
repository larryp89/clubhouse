const { validationResult } = require("express-validator");
const { hashPassword } = require("../utils/hashPassword");
const db = require("../db/queries");

function getHomePage(req, res) {
  res.render("home"); // If logged in, req.user is true
}

function getSignUpForm(req, res) {
  res.render("sign-up.ejs");
}

function getLoginForm(req, res) {
  res.render("login.ejs");
}

function getVerifyForm(req, res) {
  res.render("verify");
}

function verifyMember(req, res) {
  res.send();
}

function getMessages(req, res) {
  res.render("messages.ejs");
}

async function addUser(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
  } else {
    try {
      console.log("...adding to DB");
      const { firstName, lastName, email, password } = req.body;
      const hashedPassword = await hashPassword(password);
      await db.addUser(firstName, lastName, email, hashedPassword);
      console.log("...successfully added to DB");
    } catch (err) {
      console.log("...failed to add to DB", err);
    }
    res.redirect("/");
  }
}

module.exports = {
  getHomePage,
  getSignUpForm,
  getLoginForm,
  addUser,
  getMessages,
  getVerifyForm,
};
