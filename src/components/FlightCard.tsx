import React, { useState } from 'react';
import { Plane, Clock, MapPin, Star, X } from 'lucide-react';
import { Flight, Airport } from '../types/flight';

// BookNowButton: Fetches OTA/airline booking options and shows them in a modal
interface BookingRequest {
  url: string;
  post_data: string;
}

interface BookingOption {
  name: string;
  price: number;
  bookingRequest: BookingRequest;
}

const BookNowButton: React.FC<{ flight: Flight; isCheapest: boolean }> = ({ flight, isCheapest }) => {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [options, setOptions] = useState<BookingOption[]>([]);

  // This function creates and submits a form to handle the POST redirect
  const handleBook = (bookingRequest: BookingRequest) => {
    if (!bookingRequest || !bookingRequest.url || !bookingRequest.post_data) {
    
      alert('Could not process booking link.');
      return;
    }

    // The post_data is a string like 'key=value'. We need to parse it.
    const parts = bookingRequest.post_data.split('=');
    const key = parts[0];
    const value = parts.slice(1).join('=');

    const form = document.createElement('form');
    form.method = 'POST';
    form.action = bookingRequest.url;
    form.target = '_blank'; // Open in a new tab

    const postDataInput = document.createElement('input');
    postDataInput.type = 'hidden';
    postDataInput.name = key;
    postDataInput.value = value;

    form.appendChild(postDataInput);
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
  };

  const handleClick = async () => {
    if (!flight.booking_token) return;
    setShowModal(true);
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `/api/booking/options?booking_token=${encodeURIComponent(
          flight.booking_token
        )}&departure_id=${flight.origin}&arrival_id=${flight.destination}&outbound_date=${flight.date}`
      );
      const data = await res.json();
      if (data.success) {
        setOptions(data.options);
      } else {
        setError(data.error || 'Failed to fetch booking options');
      }
    } catch (err) {
      setError('Failed to fetch booking options');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        disabled={!flight.booking_token}
        className={`px-6 py-2 rounded-lg font-semibold transition-all duration-200 ${
          flight.booking_token
            ? isCheapest
              ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
              : 'bg-sky-500 hover:bg-sky-600 text-white'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        Book Now
      </button>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-6 min-w-[320px] max-w-[90vw] relative">
            <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-600" onClick={() => setShowModal(false)}>
              <X size={20} />
            </button>
            <h2 className="text-lg font-bold mb-2">Book with:</h2>
            {isLoading ? (
              <div className="py-8 text-center">Loading booking options...</div>
            ) : error ? (
              <div className="text-red-500">{error}</div>
            ) : options.length === 0 ? (
              <div className="py-8 text-center text-gray-500">No booking options found.</div>
            ) : (
              <ul className="space-y-3">
                {options.map((opt, i) => (
                  <li key={i} className="flex items-center justify-between gap-4 border-b pb-2 last:border-b-0">
                    <div>
                      <span className="font-semibold">{opt.name}</span>
                      <span className="ml-2 text-sky-700 font-bold">${opt.price}</span>
                    </div>
                    <button
                      onClick={() => handleBook(opt.bookingRequest)}
                      className="px-4 py-2 rounded bg-sky-500 text-white font-semibold hover:bg-sky-600 transition"
                    >
                      Book
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </>
  );
};

interface FlightCardProps {
  flight: Flight;
  airports: Airport[];
  isCheapest?: boolean;
}

export const FlightCard: React.FC<FlightCardProps> = ({ 
  flight, 
  airports, 
  isCheapest = false 
}) => {
  const getAirportName = (code: string) => {
    const airport = airports.find(a => a.code === code);
    return airport ? airport.city : code;
  };

  return (
    <div className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border-l-4 ${
      isCheapest ? 'border-emerald-500 bg-emerald-50' : 'border-sky-500'
    } relative overflow-hidden group`}>
      {isCheapest && (
        <div className="absolute top-0 right-0 bg-emerald-500 text-white px-3 py-1 text-xs font-bold rounded-bl-lg flex items-center gap-1">
          <Star size={12} fill="currentColor" />
          BEST DEAL
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center">
              <Plane className="text-sky-600" size={24} />
            </div>
            <div>
              <h3 className="font-bold text-gray-800">{flight.airline}</h3>
              <p className="text-sm text-gray-600">{flight.flightNumber}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="flex items-center gap-2">
              <MapPin className="text-gray-400" size={16} />
              <div>
                <p className="font-semibold text-gray-800">
                  {getAirportName(flight.origin)}
                </p>
                <p className="text-sm text-gray-600">{flight.departureTime}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="text-gray-400" size={16} />
              <div>
                <p className="font-semibold text-gray-800">
                  {getAirportName(flight.destination)}
                </p>
                <p className="text-sm text-gray-600">{flight.arrivalTime}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span>{flight.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <Plane size={14} />
              <span>{flight.aircraft}</span>
            </div>
            <div className="px-2 py-1 bg-gray-100 rounded-full text-xs">
              {flight.stops === 0 ? 'Non-stop' : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`}
            </div>
          </div>
        </div>

        <div className="text-center md:text-right">
          <div className={`text-3xl font-bold ${isCheapest ? 'text-emerald-600' : 'text-sky-600'} mb-2`}>
            ${flight.price}
          </div>
          <BookNowButton flight={flight} isCheapest={isCheapest} />
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-sky-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
};