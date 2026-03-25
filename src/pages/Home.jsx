import React, { useEffect, useState } from "react";
import { getWeather } from "../services/api";
import WeatherCard from "../components/WeatherCard";
import WeatherChart from "../components/WeatherChart";

function Home() {
  const [location, setLocation] = useState({
  lat: 28.6,
  lon: 77.2,
});
  const [weather, setWeather] = useState(null);

  // 📍 Location fetch
 useEffect(() => {
  navigator.geolocation.getCurrentPosition((pos) => {
    setLocation({
      lat: pos.coords.latitude,
      lon: pos.coords.longitude,
    });
  });
}, []);

  // 🌦 API call
  useEffect(() => {
    if (location) {
      getWeather(location.lat, location.lon).then((data) =>
        setWeather(data)
      );
    }
  }, [location]);

  // 🌄 Dynamic Background Function
  const getBackground = (code) => {
    if (code === 0)
      return "https://images.unsplash.com/photo-1502082553048-f009c37129b9"; // sunny

    if (code >= 1 && code <= 3)
      return "https://images.unsplash.com/photo-1499346030926-9a72daac6c63"; // cloudy

    if (code >= 51 && code <= 67)
      return "https://images.unsplash.com/photo-1501594907352-04cda38ebc29"; // rain

    if (code >= 71 && code <= 77)
      return "https://images.unsplash.com/photo-1608889175123-8ee362201f81"; // snow

    return "https://images.unsplash.com/photo-1501973801540-537f08ccae7b"; // default
  };

  const bgImage = weather
    ? getBackground(weather.current_weather.weathercode)
    : "";

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* 🌑 Overlay */}
      <div
        style={{
          background: "rgba(0,0,0,0.5)",
          minHeight: "100vh",
          padding: "20px",
          color: "white",
        }}
      >
        <h1 style={{ textAlign: "center" }}>Current Weather</h1>

        {weather ? (
          <>
            <WeatherCard weather={weather} />
            <WeatherChart weather={weather} />
          </>
        ) : (
          <h2 style={{ textAlign: "center" }}>
  🌤️ Fetching Weather...
</h2>
        )}
      </div>
    </div>
  );
}

export default Home;