import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Home, FileText, Target, Database, Upload, TrendingUp, Users, BookOpen, ChevronRight, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function PMMYPortal() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const navItems = [
    { label: 'HOME', icon: Home },
    { label: 'REPORTS', icon: FileText },
    { label: 'PURPOSES', icon: Target },
    { label: 'SEGREGATED DATA', icon: Database },
    { label: 'PMMY UPDATIONS', icon: Upload },
    { label: 'PERFORMANCE', icon: TrendingUp },
    { label: 'MASTERS', icon: Users },
    { label: 'USERS', icon: Users },
    { label: 'USER MANUAL', icon: BookOpen },
    { label: 'ADMIN LOGIN', icon: Users },
  ];

  const instructions = [
    {
      text: 'Code structure for District wise performance module.',
      highlight: 'Please click here',
      new: true
    },
    {
      text: 'Image upload module has been released kindly upload the images of assisted units.',
      new: true
    },
    {
      text: 'Declaration has been introduced for weekly upload of performance data. Checker will be required to tick the check boxes towards declarations before submitting the data in the portal.',
      new: true
    },
    {
      text: 'User Guide for Success Story Module Please click here',
    },
    {
      text: 'User Guide for Segregated Data Module Please click here',
    },
    {
      text: 'The TARGET ENTRY module has been issued. You are requested to enter State Wise target for your Bank / MFI / Institution. Please note that only checker can enter the target. Also, target once entered, cannot not modified.',
    },
    {
      text: 'For entering target details please login as checker. Set target button is on top right hand side of the screen (under welcome heading).',
    },
    {
      text: 'NPA data uploading module has been released. Request you to enter the cumulative NPA data since 08 April 2015 till the last Friday of the quarter.',
    },
    {
      text: 'All Member Lending Institutions (MLIs) are requested to update their profile details regularly for accurate reporting.',
    },
    {
      text: 'For any technical issues or queries, please contact the helpdesk at helpdesk.ict@mudra.org.in or call toll-free: 1800-180-1111',
    },
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    // Add login logic here
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b-2 border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-start justify-between">
          <div className="flex items-center gap-4">
            <img 
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6978c66565209a38e92b1aa2/282d5f6a9_image.png"
              alt="MUDRA Logo"
              className="h-16 w-auto"
            />
            <div>
              <h1 className="text-red-700 text-2xl font-bold">Micro Units Development & Refinance Agency Ltd.</h1>
            </div>
          </div>
          <div className="flex flex-col items-center gap-3">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg"
              alt="Government of India"
              className="h-16 w-auto"
            />
            <div className="bg-red-700 text-white px-2.5 py-0.5 rounded shadow-sm font-semibold text-center whitespace-nowrap">
              <div className="text-[10px] leading-none">Welcome</div>
              <div className="text-[10px]">MUDRA User</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="bg-gradient-to-r from-red-700 to-red-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between overflow-x-auto">
            {navItems.map((item, idx) => (
                    item.label === 'ADMIN LOGIN' ? (
                      <button
                        key={idx}
                        onClick={() => navigate(createPageUrl('AdminLogin'))}
                        className="flex items-center gap-1 px-3 py-3 text-white text-xs font-medium hover:bg-red-900 transition-colors whitespace-nowrap border-r border-red-600 last:border-r-0"
                      >
                        <item.icon size={14} />
                        {item.label}
                      </button>
                    ) : (
                      <button
                        key={idx}
                        className="flex items-center gap-1 px-3 py-3 text-white text-xs font-medium hover:bg-red-900 transition-colors whitespace-nowrap border-r border-red-600 last:border-r-0"
                      >
                        <item.icon size={14} />
                        {item.label}
                      </button>
                    )
                  ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Message */}
        <div className="bg-white border-l-4 border-red-700 p-4 mb-6 shadow-sm">
          <h2 className="text-red-700 text-xl font-semibold">
            Welcome to Micro Units Development & Refinance Agency Ltd.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Left: Instructions */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Instructions :</h3>
              <ul className="space-y-3">
                {instructions.map((item, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-start gap-3 text-sm"
                  >
                    <ChevronRight className="text-red-700 flex-shrink-0 mt-0.5" size={16} />
                    <div>
                      <span className={item.new ? 'text-red-700 font-semibold' : 'text-gray-700'}>
                        {item.text}
                      </span>
                      {item.new && (
                        <span className="ml-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded">NEW</span>
                      )}
                    </div>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-xs text-gray-600">
                  Best viewed with Internet Explorer 10+ or Latest versions of Google Chrome & Mozilla Firefox
                </p>
                <p className="text-xs text-gray-600 mt-2">
                  © Copyright 2018 mudra.org.in | Contact us: helpdesk[dot]ict[at]mudra[dot]in
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  Designed, Developed and Hosted by ESDS Software Solution Pvt. Ltd
                </p>
              </div>
            </div>

            {/* State-wise Performance Data */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">State-wise Loan Performance (FY 2025-26)</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead className="bg-red-700 text-white">
                    <tr>
                      <th className="p-2 text-left">State</th>
                      <th className="p-2 text-right">Loans Sanctioned</th>
                      <th className="p-2 text-right">Amount (₹ Cr)</th>
                      <th className="p-2 text-right">Women %</th>
                      <th className="p-2 text-right">Disbursed</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr className="hover:bg-gray-50">
                      <td className="p-2 font-medium">Uttar Pradesh</td>
                      <td className="p-2 text-right">12,45,678</td>
                      <td className="p-2 text-right">8,456.32</td>
                      <td className="p-2 text-right">72.3%</td>
                      <td className="p-2 text-right">98.5%</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-2 font-medium">Maharashtra</td>
                      <td className="p-2 text-right">9,87,543</td>
                      <td className="p-2 text-right">7,234.21</td>
                      <td className="p-2 text-right">68.9%</td>
                      <td className="p-2 text-right">97.8%</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-2 font-medium">Tamil Nadu</td>
                      <td className="p-2 text-right">8,56,432</td>
                      <td className="p-2 text-right">6,543.87</td>
                      <td className="p-2 text-right">74.2%</td>
                      <td className="p-2 text-right">99.1%</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-2 font-medium">West Bengal</td>
                      <td className="p-2 text-right">7,34,521</td>
                      <td className="p-2 text-right">5,876.45</td>
                      <td className="p-2 text-right">76.5%</td>
                      <td className="p-2 text-right">96.4%</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-2 font-medium">Karnataka</td>
                      <td className="p-2 text-right">6,78,912</td>
                      <td className="p-2 text-right">5,234.76</td>
                      <td className="p-2 text-right">69.7%</td>
                      <td className="p-2 text-right">98.2%</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-2 font-medium">Gujarat</td>
                      <td className="p-2 text-right">5,89,654</td>
                      <td className="p-2 text-right">4,567.32</td>
                      <td className="p-2 text-right">67.4%</td>
                      <td className="p-2 text-right">97.5%</td>
                    </tr>
                    <tr className="bg-amber-50 font-bold">
                      <td className="p-2">Total (All States)</td>
                      <td className="p-2 text-right">50,12,34,567</td>
                      <td className="p-2 text-right">33,89,234.56</td>
                      <td className="p-2 text-right">70.8%</td>
                      <td className="p-2 text-right">97.9%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Scheme-wise Distribution */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Scheme-wise Loan Distribution (FY 2025-26)</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border-l-4 border-blue-600">
                  <h4 className="text-blue-900 font-bold text-sm mb-2">Shishu (up to ₹50,000)</h4>
                  <p className="text-2xl font-bold text-blue-900">42.3 Cr</p>
                  <p className="text-xs text-blue-700 mt-1">84.5% of total loans</p>
                  <p className="text-xs text-blue-700">Amount: ₹8.45 Lakh Cr</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border-l-4 border-purple-600">
                  <h4 className="text-purple-900 font-bold text-sm mb-2">Kishore (₹50,000 - ₹5 Lakh)</h4>
                  <p className="text-2xl font-bold text-purple-900">6.8 Cr</p>
                  <p className="text-xs text-purple-700 mt-1">13.6% of total loans</p>
                  <p className="text-xs text-purple-700">Amount: ₹15.67 Lakh Cr</p>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4 border-l-4 border-orange-600">
                  <h4 className="text-orange-900 font-bold text-sm mb-2">Tarun (₹5 - ₹20 Lakh)</h4>
                  <p className="text-2xl font-bold text-orange-900">1.02 Cr</p>
                  <p className="text-xs text-orange-700 mt-1">2.0% of total loans</p>
                  <p className="text-xs text-orange-700">Amount: ₹9.77 Lakh Cr</p>
                </div>
              </div>
            </div>

            {/* Institution-wise Performance */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Institution-wise Performance</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead className="bg-gray-800 text-white">
                    <tr>
                      <th className="p-2 text-left">Institution Type</th>
                      <th className="p-2 text-right">No. of Accounts</th>
                      <th className="p-2 text-right">Amount Disbursed (₹ Cr)</th>
                      <th className="p-2 text-right">Share %</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr className="hover:bg-gray-50">
                      <td className="p-2 font-medium">Public Sector Banks</td>
                      <td className="p-2 text-right">28,45,67,890</td>
                      <td className="p-2 text-right">19,67,543.21</td>
                      <td className="p-2 text-right">58.1%</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-2 font-medium">Regional Rural Banks</td>
                      <td className="p-2 text-right">10,23,45,678</td>
                      <td className="p-2 text-right">6,78,234.45</td>
                      <td className="p-2 text-right">20.0%</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-2 font-medium">Private Sector Banks</td>
                      <td className="p-2 text-right">4,56,78,901</td>
                      <td className="p-2 text-right">3,45,678.32</td>
                      <td className="p-2 text-right">10.2%</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-2 font-medium">Small Finance Banks</td>
                      <td className="p-2 text-right">3,45,67,890</td>
                      <td className="p-2 text-right">2,12,345.67</td>
                      <td className="p-2 text-right">6.3%</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-2 font-medium">MFIs</td>
                      <td className="p-2 text-right">2,34,56,789</td>
                      <td className="p-2 text-right">1,34,567.89</td>
                      <td className="p-2 text-right">4.0%</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-2 font-medium">NBFCs</td>
                      <td className="p-2 text-right">1,06,17,419</td>
                      <td className="p-2 text-right">50,865.02</td>
                      <td className="p-2 text-right">1.5%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recent Updates */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">📰 Recent Updates & Circulars</h3>
              <div className="space-y-3">
                <div className="flex gap-3 p-3 bg-blue-50 rounded hover:bg-blue-100 transition-colors">
                  <div className="bg-blue-600 text-white px-3 py-1 rounded text-xs font-bold h-fit">28 Jan</div>
                  <div>
                    <h4 className="font-semibold text-sm text-gray-800">Circular: Guidelines for TarunPlus loans extended to ₹25 Lakh</h4>
                    <p className="text-xs text-gray-600 mt-1">New guidelines issued for enhanced loan limit under TarunPlus category...</p>
                    <a href="#" className="text-xs text-blue-700 hover:underline mt-1 inline-block">Read More →</a>
                  </div>
                </div>
                <div className="flex gap-3 p-3 bg-green-50 rounded hover:bg-green-100 transition-colors">
                  <div className="bg-green-600 text-white px-3 py-1 rounded text-xs font-bold h-fit">25 Jan</div>
                  <div>
                    <h4 className="font-semibold text-sm text-gray-800">PMMY crosses 50 Crore loan mark - Historic achievement</h4>
                    <p className="text-xs text-gray-600 mt-1">Pradhan Mantri MUDRA Yojana reaches milestone of 50 crore loans...</p>
                    <a href="#" className="text-xs text-green-700 hover:underline mt-1 inline-block">Read More →</a>
                  </div>
                </div>
                <div className="flex gap-3 p-3 bg-amber-50 rounded hover:bg-amber-100 transition-colors">
                  <div className="bg-amber-600 text-white px-3 py-1 rounded text-xs font-bold h-fit">20 Jan</div>
                  <div>
                    <h4 className="font-semibold text-sm text-gray-800">Notice: Q3 FY26 Data Submission Deadline - 31st January 2026</h4>
                    <p className="text-xs text-gray-600 mt-1">All MLIs requested to submit Q3 performance data before deadline...</p>
                    <a href="#" className="text-xs text-amber-700 hover:underline mt-1 inline-block">Read More →</a>
                  </div>
                </div>
                <div className="flex gap-3 p-3 bg-purple-50 rounded hover:bg-purple-100 transition-colors">
                  <div className="bg-purple-600 text-white px-3 py-1 rounded text-xs font-bold h-fit">15 Jan</div>
                  <div>
                    <h4 className="font-semibold text-sm text-gray-800">Workshop: Digital lending best practices - Registration open</h4>
                    <p className="text-xs text-gray-600 mt-1">National workshop on digital lending practices scheduled for Feb 2026...</p>
                    <a href="#" className="text-xs text-purple-700 hover:underline mt-1 inline-block">Read More →</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Login Form */}
          <div className="md:col-span-1">
            <div className="sticky top-6 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-red-700 to-red-800 rounded-lg shadow-xl p-6 text-white"
              >
                <h3 className="text-xl font-bold mb-6 text-center">Portal Login</h3>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Username</label>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full px-4 py-2 rounded border-2 border-white/20 bg-white/10 text-white placeholder-white/60 focus:outline-none focus:border-amber-400"
                      placeholder="Enter username"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-2 rounded border-2 border-white/20 bg-white/10 text-white placeholder-white/60 focus:outline-none focus:border-amber-400"
                      placeholder="Enter password"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-amber-500 hover:bg-amber-600 text-red-900 font-bold py-3 rounded shadow-lg transition-colors"
                  >
                    Login to Portal
                  </button>
                  <div className="text-center">
                    <a href="#" className="text-sm text-white hover:text-white/80 underline">
                      Forgot Password?
                    </a>
                  </div>
                </form>

                <div className="mt-6 pt-6 border-t border-white/20">
                  <Link 
                    to={createPageUrl('Home')}
                    className="block text-center text-sm text-white hover:text-white/80 underline"
                  >
                    ← Back to Main Portal
                  </Link>
                </div>
              </motion.div>

              {/* Quick Links */}
              <div className="bg-white rounded-lg shadow-md p-4">
                <h4 className="font-bold text-gray-800 mb-3 text-sm">Quick Links</h4>
                <div className="space-y-2">
                  <a href="#" className="block text-xs text-red-700 hover:underline">📥 Download User Manual</a>
                  <a href="#" className="block text-xs text-red-700 hover:underline">📊 Performance Dashboard</a>
                  <a href="#" className="block text-xs text-red-700 hover:underline">📝 Success Stories</a>
                  <a href="#" className="block text-xs text-red-700 hover:underline">🎯 Scheme Guidelines</a>
                  <a href="#" className="block text-xs text-red-700 hover:underline">📞 Contact Support</a>
                  <a href="#" className="block text-xs text-red-700 hover:underline">❓ FAQs</a>
                </div>
              </div>

              {/* Important Notice */}
              <div className="bg-amber-50 border-l-4 border-amber-500 rounded-lg shadow-md p-4">
                <h4 className="font-bold text-amber-800 mb-2 text-sm">📢 Important Notice</h4>
                <div className="space-y-2 text-xs text-amber-900">
                  <p>• Last date for Q3 FY 2025-26 data submission: 31st January 2026</p>
                  <p>• Portal maintenance scheduled on 2nd February 2026 (12:00 AM - 4:00 AM)</p>
                  <p>• New features: Advanced analytics dashboard now available</p>
                </div>
              </div>

              {/* Stats Card */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg shadow-md p-4 border border-green-200">
                <h4 className="font-bold text-green-800 mb-3 text-sm">📈 PMMY Progress (Till Dec 2025)</h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-green-700 mb-1">Total Loans Sanctioned</p>
                    <p className="text-2xl font-bold text-green-900">50.12 Cr+</p>
                  </div>
                  <div>
                    <p className="text-xs text-green-700 mb-1">Amount Disbursed</p>
                    <p className="text-2xl font-bold text-green-900">₹33.89 L Cr+</p>
                  </div>
                  <div>
                    <p className="text-xs text-green-700 mb-1">Women Beneficiaries</p>
                    <p className="text-2xl font-bold text-green-900">70.8%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}