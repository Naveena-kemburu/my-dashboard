// Use environment variables - Vite will replace import.meta.env at build time
const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const MOCK_API_URL = import.meta.env.VITE_MOCK_API_URL || 'http://localhost:3000';

export async function fetchWeatherData(city) {
  if (!city) throw new Error('City is required to fetch weather data.');

  // Check if we have a valid API key
  if (!WEATHER_API_KEY || WEATHER_API_KEY === 'YOUR_MOCK_KEY' || WEATHER_API_KEY === 'undefined') {
    console.warn('Using mock weather data. Provide VITE_WEATHER_API_KEY for real data.');
    
    // Try to fetch from mock API server (json-server)
    try {
      const response = await fetch(`${MOCK_API_URL}/weather?city=${city}`);
      if (!response.ok) throw new Error('Mock API error');
      const data = await response.json();
      
      // If data is an array, find matching city or return first item
      if (Array.isArray(data)) {
        const cityData = data.find(item => 
          item.city.toLowerCase() === city.toLowerCase()
        );
        if (cityData) return cityData;
        if (data.length > 0) return data[0];
      }
      
      // If data is an object, return it directly
      if (data && typeof data === 'object') return data;
      
      // Fallback if no valid data
      throw new Error('No valid data from mock API');
    } catch (mockError) {
      console.error('Failed to fetch from mock API:', mockError.message);
      console.info('Generating random mock weather data...');
      
      // Generate realistic mock data with a slight delay to simulate API call
      return new Promise(resolve => setTimeout(() => {
        const conditions = ['Sunny', 'Cloudy', 'Rainy', 'Partly Cloudy', 'Overcast'];
        const temperature = Math.floor(Math.random() * 20) + 10; // 10-30°C
        const condition = conditions[Math.floor(Math.random() * conditions.length)];
        
        resolve({
          city,
          temperature,
          condition,
          humidity: Math.floor(Math.random() * 30) + 60, // 60-90%
          windSpeed: Math.floor(Math.random() * 15) + 5  // 5-20 m/s
        });
      }, 800));
    }
  }

  // Use real OpenWeatherMap API
  console.info(`Fetching real weather data for ${city} from OpenWeatherMap API...`);
  console.info(`Using API key: ${WEATHER_API_KEY ? WEATHER_API_KEY.substring(0, 8) + '...' : 'NOT SET'}`);
  
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`);
    
    if (!response.ok) {
      const errorData = await response.json();
      
      // Handle specific error cases
      if (response.status === 404) {
        throw new Error(`City "${city}" not found. Try a larger nearby city or add country code (e.g., "London,UK")`);
      } else if (response.status === 401) {
        throw new Error('Invalid API key. Please check your configuration.');
      } else {
        throw new Error(errorData.message || `Failed to fetch weather data (Status: ${response.status})`);
      }
    }
    
    const data = await response.json();
    console.info(`Successfully fetched weather for ${data.name}`);
    
    return {
      city: data.name,
      temperature: Math.round(data.main.temp),
      condition: data.weather[0].main,
      humidity: data.main.humidity,
      windSpeed: Math.round(data.wind.speed)
    };
  } catch (error) {
    console.error("Error fetching weather:", error.message);
    throw error;
  }
}
