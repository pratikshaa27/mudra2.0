import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LogOut, TrendingUp, Users, Activity, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { PieChart, Pie, BarChart, Bar, LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import DashboardFilters from '../components/admin/DashboardFilters';
import ExportButtons from '../components/admin/ExportButtons';
import RecentApplications from '../components/admin/RecentApplications';
import PerformanceMetrics from '../components/admin/PerformanceMetrics';
import SectorDistribution from '../components/admin/SectorDistribution';
import TopBanks from '../components/admin/TopBanks';
import PendingApprovals from '../components/admin/PendingApprovals';
import InteractiveMap from '../components/admin/InteractiveMap';
import YearComparison from '../components/admin/YearComparison';
import AdminNavbar from '../components/admin/AdminNavbar';
import DrillDownChart from '../components/admin/DrillDownChart';

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [filters, setFilters] = useState({ dateRange: '30days', state: 'all', scheme: 'all' });
  const navigate = useNavigate();

  useEffect(() => {
    const adminLoggedIn = localStorage.getItem('adminLoggedIn');
    if (!adminLoggedIn) {
      navigate(createPageUrl('AdminLogin'));
    } else {
      setIsLoggedIn(true);
    }
  }, [navigate]);

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        setLastUpdated(new Date());
      }, 30000); // 30 seconds
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    navigate(createPageUrl('AdminLogin'));
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleRefresh = () => {
    setLastUpdated(new Date());
  };

  // Dashboard Data
  // KPI Metrics - Filtered
  const getMetrics = () => {
    const baseMetrics = {
      all: { loans: '50.12 Cr', amount: '₹33.89 L Cr', users: '2.45 Lac', rate: '98.5%' },
      shishu: { loans: '42.3 Cr', amount: '₹8.45 L Cr', users: '2.1 Lac', rate: '99.2%' },
      kishore: { loans: '6.8 Cr', amount: '₹15.67 L Cr', users: '28 K', rate: '97.8%' },
      tarun: { loans: '1.02 Cr', amount: '₹9.77 L Cr', users: '7 K', rate: '96.5%' }
    };

    const data = filters.scheme !== 'all' ? baseMetrics[filters.scheme] : baseMetrics.all;

    return [
      { title: 'Total Loans Sanctioned', value: data.loans, change: '+12.5%', icon: null, color: 'from-blue-500 to-blue-600' },
      { title: 'Amount Disbursed', value: data.amount, change: '+18.3%', icon: TrendingUp, color: 'from-green-500 to-green-600' },
      { title: 'Active Users', value: data.users, change: '+8.2%', icon: Users, color: 'from-purple-500 to-purple-600' },
      { title: 'Success Rate', value: data.rate, change: '+2.1%', icon: Activity, color: 'from-orange-500 to-orange-600' },
    ];
  };
  const metrics = getMetrics();

  // Scheme-wise Data - Filtered
  const getSchemeData = () => {
    const baseData = {
      'shishu': { name: 'Shishu', loans: 42.3, amount: 8.45, fill: '#3b82f6' },
      'kishore': { name: 'Kishore', loans: 6.8, amount: 15.67, fill: '#10b981' },
      'tarun': { name: 'Tarun', loans: 1.02, amount: 9.77, fill: '#f59e0b' },
    };

    if (filters.scheme !== 'all') {
      return [baseData[filters.scheme]];
    }
    return Object.values(baseData);
  };
  const schemeData = getSchemeData();

  // State-wise Performance - Filtered
  const getStateData = () => {
    const allStates = [
      { state: 'UP', loans: 12.5, amount: 8.4, women: 72 },
      { state: 'MH', loans: 9.8, amount: 7.2, women: 69 },
      { state: 'TN', loans: 8.5, amount: 6.5, women: 74 },
      { state: 'WB', loans: 7.3, amount: 5.8, women: 76 },
      { state: 'KA', loans: 6.7, amount: 5.2, women: 70 },
      { state: 'GJ', loans: 5.8, amount: 4.5, women: 67 },
    ];

    if (filters.state !== 'all') {
      return allStates.filter(s => s.state.toLowerCase() === filters.state.toLowerCase());
    }
    return allStates;
  };
  const stateData = getStateData();

  // Monthly Trend - Filtered by Date Range
  const getTrendData = () => {
    const allMonths = [
      { month: 'Jan', sanctioned: 4.2, disbursed: 3.9 },
      { month: 'Feb', sanctioned: 4.5, disbursed: 4.2 },
      { month: 'Mar', sanctioned: 5.1, disbursed: 4.8 },
      { month: 'Apr', sanctioned: 4.8, disbursed: 4.5 },
      { month: 'May', sanctioned: 5.3, disbursed: 5.0 },
      { month: 'Jun', sanctioned: 5.8, disbursed: 5.5 },
      { month: 'Jul', sanctioned: 6.2, disbursed: 5.9 },
    ];

    if (filters.dateRange === '7days') return allMonths.slice(-1);
    if (filters.dateRange === '30days') return allMonths.slice(-2);
    if (filters.dateRange === '90days') return allMonths.slice(-3);
    return allMonths;
  };
  const trendData = getTrendData();

  // Institution-wise
  const institutionData = [
    { type: 'Public Banks', value: 58, fill: '#ef4444' },
    { type: 'Regional Banks', value: 20, fill: '#f59e0b' },
    { type: 'Private Banks', value: 10, fill: '#3b82f6' },
    { type: 'NBFCs', value: 8, fill: '#8b5cf6' },
    { type: 'MFIs', value: 4, fill: '#10b981' },
  ];

  // Women Beneficiaries by Scheme - Filtered
  const getWomenData = () => {
    const allSchemes = [
      { scheme: 'Shishu', women: 75, men: 25 },
      { scheme: 'Kishore', women: 68, men: 32 },
      { scheme: 'Tarun', women: 62, men: 38 },
    ];

    if (filters.scheme !== 'all') {
      return allSchemes.filter(s => s.scheme.toLowerCase() === filters.scheme);
    }
    return allSchemes;
  };
  const womenData = getWomenData();

  if (!isLoggedIn) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <AdminNavbar onLogout={handleLogout} lastUpdated={lastUpdated} />

      {/* Header */}
      <div className="bg-gradient-to-r from-red-700 to-red-800 text-white py-3">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-between items-center"
          >
            <div>
              <h1 className="text-2xl font-bold mb-1">Analytics Dashboard</h1>
              <p className="text-red-100 text-sm">Real-time PMMY performance metrics and insights</p>
            </div>
            <ExportButtons />
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Filters */}
        <DashboardFilters 
          onFilterChange={handleFilterChange}
          onRefresh={handleRefresh}
          autoRefresh={autoRefresh}
          setAutoRefresh={setAutoRefresh}
        />

        {/* Pending Approvals Alert */}
        <PendingApprovals />

        {/* Performance Metrics */}
        <div className="my-4">
          <h2 className="text-lg font-bold text-gray-800 mb-3">Performance Tracking</h2>
          <PerformanceMetrics filters={filters} />
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
          {metrics.map((metric, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
            >
              <div className={`w-10 h-10 bg-gradient-to-br ${metric.color} rounded-lg flex items-center justify-center mb-3`}>
                {metric.icon ? (
                  <metric.icon className="text-white" size={20} />
                ) : (
                  <span className="text-white text-lg font-bold">₹</span>
                )}
              </div>
              <p className="text-gray-600 text-xs font-medium">{metric.title}</p>
              <p className="text-xl font-bold text-gray-800 mt-1">{metric.value}</p>
              <p className="text-green-600 text-xs mt-1">{metric.change}</p>
            </motion.div>
          ))}
        </div>

        {/* Year-over-Year Comparison */}
        <div className="mb-4">
          <YearComparison filters={filters} />
        </div>

        {/* Interactive Map */}
        <div className="mb-4">
          <InteractiveMap filters={filters} />
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          {/* Drill-down Chart */}
          <DrillDownChart filters={filters} />

          {/* Institution-wise Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-lg shadow-md p-4"
          >
            <h3 className="text-base font-bold text-gray-800 mb-3">Institution-wise Share (%)</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={institutionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ type, value }) => `${type}: ${value}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {institutionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Charts Row 3 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          {/* Sector Distribution */}
          <SectorDistribution filters={filters} />

          {/* Top Banks */}
          <TopBanks filters={filters} />
        </div>

        {/* Charts Row 4 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          {/* State-wise Performance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg shadow-md p-4"
          >
            <h3 className="text-base font-bold text-gray-800 mb-3">State-wise Performance (Top 6)</h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={stateData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="state" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="loans" fill="#3b82f6" name="Loans (Cr)" />
                <Bar yAxisId="right" dataKey="women" fill="#ec4899" name="Women (%)" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Women Beneficiaries */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-lg shadow-md p-4"
          >
            <h3 className="text-base font-bold text-gray-800 mb-3">Gender Distribution by Scheme</h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={womenData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="scheme" type="category" width={80} />
                <Tooltip />
                <Legend />
                <Bar dataKey="women" stackId="a" fill="#ec4899" name="Women" />
                <Bar dataKey="men" stackId="a" fill="#6366f1" name="Men" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Recent Applications Table */}
        <div className="mt-4">
          <RecentApplications />
        </div>
      </div>
    </div>
  );
}