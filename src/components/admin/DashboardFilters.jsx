import React, { useState } from 'react';
import { Calendar, Filter, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function DashboardFilters({ onFilterChange, onRefresh, autoRefresh, setAutoRefresh }) {
  const [dateRange, setDateRange] = useState('30days');
  const [state, setState] = useState('all');
  const [scheme, setScheme] = useState('all');

  const handleFilterChange = (type, value) => {
    if (type === 'dateRange') setDateRange(value);
    if (type === 'state') setState(value);
    if (type === 'scheme') setScheme(value);
    
    onFilterChange({ dateRange, state, scheme, [type]: value });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-3 mb-4 border-2 border-gray-200">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <Filter className="text-red-700" size={20} />
          <span className="text-sm font-bold text-gray-800">Filters:</span>
        </div>

        {/* Date Range */}
        <select
          value={dateRange}
          onChange={(e) => handleFilterChange('dateRange', e.target.value)}
          className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <option value="today">Today</option>
          <option value="7days">Last 7 Days</option>
          <option value="30days">Last 30 Days</option>
          <option value="quarter">This Quarter</option>
          <option value="year">This Year</option>
          <option value="custom">Custom Range</option>
        </select>

        {/* State Filter */}
        <select
          value={state}
          onChange={(e) => handleFilterChange('state', e.target.value)}
          className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <option value="all">All States</option>
          <option value="UP">Uttar Pradesh</option>
          <option value="MH">Maharashtra</option>
          <option value="TN">Tamil Nadu</option>
          <option value="WB">West Bengal</option>
          <option value="KA">Karnataka</option>
          <option value="GJ">Gujarat</option>
        </select>

        {/* Scheme Filter */}
        <select
          value={scheme}
          onChange={(e) => handleFilterChange('scheme', e.target.value)}
          className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <option value="all">All Schemes</option>
          <option value="shishu">Shishu (up to ₹50K)</option>
          <option value="kishore">Kishore (₹50K-₹5L)</option>
          <option value="tarun">Tarun (₹5L-₹10L)</option>
          <option value="tarunplus">TarunPlus (₹10L-₹20L)</option>
        </select>

        {/* Auto Refresh */}
        <div className="ml-auto flex items-center gap-3">
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={autoRefresh}
              onChange={(e) => setAutoRefresh(e.target.checked)}
              className="rounded"
            />
            Auto-refresh (30s)
          </label>
          <Button
            onClick={onRefresh}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <RefreshCw size={16} />
            Refresh
          </Button>
        </div>
      </div>
    </div>
  );
}