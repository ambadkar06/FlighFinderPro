# FlighFinderPro
# FlightFinder Pro

A modern flight search and price tracking application that helps users find the best flight deals.

## Features

- **Flight Search**: Search for flights with flexible parameters including departure/arrival locations, dates, and travel class
- **Price Tracking**: Monitor flight prices over time to find the best deals
- **Calendar View**: View flight prices across different dates to find the cheapest options
- **Filters**: Filter search results by price, stops, airlines, and more
- **Responsive Design**: Works seamlessly across desktop and mobile devices

## Tech Stack

### Frontend
- React 18 with TypeScript
- Tailwind CSS for styling
- Vite for fast development and building
- Date-fns for date manipulation
- Lucide React for icons

### Backend
- Node.js with Express
- TypeScript
- Axios for API requests
- CORS for cross-origin resource sharing
- Dotenv for environment variable management

## Project Structure

```
├── src/                  # Frontend source code
│   ├── components/       # React components
│   ├── services/         # API services
│   ├── types/            # TypeScript type definitions
│   └── data/             # Mock data and constants
├── server/               # Backend source code
│   ├── src/              # Server source files
│   │   ├── services/     # Server-side services
│   │   └── utils/        # Utility functions
└── public/               # Static assets
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/ambadkar06/FlighFinderPro.git
   cd FlightFinder\ Pro
   ```

2. Install frontend dependencies
   ```bash
   npm install
   ```

3. Install backend dependencies
   ```bash
   cd server
   npm install
   cd ..
   ```

### Running the Application

1. Start the backend server
   ```bash
   cd server
   npm run dev
   ```

2. In a new terminal, start the frontend development server
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

### Building for Production

1. Build the frontend
   ```bash
   npm run build
   ```

2. Build the backend
   ```bash
   cd server
   npm run build
   ```

## API Integration

The application integrates with the SerpAPI Google Flights API to fetch real flight data. You'll need to set up your API key in the server's `.env` file:

```
SERPAPI_KEY=your_api_key_here
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Flight data provided by SerpAPI Google Flights API
- Icons from Lucide React
