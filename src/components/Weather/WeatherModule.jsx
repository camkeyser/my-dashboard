import React, { useEffect, useState } from 'react';
import axios from 'axios';
import weatherIconMap from './Icons';
import fallbackIcon from '../../assets/weather-icons/wi-cloud.svg';
import './WeatherModule.scss';

// Get the weather icon
const getWeatherIcon = (code, isDay) => {
  const icon = weatherIconMap[code];
  if (icon) {
    return isDay ? icon.day : icon.night;
  }
  return fallbackIcon; // Fallback icon
};

const WeatherModule = ({ theme }) => {
  const [zipCode, setZipCode] = useState('');
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  // UPDATE THIS API KEI IN .env FILE
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

  // Check for stored ZIP code
  useEffect(() => {
    const storedZipCode = localStorage.getItem('zipCode');
    if (storedZipCode) {
      setZipCode(storedZipCode);
    }
  }, []);

  // Fetch weather data whenever the ZIP code changes
  useEffect(() => {
    if (!zipCode) return;

    setLoading(true);

    // Fetch current weather
    axios
      .get('https://api.weatherbit.io/v2.0/current', {
        params: {
          postal_code: zipCode,
          key: apiKey,
          units: 'I',
        },
      })
      .then((response) => {
        setCurrentWeather(response.data.data[0]);
      })
      .catch((error) => console.error('Error fetching current weather:', error));

    // Fetch 4-day forecast
    axios
      .get('https://api.weatherbit.io/v2.0/forecast/daily', {
        params: {
          postal_code: zipCode,
          key: apiKey,
          units: 'I',
          days: 5,
        },
      })
      .then((response) => {
        setForecast(response.data.data.slice(1, 5));
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching weather forecast:', error);
        setLoading(false);
      });
  }, [zipCode, apiKey]);

  const handleZipSubmit = (e) => {
    e.preventDefault();
    const inputZip = e.target.elements.zip.value;
    if (inputZip) {
      localStorage.setItem('zipCode', inputZip);
      setZipCode(inputZip);
    }
  };

  // If no ZIP code is stored, display the form
  if (!zipCode) {
    return (
      <div className={`weather-module weather-module--form weather-module--${theme}`}>
        <h2>Weather Forecast</h2>
        <form onSubmit={handleZipSubmit}>
          <label htmlFor="zip">Enter your ZIP code:</label>
          <input
            type="text"
            id="zip"
            name="zip"
            maxLength="5"
            pattern="\d{5}"
            required
            placeholder="e.g., 12345"
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }

  if (loading || !currentWeather || !forecast.length) {
    return (
      <div className={`weather-module weather-module--loading weather-module--${theme}`}>
        Loading weather...
      </div>
    );
  }

  return (
    <div className={`weather-module weather-module--${theme}`}>
      <div className="today-section">
        <h2>{`${currentWeather.city_name}, ${currentWeather.state_code}`}</h2>
        <div className="ls-weather">
          <p className="temp-bold">{Math.round(currentWeather.temp)}°F</p>
          <p>{currentWeather.weather.description}</p>
        </div>
        <img
          src={getWeatherIcon(currentWeather.weather.code, currentWeather.pod === 'd')}
          alt={currentWeather.weather.description}
        />
      </div>

      <div className="forecast-section">
        <h2>Forecast</h2>
        <div className="forecast-grid">
          {forecast.map((day, index) => (
            <div key={index} className="forecast-day">
              <p className="day-name">
                {new Date(day.datetime).toLocaleDateString('en-US', { weekday: 'short' })}
              </p>
              <img
                src={getWeatherIcon(day.weather.code, true)}
                alt={day.weather.description}
              />
              <p className="sub-data">{day.weather.description}</p>
              <div className="HL-flex">
                <p className="sub-data">{Math.round(day.high_temp)}°</p>
                <div className="HL-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="50px"
                    height="50px"
                    fill="#fff"
                    version="1.1"
                    x="0px"
                    y="0px"
                    viewBox="0 0 60 75"
                    style={{ marginBottom: '-15px' }}
                  >
                    <path d="M18.2196655,38.6699219h7.6098633c0.5522461,0,1-0.4472656,1-1V20h3.9702148  c0.3764648,0,0.7211914-0.2119141,0.8916016-0.546875c0.1704102-0.3359375,0.1381836-0.7392578-0.0844727-1.0429688l-8.7700195-12  C22.6488647,6.1523438,22.3490601,6,22.0302124,6c-0.0004883,0-0.0004883,0-0.0004883,0  c-0.3188477,0-0.6186523,0.1523438-0.8071289,0.4091797l-8.7797852,12c-0.222168,0.3046875-0.2548828,0.7070313-0.0844727,1.0429688  S12.8734741,20,13.249939,20h3.9697266v17.6699219C17.2196655,38.2226563,17.6674194,38.6699219,18.2196655,38.6699219z   M15.2206421,18l6.8085938-9.3056641L28.8305054,18h-3.0009766c-0.5522461,0-1,0.4472656-1,1v17.6699219h-5.6098633V19  c0-0.5527344-0.4477539-1-1-1H15.2206421z" />
                    <path d="M42.7894897,22.3300781c0-0.5527344-0.4477539-1-1-1h-7.6196289c-0.5522461,0-1,0.4472656-1,1V40H29.199646  c-0.3764648,0-0.7211914,0.2119141-0.8916016,0.5478516s-0.1376953,0.7382813,0.0844727,1.0429688l8.7802734,12  C37.3612671,53.8476563,37.6610718,54,37.9799194,54c0,0,0,0,0.0004883,0c0.3188477,0,0.6186523-0.1523438,0.8066406-0.4101563  l8.7700195-12c0.2226563-0.3037109,0.2548828-0.7070313,0.0844727-1.0429688C47.4711304,40.2119141,47.1264038,40,46.749939,40  h-3.9604492V22.3300781z M44.7807007,42l-6.8012695,9.3056641L31.1703491,42h2.9995117c0.5522461,0,1-0.4472656,1-1V23.3300781  h5.6196289V41c0,0.5527344,0.4477539,1,1,1H44.7807007z" />
                  </svg>
                </div>
                <p className="sub-data">{Math.round(day.low_temp)}°</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherModule;