const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utilities/geocode.js");
const forecast = require("./utilities/forecast.js");

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
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address."
    });
  };

  geocode(req.query.address, (error, { lat, lng, location }) => {
    if (error) {
      return res.send({ error });
    } else {
      forecast(lat, lng, (error, forecastData) => {
        res.send({
          query: req.query.address,
          location: location,
          forecast: forecastData
        });
      });
    };
  });
});

// Error 404 - needs to be called at the end of all route paths
app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "Help Page Not Found"
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    title: "404 Error Not Found"
  });
});

// Starts up server
app.listen(3000);
