import { useState } from "react";

import "./App.css";
import { Search } from "./assets/components/search/Search";
import { CurrentWeather } from "./assets/components/current-weather/current-weather";
import { WEATHER_API_URL } from "./assets/components/api.jsx";
import { Forecast } from "./assets/components/forecast/forecast";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}?latitude=${lat}&longitude=${lon}&current_weather=true`
    );

    const forecastFetch = fetch(
      `${WEATHER_API_URL}?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,weathercode,precipitation_sum&timezone=auto`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        // Current weather
        setCurrentWeather({
          city: searchData.label,
          temperature: weatherResponse.current_weather.temperature,
          windspeed: weatherResponse.current_weather.windspeed,
          winddirection: weatherResponse.current_weather.winddirection,
          weathercode: weatherResponse.current_weather.weathercode,
          time: weatherResponse.current_weather.time,
        });

        // Forecast
        setForecast({
          city: searchData.label,
          time: forecastResponse.daily.time,
          temperature_2m_max: forecastResponse.daily.temperature_2m_max,
          temperature_2m_min: forecastResponse.daily.temperature_2m_min,
          weathercode: forecastResponse.daily.weathercode, // ✅ include this
          precipitation_sum: forecastResponse.daily.precipitation_sum,
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;
