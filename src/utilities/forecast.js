// TODO:
// 1) Create a reusable function for getting the weather forecast
// 2) The forecast function should have three potential calls to callback:
        // a) Low level error, pass string for error
        // b) Coordinate error, pass string for error
        // c) Success, pass forecast string for data

const request = require("request");

const forecast = (lat, lng, callback) => {
  const weatherURL = `https://api.darksky.net/forecast/c8a501c907394ac466641f19b0986dc6/${lat},${lng}?units=si`;

  request({ url: weatherURL, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      const tempMessage = "It is currently " + body.currently.temperature + "º outside. ";
      const precipMessage = "There is a " + Math.round(body.currently.precipProbability * 100) + "% chance of rain.";

      callback(undefined, tempMessage + precipMessage);
    };
  });
};

module.exports = forecast;

// // #1: success
// forecast(37.8267, -112, (error, data) => {
//   console.log("Error: ", error);
//   console.log("Data: ", data);
// });

// // #2: invalid location
// forecast(-122.4233, 37.826, (error, data) => {
//   console.log("Error: ", error);
//   console.log("Data: ", data);
// });

