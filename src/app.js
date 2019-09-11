const express = require("express");

const app = express();

// 2 arguments required: (i) route, and (ii) callback function
app.get("/", (req, res) => {
  res.send("Hello Express!");
});

app.get("/about", (req, res) => {
  res.send("This is an about page.")
});

app.get("/weather", (req, res) => {
  res.send("<h1>This is a title.</h1>");
});

// Starts up server
app.listen(3000);
