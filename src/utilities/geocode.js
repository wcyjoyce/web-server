const request = require("request");

const geocode = (address, callback) => {
  let location = "";
  address.split("").forEach(char => {
    const letter = char === " " ? "%20" : char;
    location += letter;
  });

  const accessToken = "pk.eyJ1Ijoid2N5am95Y2UiLCJhIjoiY2swNXg3NTlpM3B3NDNibXZqaWF0a2dlaiJ9.npfswSTgFPg3uwWzSR0KMg"
  const geocodingURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=${accessToken}&limit=1`;

  request({ url: geocodingURL, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service.", undefined);
    } else if (body.message === "Forbidden" || body.error || body.features.length === 0) {
      callback("Unable to find location", undefined);
    } else {
      callback(undefined, {
        location: body.features[0].place_name,
        lat: body.features[0].center[0],
        lng: body.features[0].center[1]
      });
    };
  });
};

module.exports = geocode;

// geocode("Hong Kong", (error, data) => {
//   console.log("Error: ", error);
//   console.log("Data: ", data);
// });
