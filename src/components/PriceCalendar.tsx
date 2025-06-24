import React, { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, isWeekend, addMonths, subMonths } from 'date-fns';
import { CalendarDay, Airport } from '../types/flight';

interface PriceCalendarProps {
  airports: Airport[];
  origin: string;
  destination: string;
  calendarData: CalendarDay[];
}

export const PriceCalendar: React.FC<PriceCalendarProps> = ({
  airports,
  origin,
  destination,
  calendarData,
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    nonStopOnly: false,
    weekendsOnly: false,
    maxPrice: 1000,
  });

  const getAirportName = (code: string) => {
    const airport = airports.find(a => a.code === code);
    return airport ? airport.city : code;
  };

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getPriceColor = (price: number) => {
    if (price === 0) return 'bg-gray-100 text-gray-400';
    if (price < 150) return 'bg-green-100 text-green-800 border-green-200';
    if (price < 250) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    if (price < 400) return 'bg-orange-100 text-orange-800 border-orange-200';
    return 'bg-red-100 text-red-800 border-red-200';
  };

  const getCalendarDayData = (date: Date): CalendarDay | null => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return calendarData.find(day => day.date === dateStr) || null;
  };

  const filteredCalendarData = calendarData.filter(day => {
    if (filters.nonStopOnly && day.flights.some(f => f.stops > 0)) return false;
    if (filters.weekendsOnly && !day.isWeekend) return false;
    if (day.price > filters.maxPrice) return false;
    return true;
  });

  const cheapestDay = filteredCalendarData.reduce((min, day) => 
    day.price > 0 && (min.price === 0 || day.price < min.price) ? day : min, 
    { price: 0, date: '' } as CalendarDay
  );

  if (!origin || !destination) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="text-center py-12">
          <Calendar className="mx-auto text-gray-400 mb-4" size={48} />
          <p className="text-gray-600 text-lg">
            Select your departure and destination to view price calendar
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div className="flex items-center gap-3 mb-4 md:mb-0">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <Calendar className="text-blue-600" size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Price Calendar</h2>
            <p className="text-sm text-gray-600">
              {getAirportName(origin)} → {getAirportName(destination)}
            </p>
          </div>
        </div>
        
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Filter size={16} />
          Filters
        </button>
      </div>

      {showFilters && (
        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <div className="grid md:grid-cols-3 gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={filters.nonStopOnly}
                onChange={(e) => setFilters({ ...filters, nonStopOnly: e.target.checked })}
                className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Non-stop only</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={filters.weekendsOnly}
                onChange={(e) => setFilters({ ...filters, weekendsOnly: e.target.checked })}
                className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Weekends only</span>
            </label>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Max Price: ${filters.maxPrice}</label>
              <input
                type="range"
                min="50"
                max="1000"
                step="25"
                value={filters.maxPrice}
                onChange={(e) => setFilters({ ...filters, maxPrice: parseInt(e.target.value) })}
                className="w-full"
              />
            </div>
          </div>
        </div>
      )}

      {cheapestDay.price > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-green-800">Best Deal Found!</h3>
              <p className="text-sm text-green-600">
                Cheapest flight on {format(new Date(cheapestDay.date), 'MMMM d, yyyy')}
              </p>
            </div>
            <div className="text-2xl font-bold text-green-600">
              ${cheapestDay.price}
            </div>
          </div>
        </div>
      )}

      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <h3 className="text-lg font-semibold text-gray-800">
            {format(currentMonth, 'MMMM yyyy')}
          </h3>
          <button
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-2 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center text-sm font-medium text-gray-600 py-2">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {monthDays.map(day => {
            const dayData = getCalendarDayData(day);
            const price = dayData?.price || 0;
            const hasFlights = dayData && dayData.flights.length > 0;
            
            return (
              <div
                key={day.toISOString()}
                className={`
                  relative p-3 rounded-lg border-2 transition-all cursor-pointer hover:scale-105
                  ${isSameMonth(day, currentMonth) ? '' : 'opacity-50'}
                  ${isToday(day) ? 'ring-2 ring-blue-500' : ''}
                  ${hasFlights ? getPriceColor(price) : 'bg-gray-50 border-gray-200'}
                `}
              >
                <div className="text-sm font-medium text-center">
                  {format(day, 'd')}
                </div>
                {hasFlights && (
                  <div className="text-xs font-bold text-center mt-1">
                    ${price}
                  </div>
                )}
                {isWeekend(day) && (
                  <div className="absolute top-1 right-1 w-2 h-2 bg-purple-400 rounded-full"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-100 border-2 border-green-200 rounded"></div>
          <span>Under $150</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-100 border-2 border-yellow-200 rounded"></div>
          <span>$150-$250</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-orange-100 border-2 border-orange-200 rounded"></div>
          <span>$250-$400</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-100 border-2 border-red-200 rounded"></div>
          <span>$400+</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-purple-400 rounded-full"></div>
          <span>Weekend</span>
        </div>
      </div>
    </div>
  );
};