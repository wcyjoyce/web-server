const express = require("express");
const path = require("path");
const hbs = require("hbs");

const app = express();

// Defines paths for Express configuration
const publicDirectory = path.join(__dirname, "../public");
const viewsDirectory = path.join(__dirname, "../templates/views");
const partialsDirectory = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs"); // handlebars setup
app.set("views", viewsDirectory);
hbs.registerPartials(partialsDirectory);

// Sets up static directory to serve
app.use(express.static(publicDirectory));

// 2 arguments required: (i) route, and (ii) callback function
app.get("/", (req, res) => {
  res.render("index", {
    title: "Handlebars title"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help"
  });
});

app.get("/weather", (req, res) => {
  res.send({
    location: "Hong Kong",
    forecast: "It is sunny."
  });
});

// Starts up server
app.listen(3000);
