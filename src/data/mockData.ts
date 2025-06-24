import { Flight, Airport, CalendarDay } from '../types/flight';
import { format, addDays, isWeekend } from 'date-fns';

export const airports: Airport[] = [
  // Alabama
  { code: 'BHM', name: 'Birmingham-Shuttlesworth International', city: 'Birmingham, AL' },
  { code: 'HSV', name: 'Huntsville International', city: 'Huntsville, AL' },
  { code: 'MOB', name: 'Mobile Regional', city: 'Mobile, AL' },
  
  // Alaska
  { code: 'ANC', name: 'Ted Stevens Anchorage International', city: 'Anchorage, AK' },
  { code: 'FAI', name: 'Fairbanks International', city: 'Fairbanks, AK' },
  { code: 'JNU', name: 'Juneau International', city: 'Juneau, AK' },
  
  // Arizona
  { code: 'PHX', name: 'Phoenix Sky Harbor International', city: 'Phoenix, AZ' },
  { code: 'TUS', name: 'Tucson International', city: 'Tucson, AZ' },
  { code: 'FLG', name: 'Flagstaff Pulliam', city: 'Flagstaff, AZ' },
  
  // Arkansas
  { code: 'LIT', name: 'Bill and Hillary Clinton National', city: 'Little Rock, AR' },
  { code: 'XNA', name: 'Northwest Arkansas Regional', city: 'Bentonville, AR' },
  
  // California
  { code: 'LAX', name: 'Los Angeles International', city: 'Los Angeles, CA' },
  { code: 'SFO', name: 'San Francisco International', city: 'San Francisco, CA' },
  { code: 'SAN', name: 'San Diego International', city: 'San Diego, CA' },
  { code: 'SJC', name: 'Norman Y. Mineta San José International', city: 'San Jose, CA' },
  { code: 'OAK', name: 'Oakland International', city: 'Oakland, CA' },
  { code: 'BUR', name: 'Hollywood Burbank', city: 'Burbank, CA' },
  { code: 'LGB', name: 'Long Beach', city: 'Long Beach, CA' },
  { code: 'SMF', name: 'Sacramento International', city: 'Sacramento, CA' },
  
  // Colorado
  { code: 'DEN', name: 'Denver International', city: 'Denver, CO' },
  { code: 'COS', name: 'Colorado Springs', city: 'Colorado Springs, CO' },
  { code: 'ASE', name: 'Aspen/Pitkin County', city: 'Aspen, CO' },
  
  // Connecticut
  { code: 'BDL', name: 'Bradley International', city: 'Hartford, CT' },
  { code: 'HVN', name: 'Tweed-New Haven', city: 'New Haven, CT' },
  
  // Delaware
  { code: 'ILG', name: 'New Castle', city: 'Wilmington, DE' },
  
  // Florida
  { code: 'MIA', name: 'Miami International', city: 'Miami, FL' },
  { code: 'MCO', name: 'Orlando International', city: 'Orlando, FL' },
  { code: 'FLL', name: 'Fort Lauderdale-Hollywood International', city: 'Fort Lauderdale, FL' },
  { code: 'TPA', name: 'Tampa International', city: 'Tampa, FL' },
  { code: 'JAX', name: 'Jacksonville International', city: 'Jacksonville, FL' },
  { code: 'PBI', name: 'Palm Beach International', city: 'West Palm Beach, FL' },
  { code: 'RSW', name: 'Southwest Florida International', city: 'Fort Myers, FL' },
  { code: 'TLH', name: 'Tallahassee International', city: 'Tallahassee, FL' },
  
  // Georgia
  { code: 'ATL', name: 'Hartsfield-Jackson Atlanta International', city: 'Atlanta, GA' },
  { code: 'SAV', name: 'Savannah/Hilton Head International', city: 'Savannah, GA' },
  { code: 'AGS', name: 'Augusta Regional', city: 'Augusta, GA' },
  
  // Hawaii
  { code: 'HNL', name: 'Daniel K. Inouye International', city: 'Honolulu, HI' },
  { code: 'OGG', name: 'Kahului', city: 'Maui, HI' },
  { code: 'KOA', name: 'Ellison Onizuka Kona International', city: 'Kona, HI' },
  
  // Idaho
  { code: 'BOI', name: 'Boise Airport', city: 'Boise, ID' },
  { code: 'SUN', name: 'Friedman Memorial', city: 'Sun Valley, ID' },
  
  // Illinois
  { code: 'ORD', name: 'O\'Hare International', city: 'Chicago, IL' },
  { code: 'MDW', name: 'Midway International', city: 'Chicago, IL' },
  { code: 'PIA', name: 'General Downing-Peoria International', city: 'Peoria, IL' },
  
  // Indiana
  { code: 'IND', name: 'Indianapolis International', city: 'Indianapolis, IN' },
  { code: 'FWA', name: 'Fort Wayne International', city: 'Fort Wayne, IN' },
  { code: 'EVV', name: 'Evansville Regional', city: 'Evansville, IN' },
  
  // Iowa
  { code: 'DSM', name: 'Des Moines International', city: 'Des Moines, IA' },
  { code: 'CID', name: 'Eastern Iowa', city: 'Cedar Rapids, IA' },
  
  // Kansas
  { code: 'ICT', name: 'Wichita Dwight D. Eisenhower National', city: 'Wichita, KS' },
  { code: 'MCI', name: 'Kansas City International', city: 'Kansas City, KS' },
  
  // Kentucky
  { code: 'SDF', name: 'Louisville Muhammad Ali International', city: 'Louisville, KY' },
  { code: 'LEX', name: 'Blue Grass', city: 'Lexington, KY' },
  
  // Louisiana
  { code: 'MSY', name: 'Louis Armstrong New Orleans International', city: 'New Orleans, LA' },
  { code: 'BTR', name: 'Baton Rouge Metropolitan', city: 'Baton Rouge, LA' },
  { code: 'SHV', name: 'Shreveport Regional', city: 'Shreveport, LA' },
  
  // Maine
  { code: 'PWM', name: 'Portland International Jetport', city: 'Portland, ME' },
  { code: 'BGR', name: 'Bangor International', city: 'Bangor, ME' },
  
  // Maryland
  { code: 'BWI', name: 'Baltimore/Washington International Thurgood Marshall', city: 'Baltimore, MD' },
  { code: 'HGR', name: 'Hagerstown Regional', city: 'Hagerstown, MD' },
  
  // Massachusetts
  { code: 'BOS', name: 'Logan International', city: 'Boston, MA' },
  { code: 'ORH', name: 'Worcester Regional', city: 'Worcester, MA' },
  { code: 'MVY', name: 'Martha\'s Vineyard', city: 'Martha\'s Vineyard, MA' },
  
  // Michigan
  { code: 'DTW', name: 'Detroit Metropolitan Wayne County', city: 'Detroit, MI' },
  { code: 'GRR', name: 'Gerald R. Ford International', city: 'Grand Rapids, MI' },
  { code: 'FNT', name: 'Bishop International', city: 'Flint, MI' },
  
  // Minnesota
  { code: 'MSP', name: 'Minneapolis-Saint Paul International', city: 'Minneapolis, MN' },
  { code: 'DLH', name: 'Duluth International', city: 'Duluth, MN' },
  
  // Mississippi
  { code: 'JAN', name: 'Jackson-Medgar Wiley Evers International', city: 'Jackson, MS' },
  { code: 'GPT', name: 'Gulfport-Biloxi International', city: 'Gulfport, MS' },
  
  // Missouri
  { code: 'STL', name: 'Lambert-St. Louis International', city: 'St. Louis, MO' },
  { code: 'MKC', name: 'Kansas City International', city: 'Kansas City, MO' },
  { code: 'SGF', name: 'Springfield-Branson National', city: 'Springfield, MO' },
  
  // Montana
  { code: 'BIL', name: 'Billings Logan International', city: 'Billings, MT' },
  { code: 'MSO', name: 'Missoula Montana', city: 'Missoula, MT' },
  { code: 'GTF', name: 'Great Falls International', city: 'Great Falls, MT' },
  
  // Nebraska
  { code: 'OMA', name: 'Eppley Airfield', city: 'Omaha, NE' },
  { code: 'LNK', name: 'Lincoln Airport', city: 'Lincoln, NE' },
  
  // Nevada
  { code: 'LAS', name: 'Harry Reid International', city: 'Las Vegas, NV' },
  { code: 'RNO', name: 'Reno-Tahoe International', city: 'Reno, NV' },
  
  // New Hampshire
  { code: 'MHT', name: 'Manchester-Boston Regional', city: 'Manchester, NH' },
  
  // New Jersey
  { code: 'EWR', name: 'Newark Liberty International', city: 'Newark, NJ' },
  { code: 'TTN', name: 'Trenton-Mercer', city: 'Trenton, NJ' },
  { code: 'ACY', name: 'Atlantic City International', city: 'Atlantic City, NJ' },
  
  // New Mexico
  { code: 'ABQ', name: 'Albuquerque International Sunport', city: 'Albuquerque, NM' },
  { code: 'SAF', name: 'Santa Fe Regional', city: 'Santa Fe, NM' },
  
  // New York
  { code: 'JFK', name: 'John F. Kennedy International', city: 'New York, NY' },
  { code: 'LGA', name: 'LaGuardia', city: 'New York, NY' },
  { code: 'ALB', name: 'Albany International', city: 'Albany, NY' },
  { code: 'BUF', name: 'Buffalo Niagara International', city: 'Buffalo, NY' },
  { code: 'ROC', name: 'Greater Rochester International', city: 'Rochester, NY' },
  { code: 'SYR', name: 'Syracuse Hancock International', city: 'Syracuse, NY' },
  
  // North Carolina
  { code: 'CLT', name: 'Charlotte Douglas International', city: 'Charlotte, NC' },
  { code: 'RDU', name: 'Raleigh-Durham International', city: 'Raleigh, NC' },
  { code: 'GSO', name: 'Piedmont Triad International', city: 'Greensboro, NC' },
  { code: 'ILM', name: 'Wilmington International', city: 'Wilmington, NC' },
  
  // North Dakota
  { code: 'FAR', name: 'Hector International', city: 'Fargo, ND' },
  { code: 'BIS', name: 'Bismarck Municipal', city: 'Bismarck, ND' },
  
  // Ohio
  { code: 'CVG', name: 'Cincinnati/Northern Kentucky International', city: 'Cincinnati, OH' },
  { code: 'CLE', name: 'Cleveland Hopkins International', city: 'Cleveland, OH' },
  { code: 'CMH', name: 'John Glenn Columbus International', city: 'Columbus, OH' },
  { code: 'DAY', name: 'James M. Cox Dayton International', city: 'Dayton, OH' },
  
  // Oklahoma
  { code: 'OKC', name: 'Will Rogers World', city: 'Oklahoma City, OK' },
  { code: 'TUL', name: 'Tulsa International', city: 'Tulsa, OK' },
  
  // Oregon
  { code: 'PDX', name: 'Portland International', city: 'Portland, OR' },
  { code: 'EUG', name: 'Eugene', city: 'Eugene, OR' },
  { code: 'MFR', name: 'Rogue Valley International-Medford', city: 'Medford, OR' },
  
  // Pennsylvania
  { code: 'PHL', name: 'Philadelphia International', city: 'Philadelphia, PA' },
  { code: 'PIT', name: 'Pittsburgh International', city: 'Pittsburgh, PA' },
  { code: 'ABE', name: 'Lehigh Valley International', city: 'Allentown, PA' },
  { code: 'ERI', name: 'Erie International', city: 'Erie, PA' },
  
  // Rhode Island
  { code: 'PVD', name: 'Theodore Francis Green', city: 'Providence, RI' },
  
  // South Carolina
  { code: 'CHS', name: 'Charleston International', city: 'Charleston, SC' },
  { code: 'CAE', name: 'Columbia Metropolitan', city: 'Columbia, SC' },
  { code: 'GSP', name: 'Greenville-Spartanburg International', city: 'Greenville, SC' },
  { code: 'MYR', name: 'Myrtle Beach International', city: 'Myrtle Beach, SC' },
  
  // South Dakota
  { code: 'FSD', name: 'Joe Foss Field', city: 'Sioux Falls, SD' },
  { code: 'RAP', name: 'Rapid City Regional', city: 'Rapid City, SD' },
  
  // Tennessee
  { code: 'BNA', name: 'Nashville International', city: 'Nashville, TN' },
  { code: 'MEM', name: 'Memphis International', city: 'Memphis, TN' },
  { code: 'TYS', name: 'McGhee Tyson', city: 'Knoxville, TN' },
  { code: 'CHA', name: 'Chattanooga Metropolitan', city: 'Chattanooga, TN' },
  
  // Texas
  { code: 'DFW', name: 'Dallas/Fort Worth International', city: 'Dallas, TX' },
  { code: 'IAH', name: 'George Bush Intercontinental', city: 'Houston, TX' },
  { code: 'HOU', name: 'William P. Hobby', city: 'Houston, TX' },
  { code: 'AUS', name: 'Austin-Bergstrom International', city: 'Austin, TX' },
  { code: 'SAT', name: 'San Antonio International', city: 'San Antonio, TX' },
  { code: 'ELP', name: 'El Paso International', city: 'El Paso, TX' },
  { code: 'DAL', name: 'Dallas Love Field', city: 'Dallas, TX' },
  { code: 'LBB', name: 'Lubbock Preston Smith International', city: 'Lubbock, TX' },
  
  // Utah
  { code: 'SLC', name: 'Salt Lake City International', city: 'Salt Lake City, UT' },
  { code: 'SGU', name: 'St. George Regional', city: 'St. George, UT' },
  
  // Vermont
  { code: 'BTV', name: 'Burlington International', city: 'Burlington, VT' },
  
  // Virginia
  { code: 'DCA', name: 'Ronald Reagan Washington National', city: 'Washington, VA' },
  { code: 'IAD', name: 'Washington Dulles International', city: 'Washington, VA' },
  { code: 'ORF', name: 'Norfolk International', city: 'Norfolk, VA' },
  { code: 'RIC', name: 'Richmond International', city: 'Richmond, VA' },
  { code: 'ROA', name: 'Roanoke-Blacksburg Regional', city: 'Roanoke, VA' },
  
  // Washington
  { code: 'SEA', name: 'Seattle-Tacoma International', city: 'Seattle, WA' },
  { code: 'GEG', name: 'Spokane International', city: 'Spokane, WA' },
  { code: 'BLI', name: 'Bellingham International', city: 'Bellingham, WA' },
  
  // West Virginia
  { code: 'CRW', name: 'Charleston Yeager', city: 'Charleston, WV' },
  { code: 'HTS', name: 'Tri-State', city: 'Huntington, WV' },
  
  // Wisconsin
  { code: 'MKE', name: 'General Mitchell International', city: 'Milwaukee, WI' },
  { code: 'MSN', name: 'Dane County Regional', city: 'Madison, WI' },
  { code: 'GRB', name: 'Austin Straubel International', city: 'Green Bay, WI' },
  
  // Wyoming
  { code: 'CYS', name: 'Cheyenne Regional', city: 'Cheyenne, WY' },
  { code: 'JAC', name: 'Jackson Hole', city: 'Jackson, WY' },
  { code: 'COD', name: 'Yellowstone Regional', city: 'Cody, WY' },
];

export const flights: Flight[] = [
  {
    id: '1',
    airline: 'Delta Airlines',
    flightNumber: 'DL 2847',
    origin: 'JFK',
    destination: 'LAX',
    departureTime: '08:30',
    arrivalTime: '11:45',
    duration: '6h 15m',
    price: 285,
    stops: 0,
    aircraft: 'Boeing 737-800'
  },
  {
    id: '2',
    airline: 'American Airlines',
    flightNumber: 'AA 1205',
    origin: 'JFK',
    destination: 'LAX',
    departureTime: '14:20',
    arrivalTime: '17:30',
    duration: '6h 10m',
    price: 342,
    stops: 0,
    aircraft: 'Airbus A321'
  },
  {
    id: '3',
    airline: 'United Airlines',
    flightNumber: 'UA 445',
    origin: 'JFK',
    destination: 'LAX',
    departureTime: '19:15',
    arrivalTime: '22:40',
    duration: '6h 25m',
    price: 198,
    stops: 0,
    aircraft: 'Boeing 757-200'
  },
  {
    id: '4',
    airline: 'JetBlue Airways',
    flightNumber: 'B6 915',
    origin: 'JFK',
    destination: 'LAX',
    departureTime: '12:00',
    arrivalTime: '15:25',
    duration: '6h 25m',
    price: 256,
    stops: 0,
    aircraft: 'Airbus A320'
  },
  {
    id: '5',
    airline: 'Southwest Airlines',
    flightNumber: 'WN 2156',
    origin: 'JFK',
    destination: 'ORD',
    departureTime: '09:45',
    arrivalTime: '11:30',
    duration: '2h 45m',
    price: 156,
    stops: 0,
    aircraft: 'Boeing 737-700'
  },
  {
    id: '6',
    airline: 'Delta Airlines',
    flightNumber: 'DL 1842',
    origin: 'JFK',
    destination: 'ORD',
    departureTime: '16:10',
    arrivalTime: '17:55',
    duration: '2h 45m',
    price: 189,
    stops: 0,
    aircraft: 'Boeing 717-200'
  },
  {
    id: '7',
    airline: 'American Airlines',
    flightNumber: 'AA 3456',
    origin: 'ORD',
    destination: 'LAX',
    departureTime: '07:30',
    arrivalTime: '09:15',
    duration: '4h 45m',
    price: 235,
    stops: 0,
    aircraft: 'Boeing 737-800'
  },
  {
    id: '8',
    airline: 'United Airlines',
    flightNumber: 'UA 789',
    origin: 'ORD',
    destination: 'LAX',
    departureTime: '13:45',
    arrivalTime: '15:30',
    duration: '4h 45m',
    price: 287,
    stops: 0,
    aircraft: 'Boeing 767-300'
  },
  {
    id: '9',
    airline: 'Spirit Airlines',
    flightNumber: 'NK 612',
    origin: 'MIA',
    destination: 'JFK',
    departureTime: '06:20',
    arrivalTime: '09:10',
    duration: '2h 50m',
    price: 89,
    stops: 0,
    aircraft: 'Airbus A320'
  },
  {
    id: '10',
    airline: 'Delta Airlines',
    flightNumber: 'DL 1123',
    origin: 'MIA',
    destination: 'JFK',
    departureTime: '11:40',
    arrivalTime: '14:35',
    duration: '2h 55m',
    price: 178,
    stops: 0,
    aircraft: 'Boeing 737-900'
  },
  {
    id: '11',
    airline: 'Alaska Airlines',
    flightNumber: 'AS 234',
    origin: 'SEA',
    destination: 'SFO',
    departureTime: '10:15',
    arrivalTime: '12:30',
    duration: '2h 15m',
    price: 145,
    stops: 0,
    aircraft: 'Boeing 737-800'
  },
  {
    id: '12',
    airline: 'United Airlines',
    flightNumber: 'UA 567',
    origin: 'SEA',
    destination: 'SFO',
    departureTime: '15:30',
    arrivalTime: '17:45',
    duration: '2h 15m',
    price: 192,
    stops: 0,
    aircraft: 'Airbus A320'
  },
  {
    id: '13',
    airline: 'Frontier Airlines',
    flightNumber: 'F9 1888',
    origin: 'DEN',
    destination: 'LAS',
    departureTime: '08:00',
    arrivalTime: '08:45',
    duration: '1h 45m',
    price: 67,
    stops: 0,
    aircraft: 'Airbus A320'
  },
  {
    id: '14',
    airline: 'Southwest Airlines',
    flightNumber: 'WN 3421',
    origin: 'DEN',
    destination: 'LAS',
    departureTime: '17:25',
    arrivalTime: '18:10',
    duration: '1h 45m',
    price: 98,
    stops: 0,
    aircraft: 'Boeing 737-700'
  },
  {
    id: '15',
    airline: 'Delta Airlines',
    flightNumber: 'DL 2654',
    origin: 'ATL',
    destination: 'PHX',
    departureTime: '12:30',
    arrivalTime: '14:15',
    duration: '3h 45m',
    price: 234,
    stops: 0,
    aircraft: 'Boeing 757-200'
  },
  {
    id: '16',
    airline: 'American Airlines',
    flightNumber: 'AA 1567',
    origin: 'BOS',
    destination: 'MIA',
    departureTime: '09:15',
    arrivalTime: '12:45',
    duration: '3h 30m',
    price: 298,
    stops: 0,
    aircraft: 'Boeing 737-800'
  },
  {
    id: '17',
    airline: 'Southwest Airlines',
    flightNumber: 'WN 4521',
    origin: 'BOS',
    destination: 'MIA',
    departureTime: '14:30',
    arrivalTime: '18:00',
    duration: '3h 30m',
    price: 245,
    stops: 0,
    aircraft: 'Boeing 737-700'
  },
  {
    id: '18',
    airline: 'United Airlines',
    flightNumber: 'UA 892',
    origin: 'DFW',
    destination: 'SLC',
    departureTime: '11:20',
    arrivalTime: '12:45',
    duration: '2h 25m',
    price: 189,
    stops: 0,
    aircraft: 'Airbus A320'
  },
  {
    id: '19',
    airline: 'Delta Airlines',
    flightNumber: 'DL 3421',
    origin: 'DFW',
    destination: 'SLC',
    departureTime: '16:45',
    arrivalTime: '18:10',
    duration: '2h 25m',
    price: 215,
    stops: 0,
    aircraft: 'Boeing 737-900'
  },
  {
    id: '20',
    airline: 'JetBlue Airways',
    flightNumber: 'B6 1234',
    origin: 'BOS',
    destination: 'LAX',
    departureTime: '07:00',
    arrivalTime: '10:30',
    duration: '6h 30m',
    price: 325,
    stops: 0,
    aircraft: 'Airbus A321'
  }
];

// Generate calendar data for price visualization
export const generateCalendarData = (origin: string, destination: string, flightData: Flight[]): CalendarDay[] => {
  const calendarData: CalendarDay[] = [];
  const today = new Date();
  
  // Generate data for next 60 days
  for (let i = 0; i < 60; i++) {
    const date = addDays(today, i);
    const dateStr = format(date, 'yyyy-MM-dd');
    
    // Find flights for this route
    const routeFlights = flightData.filter(
      flight => flight.origin === origin && flight.destination === destination
    );
    
    if (routeFlights.length > 0) {
      // Generate realistic price variations
      const basePrice = Math.min(...routeFlights.map(f => f.price));
      const priceVariation = Math.random() * 0.4 + 0.8; // 80% to 120% of base price
      const weekendMultiplier = isWeekend(date) ? 1.2 : 1.0; // 20% higher on weekends
      const finalPrice = Math.round(basePrice * priceVariation * weekendMultiplier);
      
      // Create mock flights for this date
      const dayFlights = routeFlights.map(flight => ({
        ...flight,
        id: `${flight.id}-${dateStr}`,
        date: dateStr,
        price: Math.round(flight.price * priceVariation * weekendMultiplier),
      }));
      
      calendarData.push({
        date: dateStr,
        price: finalPrice,
        isWeekend: isWeekend(date),
        isToday: format(date, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd'),
        flights: dayFlights,
      });
    }
  }
  
  return calendarData;
};