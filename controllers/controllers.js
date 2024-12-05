const { validationResult } = require("express-validator");
const { hashPassword } = require("../utils/hashPassword");
const db = require("../db/queries");
const pool = require("../db/pool");

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

async function verifyMember(req, res) {
  console.log("...verifying member");
  const userID = req.user.id;
  try {
    await db.updateMembershipStatus(userID);
    console.log("SUCCES");
    res.status(200).send(); // This sends the response back tot he fetch API
  } catch (err) {
    res.status(401);
  }
}

async function getMessages(req, res) {
  const allMessages = await db.getMessages();
  const messages = allMessages.rows;
  console.log(messages);
  res.render("messages.ejs", { messages: messages, errors: [] });
}

async function addMessage(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const allMessages = await db.getMessages();
    const messages = allMessages.rows;
    console.log(messages);
    res.render("messages.ejs", { messages: messages, errors: errors.array() });
  }

  console.log("...adding message to DB");
  const { messageTitle, messageBody } = req.body;
  const userID = req.user.id;
  try {
    await db.addMessage(userID, messageTitle, messageBody);
    res.status(200).redirect("/messages");
  } catch (err) {
    res;
  }
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

async function deletePost(req, res) {
  console.log("...deleting post");
  const messageID = req.body.messageID;
  await db.deletePost(messageID);
  console.log("post deleted");
  res.redirect("/messages");
}

module.exports = {
  getHomePage,
  getSignUpForm,
  getLoginForm,
  addUser,
  getMessages,
  getVerifyForm,
  verifyMember,
  addMessage,
  deletePost,
};
