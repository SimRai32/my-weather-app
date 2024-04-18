const coordinates = require("../database/coordinates");

exports.coordinates = (req, res) => {
  coordinates.lat = req.body?.lat;
  coordinates.long = req.body?.lat;
  res.status(201).json({ message: "Location saved" });
};
