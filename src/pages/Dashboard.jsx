import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/home/Header';
import Footer from '../components/home/Footer';
import ChatBot from '../components/ChatBot';
import NotificationSystem from '../components/NotificationSystem';
import DashboardFilters from '../components/dashboard/DashboardFilters';
import KeyMetricsCards from '../components/dashboard/KeyMetricsCards';
import DisbursementTrendChart from '../components/dashboard/DisbursementTrendChart';
import SchemePerformanceChart from '../components/dashboard/SchemePerformanceChart';
import GeographicalDistribution from '../components/dashboard/GeographicalDistribution';
import ApplicationStatusChart from '../components/dashboard/ApplicationStatusChart';
import DisbursementChart from '../components/dashboard/DisbursementChart';

export default function Dashboard() {
  const [filters, setFilters] = useState({
    dateFrom: '2025-04-01',
    dateTo: '2026-01-28',
    states: [],
    schemes: []
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <NotificationSystem />

      {/* Dashboard Header */}
      <div className="bg-gradient-to-r from-red-700 to-red-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl font-bold mb-2">Analytics Dashboard</h1>
            <p className="text-red-100">Real-time PMMY performance metrics and insights</p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filters */}
        <DashboardFilters onFilterChange={handleFilterChange} />

        {/* Key Metrics */}
        <KeyMetricsCards />

        {/* Charts Section */}
        <div className="space-y-6">
          {/* User Application Charts */}
          <div className="grid lg:grid-cols-2 gap-6">
            <ApplicationStatusChart />
            <DisbursementChart />
          </div>

          {/* Disbursement Trend */}
          <DisbursementTrendChart />

          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-2 gap-6">
            <SchemePerformanceChart />
            <GeographicalDistribution />
          </div>

          {/* Additional Insights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4">Key Insights</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border-l-4 border-blue-600">
                <h4 className="font-bold text-blue-900 mb-2">Highest Growth</h4>
                <p className="text-sm text-blue-800">Uttar Pradesh leads with 12.45 Lakh loans sanctioned, representing 24.8% of total portfolio</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border-l-4 border-green-600">
                <h4 className="font-bold text-green-900 mb-2">Women Empowerment</h4>
                <p className="text-sm text-green-800">70.8% of beneficiaries are women, contributing to inclusive economic growth</p>
              </div>
              <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-4 rounded-lg border-l-4 border-amber-600">
                <h4 className="font-bold text-amber-900 mb-2">Scheme Distribution</h4>
                <p className="text-sm text-amber-800">Shishu scheme dominates with 84.5% loans, catering to entry-level entrepreneurs</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
      <ChatBot />
    </div>
  );
}