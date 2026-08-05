import React from 'react';
import { motion } from 'framer-motion';
import { Award } from 'lucide-react';

export default function TopBanks({ filters }) {
  const [sortBy, setSortBy] = React.useState('loans');

  const getBanksByScheme = () => {
    const dataByScheme = {
      all: [
        { rank: 1, name: 'State Bank of India', loans: 8.4, amount: 5.6, growth: 18 },
        { rank: 2, name: 'Bank of Baroda', loans: 4.2, amount: 2.8, growth: 22 },
        { rank: 3, name: 'Punjab National Bank', loans: 3.8, amount: 2.5, growth: 15 },
        { rank: 4, name: 'Canara Bank', loans: 3.2, amount: 2.1, growth: 19 },
        { rank: 5, name: 'Union Bank of India', loans: 2.9, amount: 1.9, growth: 16 }
      ],
      shishu: [
        { rank: 1, name: 'State Bank of India', loans: 6.2, amount: 1.8, growth: 20 },
        { rank: 2, name: 'Bank of Baroda', loans: 3.1, amount: 0.9, growth: 24 },
        { rank: 3, name: 'Punjab National Bank', loans: 2.8, amount: 0.8, growth: 17 },
        { rank: 4, name: 'Canara Bank', loans: 2.4, amount: 0.7, growth: 21 },
        { rank: 5, name: 'Union Bank of India', loans: 2.1, amount: 0.6, growth: 18 }
      ],
      kishore: [
        { rank: 1, name: 'State Bank of India', loans: 1.8, amount: 2.5, growth: 16 },
        { rank: 2, name: 'Bank of Baroda', loans: 0.9, amount: 1.2, growth: 19 },
        { rank: 3, name: 'Punjab National Bank', loans: 0.8, amount: 1.1, growth: 14 },
        { rank: 4, name: 'Canara Bank', loans: 0.7, amount: 0.9, growth: 17 },
        { rank: 5, name: 'Union Bank of India', loans: 0.6, amount: 0.8, growth: 15 }
      ],
      tarun: [
        { rank: 1, name: 'State Bank of India', loans: 0.4, amount: 1.3, growth: 15 },
        { rank: 2, name: 'Bank of Baroda', loans: 0.2, amount: 0.7, growth: 18 },
        { rank: 3, name: 'Punjab National Bank', loans: 0.2, amount: 0.6, growth: 12 },
        { rank: 4, name: 'Canara Bank', loans: 0.1, amount: 0.5, growth: 16 },
        { rank: 5, name: 'Union Bank of India', loans: 0.1, amount: 0.5, growth: 13 }
      ]
    };
    
    return filters?.scheme !== 'all' ? dataByScheme[filters.scheme] : dataByScheme.all;
  };

  const allBanks = getBanksByScheme();

  const sortedBanks = [...allBanks].sort((a, b) => {
    if (sortBy === 'loans') return b.loans - a.loans;
    if (sortBy === 'amount') return b.amount - a.amount;
    if (sortBy === 'growth') return b.growth - a.growth;
    return 0;
  });

  const topBanks = sortedBanks.slice(0, 5).map((bank, idx) => ({
    ...bank,
    rank: idx + 1,
    loans: `${bank.loans} L`,
    amount: `₹${bank.amount} L Cr`,
    growth: `+${bank.growth}%`
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-md p-4"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Award className="text-yellow-500" size={20} />
          <h3 className="text-base font-bold text-gray-800">Top 5 Performing Banks</h3>
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <option value="loans">By Loans Count</option>
          <option value="amount">By Amount</option>
          <option value="growth">By Growth</option>
        </select>
      </div>
      
      <div className="space-y-2">
        {topBanks.map((bank, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="flex items-center gap-3 p-2.5 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-white text-sm ${
              bank.rank === 1 ? 'bg-yellow-500' : 
              bank.rank === 2 ? 'bg-gray-400' : 
              bank.rank === 3 ? 'bg-orange-600' : 'bg-blue-500'
            }`}>
              {bank.rank}
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-800 text-sm">{bank.name}</p>
              <p className="text-xs text-gray-600">{bank.loans} loans • {bank.amount}</p>
            </div>
            <div className="text-right">
              <span className="text-green-600 font-semibold text-xs">{bank.growth}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}