import { useState, useEffect } from 'react';
import { Plane, MapPin, Bell, Calendar, History } from 'lucide-react';
import { FlightSearch } from './components/FlightSearch';
import { FlightResults } from './components/FlightResults';
import { PriceTracker } from './components/PriceTracker';
import { PriceCalendar } from './components/PriceCalendar';
import { SearchHistory } from './components/SearchHistory';
import { airports, flights, generateCalendarData } from './data/mockData';
import { PriceAlert, SearchHistory as SearchHistoryType, CalendarDay } from './types/flight';

import { searchFlights } from './services/flightApi';
import { Flight } from './types/flight';

function App() {
  const [departureDate, setDepartureDate] = useState<string>('');
  const [origin, setOrigin] = useState<string>('');
  const [destination, setDestination] = useState<string>('');

  const [activeTab, setActiveTab] = useState<'search' | 'alerts' | 'calendar' | 'history'>('search');
  
  // Price Alerts State
  const [priceAlerts, setPriceAlerts] = useState<PriceAlert[]>([
    {
      id: '1',
      origin: 'JFK',
      destination: 'LAX',
      targetPrice: 250,
      currentPrice: 198,
      isActive: true,
      createdAt: '2025-01-15T10:00:00Z',
      lastChecked: '2025-01-15T14:30:00Z',
      preferences: {
        nonStopOnly: true,
        weekendsOnly: false,
        maxStops: 0,
      },
    },
    {
      id: '2',
      origin: 'BOS',
      destination: 'MIA',
      targetPrice: 280,
      currentPrice: 298,
      isActive: true,
      createdAt: '2025-01-14T15:20:00Z',
      lastChecked: '2025-01-15T14:30:00Z',
      preferences: {
        nonStopOnly: false,
        weekendsOnly: true,
        maxStops: 1,
      },
    },
  ]);

  // Search History State
  const [searchHistory, setSearchHistory] = useState<SearchHistoryType[]>([
    {
      id: '1',
      origin: 'JFK',
      destination: 'LAX',
      searchCount: 5,
      lastSearched: '2025-01-15T12:00:00Z',
    },
    {
      id: '2',
      origin: 'BOS',
      destination: 'MIA',
      searchCount: 3,
      lastSearched: '2025-01-14T16:30:00Z',
    },
    {
      id: '3',
      origin: 'ORD',
      destination: 'LAX',
      searchCount: 2,
      lastSearched: '2025-01-13T09:15:00Z',
    },
  ]);

  // Calendar Data State
  const [calendarData, setCalendarData] = useState<CalendarDay[]>([]);

  // Searched Flights State
  const [flights, setFlights] = useState<Flight[]>([]);

  // Generate calendar data when route changes
  useEffect(() => {
    if (origin && destination) {
      const data = generateCalendarData(origin, destination, flights);
      setCalendarData(data);
    }
  }, [origin, destination]);

  const handleSearch = async () => {
   
    if (origin && destination) {
      updateSearchHistory(origin, destination);

      // Call backend API
      try {
        const response = await searchFlights({
          departure_id: origin,
          arrival_id: destination,
          outbound_date: departureDate,
          type: 2, // One way
        });
        if (response.success && response.data) {
          setFlights(response.data);
        } else {
          setFlights([]);
        }
      } catch (err) {
        setFlights([]);
      }
    }
  };


  const updateSearchHistory = (searchOrigin: string, searchDestination: string) => {
    setSearchHistory(prev => {
      const existingSearch = prev.find(
        s => s.origin === searchOrigin && s.destination === searchDestination
      );

      if (existingSearch) {
        return prev.map(s =>
          s.id === existingSearch.id
            ? { ...s, searchCount: s.searchCount + 1, lastSearched: new Date().toISOString() }
            : s
        );
      } else {
        const newSearch: SearchHistoryType = {
          id: Date.now().toString(),
          origin: searchOrigin,
          destination: searchDestination,
          searchCount: 1,
          lastSearched: new Date().toISOString(),
        };
        return [newSearch, ...prev];
      }
    });
  };

  const handleAddAlert = (alert: Omit<PriceAlert, 'id' | 'createdAt' | 'lastChecked'>) => {
    const newAlert: PriceAlert = {
      ...alert,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      lastChecked: new Date().toISOString(),
      currentPrice: Math.floor(Math.random() * 400) + 100, // Mock current price
    };
    setPriceAlerts(prev => [newAlert, ...prev]);
  };

  const handleRemoveAlert = (id: string) => {
    setPriceAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  const handleToggleAlert = (id: string) => {
    setPriceAlerts(prev =>
      prev.map(alert =>
        alert.id === id ? { ...alert, isActive: !alert.isActive } : alert
      )
    );
  };

  const handleSelectRoute = (routeOrigin: string, routeDestination: string) => {
    setOrigin(routeOrigin);
    setDestination(routeDestination);
    setActiveTab('search');
  };

  const tabs = [
    { id: 'search', label: 'Search Flights', icon: Plane },
    { id: 'alerts', label: 'Price Alerts', icon: Bell },
    { id: 'calendar', label: 'Price Calendar', icon: Calendar },
    { id: 'history', label: 'Search History', icon: History },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-sky-500 rounded-lg flex items-center justify-center">
              <Plane className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">FlightFinder Pro</h1>
              <p className="text-sm text-gray-600">Smart flight tracking with price alerts & calendar insights</p>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Never Miss a <span className="text-sky-500">Great Deal</span>
          </h2>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            Track price drops, visualize cheapest travel days, and get personalized alerts 
            for your favorite routes. Smart flight search powered by your preferences.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-sky-500" />
              <span>200+ Destinations</span>
            </div>
            <div className="flex items-center gap-2">
              <Bell size={16} className="text-sky-500" />
              <span>Smart Price Alerts</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-sky-500" />
              <span>Calendar View</span>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="bg-white rounded-2xl shadow-lg p-2">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-sky-500 text-white shadow-md'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon size={18} />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {activeTab === 'search' && (
          <div className="space-y-8">
            <FlightSearch
              airports={airports}
              origin={origin}
              destination={destination}
              onOriginChange={setOrigin}
              onDestinationChange={setDestination}
              onSearch={handleSearch}
              departureDate={departureDate}
              onDepartureDateChange={setDepartureDate}
            />

            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <FlightResults
                flights={flights}
                airports={airports}
                origin={origin}
                destination={destination}
              />
            </div>
          </div>
        )}

        {activeTab === 'alerts' && (
          <PriceTracker
            airports={airports}
            alerts={priceAlerts}
            onAddAlert={handleAddAlert}
            onRemoveAlert={handleRemoveAlert}
            onToggleAlert={handleToggleAlert}
          />
        )}

        {activeTab === 'calendar' && (
          <PriceCalendar
            airports={airports}
            origin={origin}
            destination={destination}
            calendarData={calendarData}
          />
        )}

        {activeTab === 'history' && (
          <SearchHistory
            airports={airports}
            searchHistory={searchHistory}
            onSelectRoute={handleSelectRoute}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Plane size={20} />
            <span className="font-semibold">FlightFinder Pro</span>
          </div>
          <p className="text-gray-400">
            © 2025 FlightFinder Pro. Your intelligent flight tracking companion.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;