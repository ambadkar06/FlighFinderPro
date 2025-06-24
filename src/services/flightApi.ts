import { Flight } from '../types/flight';

const API_BASE_URL = 'https://flightfinderpro-backend-1.onrender.com';

export interface FlightSearchParams {
  departure_id?: string;
  arrival_id?: string;
  outbound_date?: string;
  return_date?: string;
  type?: number; // 1 = Round trip, 2 = One way, 3 = Multi-city
  travel_class?: number; 
  adults?: number;
  children?: number;
  stops?: number;
  max_price?: number;
  sort_by?: number;
  deep_search?: boolean;
  [key: string]: any;
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Search for flights using the backend API
 */
export const searchFlights = async (params: FlightSearchParams): Promise<ApiResponse<Flight[]>> => {
  try {
    const queryParams = new URLSearchParams();
    
    // Add all parameters to query string
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, value.toString());
      }
    });

    
    const response = await fetch(`${API_BASE_URL}/api/flights/search?${queryParams.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API error (${response.status}):`, errorText);
      return {
        success: false,
        error: `Server error: ${response.status} ${response.statusText}`
      };
    }

    const result = await response.json();
    
    
    
    
    // Ensure we always return a consistent format
    return {
      success: result.success === false ? false : true,
      data: result.data || [],
      error: result.error || undefined
    };
  } catch (error) {
    console.error('Error in searchFlights:', error);
    return {
      success: false,
      data: [],
      error: error instanceof Error ? error.message : 'An unknown error occurred'
    };
  }
};

/**
 * Get flight prices for calendar view
 */
export const getFlightPrices = async (params: FlightSearchParams): Promise<ApiResponse<Flight[]>> => {
  try {
    const queryParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, value.toString());
      }
    });

    
    const response = await fetch(`${API_BASE_URL}/flights/prices?${queryParams.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API error (${response.status}):`, errorText);
      return {
        success: false,
        error: `Server error: ${response.status} ${response.statusText}`
      };
    }

    const result = await response.json();
    
    
   
    // Ensure we always return a consistent format
    return {
      success: result.success === false ? false : true,
      data: result.data || [],
      error: result.error || undefined
    };
  } catch (error) {
    console.error('Error in getFlightPrices:', error);
    return {
      success: false,
      data: [],
      error: error instanceof Error ? error.message : 'An unknown error occurred'
    };
  }
};

/**
 * Track flight prices
 */
export const trackFlightPrices = async (params: FlightSearchParams): Promise<ApiResponse<Flight[]>> => {
  try {
    
    const response = await fetch(`${API_BASE_URL}/flights/track`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API error (${response.status}):`, errorText);
      return {
        success: false,
        error: `Server error: ${response.status} ${response.statusText}`
      };
    }

    const result = await response.json();
    
    
    // Check if we got flight data
    if (result.data && Array.isArray(result.data)) {
      // Flight data received
    } else {
      // No flight data received
    }
    
    // Ensure we always return a consistent format
    return {
      success: result.success === false ? false : true,
      data: result.data || [],
      error: result.error || undefined
    };
  } catch (error) {
    console.error('Error in trackFlightPrices:', error);
    return {
      success: false,
      data: [],
      error: error instanceof Error ? error.message : 'An unknown error occurred'
    };
  }
};
