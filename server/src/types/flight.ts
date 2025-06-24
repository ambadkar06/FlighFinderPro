export interface Flight {
  id: string;
  airline: string;
  flightNumber: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  stops: number;
  aircraft: string;
  date?: string;
  googleFlightsUrl?: string;
}

export interface Airport {
  code: string;
  name: string;
  city: string;
}

export interface FlightSearchParams {
  departure_id?: string;
  arrival_id?: string;
  outbound_date?: string;
  return_date?: string;
  type?: number; // 1 = Round trip, 2 = One way, 3 = Multi-city
  travel_class?: number; // 1 = Economy, 2 = Premium economy, 3 = Business, 4 = First
  adults?: number;
  children?: number;
  infants_in_seat?: number;
  infants_on_lap?: number;
  stops?: number; // 0 = Any number of stops, 1 = Nonstop only, 2 = 1 stop or fewer, 3 = 2 stops or fewer
  max_price?: number;
  currency?: string;
  deep_search?: boolean;
  sort_by?: number; // 1 = Top flights, 2 = Price, 3 = Departure time, 4 = Arrival time, 5 = Duration, 6 = Emissions
  [key: string]: any; // For any additional parameters
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  lowestPrice?: number;
}
