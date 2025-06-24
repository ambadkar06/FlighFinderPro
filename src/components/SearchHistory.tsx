import React from 'react';
import { History, TrendingUp, Clock } from 'lucide-react';
import { SearchHistory as SearchHistoryType, Airport } from '../types/flight';

interface SearchHistoryProps {
  airports: Airport[];
  searchHistory: SearchHistoryType[];
  onSelectRoute: (origin: string, destination: string) => void;
}

export const SearchHistory: React.FC<SearchHistoryProps> = ({
  airports,
  searchHistory,
  onSelectRoute,
}) => {
  const getAirportName = (code: string) => {
    const airport = airports.find(a => a.code === code);
    return airport ? airport.city : code;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const sortedHistory = [...searchHistory].sort((a, b) => b.searchCount - a.searchCount);

  if (searchHistory.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
            <History className="text-gray-600" size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Search History</h2>
            <p className="text-sm text-gray-600">Your recent searches will appear here</p>
          </div>
        </div>
        <div className="text-center py-8">
          <Clock className="mx-auto text-gray-400 mb-4" size={48} />
          <p className="text-gray-600">No search history yet</p>
          <p className="text-sm text-gray-500">Start searching for flights to see your history</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
          <History className="text-indigo-600" size={20} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800">Search History</h2>
          <p className="text-sm text-gray-600">Quick access to your frequent routes</p>
        </div>
      </div>

      <div className="space-y-3">
        {sortedHistory.map((search) => (
          <div
            key={search.id}
            onClick={() => onSelectRoute(search.origin, search.destination)}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 cursor-pointer transition-colors group"
          >
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h3 className="font-semibold text-gray-800 group-hover:text-indigo-600">
                  {getAirportName(search.origin)} → {getAirportName(search.destination)}
                </h3>
                <div className="flex items-center gap-1 text-indigo-600">
                  <TrendingUp size={14} />
                  <span className="text-sm font-medium">{search.searchCount}</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                Last searched: {formatDate(search.lastSearched)}
              </p>
            </div>
            <div className="text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-sm font-medium">Search again</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};