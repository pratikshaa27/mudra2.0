import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Users, Zap } from 'lucide-react';

const metrics = [
  {
    title: 'Total Loans Sanctioned',
    value: '50.12 Cr',
    change: '+12.5%',
    isPositive: true,
    icon: null,
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-100'
  },
  {
    title: 'Amount Disbursed',
    value: '₹33.89 L Cr',
    change: '+8.3%',
    isPositive: true,
    icon: null,
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-100'
  },
  {
    title: 'Women Beneficiaries',
    value: '70.8%',
    change: '+2.1%',
    isPositive: true,
    icon: Users,
    color: 'from-pink-500 to-pink-600',
    bgColor: 'bg-pink-100'
  },
  {
    title: 'Avg. Loan Size',
    value: '₹6.76 Lakh',
    change: '-1.2%',
    isPositive: false,
    icon: TrendingUp,
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-100'
  },
];

export default function KeyMetricsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {metrics.map((metric, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="bg-white rounded-lg shadow-lg p-6"
        >
          <div className="flex items-start justify-between mb-4">
            <div className={`${metric.bgColor} p-3 rounded-lg flex items-center justify-center`}>
              {metric.icon ? (
                <metric.icon className="text-gray-800" size={24} />
              ) : (
                <span className="text-2xl font-bold text-gray-800">₹</span>
              )}
            </div>
            <div className={`flex items-center gap-1 text-xs font-bold ${metric.isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {metric.isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
              {metric.change}
            </div>
          </div>
          <h4 className="text-gray-600 text-sm font-medium mb-1">{metric.title}</h4>
          <p className="text-2xl font-bold text-gray-800">{metric.value}</p>
        </motion.div>
      ))}
    </div>
  );
}