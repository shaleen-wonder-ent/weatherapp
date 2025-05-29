# Feature Request: Add Current Location Detection Button

## Summary
Add a "Detect My Location" button to automatically fetch weather data for the user's current geographical location using the browser's Geolocation API.

## Description
Currently, users need to manually search for their city to get weather information. Adding a location detection feature would improve user experience by allowing them to instantly get weather data for their current location with a single click.

## Proposed Implementation

### User Interface
- Add a "📍 Use My Location" button next to the search bar
- Show loading state while detecting location
- Display appropriate error messages if location access is denied or fails

### Technical Requirements
- Use the browser's `navigator.geolocation.getCurrentPosition()` API
- Implement reverse geocoding to get city name from coordinates
- Handle permission requests gracefully
- Add error handling for:
  - Location access denied
  - Location unavailable
  - Timeout errors
  - Browser compatibility issues

### Code Changes Needed
1. **SearchBar Component** (`src/components/SearchBar.jsx`)
   - Add location detection button
   - Implement geolocation logic
   - Handle loading and error states

2. **Weather Service** (`src/services/WeatherService.js`)
   - Add method to fetch weather by coordinates
   - Implement reverse geocoding functionality

3. **App Component** (`src/App.jsx`)
   - Handle location-based weather updates
   - Manage location detection state

## Acceptance Criteria
- [ ] Button is visible and accessible in the search bar area
- [ ] Clicking the button requests location permission
- [ ] Successfully detects user's coordinates
- [ ] Fetches and displays weather for detected location
- [ ] Shows loading indicator during detection
- [ ] Handles permission denied gracefully
- [ ] Works on both desktop and mobile browsers
- [ ] Maintains existing search functionality
- [ ] Updates favorites to include detected location option

## Benefits
- Improved user experience with one-click weather access
- Better mobile experience for location-aware weather
- Reduced friction for new users
- Modern web app functionality users expect

## Priority
**Medium** - Nice-to-have feature that enhances user experience

## Labels
- `enhancement`
- `feature request` 
- `UI/UX`
- `good first issue`

## Additional Context
This feature should integrate seamlessly with the existing search functionality and maintain the app's current glassmorphism design aesthetic. Consider adding an icon (like 📍 or 🎯) to make the button visually distinct from the search functionality.
