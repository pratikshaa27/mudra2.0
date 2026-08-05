import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

export default function ApplicationStatusChart() {
  const data = [
    { name: 'Approved', value: 35, color: '#10b981' },
    { name: 'Under Review', value: 28, color: '#3b82f6' },
    { name: 'Submitted', value: 22, color: '#f59e0b' },
    { name: 'Rejected', value: 15, color: '#ef4444' }
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 rounded shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-800">{payload[0].name}</p>
          <p className="text-sm text-gray-600">{payload[0].value} applications</p>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-lg p-6"
    >
      <h3 className="text-xl font-bold text-gray-800 mb-6">Loan Application Status</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, value }) => `${name}: ${value}`}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>

      {/* Status Legend */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        {data.map((item, idx) => (
          <div key={idx} className="flex items-center gap-3">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: item.color }}></div>
            <div>
              <p className="text-sm font-semibold text-gray-700">{item.name}</p>
              <p className="text-xs text-gray-500">{item.value} applications</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}