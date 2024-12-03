// Import express module into the project
const express = require("express");

// Create an instance of the express application (used to define routes, middleware, and app-specific settings)
const app = express();

// Import the path module from node (provides utilities for working with file/directory paths)
const path = require("node:path");

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Serve static fIiles from a public directory
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

// Configure the app to use EJS and specify the directory for EJS templates
app.set("views", path.join(__dirname, "views")); // Tells Express to look for template files in the views directory.
app.set("view engine", "ejs"); // Sets EJS as the templating engine, allowing you to render EJS templates with the res.render method

// Get routes from routers
const indexRouter = require("./routes/indexRouter");

// Mount the indexRouter middleware at the root path ("/"), i.e. any paths handled by the corresponding route handlers
app.use("/", indexRouter);

// NB process accessible on global object so don't need to require
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Clubhouse - listening on port ${PORT}!`);
});
