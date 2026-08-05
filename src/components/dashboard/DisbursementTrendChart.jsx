import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const data = [
  { month: 'Jan', disbursed: 450, sanctioned: 520 },
  { month: 'Feb', disbursed: 520, sanctioned: 610 },
  { month: 'Mar', disbursed: 680, sanctioned: 750 },
  { month: 'Apr', disbursed: 750, sanctioned: 890 },
  { month: 'May', disbursed: 890, sanctioned: 950 },
  { month: 'Jun', disbursed: 920, sanctioned: 1050 },
  { month: 'Jul', disbursed: 1100, sanctioned: 1200 },
  { month: 'Aug', disbursed: 1250, sanctioned: 1350 },
  { month: 'Sep', disbursed: 1450, sanctioned: 1550 },
  { month: 'Oct', disbursed: 1680, sanctioned: 1750 },
  { month: 'Nov', disbursed: 1850, sanctioned: 1950 },
  { month: 'Dec', disbursed: 2100, sanctioned: 2200 },
];

export default function DisbursementTrendChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-lg p-6"
    >
      <h3 className="text-xl font-bold text-gray-800 mb-4">Loan Disbursement Trends (FY 2025-26)</h3>
      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => `₹${value} Cr`} />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="disbursed" 
              stroke="#dc2626" 
              name="Disbursed (₹ Cr)"
              strokeWidth={2}
            />
            <Line 
              type="monotone" 
              dataKey="sanctioned" 
              stroke="#fbbf24" 
              name="Sanctioned (₹ Cr)"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}