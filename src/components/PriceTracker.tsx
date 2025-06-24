import React, { useState } from 'react';
import { Bell, Plus, Trash2, TrendingDown, TrendingUp, Settings } from 'lucide-react';
import { PriceAlert, Airport } from '../types/flight';

interface PriceTrackerProps {
  airports: Airport[];
  alerts: PriceAlert[];
  onAddAlert: (alert: Omit<PriceAlert, 'id' | 'createdAt' | 'lastChecked'>) => void;
  onRemoveAlert: (id: string) => void;
  onToggleAlert: (id: string) => void;
}

export const PriceTracker: React.FC<PriceTrackerProps> = ({
  airports,
  alerts,
  onAddAlert,
  onRemoveAlert,
  onToggleAlert,
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAlert, setNewAlert] = useState({
    origin: '',
    destination: '',
    targetPrice: 0,
    currentPrice: 0,
    isActive: true,
    preferences: {
      nonStopOnly: false,
      weekendsOnly: false,
      maxStops: 2,
    },
  });

  const getAirportName = (code: string) => {
    const airport = airports.find(a => a.code === code);
    return airport ? airport.city : code;
  };

  const handleAddAlert = () => {
    if (newAlert.origin && newAlert.destination && newAlert.targetPrice > 0) {
      onAddAlert(newAlert);
      setNewAlert({
        origin: '',
        destination: '',
        targetPrice: 0,
        currentPrice: 0,
        isActive: true,
        preferences: {
          nonStopOnly: false,
          weekendsOnly: false,
          maxStops: 2,
        },
      });
      setShowAddForm(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
            <Bell className="text-amber-600" size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Price Alerts</h2>
            <p className="text-sm text-gray-600">Track routes and get notified when prices drop</p>
          </div>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
        >
          <Plus size={16} />
          Add Alert
        </button>
      </div>

      {showAddForm && (
        <div className="bg-gray-50 rounded-xl p-6 mb-6">
          <h3 className="font-semibold text-gray-800 mb-4">Create Price Alert</h3>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
              <select
                value={newAlert.origin}
                onChange={(e) => setNewAlert({ ...newAlert, origin: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              >
                <option value="">Select origin</option>
                {airports.map((airport) => (
                  <option key={airport.code} value={airport.code}>
                    {airport.city} ({airport.code})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
              <select
                value={newAlert.destination}
                onChange={(e) => setNewAlert({ ...newAlert, destination: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              >
                <option value="">Select destination</option>
                {airports.map((airport) => (
                  <option key={airport.code} value={airport.code}>
                    {airport.city} ({airport.code})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Target Price</label>
              <input
                type="number"
                value={newAlert.targetPrice || ''}
                onChange={(e) => setNewAlert({ ...newAlert, targetPrice: parseInt(e.target.value) || 0 })}
                placeholder="e.g., 250"
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Max Stops</label>
              <select
                value={newAlert.preferences.maxStops}
                onChange={(e) => setNewAlert({
                  ...newAlert,
                  preferences: { ...newAlert.preferences, maxStops: parseInt(e.target.value) }
                })}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              >
                <option value={0}>Non-stop only</option>
                <option value={1}>Up to 1 stop</option>
                <option value={2}>Up to 2 stops</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={newAlert.preferences.weekendsOnly}
                onChange={(e) => setNewAlert({
                  ...newAlert,
                  preferences: { ...newAlert.preferences, weekendsOnly: e.target.checked }
                })}
                className="rounded border-gray-300 text-amber-500 focus:ring-amber-500"
              />
              <span className="text-sm text-gray-700">Weekends only</span>
            </label>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleAddAlert}
              className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
            >
              Create Alert
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {alerts.length === 0 ? (
          <div className="text-center py-8">
            <Bell className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-gray-600">No price alerts set up yet</p>
            <p className="text-sm text-gray-500">Create an alert to track price drops on your favorite routes</p>
          </div>
        ) : (
          alerts.map((alert) => (
            <div
              key={alert.id}
              className={`border rounded-xl p-4 transition-all ${
                alert.isActive ? 'border-amber-200 bg-amber-50' : 'border-gray-200 bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-gray-800">
                      {getAirportName(alert.origin)} → {getAirportName(alert.destination)}
                    </h3>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      alert.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {alert.isActive ? 'Active' : 'Paused'}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                    <span>Target: ${alert.targetPrice}</span>
                    <span>Current: ${alert.currentPrice}</span>
                    <div className="flex items-center gap-1">
                      {alert.currentPrice <= alert.targetPrice ? (
                        <TrendingDown className="text-green-500" size={14} />
                      ) : (
                        <TrendingUp className="text-red-500" size={14} />
                      )}
                      <span className={alert.currentPrice <= alert.targetPrice ? 'text-green-600' : 'text-red-600'}>
                        {alert.currentPrice <= alert.targetPrice ? 'Below target!' : 'Above target'}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 text-xs">
                    {alert.preferences.nonStopOnly && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full">Non-stop only</span>
                    )}
                    {alert.preferences.weekendsOnly && (
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full">Weekends only</span>
                    )}
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
                      Max {alert.preferences.maxStops} stops
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onToggleAlert(alert.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      alert.isActive 
                        ? 'bg-amber-100 text-amber-600 hover:bg-amber-200' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <Settings size={16} />
                  </button>
                  <button
                    onClick={() => onRemoveAlert(alert.id)}
                    className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};