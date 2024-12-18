// Set up a connection to the postgres db using the pg library for queries

// The Pool class is used to manage multiple database connections (useful for managing multiple simultaneous requests)
const { Pool } = require("pg");

// Load the .env variables from the file into the process.env object
require("dotenv").config();

// Create new isntance of pool and configure using environment variables (NB could use connection string here instead)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

module.exports = pool;
