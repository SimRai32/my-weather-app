const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const weatherDataRoute = require("./routes/weatherData");
const snapshotRoute = require("./routes/snapshot");
const coordinatesRoute = require("./routes/coordinates");
module.exports = app;
const port = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get("/api/data", weatherDataRoute.weatherdata);
app.get("/api/pastsnapshots", snapshotRoute.pastSnapshots);
app.post("/snapshot", snapshotRoute.snapshot);
app.post("/coordinates", coordinatesRoute.coordinates);
app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
