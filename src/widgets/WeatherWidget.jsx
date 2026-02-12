import React, { useState, useEffect } from 'react';
import { fetchWeatherData } from '../lib/api';
import { useDashboardStore } from '../store/dashboardStore';

function WeatherWidget({ widgetId, data }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [city, setCity] = useState(data.city || 'London');
  const [inputCity, setInputCity] = useState(city);
  const updateWidgetData = useDashboardStore((state) => state.updateWidgetData);

  useEffect(() => {
    const loadWeather = async () => {
      setLoading(true);
      setError(null);
      try {
        const weatherData = await fetchWeatherData(city);
        setWeather(weatherData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadWeather();
  }, [city]);

  const handleCityChange = (e) => {
    e.preventDefault();
    if (inputCity.trim()) {
      setCity(inputCity.trim());
      updateWidgetData(widgetId, { city: inputCity.trim() });
    }
  };

  return (
    <div className="flex flex-col h-full">
      <form onSubmit={handleCityChange} className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputCity}
            onChange={(e) => setInputCity(e.target.value)}
            placeholder="Enter city"
            className="flex-1 px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            aria-label="City name"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            aria-label="Update weather"
          >
            Update
          </button>
        </div>
      </form>

      {loading && (
        <div className="flex items-center justify-center flex-1" role="status" aria-live="polite">
          <div className="text-gray-500 dark:text-gray-400">Loading weather data...</div>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg" role="alert">
          <p className="font-semibold">Error</p>
          <p>{error}</p>
        </div>
      )}

      {weather && !loading && (
        <div className="flex-1" aria-live="polite">
          <div className="text-center mb-4">
            <h4 className="text-2xl font-bold text-gray-900 dark:text-white">{weather.city}</h4>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <div className="text-3xl font-bold text-blue-500">{weather.temperature}°C</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Temperature</div>
            </div>
            <div className="text-center p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <div className="text-xl font-semibold text-gray-900 dark:text-white">{weather.condition}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Condition</div>
            </div>
            <div className="text-center p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <div className="text-xl font-semibold text-gray-900 dark:text-white">{weather.humidity}%</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Humidity</div>
            </div>
            <div className="text-center p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <div className="text-xl font-semibold text-gray-900 dark:text-white">{weather.windSpeed} m/s</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Wind Speed</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default WeatherWidget;
