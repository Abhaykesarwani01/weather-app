import "./current-weather.css";
import { weatherCodeToIcon } from "../weatherCodeToIcon"; 

export const CurrentWeather = ({ data }) => {
  return (
    <div className="weather">
      <div className="top">
        <div>
          <p className="city">{data.city}</p>
          <p className="weather-description">Weather Code: {data.weathercode}</p>
        </div>
        
        <img
        alt="weather"
        className="weather-icon"
        src={`/icons/${weatherCodeToIcon[data.weathercode]}.png`}
        />
      </div>
      <div className="bottom">
        <p className="temperature">{Math.round(data.temperature)}°C</p>
        <div className="details">
          <div className="parameter-row">
            <span className="parameter-label top">Details</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Wind Speed</span>
            <span className="parameter-value">{data.windspeed} km/h</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Wind Direction</span>
            <span className="parameter-value">{data.winddirection}°</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Time</span>
            <span className="parameter-value">{data.time}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
