const express = require("express");
const path = require("path");

const app = express();
const publicDirectory = path.join(__dirname, "../public");

app.set("view engine", "hbs"); // handlebars setup
app.use(express.static(publicDirectory));

// 2 arguments required: (i) route, and (ii) callback function
app.get("/", (req, res) => {
  res.render("index", {
    title: "Handlebars title",
    name: "Joyce"
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
