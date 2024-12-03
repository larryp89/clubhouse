function getHomePage(req, res) {
  res.render("home");
}

function getSignUpForm(req, res) {
  res.render("sign-up.ejs");
}

function addUser(req, res) {
  const { firstName, lastName, email, password, repeatPassword } = req.body;
  res.redirect("/");
}

module.exports = {
  getHomePage,
  getSignUpForm,
  addUser,
};
