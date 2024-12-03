// Set up a connection to the postgres db using the pg library for queries

// The Pool class is used to manage multiple database connections (useful for managing multiple simultaneous requests)
const { Pool } = require("pg");

// Load the .env variables from the file into the process.env object
require("dotenv").config();

// Create new isntance of pool and configure using environment variables
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD || process.env.DEV_PASSWORD,
  port: process.env.DB_PORT,
});

module.exports = pool;
