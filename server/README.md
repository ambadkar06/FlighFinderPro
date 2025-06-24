# FlightFinder Pro Backend

This is the backend server for FlightFinder Pro, providing real-time flight data using the SerpAPI Google Flights API integration.

## Setup Instructions

1. Install dependencies:
```bash
cd server
npm install
```

2. Create a `.env` file in the `server` directory with the following content:
```
# SerpAPI Key
SERPAPI_KEY=your_serpapi_key_here

# Server Port
PORT=3001
```

3. Get a SerpAPI key:
   - Register at [SerpAPI](https://serpapi.com/)
   - Copy your API key from the dashboard
   - Add it to the `.env` file

## Running the Server

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm run build
npm start
```

## API Endpoints

### Search for flights
```
GET /api/flights/search
```

Query parameters:
- `departure_id`: Departure airport code (e.g., "JFK")
- `arrival_id`: Arrival airport code (e.g., "LAX")
- `outbound_date`: Departure date (YYYY-MM-DD)
- `return_date`: Return date (YYYY-MM-DD) (for round trips)
- `type`: Trip type (1 = Round trip, 2 = One way, 3 = Multi-city)
- `travel_class`: Class type (1 = Economy, 2 = Premium economy, 3 = Business, 4 = First)
- `adults`: Number of adult passengers
- `stops`: Number of stops (0 = Any, 1 = Nonstop only)
- `deep_search`: Set to "true" for more accurate results (slower)

### Get flight prices for calendar view
```
GET /api/flights/prices
```

Uses the same parameters as the search endpoint.

### Track flight prices
```
POST /api/flights/track
```

Request body: Same parameters as search endpoint.

## Integration with Frontend

The frontend services in `src/services/flightApi.ts` are already configured to communicate with this backend server. The backend handles API key security and formats the flight data to match the application's interfaces.
