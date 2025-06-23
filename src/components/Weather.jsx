import { useState } from "react";

function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  const getWeather = async () => {
    if (!city) return;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("City not found");

      const data = await res.json();
      setWeather({
        name: data.name,
        temp: data.main.temp,
        humidity: data.main.humidity,
        forecast: data.weather[0].main,
        country: data.sys.country,
      });
    } catch (err) {
      setWeather({ error: err.message });
    }
  };

  const getFriendlyForecast = (apiValue) => {
  const map = {
    Clear: "Sunny ☀️",
    Clouds: "Cloudy ☁️",
    Rain: "Rainy 🌧️",
    Drizzle: "Drizzly 🌦️",
    Thunderstorm: "Stormy ⛈️",
    Snow: "Snowy ❄️",
    Mist: "Misty 🌫️",
    Fog: "Foggy 🌁",
    Haze: "Hazy 🌤️",
    Smoke: "Smoky 🚬",
    Dust: "Dusty 🏜️",
    Sand: "Sandy 🌪️",
    Ash: "Ashy 🌋",
    Squall: "Windy 💨",
    Tornado: "Tornado 🌪️"
  };

  return map[apiValue] || apiValue;
};

  return (
    <div className="card">
      <h1>Weather Dashboard</h1>
      <input
        type="text"
        placeholder="Enter city name..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={getWeather}>Get Weather</button>

      {weather && (
        <div className="result">
          {weather.error ? (
            <p>{weather.error}</p>
          ) : (
            <>
              <h2>
                {weather.name}, {weather.country}
              </h2>
              <p><strong>Temperature:</strong> {weather.temp}°C</p>
              <p><strong>Humidity:</strong> {weather.humidity}%</p>
              <p><strong>Forecast:</strong> {getFriendlyForecast(weather.forecast)}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Weather;
