# Weather App

A modern, interactive weather application built with React and Vite that provides current weather information for cities worldwide.

## Features

- 🌤️ **Real-time Weather Data** - Get current weather conditions for any city
- 🔍 **Smart Search** - Search for cities with autocomplete suggestions
- ⭐ **Favorite Cities** - Save and quickly access your favorite locations
- 📱 **Responsive Design** - Beautiful UI that works on all devices
- 🎨 **Modern Interface** - Glassmorphism design with smooth animations
- 💾 **Persistent Storage** - Your favorites are saved locally

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser and visit:** `http://localhost:5173`

## Usage

1. **Search for a city** using the search bar or click on one of the quick search buttons
2. **View weather details** including temperature, humidity, wind speed, and more
3. **Add cities to favorites** by clicking the heart icon on weather cards
4. **Access favorites** quickly from the favorites section

## Tech Stack

- **React 18** - Modern JavaScript library for building user interfaces
- **Vite** - Fast build tool and development server
- **CSS3** - Advanced styling with glassmorphism effects
- **Lucide React** - Beautiful, customizable icons
- **Axios** - HTTP client for API requests

## Project Structure

```
src/
├── components/
│   ├── SearchBar.jsx     # Search input and quick city buttons
│   ├── SearchBar.css     # SearchBar styles
│   ├── WeatherCard.jsx   # Weather information display
│   └── WeatherCard.css   # WeatherCard styles
├── services/
│   └── WeatherService.js # Weather API service layer
├── App.jsx               # Main application component
├── App.css               # Main application styles
├── main.jsx              # Application entry point
└── index.css             # Global styles
```

## Features in Detail

### Weather Information
- Current temperature with color-coded display
- "Feels like" temperature
- Weather conditions with emoji icons
- Humidity and atmospheric pressure
- Wind speed and visibility
- Location with country code

### Interactive Elements
- Smooth hover animations
- Loading states with spinners
- Error handling with user-friendly messages
- Responsive design for mobile and desktop

### Data Persistence
- Favorite cities saved to localStorage
- Persistent across browser sessions
- Easy management of favorites list

## API Configuration

The app currently uses mock data for demonstration. To use real weather data:

1. Get a free API key from [OpenWeatherMap](https://openweathermap.org/api)
2. Uncomment the real API code in `src/services/WeatherService.js`
3. Replace `'demo_key'` with your actual API key
4. Consider using environment variables for the API key in production

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Browser Support

- Chrome/Edge 88+
- Firefox 78+
- Safari 14+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ using React and Vite
