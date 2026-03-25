import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

function WeatherChart({ weather }) {
  const [unit, setUnit] = useState("C");

  const convertTemp = (temp) => {
    if (unit === "C") return temp;
    return (temp * 9) / 5 + 32;
  };

  const data =
    weather?.hourly?.time.map((t, i) => ({
      time: t,
      temp: convertTemp(weather.hourly.temperature_2m[i]),
      humidity: weather.hourly.relativehumidity_2m[i],
      rain: weather.hourly.precipitation[i],
    })) || [];

  return (
    <div>

      {/* 🔘 Toggle Button */}
      <div style={{ textAlign: "center", marginBottom: "10px" }}>
        <button onClick={() => setUnit(unit === "C" ? "F" : "C")}>
          Toggle °C / °F
        </button>
      </div>

      {/* 🌡️ Temperature Chart */}
      <div className="chart">
        <h2 style={{ color: "black" }}>Temperature</h2>
        <LineChart width={350} height={220} data={data}>
          <XAxis hide />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="temp" />
        </LineChart>
      </div>

      {/* 💧 Humidity Chart */}
      <div className="chart">
        <h2 style={{ color: "black" }}>Humidity</h2>
        <LineChart width={350} height={220} data={data}>
          <XAxis hide />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="humidity" />
        </LineChart>
      </div>

      {/* 🌧️ Rain Chart */}
      <div className="chart">
        <h2 style={{ color: "black" }}>Precipitation</h2>
        <LineChart width={350} height={220} data={data}>
          <XAxis hide />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="rain" />
        </LineChart>
      </div>

    </div>
  );
}

export default WeatherChart;