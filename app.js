const express = require("express");
const data = require("./data.json");

const app = express();

app.set("view engine", "pug");

app.use("/static", express.static("public"));

// ROUTES

// Index
app.get("/", (req, res) => {
  const projectsList = {
    projects: data.projects,
  };
  res.locals = projectsList;
  res.render("index");
});

// About
app.get("/about", (req, res) => {
  res.render("about");
});

// Projects
app.get("/projects/:id", (req, res, next) => {
  const { id } = req.params;
  const projToShow = data.projects[id];
  if (projToShow) {
    res.render("project", projToShow);
  } else {
    next();
  }
});

// Start server
app.listen(3000, () => {
  console.log("The app is running on localhost:3000");
});

// Error handler

app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.error = err;
  const status = err.status || 500;
  res.status(status);
  console.log(`A ${status} error occurred for path: ${req.url}.`);
  res.render("error", err);
});
