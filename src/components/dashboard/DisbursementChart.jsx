import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function DisbursementChart() {
  const data = [
    { month: 'Jan', disbursed: 45000, sanctioned: 65000 },
    { month: 'Feb', disbursed: 62000, sanctioned: 78000 },
    { month: 'Mar', disbursed: 78000, sanctioned: 95000 },
    { month: 'Apr', disbursed: 85000, sanctioned: 102000 },
    { month: 'May', disbursed: 92000, sanctioned: 115000 },
    { month: 'Jun', disbursed: 105000, sanctioned: 128000 }
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-800">{payload[0].payload.month}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: ₹{(entry.value / 1000).toFixed(0)}k
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-white rounded-lg shadow-lg p-6"
    >
      <h3 className="text-xl font-bold text-gray-800 mb-6">Loan Disbursement Trends</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="disbursed" fill="#10b981" name="Disbursed Amount" />
          <Bar dataKey="sanctioned" fill="#3b82f6" name="Sanctioned Amount" />
        </BarChart>
      </ResponsiveContainer>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <p className="text-sm text-green-700 font-semibold">Total Disbursed</p>
          <p className="text-2xl font-bold text-green-900">₹4.69 L</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-700 font-semibold">Total Sanctioned</p>
          <p className="text-2xl font-bold text-blue-900">₹5.83 L</p>
        </div>
      </div>
    </motion.div>
  );
}