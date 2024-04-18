import Plot from "react-plotly.js";
import { Typography } from "@mui/material";
import { useEffect } from "react";
import "./weatherDataDisplay.css";

const WeatherDataDisplay = (props) => {
  const {
    weatherData,
    autoRefresh,
    setWeatherData,
    setRefreshDataTimer,
    createAlert,
  } = props;
  const currentTemp = Math.round(weatherData?.current?.temperature2m);
  const currentTime = weatherData?.current?.time;
  const extractedWeatherData = weatherData?.hourly;
  const weather = weatherData?.current?.weather;

  useEffect(() => {
    if (!autoRefresh) return;

    const fetchData = async () => {
      try {
        const response = await fetch("/api/data").then((res) => res.json());
        setWeatherData(response?.weatherData);
        setRefreshDataTimer(60);
      } catch (error) {
        const message = `Cannot fetch weather data: ${error}`;
        createAlert(message, "error");
      }
    };

    fetchData();

    const intervalId = setInterval(() => {
      if (autoRefresh) fetchData();
    }, 60000);

    return () => clearInterval(intervalId);
  }, [autoRefresh, createAlert]);

  return (
    <>
      {weatherData === null ? (
        <div className="loading-container">
          <Typography sx={{ fontSize: 40 }}>Loading...</Typography>
        </div>
      ) : (
        <>
          <Typography sx={{ fontSize: 96 }}>{weather}</Typography>
          <Typography sx={{ fontSize: 40 }}>{currentTemp} °C</Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary">
            Time: {currentTime}
          </Typography>
          <Plot
            data={[
              {
                x: extractedWeatherData?.time,
                y: extractedWeatherData?.temperature2m,
                type: "scatter",
              },
            ]}
            layout={{
              title: "Temperature the past 5 days",
              xaxis: { title: "Time" },
              yaxis: { title: "Temperature(°C)" },
            }}
          />{" "}
        </>
      )}
    </>
  );
};

export default WeatherDataDisplay;
