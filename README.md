# Personal Dashboard Application

A highly interactive and customizable personal dashboard built with React, featuring drag-and-drop widgets, dark mode, and comprehensive testing.

##  Key Highlights

-  **19/19 Tests Passing** - Comprehensive test coverage with Jest & React Testing Library
-  **Fully Responsive** - 5 breakpoints (xxs to lg) with mobile-first design
-  **Dark Mode** - Persistent theme switching
-  **Drag & Drop** - Rearrangeable widgets with react-grid-layout
-  **State Persistence** - All preferences saved to localStorage
-  **Docker Ready** - Full containerization with Docker Compose
-  **Accessible** - WCAG-compliant with ARIA attributes
-  **Error Boundaries** - Graceful error handling

## Features

- **Customizable Widgets**: Weather, To-Do List, and Notes widgets
- **Drag & Drop**: Rearrange widgets with react-grid-layout
- **Responsive Design**: Mobile-first design that adapts to all screen sizes
- **Dark Mode**: Toggle between light and dark themes
- **State Persistence**: All preferences saved to localStorage via Zustand
- **Comprehensive Testing**: 80%+ test coverage with Jest and React Testing Library
- **Error Handling**: Graceful error boundaries and user-friendly error messages
- **Accessibility**: WCAG-compliant with keyboard navigation and ARIA attributes

## Tech Stack

- **React 19** - UI framework
- **Zustand** - State management with persistence
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **react-grid-layout** - Drag-and-drop grid system
- **Jest & React Testing Library** - Testing framework
- **Docker** - Containerization

## Setup Instructions

### Prerequisites

- Node.js 20+ and npm
- Docker and Docker Compose (for containerized deployment)

### Local Development

1. Clone the repository and navigate to the project:
```bash
cd my-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
copy .env.example .env
```

4. Start the development server:
```bash
npm run dev
```

5. Open http://localhost:5173 in the browser


## Docker Deployment

Build and run with Docker Compose:

```bash
docker-compose up --build -d
```

Access the application at http://localhost

Stop the container:
```bash
docker-compose down
```

## Testing

Run all tests:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

Generate coverage report:
```bash
npm run coverage
```

## Architecture

### Component Structure

```
src/
├── components/          # Reusable UI components
│   ├── DashboardGrid    # Grid layout wrapper
│   ├── WidgetWrapper    # Widget container with title/close
│   ├── ThemeSwitcher    # Theme toggle button
│   └── ErrorBoundary    # Error handling component
├── widgets/             # Widget implementations
│   ├── WeatherWidget    # Weather forecast display
│   ├── TodoWidget       # Task management
│   └── NotesWidget      # Note-taking
├── store/               # Zustand state stores
│   ├── dashboardStore   # Widget and layout state
│   └── themeStore       # Theme preferences
├── lib/                 # Utility functions
│   └── api.js           # API client
└── pages/               # Page components
    └── DashboardPage    # Main dashboard view
```

### State Management

**Zustand** is used for global state with two stores:

1. **dashboardStore**: Manages widgets, layouts, and widget data
   - Persists to localStorage
   - Handles CRUD operations for widgets
   - Manages responsive layouts for all breakpoints

2. **themeStore**: Manages light/dark theme preference
   - Persists to localStorage
   - Applies theme class to document root

### Responsive Breakpoints

- **lg**: 1200px+ (12 columns)
- **md**: 996px-1199px (10 columns)
- **sm**: 768px-995px (6 columns)
- **xs**: 480px-767px (4 columns)
- **xxs**: 0-479px (2 columns)

## Testing Strategy

### Unit Tests
- Component rendering and props
- User interactions (clicks, inputs)
- State updates
- Error handling

### Integration Tests
- Widget CRUD operations
- Layout persistence
- Theme switching
- API integration

### Coverage Targets
- Statements: 80%+
- Branches: 80%+
- Functions: 80%+
- Lines: 80%+

## Accessibility Features

- Semantic HTML5 elements throughout
- ARIA labels for all interactive elements
- Keyboard navigation support
- Focus management for modals and dropdowns
- Screen reader announcements for dynamic content (aria-live)
- Color contrast ratios meeting WCAG AA standards
- Accessible form validation with clear error messages

## API Configuration

### OpenWeatherMap API

1. Sign up at https://openweathermap.org/api
2. Get your free API key
3. Add to `.env`:
```
VITE_WEATHER_API_KEY=your_key_here
```

### Mock Data Fallback (Three-Tier Strategy)

The weather widget uses a smart fallback system when no API key is provided:

1. **Mock API Server** (Tier 1): Attempts to fetch from json-server at `http://localhost:3000`
   - Provides realistic, consistent data for 8+ cities
   - Start with: `json-server --watch db.json --port 3000`

2. **Generated Mock Data** (Tier 2): If mock server is unavailable, generates random realistic data
   - Temperature: 10-30°C
   - Conditions: Sunny, Cloudy, Rainy, Partly Cloudy, Overcast
   - Humidity: 60-90%
   - Wind Speed: 5-20 m/s

3. **Real API** (Tier 3): When `VITE_WEATHER_API_KEY` is provided, uses OpenWeatherMap API

This ensures the app always works, even without any configuration!

## Project Structure

```
my-dashboard/
├── src/
│   ├── components/      # Reusable components
│   ├── widgets/         # Widget implementations
│   ├── store/           # Zustand stores
│   ├── lib/             # Utilities
│   ├── pages/           # Page components
│   ├── __tests__/       # Test files
│   ├── App.jsx          # Root component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── public/              # Static assets
├── Dockerfile           # Docker configuration
├── docker-compose.yml   # Docker Compose setup
├── jest.config.cjs      # Jest configuration
├── babel.config.cjs     # Babel configuration
├── tailwind.config.js   # Tailwind configuration
├── vite.config.js       # Vite configuration
├── db.json              # Mock API data
└── package.json         # Dependencies

```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run coverage` - Generate coverage report
- `npm run lint` - Lint code

## Screenshots of output

<img width="640" height="360" alt="Screenshot 2026-02-12 193130" src="https://github.com/user-attachments/assets/13c43d7e-8ca2-48b1-b471-c2ff008a4f32" />

<img width="640" height="360" alt="Screenshot 2026-02-12 192958" src="https://github.com/user-attachments/assets/419cc5bf-657b-4d7b-8282-eafccba20047" />




## Future Enhancements

- Additional widget types (Calendar, RSS Feed, Stocks)
- Widget configuration modal
- Export/import dashboard layouts
- Multi-dashboard support
- Real-time data updates with WebSockets
- Collaborative dashboards
- Custom widget creation API
