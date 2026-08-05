import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter, X } from 'lucide-react';

const schemes = ['Shishu', 'Kishore', 'Tarun', 'TarunPlus'];
const states = [
  'Uttar Pradesh', 'Maharashtra', 'Tamil Nadu', 'West Bengal',
  'Karnataka', 'Gujarat', 'Rajasthan', 'Madhya Pradesh',
  'Andhra Pradesh', 'Telangana', 'Punjab', 'Haryana'
];

export default function DashboardFilters({ onFilterChange }) {
  const [dateFrom, setDateFrom] = useState('2025-04-01');
  const [dateTo, setDateTo] = useState('2026-01-28');
  const [selectedStates, setSelectedStates] = useState([]);
  const [selectedSchemes, setSelectedSchemes] = useState([]);
  const [showStateDropdown, setShowStateDropdown] = useState(false);
  const [showSchemeDropdown, setShowSchemeDropdown] = useState(false);

  const handleStateToggle = (state) => {
    const updated = selectedStates.includes(state)
      ? selectedStates.filter(s => s !== state)
      : [...selectedStates, state];
    setSelectedStates(updated);
    onFilterChange({ dateFrom, dateTo, states: updated, schemes: selectedSchemes });
  };

  const handleSchemeToggle = (scheme) => {
    const updated = selectedSchemes.includes(scheme)
      ? selectedSchemes.filter(s => s !== scheme)
      : [...selectedSchemes, scheme];
    setSelectedSchemes(updated);
    onFilterChange({ dateFrom, dateTo, states: selectedStates, schemes: updated });
  };

  const handleDateChange = (from, to) => {
    setDateFrom(from);
    setDateTo(to);
    onFilterChange({ dateFrom: from, dateTo: to, states: selectedStates, schemes: selectedSchemes });
  };

  const handleReset = () => {
    setDateFrom('2025-04-01');
    setDateTo('2026-01-28');
    setSelectedStates([]);
    setSelectedSchemes([]);
    onFilterChange({ dateFrom: '2025-04-01', dateTo: '2026-01-28', states: [], schemes: [] });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-lg p-6 mb-6"
    >
      <div className="flex items-center gap-2 mb-4">
        <Filter size={20} className="text-red-700" />
        <h3 className="text-lg font-bold text-gray-800">Filter Data</h3>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        {/* Date Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">From Date</label>
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => handleDateChange(e.target.value, dateTo)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-700"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">To Date</label>
          <input
            type="date"
            value={dateTo}
            onChange={(e) => handleDateChange(dateFrom, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-700"
          />
        </div>

        {/* States Dropdown */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">States</label>
          <button
            onClick={() => setShowStateDropdown(!showStateDropdown)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-left bg-white hover:border-red-700 focus:outline-none focus:border-red-700"
          >
            {selectedStates.length > 0 ? `${selectedStates.length} selected` : 'Select States'}
          </button>
          {showStateDropdown && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
              {states.map((state) => (
                <label key={state} className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedStates.includes(state)}
                    onChange={() => handleStateToggle(state)}
                    className="cursor-pointer"
                  />
                  <span className="text-sm text-gray-700">{state}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Schemes Dropdown */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">Schemes</label>
          <button
            onClick={() => setShowSchemeDropdown(!showSchemeDropdown)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-left bg-white hover:border-red-700 focus:outline-none focus:border-red-700"
          >
            {selectedSchemes.length > 0 ? `${selectedSchemes.length} selected` : 'Select Schemes'}
          </button>
          {showSchemeDropdown && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
              {schemes.map((scheme) => (
                <label key={scheme} className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedSchemes.includes(scheme)}
                    onChange={() => handleSchemeToggle(scheme)}
                    className="cursor-pointer"
                  />
                  <span className="text-sm text-gray-700">{scheme}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Selected Filters Display */}
      {(selectedStates.length > 0 || selectedSchemes.length > 0) && (
        <div className="mt-4 flex flex-wrap gap-2">
          {selectedStates.map((state) => (
            <div key={state} className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-2">
              {state}
              <button onClick={() => handleStateToggle(state)}>
                <X size={14} />
              </button>
            </div>
          ))}
          {selectedSchemes.map((scheme) => (
            <div key={scheme} className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-2">
              {scheme}
              <button onClick={() => handleSchemeToggle(scheme)}>
                <X size={14} />
              </button>
            </div>
          ))}
          <button
            onClick={handleReset}
            className="text-gray-600 hover:text-gray-800 text-xs font-medium underline"
          >
            Clear all
          </button>
        </div>
      )}
    </motion.div>
  );
}