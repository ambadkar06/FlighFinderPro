import axios from 'axios';
import { FlightSearchParams, Flight, ApiResponse } from '../types/flight';
import { adaptSerpApiFlightData } from '../utils/flightAdapter';
import dotenv from 'dotenv';

// Load environment variables directly in this file for safety
dotenv.config();

const BASE_URL = 'https://serpapi.com/search';

/**
 * Service for handling flight data operations
 */
export class FlightService {
  private apiKey: string;

  constructor() {
    // Get API key from environment variables or use a placeholder for development
    const apiKey = process.env.SERPAPI_KEY;
    
    if (!apiKey) {
      this.apiKey = 'missing-api-key';
    } else {
      this.apiKey = apiKey;
    }
  }

  /**
   * Search for flights using the Google Flights API via SerpAPI
   * @param params Flight search parameters
   * @returns Search results
   */
  async searchFlights(params: FlightSearchParams): Promise<ApiResponse<Flight[]>> {
    try {
      // Create query parameters object
      const queryParams = {
        engine: 'google_flights',
        api_key: this.apiKey,
        ...params
      };

  

      // Make the API request
      const response = await axios.get(BASE_URL, { params: queryParams });
     
      
      
      // Convert the SerpAPI response to our Flight format
      const flights = adaptSerpApiFlightData(response.data);
      
      
      
      const lowestPrice = response.data.price_insights?.lowest_price || 0;
return {
  success: true,
  data: flights,
  lowestPrice
};
    } catch (error: any) {
      
      return {
        success: false,
        error: error.response?.data?.error || error.message || 'Failed to fetch flight data'
      };
    }
  }

  /**
   * Fetch flight prices for a specific date range
   * @param params Parameters for fetching flight prices
   * @returns Flight price data
   */
  async getFlightPrices(params: FlightSearchParams): Promise<ApiResponse<Flight[]>> {
    try {
      // Add calendar view specific parameters if needed
      const queryParams = {
        engine: 'google_flights',
        api_key: this.apiKey,
        currency: 'USD',
        ...params
      };

      // Make the API request
      const response = await axios.get(BASE_URL, { params: queryParams });
      
      // Convert the SerpAPI response to our Flight format
      const flights = adaptSerpApiFlightData(response.data);
      
      return {
        success: true,
        data: flights
      };
    } catch (error: any) {
      
      return {
        success: false,
        error: error.response?.data?.error || error.message || 'Failed to fetch flight price data'
      };
    }
  }
  
  /**
   * Track prices for a specific flight route
   * @param params Flight parameters to track
   * @returns Latest price data
   */
  async trackFlightPrices(params: FlightSearchParams): Promise<ApiResponse<Flight[]>> {
    // In a real implementation, this might store the search in a database
    // and check periodically for price changes
    try {
      // Get the latest flight data
      const result = await this.searchFlights(params);
      
      // In a production app, you would store this search in a database
  
      
      return result;
    } catch (error: any) {
      
      return {
        success: false,
        error: error.message || 'Failed to track flight prices'
      };
    }
  }
}
