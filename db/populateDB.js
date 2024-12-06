require("dotenv").config();
const bcrypt = require("bcryptjs");
const pool = require("./pool.js");

// Client class runs SQL commands (ideal for scripts that perform a series of db operations and then exits, e.g. initial setup/seeding scripts).
const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS users (
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,  
first_name VARCHAR(255) NOT NULL,
last_name VARCHAR (255) NOT NULL,
email VARCHAR (255) NOT NULL UNIQUE,
password VARCHAR (255) NOT NULL,
is_member BOOL NOT NULL DEFAULT FALSE,
is_admin BOOL NOT NULL DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS messages (
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
message_title VARCHAR(255) NOT NULL,
message_body TEXT NOT NULL,
message_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);`;

const initializeDatabase = async () => {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const hashedPassword = await bcrypt.hash(adminPassword, 10);
  const checkAdminQuery = `SELECT * FROM users WHERE email = $1`;
  const createAdminQuery = `INSERT INTO users (first_name, last_name, email, password, is_member, is_admin) VALUES ($1, $2, $3, $4, $5, $6)`;
  try {
    const res = await pool.query(checkAdminQuery, [adminEmail]);
    if (res.rows.length === 0) {
      await pool.query(createAdminQuery, [
        "Admin",
        "Admin",
        adminEmail,
        hashedPassword,
        true,
        true,
      ]);
      console.log("Admin user created");
    } else {
      console.log("Admin user already exists");
    }
  } catch (err) {
    console.error("Error initializing database:", err);
  }
};

async function main() {
  console.log("...creating tables");
  const connectionString = process.argv[2] || process.env.DATABASE_URL;

  const client = new Client({
    connectionString,
    ssl: {
      rejectUnauthorized: false,
    },
  });
  console.log("...CONNECTING TO DB");
  await client.connect();
  console.log("CONNECTION ESTABLISHED");
  await client.query(SQL); // Create the tables if one doesn't exist
  console.log("...tables created");
  await initializeDatabase();
  console.log("Admin created");
  await client.end();
}

main();
