const pool = require("./pool.js");

const connectionString =
  process.argv[2] ||
  `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

// Add user to DB
async function addUser(firstName, lastName, email, password) {
  const addUserQuery =
    "INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4)";
  const addUserData = [firstName, lastName, email, password];
  try {
    await pool.query(addUserQuery, addUserData);
  } catch (err) {
    console.log("Error adding user", err);
  }
}
