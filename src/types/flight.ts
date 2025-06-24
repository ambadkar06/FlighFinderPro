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
  booking_token?: string;
}

export interface Airport {
  code: string;
  name: string;
  city: string;
}

export interface PriceAlert {
  id: string;
  origin: string;
  destination: string;
  targetPrice: number;
  currentPrice: number;
  isActive: boolean;
  createdAt: string;
  lastChecked: string;
  preferences: {
    nonStopOnly: boolean;
    weekendsOnly: boolean;
    maxStops: number;
  };
}

export interface SearchHistory {
  id: string;
  origin: string;
  destination: string;
  searchCount: number;
  lastSearched: string;
}

export interface CalendarDay {
  date: string;
  price: number;
  isWeekend: boolean;
  isToday: boolean;
  flights: Flight[];
}