/**
 * This file contains utility functions to adapt API responses
 * to match the frontend Flight interface format
 */

import { Flight } from '../types/flight';

/**
 * Convert SerpAPI flight data to our application's Flight format
 */
export function adaptSerpApiFlightData(apiData: any): Flight[] {
  
  if (!apiData) {
    return [];
  }
  
  
  let allFlights: any[] = [];
  let flightGroups: any[] = [];
  
  // Process best_flights
  if (apiData.best_flights && Array.isArray(apiData.best_flights)) {
    apiData.best_flights.forEach((flightGroup: any) => {
      if (flightGroup.flights && Array.isArray(flightGroup.flights)) {
        // Store flight group reference with each flight
        const flightsWithGroup = flightGroup.flights.map((flight: any) => ({
          ...flight,
          _flightGroup: flightGroup // Add reference to parent group
        }));
        allFlights = allFlights.concat(flightsWithGroup);
        flightGroups.push(flightGroup);
      }
    });
  }
  
  // Process other_flights
  if (apiData.other_flights && Array.isArray(apiData.other_flights)) {
    apiData.other_flights.forEach((flightGroup: any) => {
      if (flightGroup.flights && Array.isArray(flightGroup.flights)) {
        // Store flight group reference with each flight
        const flightsWithGroup = flightGroup.flights.map((flight: any) => ({
          ...flight,
          _flightGroup: flightGroup // Add reference to parent group
        }));
        allFlights = allFlights.concat(flightsWithGroup);
        flightGroups.push(flightGroup);
      }
    });
  }
  
  // If we still don't have flights, check for flights_results (fallback)
  if (allFlights.length === 0 && apiData.flights_results && Array.isArray(apiData.flights_results)) {
    allFlights = apiData.flights_results;
  }
  

  
  // Check if we have any flights to process
  if (allFlights.length === 0) {
    
    // Check for info message (might explain why no flights)
    if (apiData.info_message) {
    }
    
    // Check for other possible sections in the API response
    if (apiData.no_results_page) {
    }
    
    return [];
  }
  

  return allFlights.map((flight: any) => {
    // Get the reference to the parent flight group (if available)
    const flightGroup = flight._flightGroup;
    // Handle different response formats
    // For best_flights and other_flights structure
    const departure_airport = flight.departure_airport || {};
    const arrival_airport = flight.arrival_airport || {};
    const airline = flight.airline || {};
    
    // Create flight ID and number
    const flight_id = flight.id || `flight-${new Date().getTime()}-${Math.random().toString(36).substring(2, 9)}`;
    const flight_number = flight.flight_number || airline.flight_number || '';
    
    // Create departure and arrival info
    const departureTime = departure_airport.time || '';
    const arrivalTime = arrival_airport.time || '';
    
    // Calculate duration in friendly format from the duration property
    let durationStr = flight.duration || '';
    if (!durationStr && flight.duration_minutes) {
      const hours = Math.floor(flight.duration_minutes / 60);
      const minutes = flight.duration_minutes % 60;
      durationStr = `${hours}h ${minutes}m`;
    }
    
    // Extract price information
    let price = 0;
    try {
      // Try different price formats from SerpAPI
      if (typeof flight.price === 'string') {
        // Try to parse the price if it's a string like '$123'
        const priceMatch = /\$(\d+(\.\d+)?)/.exec(flight.price);
        price = priceMatch ? parseFloat(priceMatch[1]) : 0;
      } else if (typeof flight.price === 'number') {
        price = flight.price;
      } else if (flight.price_details && flight.price_details.total) {
        price = parseFloat(flight.price_details.total);
      }

      // If price is still zero or missing, try to get from flightGroup
      if ((!price || price === 0) && flightGroup && flightGroup.price) {
        if (typeof flightGroup.price === 'string') {
          const groupPriceMatch = /\$(\d+(\.\d+)?)/.exec(flightGroup.price);
          price = groupPriceMatch ? parseFloat(groupPriceMatch[1]) : Number(flightGroup.price) || 0;
        } else if (typeof flightGroup.price === 'number') {
          price = flightGroup.price;
        }
      }
      
      // Look for price in flight.source_information.price
      if ((!price || price === 0) && flight.source_information?.price) {
        if (typeof flight.source_information.price === 'string') {
          const priceMatch = /\$(\d+(\.\d+)?)/.exec(flight.source_information.price);
          price = priceMatch ? parseFloat(priceMatch[1]) : 0;
        } else if (typeof flight.source_information.price === 'number') {
          price = flight.source_information.price;
        }
      }
    } catch (error) {
      // Continue with price as 0
    }
    
    // Create Flight object matching our interface
    // Construct the most specific Google Flights deep link
    let googleFlightsUrl = '';
    const depCode = departure_airport.id || '';
    const arrCode = arrival_airport.id || '';
    const date = departureTime ? departureTime.split(' ')[0] : '';
    let tripType = 't:f'; // Default to one-way
    let urlFlt = '';
    let currency = 'USD';
    let travelClass = 'e:1'; // Economy
    let adults = 'sd:1';

    // Try to get round-trip info from flightGroup if available
    let returnDate = '';
    if (flightGroup && flightGroup.return_date) {
      returnDate = flightGroup.return_date;
      tripType = 't:r';
    } else if (flightGroup && flightGroup.type && flightGroup.type.toLowerCase().includes('round')) {
      // Sometimes type is a string like 'Round trip'
      tripType = 't:r';
      if (flightGroup.return_flights && Array.isArray(flightGroup.return_flights) && flightGroup.return_flights[0]?.departure_airport?.time) {
        returnDate = flightGroup.return_flights[0].departure_airport.time.split(' ')[0];
      }
    }

    // Try to get currency and travel class from flightGroup if available
    if (flightGroup && flightGroup.currency) {
      currency = flightGroup.currency;
    }
    if (flightGroup && flightGroup.travel_class) {
      // Map travel class string to Google Flights code
      switch (flightGroup.travel_class.toLowerCase()) {
        case 'economy': travelClass = 'e:1'; break;
        case 'premium economy': travelClass = 'e:2'; break;
        case 'business': travelClass = 'e:3'; break;
        case 'first': travelClass = 'e:4'; break;
      }
    }
    // Try to get number of adults
    if (flightGroup && flightGroup.adults) {
      adults = `sd:${flightGroup.adults}`;
    }

    if (depCode && arrCode && date) {
      if (tripType === 't:r' && returnDate) {
        // Round trip
        urlFlt = `${depCode}.${arrCode}.${date}*${arrCode}.${depCode}.${returnDate}`;
      } else {
        // One way
        urlFlt = `${depCode}.${arrCode}.${date}`;
      }
      googleFlightsUrl = `https://www.google.com/flights?hl=en#flt=${urlFlt};c:${currency};${travelClass};${adults};${tripType}`;
    }

    return {
      id: flight_id,
      airline: airline.name || flight.airline_name || '',
      flightNumber: flight_number,
      origin: departure_airport.id || departure_airport.name || '',
      destination: arrival_airport.id || arrival_airport.name || '',
      departureTime: departureTime,
      arrivalTime: arrivalTime,
      duration: durationStr,
      price: price,
      stops: flight.stops || 0,
      aircraft: flight.aircraft || '',
      date: date,
      googleFlightsUrl,
      booking_token: flight.booking_token || flightGroup?.booking_token || ''
    };



  });
}
