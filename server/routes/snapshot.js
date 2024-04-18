const pastWeatherData = require("../database/weather");

exports.snapshot = (req, res) => {
  pastWeatherData.push(req?.body?.current);
  res.status(201).json({ message: "Snapshot saved" });
};

exports.pastSnapshots = (req, res) => {
  const pastFiveSnapshots = [];
  const maxSnapshots =
    (pastWeatherData.length > 5 ? 5 : pastWeatherData.length) + 1;
  for (
    let i = pastWeatherData.length - 1;
    i > pastWeatherData.length - maxSnapshots;
    i--
  ) {
    const snapshot = pastWeatherData[i];
    pastFiveSnapshots.push(snapshot);
  }
  res.json({ pastFiveSnapshots });
};
