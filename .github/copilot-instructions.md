# Weather App - Copilot Instructions

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview
This is a modern Weather App built with React and Vite that provides current weather information for cities worldwide.

## Key Features
- Real-time weather data display
- Interactive search functionality
- Favorite cities management
- Responsive design with glassmorphism UI
- Weather icons and animations
- Local storage for favorites persistence

## Architecture
- **Frontend**: React 18 with functional components and hooks
- **Build Tool**: Vite for fast development and building
- **Styling**: CSS with modern glassmorphism effects
- **State Management**: React useState and useEffect hooks
- **Data Storage**: Browser localStorage for favorites
- **API**: Mock weather service (ready for OpenWeatherMap API integration)

## Component Structure
- `App.jsx` - Main application component and state management
- `SearchBar.jsx` - Search input and quick city buttons
- `WeatherCard.jsx` - Weather information display card
- `WeatherService.js` - API service layer for weather data

## Styling Guidelines
- Use glassmorphism effects with backdrop-filter blur
- Maintain consistent spacing and border-radius
- Implement smooth transitions and hover effects
- Follow mobile-first responsive design
- Use the Inter font family for typography

## Development Notes
- The app currently uses mock data for demonstration
- To use real weather data, uncomment the API code in WeatherService.js and add an OpenWeatherMap API key
- All temperatures are converted from Kelvin to Celsius
- Wind speeds are converted from m/s to km/h
- Visibility is converted from meters to kilometers

## Code Conventions
- Use functional components with hooks
- Implement proper error handling and loading states
- Follow React best practices for state management
- Use semantic HTML and accessible markup
- Maintain consistent file and component naming
