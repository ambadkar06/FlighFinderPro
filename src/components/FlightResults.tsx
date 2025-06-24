import React from 'react';
import { FlightCard } from './FlightCard';
import { Flight, Airport } from '../types/flight';
import { AlertTriangle, Plane } from 'lucide-react';

interface FlightResultsProps {
  flights: Flight[];
  airports: Airport[];
  origin: string;
  destination: string;
}

export const FlightResults: React.FC<FlightResultsProps> = ({
  flights,
  airports,
  origin,
  destination,
}) => {
  if (!origin || !destination) {
    return (
      <div className="text-center py-12">
        <Plane className="mx-auto text-gray-400 mb-4" size={48} />
        <p className="text-gray-600 text-lg">
          Select your departure and destination cities to search for flights
        </p>
      </div>
    );
  }

  

  const availableFlights = flights;

  if (availableFlights.length === 0) {
    return (
      <div className="text-center py-12">
        <AlertTriangle className="mx-auto text-amber-400 mb-4" size={48} />
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          No flights found
        </h3>
        <p className="text-gray-600">
          No direct flights available for the selected route. Try different cities.
        </p>
      </div>
    );
  }

  const sortedFlights = [...availableFlights].sort((a, b) => a.price - b.price);
  const cheapestPrice = sortedFlights[0].price;

  const getAirportName = (code: string) => {
    const airport = airports.find(a => a.code === code);
    return airport ? airport.city : code;
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            {getAirportName(origin)} → {getAirportName(destination)}
          </h2>
          <p className="text-gray-600 mt-1">
            {availableFlights.length} flight{availableFlights.length !== 1 ? 's' : ''} found
          </p>
        </div>
        
        <div className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-lg text-sm font-semibold mt-4 md:mt-0">
          Best price: ${cheapestPrice}
        </div>
      </div>

      <div className="space-y-4">
        {sortedFlights.map((flight) => (
          <FlightCard
            key={flight.id}
            flight={flight}
            airports={airports}
            isCheapest={flight.price === cheapestPrice}
          />
        ))}
      </div>
    </div>
  );
};