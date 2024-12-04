const pool = require("./pool.js");

// Add user to DB
async function addUser(firstName, lastName, email, password) {
  console.log("RUNNING ADD USER QUERY");
  const addUserQuery =
    "INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4)";
  const addUserData = [firstName, lastName, email, password];
  try {
    await pool.query(addUserQuery, addUserData);
  } catch (err) {
    console.log("Error adding user", err);
  }
}

module.exports = { addUser };
