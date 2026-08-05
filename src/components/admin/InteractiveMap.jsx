import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function InteractiveMap({ onStateClick, filters }) {
  const [selectedState, setSelectedState] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [viewMetric, setViewMetric] = useState('loans');

  const stateData = {
    'UP': { name: 'Uttar Pradesh', loans: '12.5 Cr', amount: '₹8.4 L Cr', women: 72, growth: '+18%' },
    'MH': { name: 'Maharashtra', loans: '9.8 Cr', amount: '₹7.2 L Cr', women: 69, growth: '+22%' },
    'TN': { name: 'Tamil Nadu', loans: '8.5 Cr', amount: '₹6.5 L Cr', women: 74, growth: '+15%' },
    'WB': { name: 'West Bengal', loans: '7.3 Cr', amount: '₹5.8 L Cr', women: 76, growth: '+19%' },
    'KA': { name: 'Karnataka', loans: '6.7 Cr', amount: '₹5.2 L Cr', women: 70, growth: '+16%' },
    'GJ': { name: 'Gujarat', loans: '5.8 Cr', amount: '₹4.5 L Cr', women: 67, growth: '+20%' },
    'RJ': { name: 'Rajasthan', loans: '5.2 Cr', amount: '₹4.0 L Cr', women: 65, growth: '+14%' },
    'AP': { name: 'Andhra Pradesh', loans: '4.8 Cr', amount: '₹3.8 L Cr', women: 71, growth: '+17%' }
  };

  const districtData = {
    'UP': [
      { name: 'Lucknow', loans: '2.1 Cr', amount: '₹1.4 L Cr' },
      { name: 'Kanpur', loans: '1.8 Cr', amount: '₹1.2 L Cr' },
      { name: 'Varanasi', loans: '1.5 Cr', amount: '₹1.0 L Cr' },
      { name: 'Agra', loans: '1.3 Cr', amount: '₹0.9 L Cr' },
      { name: 'Others', loans: '5.8 Cr', amount: '₹3.9 L Cr' }
    ]
  };

  const handleStateClick = (stateCode) => {
    setSelectedState(stateCode);
    setShowDetails(true);
    if (onStateClick) onStateClick(stateCode);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-base font-bold text-gray-800">Interactive India Map - State-wise Distribution</h3>
        <select
          value={viewMetric}
          onChange={(e) => setViewMetric(e.target.value)}
          className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <option value="loans">View by Loans</option>
          <option value="amount">View by Amount</option>
          <option value="women">View by Women %</option>
          <option value="growth">View by Growth</option>
        </select>
      </div>
      
      {/* Simplified India Map - Using colored regions */}
      <div className="relative bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 min-h-[320px]">
        <div className="grid grid-cols-3 gap-3">
          {Object.entries(stateData).map(([code, data]) => (
            <motion.button
              key={code}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleStateClick(code)}
              className="bg-white rounded-lg p-3 shadow-md hover:shadow-xl transition-all border-2 border-blue-200 hover:border-blue-500"
            >
              <div className="text-xl font-bold text-blue-700 mb-1">{code}</div>
              <div className="text-xs text-gray-600">{data.name}</div>
              <div className="mt-1.5 text-sm font-semibold text-gray-800">{data.loans}</div>
              <div className="text-xs text-green-600">{data.growth}</div>
            </motion.button>
          ))}
        </div>

        <div className="mt-4 text-center text-sm text-gray-500">
          Click on any state to view district-wise breakdown
        </div>
      </div>

      {/* District Drill-down Modal */}
      <AnimatePresence>
        {showDetails && selectedState && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowDetails(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-xl shadow-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">
                    {stateData[selectedState].name} - District-wise Data
                  </h3>
                  <p className="text-gray-600 mt-1">Detailed breakdown of loan distribution</p>
                </div>
                <button
                  onClick={() => setShowDetails(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* State Summary */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">Total Loans</div>
                  <div className="text-xl font-bold text-blue-700">{stateData[selectedState].loans}</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">Amount Disbursed</div>
                  <div className="text-xl font-bold text-green-700">{stateData[selectedState].amount}</div>
                </div>
                <div className="bg-pink-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">Women Beneficiaries</div>
                  <div className="text-xl font-bold text-pink-700">{stateData[selectedState].women}%</div>
                </div>
              </div>

              {/* District-wise Breakdown */}
              <h4 className="text-lg font-bold text-gray-800 mb-4">Top Districts</h4>
              <div className="space-y-3">
                {(districtData[selectedState] || []).map((district, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {idx + 1}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{district.name}</p>
                        <p className="text-sm text-gray-600">{district.loans} loans</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-800">{district.amount}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <Button
                onClick={() => setShowDetails(false)}
                className="w-full mt-6 bg-blue-600 hover:bg-blue-700"
              >
                Close
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}