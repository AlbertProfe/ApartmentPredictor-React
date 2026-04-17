# Apartment Predictor - React

A React application for managing apartments and schools with interactive mapping features.

## Features

### Apartment Management
- Browse and filter apartments
- View apartment details
- Create, update, and delete apartments
- Interactive map view with Leaflet

### School Management
- **School Creation Form** (v6.1.1) - Create new schools with comprehensive information
  - Basic information: name, type (public/private/religious), location
  - Geographic coordinates: latitude and longitude (optional)
  - Rating system (1-5 stars)
  - Public access indicator
  - Client-side validation with inline error messages
  - Success/error feedback
  - Automatic data refresh after creation

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The application will start at `http://localhost:5173`

### Build

```bash
npm run build
```

## Project Structure

```
src/
├── apartment/          # Apartment components and features
├── school/            # School components and features
│   ├── SchoolCreate.jsx    # School creation form
│   ├── SchoolMap.jsx       # School map component
│   └── SchoolMapView.jsx   # School map view
├── middleware/        # API services and middleware
│   └── school/       # School API services
│       ├── schoolApiService.js
│       ├── schoolServiceHooks.jsx
│       └── schoolService.jsx
├── data/             # Data contexts
│   └── SchoolDataContext.jsx
├── components/       # Shared components
├── pages/           # Page components
└── App.jsx          # Main application component
```

## API Integration

The application integrates with a backend API for data management.

### School Endpoints

- **Create School**: `POST /api/schools`
  ```bash
  curl -X POST http://localhost:8080/api/schools \
    -H "Content-Type: application/json" \
    -d '{
      "name": "Oak High School",
      "type": "public",
      "location": "Downtown",
      "latitude": 40.7128,
      "longitude": -74.0060,
      "rating": 4,
      "public": true
    }'
  ```

- **Get All Schools**: `GET /api/schools`
  ```bash
  curl http://localhost:8080/api/schools
  ```

- **Get School by ID**: `GET /api/schools/{id}`
  ```bash
  curl http://localhost:8080/api/schools/1
  ```

- **Update School**: `POST /api/schools/update`
  ```bash
  curl -X POST http://localhost:8080/api/schools/update \
    -H "Content-Type: application/json" \
    -d '{
      "id": 1,
      "name": "Oak High School",
      "type": "public",
      "location": "Downtown",
      "rating": 5
    }'
  ```

- **Delete School**: `DELETE /api/schools/{id}`
  ```bash
  curl -X DELETE http://localhost:8080/api/schools/1
  ```

## Technologies

- **React** - UI framework
- **Vite** - Build tool and dev server
- **Axios** - HTTP client
- **Leaflet** - Interactive maps
- **React Router** - Navigation
- **ESLint** - Code linting

## React + Vite Setup

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.
