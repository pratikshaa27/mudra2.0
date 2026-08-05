import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

export default function SectorDistribution({ filters }) {
  const [viewType, setViewType] = React.useState('all');

  const getSectorDataByScheme = () => {
    const dataByScheme = {
      all: [
        { name: 'Manufacturing', value: 35, fill: '#3b82f6' },
        { name: 'Services', value: 42, fill: '#10b981' },
        { name: 'Trading', value: 18, fill: '#f59e0b' },
        { name: 'Agriculture', value: 5, fill: '#8b5cf6' }
      ],
      shishu: [
        { name: 'Manufacturing', value: 28, fill: '#3b82f6' },
        { name: 'Services', value: 48, fill: '#10b981' },
        { name: 'Trading', value: 20, fill: '#f59e0b' },
        { name: 'Agriculture', value: 4, fill: '#8b5cf6' }
      ],
      kishore: [
        { name: 'Manufacturing', value: 42, fill: '#3b82f6' },
        { name: 'Services', value: 35, fill: '#10b981' },
        { name: 'Trading', value: 18, fill: '#f59e0b' },
        { name: 'Agriculture', value: 5, fill: '#8b5cf6' }
      ],
      tarun: [
        { name: 'Manufacturing', value: 55, fill: '#3b82f6' },
        { name: 'Services', value: 25, fill: '#10b981' },
        { name: 'Trading', value: 15, fill: '#f59e0b' },
        { name: 'Agriculture', value: 5, fill: '#8b5cf6' }
      ]
    };
    
    return filters?.scheme !== 'all' ? dataByScheme[filters.scheme] : dataByScheme.all;
  };

  const allSectorData = getSectorDataByScheme();
  const sectorData = viewType === 'all' ? allSectorData : allSectorData.filter(s => s.name === viewType);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-md p-4"
    >
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-base font-bold text-gray-800">Sector-wise Distribution</h3>
        <select
          value={viewType}
          onChange={(e) => setViewType(e.target.value)}
          className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <option value="all">All Sectors</option>
          <option value="Manufacturing">Manufacturing</option>
          <option value="Services">Services</option>
          <option value="Trading">Trading</option>
          <option value="Agriculture">Agriculture</option>
        </select>
      </div>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={sectorData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, value }) => `${name}: ${value}%`}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {sectorData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
      
      <div className="mt-3 space-y-2">
        {sectorData.map((sector, idx) => (
          <div key={idx} className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: sector.fill }}></div>
              <span className="text-gray-700">{sector.name}</span>
            </div>
            <span className="font-semibold text-gray-800">{sector.value}%</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}