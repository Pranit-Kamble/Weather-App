import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';
import Sun from './Images/sunny.png'
import Cloud from './Images/cartoon-comic-cloud-png.webp'
import Rain from './Images/rain.png'
import Snow from './Images/snowflake.png'
import Thunder from './Images/thunderstorm.png'

const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const getWeather = async () => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=5a59f3080e17d1c84712c813fc9bed21`);
      setWeather(response.data);
      setError(null);
    } catch (error) {
      console.log('Enter valid city name')
      // setError('City not found. Please enter a valid city name.');
    }
  };
  const closePopup = () => {
    setError(null);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent form submission
      getWeather();
    }
  };

// Helper function to get the appropriate weather icon based on the weather condition
const getWeatherIcon = (condition) => {
  switch (condition) {
    case 'Clear':
      return <img src={Sun} alt="" />
    ;
    case 'Clouds':
      return <img src={Cloud} alt="" />;
    case 'Rain':
      return <img src={Rain} alt="" />;
    case 'Snow':
      return <img src={Snow} alt="" />;
    case 'Thunderstorm':
      return <img src={Thunder} alt="" />;
    default:
      return null;
  }
};


  return (
    <div className="app">
      <div className="overlay"></div>
      <div className="content">
        <h1>Weather Now</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button onClick={getWeather}>Get Weather</button>
        </div>

        <AnimatePresence>
          {error && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="popup"
            >
              <p>{error}</p>
              <button onClick={closePopup}>OK</button>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {weather && (
            <motion.div
              key="weather"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="weather-container"
            >
              {getWeatherIcon(weather.weather[0].main)}
              <h2>{weather.name}, {weather.sys.country}</h2>
              <p>{weather.weather[0].description}</p>
              <div className="weather-details">
                <p>Temperature: {weather.main.temp} °C</p>
                <p>Humidity: {weather.main.humidity}%</p>
                <p>Wind Speed: {weather.wind.speed} m/s</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default App;
