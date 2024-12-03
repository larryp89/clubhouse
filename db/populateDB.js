require("dotenv").config();

// Client class runs SQL commands (ideal for scripts that perform a series of db operations and then exits, e.g. initial setup/seeding scripts).
const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS users (
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,  
first_name VARCHAR(255) NOT NULL,
last_name VARCHAR (255) NOT NULL,
username VARCHAR (255) NOT NULL UNIQUE,
password VARCHAR (255) NOT NULL,
is_member BOOL NOT NULL,
is_admin BOOL NOT NULL
);

CREATE TABLE IF NOT EXISTS messages (
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
message_title VARCHAR(255) NOT NULL,
message_body TEXT NOT NULL,
user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);`;

async function main() {
  console.log("...creating tables");
  const connectionString =
    process.argv[2] ||
    `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

  const client = new Client({
    connectionString,
  });
  await client.connect();
  await client.query(SQL); // Create the tables if one doesn't exist
  await client.end();
  console.log("...tables created");
}

main();
