import axios from 'axios'

const API_KEY = 'c7bd74aebb3f586d4facde54fa6b4934' // In production, this should be in environment variables
const BASE_URL = 'https://api.openweathermap.org/data/2.5'

class WeatherService {
  // Mock data for demo purposes
  static mockWeatherData = {
    'london': {
      coord: { lon: -0.1257, lat: 51.5085 },
      weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }],
      base: 'stations',
      main: { temp: 295.15, feels_like: 294.8, temp_min: 293.15, temp_max: 297.15, pressure: 1013, humidity: 65 },
      visibility: 10000,
      wind: { speed: 3.6, deg: 200 },
      clouds: { all: 0 },
      dt: 1574330400,
      sys: { type: 1, id: 1414, country: 'GB', sunrise: 1574318260, sunset: 1574351460 },
      timezone: 0,
      id: 2643743,
      name: 'London',
      cod: 200
    },
    'new york': {
      coord: { lon: -74.006, lat: 40.7143 },
      weather: [{ id: 801, main: 'Clouds', description: 'few clouds', icon: '02d' }],
      base: 'stations',
      main: { temp: 285.15, feels_like: 284.2, temp_min: 283.15, temp_max: 287.15, pressure: 1020, humidity: 58 },
      visibility: 16093,
      wind: { speed: 4.1, deg: 290 },
      clouds: { all: 20 },
      dt: 1574330400,
      sys: { type: 1, id: 4610, country: 'US', sunrise: 1574334180, sunset: 1574369700 },
      timezone: -18000,
      id: 5128581,
      name: 'New York',
      cod: 200
    },
    'tokyo': {
      coord: { lon: 139.6917, lat: 35.6895 },
      weather: [{ id: 500, main: 'Rain', description: 'light rain', icon: '10d' }],
      base: 'stations',
      main: { temp: 288.15, feels_like: 287.5, temp_min: 286.15, temp_max: 290.15, pressure: 1008, humidity: 72 },
      visibility: 10000,
      wind: { speed: 2.1, deg: 150 },
      clouds: { all: 75 },
      dt: 1574330400,
      sys: { type: 1, id: 8074, country: 'JP', sunrise: 1574289840, sunset: 1574326680 },
      timezone: 32400,
      id: 1850147,
      name: 'Tokyo',
      cod: 200
    },
    'paris': {
      coord: { lon: 2.3488, lat: 48.8534 },
      weather: [{ id: 803, main: 'Clouds', description: 'broken clouds', icon: '04d' }],
      base: 'stations',
      main: { temp: 290.15, feels_like: 289.8, temp_min: 288.15, temp_max: 292.15, pressure: 1015, humidity: 68 },
      visibility: 10000,
      wind: { speed: 2.6, deg: 240 },
      clouds: { all: 75 },
      dt: 1574330400,
      sys: { type: 1, id: 6550, country: 'FR', sunrise: 1574318940, sunset: 1574352240 },
      timezone: 3600,
      id: 2988507,
      name: 'Paris',
      cod: 200
    },
    'sydney': {
      coord: { lon: 151.2073, lat: -33.8678 },
      weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }],
      base: 'stations',
      main: { temp: 298.15, feels_like: 297.2, temp_min: 296.15, temp_max: 300.15, pressure: 1018, humidity: 55 },
      visibility: 10000,
      wind: { speed: 5.7, deg: 120 },
      clouds: { all: 0 },
      dt: 1574330400,
      sys: { type: 1, id: 9600, country: 'AU', sunrise: 1574283900, sunset: 1574332500 },
      timezone: 39600,
      id: 2147714,
      name: 'Sydney',
      cod: 200
    }
  }

  static async getWeatherByCity(city) {    try {
      // Using mock data for demo - uncomment real API section below when you have a valid key
      const normalizedCity = city.toLowerCase().trim()
      
      // Check if we have mock data for this city
      if (this.mockWeatherData[normalizedCity]) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Add some randomness to the temperature to make it feel more realistic
        const data = { ...this.mockWeatherData[normalizedCity] }
        const tempVariation = (Math.random() - 0.5) * 10 // ±5 degrees variation
        data.main.temp += tempVariation
        data.main.feels_like += tempVariation * 0.8
        
        return data
      }

      // For cities not in our mock data, generate realistic weather data
      const weatherConditions = [
        { main: 'Clear', description: 'clear sky', icon: '01d' },
        { main: 'Clouds', description: 'few clouds', icon: '02d' },
        { main: 'Clouds', description: 'scattered clouds', icon: '03d' },
        { main: 'Clouds', description: 'broken clouds', icon: '04d' },
        { main: 'Rain', description: 'light rain', icon: '10d' },
        { main: 'Rain', description: 'moderate rain', icon: '10d' }
      ]

      const randomWeather = weatherConditions[Math.floor(Math.random() * weatherConditions.length)]
      const baseTemp = 273.15 + (Math.random() * 30) // 0-30°C
      const humidity = 40 + Math.random() * 40 // 40-80%
      const pressure = 1000 + Math.random() * 30 // 1000-1030 hPa
      const windSpeed = Math.random() * 10 // 0-10 m/s

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))

      return {
        coord: { lon: 0, lat: 0 },
        weather: [randomWeather],
        base: 'stations',
        main: {
          temp: baseTemp,
          feels_like: baseTemp + (Math.random() - 0.5) * 3,
          temp_min: baseTemp - 2,
          temp_max: baseTemp + 3,
          pressure: Math.round(pressure),
          humidity: Math.round(humidity)
        },
        visibility: 10000,
        wind: { speed: windSpeed, deg: Math.random() * 360 },
        clouds: { all: Math.random() * 100 },
        dt: Date.now() / 1000,
        sys: { type: 1, id: 1, country: 'XX', sunrise: 0, sunset: 0 },
        timezone: 0,
        id: Date.now(),
        name: city.charAt(0).toUpperCase() + city.slice(1),
        cod: 200
      }

      // REAL API CODE - Uncomment when you have a valid API key
      /*
      const response = await axios.get(`${BASE_URL}/weather`, {
        params: {
          q: city,
          appid: API_KEY
        }
      })
      return response.data
      */
      
    } catch (error) {
      if (error.response?.status === 404) {
        throw new Error(`City "${city}" not found. Please check the spelling and try again.`)
      } else if (error.response?.status === 401) {
        throw new Error('Invalid API key. Please check your configuration.')
      } else {
        throw new Error('Unable to fetch weather data. Please try again later.')
      }
    }
  }

  // Get weather data by coordinates (for location detection)
  static async getCurrentLocationWeather() {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by this browser'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          try {
            // For now, use mock data based on coordinates
            // In production, this would call the API with lat/lon
            const weather = await this.getWeatherByCoordinates(latitude, longitude);
            resolve(weather);
          } catch (error) {
            reject(error);
          }
        },
        (error) => {
          let errorMessage = 'Unable to retrieve your location';
          
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = 'Location access denied by user';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = 'Location information is unavailable';
              break;
            case error.TIMEOUT:
              errorMessage = 'Location request timed out';
              break;
            default:
              errorMessage = 'An unknown error occurred';
              break;
          }
          
          reject(new Error(errorMessage));
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutes
        }
      );
    });
  }

  // Get weather by coordinates (latitude, longitude)
  static async getWeatherByCoordinates(lat, lon) {
    try {
      // For demo purposes, return mock data based on approximate location
      // In production, this would make an API call to OpenWeatherMap
      
      // Simple location matching based on coordinates
      if (lat > 50 && lat < 52 && lon > -1 && lon < 1) {
        // Approximate London area
        return this.mockWeatherData['london'];
      } else if (lat > 40 && lat < 41 && lon > -75 && lon < -73) {
        // Approximate New York area
        return this.mockWeatherData['new york'];
      } else if (lat > 35 && lat < 36 && lon > 139 && lon < 140) {
        // Approximate Tokyo area
        return this.mockWeatherData['tokyo'];
      } else {
        // Default to a generic location weather
        return {
          ...this.mockWeatherData['london'],
          name: 'Your Location',
          coord: { lat, lon }
        };
      }

      /* Production API call would be:
      const response = await axios.get(
        `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      return response.data;
      */
    } catch (error) {
      console.error('Error fetching weather by coordinates:', error);
      throw new Error('Failed to fetch weather data for your location');
    }

  }

  // Generate 5-day forecast data
  static async getForecastByCity(city) {
    try {
      // Using mock data for demo - similar approach to current weather
      const normalizedCity = city.toLowerCase().trim()
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800))
      
      // Generate realistic 5-day forecast
      const today = new Date()
      const forecast = []
      
      const weatherConditions = [
        { main: 'Clear', description: 'clear sky', icon: '01d' },
        { main: 'Clouds', description: 'few clouds', icon: '02d' },
        { main: 'Clouds', description: 'scattered clouds', icon: '03d' },
        { main: 'Clouds', description: 'broken clouds', icon: '04d' },
        { main: 'Rain', description: 'light rain', icon: '10d' },
        { main: 'Rain', description: 'moderate rain', icon: '10d' }
      ]

      for (let i = 1; i <= 5; i++) {
        const forecastDate = new Date(today)
        forecastDate.setDate(today.getDate() + i)
        
        const randomWeather = weatherConditions[Math.floor(Math.random() * weatherConditions.length)]
        const baseTemp = 273.15 + (Math.random() * 30) // 0-30°C
        const tempVariation = 5 // ±5 degrees for min/max
        
        forecast.push({
          dt: Math.floor(forecastDate.getTime() / 1000),
          dt_txt: forecastDate.toISOString().split('T')[0] + ' 12:00:00',
          main: {
            temp: baseTemp,
            temp_min: baseTemp - tempVariation,
            temp_max: baseTemp + tempVariation,
            humidity: 40 + Math.random() * 40
          },
          weather: [randomWeather],
          wind: { speed: Math.random() * 8 },
          clouds: { all: Math.random() * 100 }
        })
      }

      return {
        list: forecast,
        city: {
          name: city.charAt(0).toUpperCase() + city.slice(1),
          country: 'XX'
        }
      }

      /* Production API call would be:
      const response = await axios.get(`${BASE_URL}/forecast`, {
        params: {
          q: city,
          appid: API_KEY,
          cnt: 40 // 5 days * 8 (3-hour intervals)
        }
      })
      
      // Process the 5-day/3-hour forecast into daily data
      const dailyForecasts = this.processForecastData(response.data)
      return dailyForecasts
      */
      
    } catch (error) {
      if (error.response?.status === 404) {
        throw new Error(`Forecast for "${city}" not found. Please check the spelling and try again.`)
      } else if (error.response?.status === 401) {
        throw new Error('Invalid API key for forecast data.')
      } else {
        throw new Error('Unable to fetch forecast data. Please try again later.')
      }
    }
  }

  // Helper method to process 5-day/3-hour forecast into daily summaries
  static processForecastData(apiData) {
    const dailyData = {}
    
    apiData.list.forEach(item => {
      const date = item.dt_txt.split(' ')[0]
      
      if (!dailyData[date]) {
        dailyData[date] = {
          dt: item.dt,
          temps: [],
          weather: item.weather[0],
          humidity: item.main.humidity,
          wind: item.wind,
          clouds: item.clouds
        }
      }
      
      dailyData[date].temps.push(item.main.temp)
    })
    
    // Convert to array and calculate daily min/max
    return Object.keys(dailyData).slice(0, 5).map(date => {
      const day = dailyData[date]
      const temps = day.temps
      
      return {
        dt: day.dt,
        dt_txt: date + ' 12:00:00',
        main: {
          temp: temps.reduce((a, b) => a + b) / temps.length,
          temp_min: Math.min(...temps),
          temp_max: Math.max(...temps),
          humidity: day.humidity
        },
        weather: [day.weather],
        wind: day.wind,
        clouds: day.clouds
      }
    })
  }
}

=======
  }

  // Get 5-day forecast by city (real API integration)
  static async get5DayForecastByCity(city) {
    try {
      const response = await axios.get(`${BASE_URL}/forecast`, {
        params: {
          q: city,
          appid: API_KEY,
        },
      });
      const data = response.data;
      // Group by day
      const days = {};
      data.list.forEach(item => {
        const date = new Date(item.dt * 1000);
        const dayKey = date.toISOString().split('T')[0];
        if (!days[dayKey]) days[dayKey] = [];
        days[dayKey].push(item);
      });
      // Get today and next 5 days
      const todayKey = new Date().toISOString().split('T')[0];
      const dayKeys = Object.keys(days).filter(d => d > todayKey).slice(0, 5);
      const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const forecast = dayKeys.map(dayKey => {
        const entries = days[dayKey];
        // Get min/max temp, icon at midday, and description
        let tempMin = Number.POSITIVE_INFINITY;
        let tempMax = Number.NEGATIVE_INFINITY;
        let icon = entries[0].weather[0].icon;
        let description = entries[0].weather[0].description;
        let middayFound = false;
        entries.forEach(item => {
          if (item.main.temp_min < tempMin) tempMin = item.main.temp_min;
          if (item.main.temp_max > tempMax) tempMax = item.main.temp_max;
          // Prefer icon/desc at 12:00:00
          if (!middayFound && item.dt_txt.includes('12:00:00')) {
            icon = item.weather[0].icon;
            description = item.weather[0].description;
            middayFound = true;
          }
        });
        const date = new Date(dayKey);
        return {
          day: daysOfWeek[date.getDay()],
          icon,
          description,
          tempMax,
          tempMin,
        };
      });
      return forecast;
    } catch (error) {
      // fallback to mock if API fails
      return WeatherService.get5DayForecastByCity.mock(city);
    }
  }
  // fallback mock for forecast
  static async get5DayForecastByCity_mock(city) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Generate 5 days of mock forecast data
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date();
    const baseTemp = 273.15 + (Math.random() * 20 + 5); // 5-25°C
    const icons = ['01d','02d','03d','04d','10d','09d','13d','50d'];
    const descriptions = ['Clear sky','Few clouds','Scattered clouds','Broken clouds','Light rain','Showers','Snow','Mist'];
    const forecast = Array.from({ length: 5 }).map((_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() + i + 1);
      const tempMax = baseTemp + Math.random() * 5;
      const tempMin = baseTemp - 5 + Math.random() * 3;
      const iconIdx = Math.floor(Math.random() * icons.length);
      return {
        day: daysOfWeek[date.getDay()],
        icon: icons[iconIdx],
        description: descriptions[iconIdx],
        tempMax,
        tempMin,
      };
    });
    return forecast;
  }
}


export default WeatherService
