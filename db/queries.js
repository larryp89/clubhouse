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

// Add message
async function addMessage(userID, messageTitle, messageBody) {
  console.log("RUNNING ADD MESSAGE QUERY");
  const addMessageQuery =
    "INSERT INTO messages (message_title, message_body, user_id) VALUES ($1, $2, $3)";
  const addMessageData = [messageTitle, messageBody, userID];
  try {
    await pool.query(addMessageQuery, addMessageData);
  } catch (err) {
    console.log("Error adding message", err);
  }
}

// Update membership status
async function updateMembershipStatus(userID) {
  console.log("...UPDATING MEMBERSHIP STATUS");
  const updateQuery = "UPDATE users SET is_member = TRUE WHERE id = $1";
  const updateData = [userID];
  try {
    await pool.query(updateQuery, updateData);
  } catch (err) {
    console.log("Error updating user", err);
  }
}

module.exports = { addUser, updateMembershipStatus, addMessage };
