import React, { useState } from "react";

function WeatherCard({ weather }) {
  const [unit, setUnit] = useState("C");

  const convertTemp = (temp) => {
    if (unit === "C") return temp;
    return (temp * 9) / 5 + 32;
  };

  return (
    <div>
      <button onClick={() => setUnit(unit === "C" ? "F" : "C")}>
        Toggle °C / °F
      </button>

      <div className="card-container">
        <div className="card">
          <h3>Temperature</h3>
          <p>{convertTemp(weather.current_weather.temperature).toFixed(1)} °{unit}</p>
        </div>

        <div className="card">
          <h3>Wind</h3>
          <p>{weather.current_weather.windspeed} km/h</p>
        </div>

        <div className="card">
          <h3>Humidity</h3>
          <p>{weather.hourly.relativehumidity_2m[0]} %</p>
        </div>

        <div className="card">
          <h3>Rain</h3>
          <p>{weather.hourly.precipitation[0]} mm</p>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;