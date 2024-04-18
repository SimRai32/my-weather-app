const asyncHandler = require("express-async-handler");
const { fetchWeatherApi } = require("openmeteo");
const moment = require("moment/moment");
const weatherCodes = require("../database/weatherCodes");
const coordinates = require("../database/coordinates");

exports.weatherdata = asyncHandler(async (req, res) => {
  const currentDate = moment().format("YYYY-MM-DD");
  const pastDate = moment().subtract(5, "days").format("YYYY-MM-DD");
  const params = {
    latitude: coordinates?.lat,
    longitude: coordinates?.long,
    current: ["temperature_2m", "weather_code"],
    hourly: "temperature_2m",
    start_date: pastDate,
    end_date: currentDate,
  };
  const range = (start, stop, step) =>
    Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);
  const url = "https://api.open-meteo.com/v1/gem";
  const responses = await fetchWeatherApi(url, params).then((res) => res);
  const current = responses[0]?.current();
  const utcOffsetSeconds = responses[0]?.utcOffsetSeconds();
  const hourly = responses[0]?.hourly();
  const weatherCode = Number(current?.variables(1)?.value());
  const weatherData = {
    current: {
      time: moment(
        new Date((Number(current?.time()) + utcOffsetSeconds) * 1000)
      ).format("YYYY-MM-DD HH:mm:ss"),
      temperature2m: current?.variables(0)?.value(),
      weather: weatherCodes[weatherCode],
    },
    hourly: {
      time: range(
        Number(hourly?.time()),
        Number(hourly?.timeEnd()),
        hourly?.interval()
      ).map((t) =>
        moment(new Date((t + utcOffsetSeconds) * 1000)).format(
          "YYYY-MM-DD HH:mm:ss"
        )
      ),
      temperature2m: Object.values(hourly?.variables(0)?.valuesArray()),
    },
  };
  res.json({ weatherData });
});
