import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { motion } from 'framer-motion';

const data = [
  { scheme: 'Shishu', loans: 4230, amount: 845, color: '#3b82f6' },
  { scheme: 'Kishore', loans: 680, amount: 1567, color: '#8b5cf6' },
  { scheme: 'Tarun', loans: 102, amount: 977, color: '#f97316' },
  { scheme: 'TarunPlus', loans: 45, amount: 600, color: '#ec4899' },
];

export default function SchemePerformanceChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-lg p-6"
    >
      <h3 className="text-xl font-bold text-gray-800 mb-4">Scheme-wise Performance</h3>
      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="scheme" />
            <YAxis yAxisId="left" label={{ value: 'Loans (in Lakh)', angle: -90, position: 'insideLeft' }} />
            <YAxis yAxisId="right" orientation="right" label={{ value: 'Amount (₹ in Lakh Cr)', angle: 90, position: 'insideRight' }} />
            <Tooltip formatter={(value) => value.toLocaleString()} />
            <Legend />
            <Bar yAxisId="left" dataKey="loans" fill="#3b82f6" name="Loans Sanctioned (Lakh)" />
            <Bar yAxisId="right" dataKey="amount" fill="#fbbf24" name="Amount (₹ Lakh Cr)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}