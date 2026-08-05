import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChevronLeft, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function DrillDownChart({ filters }) {
  const [drillLevel, setDrillLevel] = useState('scheme');
  const [selectedItem, setSelectedItem] = useState(null);

  const getSchemeDataByFilters = () => {
    const allData = [
      { name: 'Shishu', loans: 42.3, amount: 8.45, fill: '#3b82f6' },
      { name: 'Kishore', loans: 6.8, amount: 15.67, fill: '#10b981' },
      { name: 'Tarun', loans: 1.02, amount: 9.77, fill: '#f59e0b' }
    ];
    
    if (filters?.scheme && filters.scheme !== 'all') {
      return allData.filter(s => s.name.toLowerCase() === filters.scheme.toLowerCase());
    }
    return allData;
  };
  
  const schemeData = getSchemeDataByFilters();

  const stateBreakdown = {
    'Shishu': [
      { name: 'UP', value: 8.5 },
      { name: 'MH', value: 7.2 },
      { name: 'TN', value: 6.8 },
      { name: 'WB', value: 6.1 },
      { name: 'Others', value: 13.7 }
    ],
    'Kishore': [
      { name: 'UP', value: 1.5 },
      { name: 'MH', value: 1.3 },
      { name: 'TN', value: 1.2 },
      { name: 'KA', value: 1.0 },
      { name: 'Others', value: 1.8 }
    ],
    'Tarun': [
      { name: 'MH', value: 0.25 },
      { name: 'KA', value: 0.22 },
      { name: 'TN', value: 0.18 },
      { name: 'DL', value: 0.15 },
      { name: 'Others', value: 0.22 }
    ]
  };

  const districtBreakdown = {
    'UP': [
      { name: 'Lucknow', value: 1.8 },
      { name: 'Kanpur', value: 1.5 },
      { name: 'Varanasi', value: 1.3 },
      { name: 'Agra', value: 1.2 },
      { name: 'Others', value: 2.7 }
    ],
    'MH': [
      { name: 'Mumbai', value: 1.5 },
      { name: 'Pune', value: 1.2 },
      { name: 'Nagpur', value: 0.9 },
      { name: 'Nashik', value: 0.8 },
      { name: 'Others', value: 2.8 }
    ],
    'TN': [
      { name: 'Chennai', value: 1.3 },
      { name: 'Coimbatore', value: 1.1 },
      { name: 'Madurai', value: 0.9 },
      { name: 'Salem', value: 0.7 },
      { name: 'Others', value: 2.8 }
    ]
  };

  const handleBarClick = (data) => {
    if (drillLevel === 'scheme') {
      setSelectedItem(data.name);
      setDrillLevel('state');
    } else if (drillLevel === 'state') {
      setSelectedItem(data.name);
      setDrillLevel('district');
    }
  };

  const handleBack = () => {
    if (drillLevel === 'district') {
      setDrillLevel('state');
    } else if (drillLevel === 'state') {
      setDrillLevel('scheme');
      setSelectedItem(null);
    }
  };

  const getCurrentData = () => {
    if (drillLevel === 'scheme') return schemeData;
    if (drillLevel === 'state') return stateBreakdown[selectedItem] || [];
    if (drillLevel === 'district') return districtBreakdown[selectedItem] || [];
    return [];
  };

  const getTitle = () => {
    if (drillLevel === 'scheme') return 'Scheme-wise Distribution (Click to drill-down)';
    if (drillLevel === 'state') return `${selectedItem} - State-wise Distribution`;
    if (drillLevel === 'district') return `${selectedItem} - District-wise Distribution`;
    return '';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-md p-4"
    >
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-base font-bold text-gray-800">{getTitle()}</h3>
        {drillLevel !== 'scheme' && (
          <Button
            onClick={handleBack}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <ChevronLeft size={16} />
            Back
          </Button>
        )}
      </div>

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
        <button
          onClick={() => {
            setDrillLevel('scheme');
            setSelectedItem(null);
          }}
          className={`hover:text-red-700 ${drillLevel === 'scheme' ? 'font-semibold text-red-700' : ''}`}
        >
          Schemes
        </button>
        {drillLevel !== 'scheme' && (
          <>
            <span>/</span>
            <button
              onClick={() => setDrillLevel('state')}
              className={`hover:text-red-700 ${drillLevel === 'state' ? 'font-semibold text-red-700' : ''}`}
            >
              {selectedItem}
            </button>
          </>
        )}
        {drillLevel === 'district' && (
          <>
            <span>/</span>
            <span className="font-semibold text-red-700">Districts</span>
          </>
        )}
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={getCurrentData()}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey={drillLevel === 'scheme' ? 'loans' : 'value'}
            fill="#3b82f6"
            onClick={handleBarClick}
            cursor="pointer"
            name={drillLevel === 'scheme' ? 'Loans (Cr)' : 'Value (Cr)'}
          />
        </BarChart>
      </ResponsiveContainer>

      {drillLevel === 'scheme' && (
        <div className="mt-4 text-center text-sm text-gray-500">
          💡 Click on any bar to see state-wise breakdown
        </div>
      )}
    </motion.div>
  );
}