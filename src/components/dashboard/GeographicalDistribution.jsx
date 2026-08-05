import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { motion } from 'framer-motion';

const data = [
  { state: 'Uttar Pradesh', loans: 1245, amount: 8456, color: '#dc2626' },
  { state: 'Maharashtra', loans: 987, amount: 7234, color: '#f97316' },
  { state: 'Tamil Nadu', loans: 856, amount: 6544, color: '#fbbf24' },
  { state: 'West Bengal', loans: 734, amount: 5876, color: '#4ade80' },
  { state: 'Karnataka', loans: 679, amount: 5235, color: '#22d3ee' },
  { state: 'Gujarat', loans: 590, amount: 4567, color: '#8b5cf6' },
  { state: 'Rajasthan', loans: 523, amount: 4123, color: '#ec4899' },
  { state: 'Madhya Pradesh', loans: 456, amount: 3456, color: '#06b6d4' },
];

export default function GeographicalDistribution() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-lg p-6"
    >
      <h3 className="text-xl font-bold text-gray-800 mb-4">Geographical Distribution (Top 8 States)</h3>
      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="state" type="category" width={120} />
            <Tooltip formatter={(value) => value.toLocaleString()} />
            <Legend />
            <Bar dataKey="loans" fill="#3b82f6" name="Loans Sanctioned" />
            <Bar dataKey="amount" fill="#fbbf24" name="Amount (₹ Cr)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}