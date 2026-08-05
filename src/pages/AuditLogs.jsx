import React, { useState } from 'react';
import { RoleProvider } from '../components/RoleContext';
import MUDRA2Layout from '../components/mudra2/MUDRA2Layout';
import { motion } from 'framer-motion';
import { Shield, Lock, Database, Eye, TrendingUp, CheckCircle } from 'lucide-react';

function AuditLogsContent() {
  const [filterRole, setFilterRole] = useState('all');

  const auditLogs = [
    {
      timestamp: '2026-02-03 14:25:32',
      user: 'Rajesh Kumar',
      role: 'Bank Officer',
      action: 'Approved loan application',
      target: 'APP001 - Sita Devi',
      outcome: 'Success',
      ipAddress: '103.21.45.167'
    },
    {
      timestamp: '2026-02-03 14:18:45',
      user: 'Sita Devi',
      role: 'Entrepreneur',
      action: 'Submitted loan application',
      target: 'Kishor - ₹2,00,000',
      outcome: 'Success',
      ipAddress: '103.21.45.142'
    },
    {
      timestamp: '2026-02-03 13:52:18',
      user: 'Dr. Amit Sharma',
      role: 'Admin',
      action: 'Viewed analytics dashboard',
      target: 'State-wise performance report',
      outcome: 'Success',
      ipAddress: '103.21.45.101'
    },
    {
      timestamp: '2026-02-03 12:30:15',
      user: 'Rajesh Kumar',
      role: 'Bank Officer',
      action: 'Rejected loan application',
      target: 'APP024 - Insufficient documents',
      outcome: 'Success',
      ipAddress: '103.21.45.167'
    },
    {
      timestamp: '2026-02-03 11:45:22',
      user: 'Sita Devi',
      role: 'Entrepreneur',
      action: 'Completed training module',
      target: 'Digital Payments Basics',
      outcome: 'Success',
      ipAddress: '103.21.45.142'
    },
    {
      timestamp: '2026-02-03 10:15:08',
      user: 'System',
      role: 'Automated',
      action: 'Fraud check executed',
      target: 'APP001 - All checks passed',
      outcome: 'Success',
      ipAddress: 'Internal'
    }
  ];

  const filteredLogs = filterRole === 'all' 
    ? auditLogs 
    : auditLogs.filter(log => log.role.toLowerCase().includes(filterRole.toLowerCase()));

  const securityFeatures = [
    {
      icon: Lock,
      title: 'End-to-End Encryption',
      description: 'All data encrypted in transit and at rest using AES-256',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: Database,
      title: 'India Data Residency',
      description: 'All data stored within India, compliant with data localization norms',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      icon: Eye,
      title: 'Role-Based Access Control (RBAC)',
      description: 'Users see only what they need - entrepreneurs, bank officers, and admins have separate access',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      icon: Shield,
      title: 'Secure Bank Integrations',
      description: 'API integrations with banks use OAuth 2.0 and encrypted channels',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  return (
    <MUDRA2Layout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center">
              <Shield className="text-gray-800" size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-1">Audit Logs & Compliance</h2>
              <p className="text-gray-300">Complete transparency, accountability, and security</p>
            </div>
          </div>
        </div>

        {/* Security Features */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="font-bold text-gray-800 mb-4">Security & Compliance Features</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {securityFeatures.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`${feature.bgColor} rounded-lg p-4 border-2 border-${feature.color.replace('text-', '')}-200`}
                >
                  <div className="flex items-start gap-3">
                    <Icon className={`${feature.color} mt-1`} size={24} />
                    <div>
                      <div className="font-semibold text-gray-800 mb-1">{feature.title}</div>
                      <div className="text-sm text-gray-600">{feature.description}</div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* RBAC Summary */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="font-bold text-gray-800 mb-4">Role-Based Access Control Summary</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left p-3 font-semibold text-gray-700">Role</th>
                  <th className="text-left p-3 font-semibold text-gray-700">Access Level</th>
                  <th className="text-left p-3 font-semibold text-gray-700">Permitted Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-3 font-semibold">Entrepreneur</td>
                  <td className="p-3"><span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">Limited</span></td>
                  <td className="p-3 text-gray-600">View own data, apply for loans, complete training</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-semibold">Bank Officer</td>
                  <td className="p-3"><span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs">Moderate</span></td>
                  <td className="p-3 text-gray-600">Review applications, approve/reject, view fraud alerts</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">MUDRA Admin</td>
                  <td className="p-3"><span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs">Full</span></td>
                  <td className="p-3 text-gray-600">View all data, analytics, audit logs, system configuration</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Audit Logs Table */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-800">System Audit Logs</h3>
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value="all">All Roles</option>
              <option value="entrepreneur">Entrepreneur</option>
              <option value="bank">Bank Officer</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left p-3 font-semibold text-gray-700">Timestamp</th>
                  <th className="text-left p-3 font-semibold text-gray-700">User</th>
                  <th className="text-left p-3 font-semibold text-gray-700">Role</th>
                  <th className="text-left p-3 font-semibold text-gray-700">Action</th>
                  <th className="text-left p-3 font-semibold text-gray-700">Target</th>
                  <th className="text-center p-3 font-semibold text-gray-700">Outcome</th>
                  <th className="text-left p-3 font-semibold text-gray-700">IP Address</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.map((log, idx) => (
                  <motion.tr
                    key={idx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="p-3 text-gray-600">{log.timestamp}</td>
                    <td className="p-3 font-semibold text-gray-800">{log.user}</td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        log.role === 'Admin' ? 'bg-red-100 text-red-700' :
                        log.role === 'Bank Officer' ? 'bg-yellow-100 text-yellow-700' :
                        log.role === 'Entrepreneur' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {log.role}
                      </span>
                    </td>
                    <td className="p-3 text-gray-700">{log.action}</td>
                    <td className="p-3 text-gray-600">{log.target}</td>
                    <td className="p-3 text-center">
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-semibold">
                        ✓ {log.outcome}
                      </span>
                    </td>
                    <td className="p-3 text-gray-500">{log.ipAddress}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Why This is Useful */}
        <div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-5">
          <div className="flex items-start gap-3">
            <TrendingUp className="text-green-600 mt-1" size={24} />
            <div>
              <h3 className="font-bold text-gray-800 mb-2">Why This is Useful?</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• <strong>Transparency:</strong> Every action is logged and traceable</li>
                <li>• <strong>Accountability:</strong> Clear audit trail for governance</li>
                <li>• <strong>Trust building:</strong> Security features ensure data safety</li>
                <li>• <strong>Compliance:</strong> Meets government data protection standards</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </MUDRA2Layout>
  );
}

export default function AuditLogs() {
  return (
    <RoleProvider>
      <AuditLogsContent />
    </RoleProvider>
  );
}