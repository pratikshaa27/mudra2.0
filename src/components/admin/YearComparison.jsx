import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function YearComparison({ filters }) {
  const [comparisonView, setComparisonView] = useState('monthly');
  const [metricType, setMetricType] = useState('all');

  const comparisonData = [
    { month: 'Jan', thisYear: 4.2, lastYear: 3.5 },
    { month: 'Feb', thisYear: 4.5, lastYear: 3.8 },
    { month: 'Mar', thisYear: 5.1, lastYear: 4.2 },
    { month: 'Apr', thisYear: 4.8, lastYear: 4.0 },
    { month: 'May', thisYear: 5.3, lastYear: 4.5 },
    { month: 'Jun', thisYear: 5.8, lastYear: 4.8 }
  ];

  const metrics = [
    { 
      label: 'Total Disbursed', 
      thisYear: '₹33.89 L Cr', 
      lastYear: '₹27.2 L Cr', 
      change: '+24.5%',
      positive: true 
    },
    { 
      label: 'Loans Sanctioned', 
      thisYear: '50.12 Cr', 
      lastYear: '42.3 Cr', 
      change: '+18.5%',
      positive: true 
    },
    { 
      label: 'Women Beneficiaries', 
      thisYear: '70%', 
      lastYear: '68%', 
      change: '+2.9%',
      positive: true 
    },
    { 
      label: 'Avg Processing Days', 
      thisYear: '4.2 days', 
      lastYear: '5.8 days', 
      change: '-27.6%',
      positive: true 
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-base font-bold text-gray-800">Year-over-Year Comparison</h3>
        <div className="flex gap-2">
          <select
            value={metricType}
            onChange={(e) => setMetricType(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="all">All Metrics</option>
            <option value="disbursed">Disbursed Only</option>
            <option value="sanctioned">Sanctioned Only</option>
          </select>
          <select
            value={comparisonView}
            onChange={(e) => setComparisonView(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="monthly">Monthly Trend</option>
            <option value="quarterly">Quarterly</option>
            <option value="scheme">By Scheme</option>
          </select>
        </div>
      </div>

      {/* Metric Cards Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        {metrics.map((metric, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3 border border-blue-200"
          >
            <p className="text-xs text-gray-600 mb-1.5">{metric.label}</p>
            <div className="flex items-center justify-between mb-1.5">
              <div>
                <p className="text-lg font-bold text-gray-800">{metric.thisYear}</p>
                <p className="text-xs text-gray-500">FY 2025-26</p>
              </div>
              <ArrowRight className="text-gray-400" size={16} />
              <div>
                <p className="text-sm text-gray-600">{metric.lastYear}</p>
                <p className="text-xs text-gray-500">FY 2024-25</p>
              </div>
            </div>
            <div className={`flex items-center gap-1 text-sm font-semibold ${
              metric.positive ? 'text-green-600' : 'text-red-600'
            }`}>
              {metric.positive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
              {metric.change}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Comparison Chart */}
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={comparisonData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis label={{ value: 'Amount (₹ Cr)', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="thisYear" fill="#3b82f6" name="FY 2025-26" />
          <Bar dataKey="lastYear" fill="#94a3b8" name="FY 2024-25" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}