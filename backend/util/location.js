const axios = require("axios");
const HttpError = require("../models/http-error");
const API_KEY = "pk.1d19b3b43f60651bc0c29460eb00eba1";
 
async function getCoordsForAddress(address) {
  const response = await axios.get(
    `https://us1.locationiq.com/v1/search.php?key=${API_KEY}&q=${encodeURIComponent(
      address
    )}&format=json`
  );
 
  const data = response.data[0];
 
  console.log(data);
 
  if (!data || data.status === "ZERO_RESULTS") {
    const error = new HttpError(
      "Could not find location for the specified address.",
      422
    );
    throw error;
  }
 
  const coorLat = data.lat;
  const coorLon = data.lon;
  const coordinates = {
    lat: coorLat,
    lng: coorLon
  };
 
  return coordinates;
}
 
module.exports = getCoordsForAddress;

module.exports = getCoordsForAddress;

// async function getCoordsForAddress(address) {
//     const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(
//       address
//     )}&inputtype=textquery&fields=geometry&key=${API_KEY}`;
   
//     const response = await axios.get(url);
   
//     const data = response.data;
//     if (!data || data.status === "ZERO_RESULTS") {
//       const error = new HttpError(
//         "Could not find location for the specified address.",
//         422
//       );
//       throw error;
//     }
//     const coordinates = data.candidates[0].geometry.location;
   
//     return coordinates;