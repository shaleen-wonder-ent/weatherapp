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
}

export default WeatherService
