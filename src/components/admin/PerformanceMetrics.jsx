import React from 'react';
import { motion } from 'framer-motion';
import { Target, TrendingUp, Users, AlertCircle } from 'lucide-react';

export default function PerformanceMetrics({ filters }) {
  const getMetricsData = () => {
    const baseData = {
      all: [
        { title: 'Disbursement Target', current: 5.2, target: 6.0, percentage: 87, icon: Target, color: 'blue' },
        { title: 'Women Beneficiaries', current: 70, target: 75, percentage: 93, icon: TrendingUp, color: 'pink', suffix: '%' },
        { title: 'SC/ST Coverage', current: 22, target: 25, percentage: 88, icon: Users, color: 'purple', suffix: '%' },
        { title: 'NPA Ratio', current: 2.1, target: 2.5, percentage: 84, icon: AlertCircle, color: 'red', suffix: '%', subtitle: 'Lower is better' }
      ],
      shishu: [
        { title: 'Disbursement Target', current: 3.8, target: 4.5, percentage: 84, icon: Target, color: 'blue' },
        { title: 'Women Beneficiaries', current: 75, target: 80, percentage: 94, icon: TrendingUp, color: 'pink', suffix: '%' },
        { title: 'SC/ST Coverage', current: 25, target: 28, percentage: 89, icon: Users, color: 'purple', suffix: '%' },
        { title: 'NPA Ratio', current: 1.8, target: 2.0, percentage: 90, icon: AlertCircle, color: 'red', suffix: '%', subtitle: 'Lower is better' }
      ],
      kishore: [
        { title: 'Disbursement Target', current: 1.1, target: 1.2, percentage: 92, icon: Target, color: 'blue' },
        { title: 'Women Beneficiaries', current: 68, target: 72, percentage: 94, icon: TrendingUp, color: 'pink', suffix: '%' },
        { title: 'SC/ST Coverage', current: 20, target: 23, percentage: 87, icon: Users, color: 'purple', suffix: '%' },
        { title: 'NPA Ratio', current: 2.3, target: 2.8, percentage: 82, icon: AlertCircle, color: 'red', suffix: '%', subtitle: 'Lower is better' }
      ],
      tarun: [
        { title: 'Disbursement Target', current: 0.3, target: 0.3, percentage: 100, icon: Target, color: 'blue' },
        { title: 'Women Beneficiaries', current: 62, target: 68, percentage: 91, icon: TrendingUp, color: 'pink', suffix: '%' },
        { title: 'SC/ST Coverage', current: 18, target: 22, percentage: 82, icon: Users, color: 'purple', suffix: '%' },
        { title: 'NPA Ratio', current: 2.8, target: 3.2, percentage: 87, icon: AlertCircle, color: 'red', suffix: '%', subtitle: 'Lower is better' }
      ]
    };
    
    return filters?.scheme !== 'all' ? baseData[filters.scheme] : baseData.all;
  };
  
  const metrics = getMetricsData();

  const getColorClass = (color) => {
    const colorMap = {
      blue: 'bg-blue-500',
      pink: 'bg-pink-500',
      purple: 'bg-purple-500',
      red: 'bg-red-500',
      green: 'bg-green-500'
    };
    return colorMap[color] || 'bg-blue-500';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
      {metrics.map((metric, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="bg-white rounded-lg shadow-md p-4"
        >
          <div className={`w-10 h-10 ${getColorClass(metric.color)} rounded-lg flex items-center justify-center mb-3`}>
            <metric.icon className="text-white" size={20} />
          </div>
          <p className="text-gray-600 text-xs font-medium mb-2">{metric.title}</p>
          <div className="mb-1">
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span className="text-xs">{metric.current}{metric.suffix || ''}</span>
              <span className="text-xs">{metric.target}{metric.suffix || ''}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div
                className={`${getColorClass(metric.color)} h-1.5 rounded-full transition-all`}
                style={{ width: `${metric.percentage}%` }}
              ></div>
            </div>
          </div>
          <p className="text-lg font-bold text-gray-800">{metric.percentage}%</p>
          {metric.subtitle && <p className="text-xs text-gray-500 mt-0.5">{metric.subtitle}</p>}
        </motion.div>
      ))}
    </div>
  );
}