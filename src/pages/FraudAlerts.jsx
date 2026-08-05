import React from 'react';
import { RoleProvider } from '../components/RoleContext';
import MUDRA2Layout from '../components/mudra2/MUDRA2Layout';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, AlertCircle, XCircle, Shield, TrendingUp } from 'lucide-react';

function FraudAlertsContent() {
  const alerts = [
    {
      check: 'Duplicate Application Check',
      status: 'clear',
      details: 'No duplicate applications found for Sita Devi',
      timestamp: '2 mins ago'
    },
    {
      check: 'Location Mismatch (Geo-tag)',
      status: 'clear',
      details: 'Application location matches profile address - Nashik, MH',
      timestamp: '2 mins ago'
    },
    {
      check: 'Document Anomaly Detection',
      status: 'review',
      details: 'Bank statement date range verification pending',
      timestamp: '5 mins ago'
    },
    {
      check: 'Multiple Applications (Same Device)',
      status: 'clear',
      details: 'Single application detected from this device',
      timestamp: '2 mins ago'
    },
    {
      check: 'Identity Verification (eKYC)',
      status: 'clear',
      details: 'Aadhar verification completed successfully',
      timestamp: '10 mins ago'
    },
    {
      check: 'Bank Account Validation',
      status: 'clear',
      details: 'Active bank account confirmed with 6-month history',
      timestamp: '8 mins ago'
    },
    {
      check: 'Suspicious Pattern Detection',
      status: 'risk',
      details: 'Similar application submitted 3 months ago (rejected)',
      timestamp: '1 min ago'
    }
  ];

  const getStatusIcon = (status) => {
    if (status === 'clear') return <CheckCircle className="text-green-600" size={24} />;
    if (status === 'review') return <AlertCircle className="text-yellow-600" size={24} />;
    return <XCircle className="text-red-600" size={24} />;
  };

  const getStatusBadge = (status) => {
    if (status === 'clear') return 'bg-green-100 text-green-700 border-green-300';
    if (status === 'review') return 'bg-yellow-100 text-yellow-700 border-yellow-300';
    return 'bg-red-100 text-red-700 border-red-300';
  };

  const clearCount = alerts.filter(a => a.status === 'clear').length;
  const reviewCount = alerts.filter(a => a.status === 'review').length;
  const riskCount = alerts.filter(a => a.status === 'risk').length;

  return (
    <MUDRA2Layout>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-600 to-yellow-700 text-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center">
              <Shield className="text-yellow-600" size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-1">Risk & Fraud Alerts</h2>
              <p className="text-yellow-100">Real-time fraud detection and prevention</p>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-md p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="text-green-600" size={20} />
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">{clearCount}</div>
                <div className="text-xs text-gray-600">Clear</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="text-yellow-600" size={20} />
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-600">{reviewCount}</div>
                <div className="text-xs text-gray-600">Needs Review</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <XCircle className="text-red-600" size={20} />
              </div>
              <div>
                <div className="text-2xl font-bold text-red-600">{riskCount}</div>
                <div className="text-xs text-gray-600">High Risk</div>
              </div>
            </div>
          </div>
        </div>

        {/* Alert List */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="font-bold text-gray-800 mb-4">Fraud Detection Results</h3>
          
          <div className="space-y-3">
            {alerts.map((alert, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={`flex items-start gap-4 p-4 border-2 rounded-lg ${getStatusBadge(alert.status)}`}
              >
                {getStatusIcon(alert.status)}
                <div className="flex-1">
                  <div className="font-semibold text-gray-800 mb-1">{alert.check}</div>
                  <div className="text-sm text-gray-600 mb-2">{alert.details}</div>
                  <div className="text-xs text-gray-500">{alert.timestamp}</div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${
                  alert.status === 'clear' ? 'bg-green-200 text-green-800' :
                  alert.status === 'review' ? 'bg-yellow-200 text-yellow-800' :
                  'bg-red-200 text-red-800'
                }`}>
                  {alert.status === 'clear' ? '✓ Clear' : alert.status === 'review' ? '⚠ Review' : '✗ Risk'}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Why This is Useful */}
        <div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-5">
          <div className="flex items-start gap-3">
            <TrendingUp className="text-green-600 mt-1" size={24} />
            <div>
              <h3 className="font-bold text-gray-800 mb-2">Why This is Useful?</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• <strong>Proactive fraud prevention:</strong> Detect issues before disbursement</li>
                <li>• <strong>Better governance:</strong> Reduce NPAs and financial leakage</li>
                <li>• <strong>Fair lending:</strong> Ensure genuine entrepreneurs get access</li>
                <li>• <strong>Real-time monitoring:</strong> Instant alerts for suspicious patterns</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </MUDRA2Layout>
  );
}

export default function FraudAlerts() {
  return (
    <RoleProvider>
      <FraudAlertsContent />
    </RoleProvider>
  );
}