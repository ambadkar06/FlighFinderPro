import axios from 'axios';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const BASE_URL = 'https://serpapi.com/search';
const API_KEY = process.env.SERPAPI_KEY;

async function testFlightSearch() {
  try {
    
    // Set search parameters
    const params = {
      engine: 'google_flights',
      api_key: API_KEY,
      departure_id: 'JFK',
      arrival_id: 'LAX',
      outbound_date: '2025-07-20',
      adults: 1,
      type: 2, // One way
      deep_search: true // Use deep search for more accurate results
    };
    
    
    // Make the API request
    const response = await axios.get(BASE_URL, { params });
    
   
    // Check for flights_results
    if (response.data.flights_results) {
      if (response.data.flights_results.length > 0) {
        // Log structure of first flight
        const firstFlight = response.data.flights_results[0];
      }
    } 
    
  } catch (error: any) {
    if (error.response) {
     
    }
  }
}

// Run the test
testFlightSearch();
