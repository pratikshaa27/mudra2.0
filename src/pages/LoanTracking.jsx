import React, { useState } from 'react';
import { RoleProvider } from '../components/RoleContext';
import MUDRA2Layout from '../components/mudra2/MUDRA2Layout';
import { motion } from 'framer-motion';
import { FileText, CheckCircle, Clock, Send, TrendingUp, Bell, Mail, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

function LoanTrackingContent() {
  const [notificationPrefs, setNotificationPrefs] = useState({
    sms: true,
    whatsapp: true,
    email: true
  });

  const applicationData = {
    applicationId: 'MUDRA2026012345',
    applicantName: 'Sita Devi',
    loanScheme: 'Kishor',
    requestedAmount: 200000,
    purpose: 'Food Processing Equipment',
    status: 'approved',
    submittedDate: '2026-01-15',
    approvedDate: '2026-01-28',
    disbursementDate: '2026-02-05'
  };

  const validations = [
    { name: 'eKYC Verification', status: 'completed', timestamp: '2026-01-15 10:30 AM' },
    { name: 'Bank Account Verification', status: 'completed', timestamp: '2026-01-15 10:32 AM' },
    { name: 'Training Verification', status: 'completed', timestamp: '2026-01-15 10:35 AM' },
    { name: 'Duplicate Check', status: 'completed', timestamp: '2026-01-15 10:33 AM' },
    { name: 'Document Verification', status: 'completed', timestamp: '2026-01-16 02:15 PM' },
    { name: 'Credit Score Assessment', status: 'completed', timestamp: '2026-01-15 10:40 AM' }
  ];

  const statusTimeline = [
    { status: 'Submitted', date: '2026-01-15', completed: true, description: 'Application submitted successfully' },
    { status: 'Under Review', date: '2026-01-16', completed: true, description: 'Bank officer reviewing application' },
    { status: 'Approved', date: '2026-01-28', completed: true, description: 'Loan approved by SBI Nashik Branch' },
    { status: 'Disbursed', date: '2026-02-05', completed: false, description: 'Amount will be credited to your account' }
  ];

  return (
    <MUDRA2Layout>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-700 to-blue-800 text-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center">
              <FileText className="text-blue-700" size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-1">Apply & Track Loan Application</h2>
              <p className="text-blue-100">Real-time status tracking with full transparency</p>
            </div>
          </div>
        </div>

        {/* Application Summary */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-800">Application Summary</h3>
            <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
              ✓ Approved
            </span>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="text-xs text-gray-600">Application ID</div>
              <div className="font-semibold text-gray-800">{applicationData.applicationId}</div>
            </div>
            <div>
              <div className="text-xs text-gray-600">Loan Scheme</div>
              <div className="font-semibold text-gray-800">{applicationData.loanScheme}</div>
            </div>
            <div>
              <div className="text-xs text-gray-600">Loan Amount</div>
              <div className="font-semibold text-gray-800">₹{applicationData.requestedAmount.toLocaleString('en-IN')}</div>
            </div>
            <div>
              <div className="text-xs text-gray-600">Purpose</div>
              <div className="font-semibold text-gray-800">{applicationData.purpose}</div>
            </div>
          </div>
        </div>

        {/* Status Timeline */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="font-bold text-gray-800 mb-6">Application Status Timeline</h3>
          
          <div className="relative">
            {statusTimeline.map((item, idx) => (
              <div key={idx} className="flex gap-4 mb-8 last:mb-0">
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    item.completed ? 'bg-green-500' : 'bg-gray-300'
                  }`}>
                    {item.completed ? (
                      <CheckCircle className="text-white" size={20} />
                    ) : (
                      <Clock className="text-gray-600" size={20} />
                    )}
                  </div>
                  {idx < statusTimeline.length - 1 && (
                    <div className={`w-1 h-16 ${item.completed ? 'bg-green-500' : 'bg-gray-300'}`} />
                  )}
                </div>
                
                <div className="flex-1 pb-8">
                  <div className="font-semibold text-gray-800">{item.status}</div>
                  <div className="text-sm text-gray-600 mb-1">{item.description}</div>
                  <div className="text-xs text-gray-500">{item.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Automated Validations */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="font-bold text-gray-800 mb-4">Automated Validations Checklist</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {validations.map((validation, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg"
              >
                <CheckCircle className="text-green-600" size={20} />
                <div className="flex-1">
                  <div className="font-semibold text-gray-800 text-sm">{validation.name}</div>
                  <div className="text-xs text-gray-500">{validation.timestamp}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="font-bold text-gray-800 mb-4">Notification Preferences</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <MessageSquare className="text-green-600" size={20} />
                <div>
                  <div className="font-semibold text-gray-800">SMS Notifications</div>
                  <div className="text-xs text-gray-600">Get updates via SMS</div>
                </div>
              </div>
              <button
                onClick={() => setNotificationPrefs({...notificationPrefs, sms: !notificationPrefs.sms})}
                className={`px-4 py-2 rounded-lg font-semibold text-sm ${
                  notificationPrefs.sms ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
                }`}
              >
                {notificationPrefs.sms ? 'ON' : 'OFF'}
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Bell className="text-green-600" size={20} />
                <div>
                  <div className="font-semibold text-gray-800">WhatsApp Notifications</div>
                  <div className="text-xs text-gray-600">Get updates via WhatsApp</div>
                </div>
              </div>
              <button
                onClick={() => setNotificationPrefs({...notificationPrefs, whatsapp: !notificationPrefs.whatsapp})}
                className={`px-4 py-2 rounded-lg font-semibold text-sm ${
                  notificationPrefs.whatsapp ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
                }`}
              >
                {notificationPrefs.whatsapp ? 'ON' : 'OFF'}
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Mail className="text-blue-600" size={20} />
                <div>
                  <div className="font-semibold text-gray-800">Email Notifications</div>
                  <div className="text-xs text-gray-600">Get updates via Email</div>
                </div>
              </div>
              <button
                onClick={() => setNotificationPrefs({...notificationPrefs, email: !notificationPrefs.email})}
                className={`px-4 py-2 rounded-lg font-semibold text-sm ${
                  notificationPrefs.email ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'
                }`}
              >
                {notificationPrefs.email ? 'ON' : 'OFF'}
              </button>
            </div>
          </div>
        </div>

        {/* Why This is Useful */}
        <div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-5">
          <div className="flex items-start gap-3">
            <TrendingUp className="text-green-600 mt-1" size={24} />
            <div>
              <h3 className="font-bold text-gray-800 mb-2">Why This is Useful?</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• <strong>Less branch visits:</strong> Track everything online in real-time</li>
                <li>• <strong>Full transparency:</strong> Know exactly where your application stands</li>
                <li>• <strong>Faster processing:</strong> Automated validations reduce manual work</li>
                <li>• <strong>Multi-channel alerts:</strong> Stay informed through SMS, WhatsApp, and email</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </MUDRA2Layout>
  );
}

export default function LoanTracking() {
  return (
    <RoleProvider>
      <LoanTrackingContent />
    </RoleProvider>
  );
}