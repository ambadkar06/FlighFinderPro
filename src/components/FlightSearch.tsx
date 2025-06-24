import React from 'react';
import { Search, ArrowRight } from 'lucide-react';
import { Airport } from '../types/flight';

interface FlightSearchProps {
  airports: Airport[];
  origin: string;
  destination: string;
  departureDate: string;
  onOriginChange: (origin: string) => void;
  onDestinationChange: (destination: string) => void;
  onDepartureDateChange: (date: string) => void;
  onSearch: () => void;
}

export const FlightSearch: React.FC<FlightSearchProps> = ({
  airports,
  origin,
  destination,
  onOriginChange,
  onDestinationChange,
  departureDate,
  onDepartureDateChange,
  onSearch,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Find Your Perfect Flight
      </h2>
      
      <div className="flex flex-col gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Departure Date
          </label>
          <input
            type="date"
            value={departureDate}
            onChange={(e) => onDepartureDateChange(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200 bg-white"
            min={new Date().toISOString().slice(0, 10)}
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4 items-end">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            From
          </label>
          <select
            value={origin}
            onChange={(e) => onOriginChange(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200 bg-white"
          >
            <option value="">Select departure city</option>
            {airports.map((airport) => (
              <option key={airport.code} value={airport.code}>
                {airport.city} ({airport.code})
              </option>
            ))}
          </select>
        </div>

        <div className="hidden md:flex items-center justify-center px-2">
          <ArrowRight className="text-sky-500" size={24} />
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            To
          </label>
          <select
            value={destination}
            onChange={(e) => onDestinationChange(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200 bg-white"
          >
            <option value="">Select destination city</option>
            {airports.map((airport) => (
              <option key={airport.code} value={airport.code}>
                {airport.city} ({airport.code})
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={onSearch}
          disabled={!origin || !destination || !departureDate}
          className="px-8 py-3 bg-sky-500 text-white rounded-lg font-semibold hover:bg-sky-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2 min-w-fit"
        >
          <Search size={20} />
          Search Flights
        </button>
      </div>
    </div>
  );
};