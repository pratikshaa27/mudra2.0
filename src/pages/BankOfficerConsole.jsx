import React, { useState } from 'react';
import { RoleProvider } from '../components/RoleContext';
import MUDRA2Layout from '../components/mudra2/MUDRA2Layout';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, User, FileText, CheckCircle, XCircle, Clock, AlertTriangle, TrendingUp, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

function BankOfficerConsoleContent() {
  const [selectedApp, setSelectedApp] = useState(null);
  const [actionType, setActionType] = useState(null);
  const [rejectReason, setRejectReason] = useState('');

  const applications = [
    {
      id: 'APP001',
      applicantName: 'Sita Devi',
      scheme: 'Kishor',
      amount: 200000,
      status: 'pending',
      submittedDate: '2026-01-15',
      aiScore: 742,
      district: 'Nashik, MH',
      sector: 'Food Processing',
      training: ['Entrepreneurship Basics', 'Food Processing & Packaging'],
      riskFlags: 0,
      priority: 'high'
    },
    {
      id: 'APP002',
      applicantName: 'Ramesh Patil',
      scheme: 'Shishu',
      amount: 40000,
      status: 'pending',
      submittedDate: '2026-01-18',
      aiScore: 685,
      district: 'Pune, MH',
      sector: 'Retail Trading',
      training: ['Entrepreneurship Basics'],
      riskFlags: 0,
      priority: 'medium'
    },
    {
      id: 'APP003',
      applicantName: 'Anjali Verma',
      scheme: 'Kishor',
      amount: 350000,
      status: 'review_needed',
      submittedDate: '2026-01-20',
      aiScore: 598,
      district: 'Mumbai, MH',
      sector: 'Manufacturing',
      training: [],
      riskFlags: 2,
      priority: 'low'
    }
  ];

  const rejectReasons = [
    'Incomplete documentation',
    'Insufficient credit score',
    'Duplicate application detected',
    'Business plan not viable',
    'Income verification failed',
    'Other (specify in notes)'
  ];

  const handleAction = (type) => {
    setActionType(type);
  };

  const confirmAction = () => {
    alert(`Application ${actionType === 'approve' ? 'approved' : 'rejected'} successfully!`);
    setSelectedApp(null);
    setActionType(null);
    setRejectReason('');
  };

  return (
    <MUDRA2Layout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-700 to-blue-800 text-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center">
              <Briefcase className="text-blue-700" size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-1">Bank Officer Console</h2>
              <p className="text-blue-100">Application queue and approval workflow</p>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="text-2xl font-bold text-blue-600">{applications.length}</div>
            <div className="text-sm text-gray-600">Pending Review</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="text-2xl font-bold text-green-600">12</div>
            <div className="text-sm text-gray-600">Approved Today</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="text-2xl font-bold text-orange-600">4.2</div>
            <div className="text-sm text-gray-600">Avg Process Days</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="text-2xl font-bold text-purple-600">98%</div>
            <div className="text-sm text-gray-600">Approval Rate</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Application Queue */}
          <div className="bg-white rounded-lg shadow-md p-5">
            <h3 className="font-bold text-gray-800 mb-4">Application Queue</h3>
            
            <div className="space-y-3">
              {applications.map((app, idx) => (
                <motion.div
                  key={app.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => setSelectedApp(app)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedApp?.id === app.id 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="font-bold text-gray-800">{app.applicantName}</div>
                      <div className="text-xs text-gray-600">{app.id} • {app.district}</div>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      app.priority === 'high' ? 'bg-red-100 text-red-700' :
                      app.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {app.priority}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm mb-2">
                    <span className="font-semibold text-blue-700">{app.scheme}</span>
                    <span className="text-gray-600">₹{app.amount.toLocaleString('en-IN')}</span>
                    <span className="text-gray-500">{app.sector}</span>
                  </div>

                  <div className="flex items-center gap-3 text-xs">
                    <div className="bg-green-100 text-green-700 px-2 py-1 rounded">Score: {app.aiScore}</div>
                    {app.riskFlags > 0 && (
                      <div className="bg-red-100 text-red-700 px-2 py-1 rounded">{app.riskFlags} Risk Flags</div>
                    )}
                    <div className="text-gray-500">{app.submittedDate}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Applicant Details Drawer */}
          <div className="bg-white rounded-lg shadow-md p-5">
            {!selectedApp ? (
              <div className="text-center py-16 text-gray-400">
                <FileText size={64} className="mx-auto mb-4 opacity-30" />
                <p>Select an application to view details</p>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="text-blue-700" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg">{selectedApp.applicantName}</h3>
                    <p className="text-sm text-gray-600">{selectedApp.id}</p>
                  </div>
                </div>

                {/* AI Score */}
                <div className="bg-gradient-to-r from-purple-100 to-purple-200 rounded-lg p-4 mb-4">
                  <div className="text-sm text-gray-700 mb-2">AI Credit Score</div>
                  <div className="text-4xl font-bold text-purple-700 mb-2">{selectedApp.aiScore}</div>
                  <div className="text-xs text-gray-600">
                    Strong score - Training completed, stable income, low existing EMI
                  </div>
                </div>

                {/* Training Certificates */}
                <div className="mb-4">
                  <div className="font-semibold text-gray-800 text-sm mb-2">Training Certificates</div>
                  {selectedApp.training.length > 0 ? (
                    <div className="space-y-2">
                      {selectedApp.training.map((cert, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm bg-green-50 p-2 rounded">
                          <Award className="text-green-600" size={16} />
                          <span className="text-gray-700">{cert}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-sm text-gray-500">No training completed</div>
                  )}
                </div>

                {/* Risk Flags */}
                <div className="mb-4">
                  <div className="font-semibold text-gray-800 text-sm mb-2">Risk Assessment</div>
                  {selectedApp.riskFlags === 0 ? (
                    <div className="bg-green-50 border border-green-200 rounded p-3 text-sm text-green-700 flex items-center gap-2">
                      <CheckCircle size={16} />
                      No risk flags detected
                    </div>
                  ) : (
                    <div className="bg-red-50 border border-red-200 rounded p-3 text-sm text-red-700 flex items-center gap-2">
                      <AlertTriangle size={16} />
                      {selectedApp.riskFlags} risk flags - needs review
                    </div>
                  )}
                </div>

                {/* Document Checklist */}
                <div className="mb-4">
                  <div className="font-semibold text-gray-800 text-sm mb-2">Document Checklist</div>
                  <div className="space-y-2 text-sm">
                    {['Aadhar Card', 'PAN Card', 'Bank Statement', 'Business Plan', 'Photographs'].map((doc, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle className="text-green-600" size={14} />
                        <span className="text-gray-700">{doc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                {!actionType ? (
                  <div className="flex gap-3">
                    <Button
                      onClick={() => handleAction('approve')}
                      className="flex-1 bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle size={16} className="mr-2" />
                      Approve
                    </Button>
                    <Button
                      onClick={() => handleAction('reject')}
                      className="flex-1 bg-red-600 hover:bg-red-700"
                    >
                      <XCircle size={16} className="mr-2" />
                      Reject
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1"
                    >
                      <Clock size={16} className="mr-2" />
                      Clarify
                    </Button>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-3"
                  >
                    {actionType === 'reject' && (
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">
                          Reason for Rejection (Required)
                        </label>
                        <select
                          value={rejectReason}
                          onChange={(e) => setRejectReason(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2"
                        >
                          <option value="">Select reason</option>
                          {rejectReasons.map(r => <option key={r} value={r}>{r}</option>)}
                        </select>
                        <Textarea placeholder="Additional notes (optional)" className="h-20" />
                      </div>
                    )}
                    
                    <div className="flex gap-3">
                      <Button
                        onClick={() => setActionType(null)}
                        variant="outline"
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={confirmAction}
                        className={`flex-1 ${
                          actionType === 'approve' ? 'bg-green-600' : 'bg-red-600'
                        }`}
                        disabled={actionType === 'reject' && !rejectReason}
                      >
                        Confirm {actionType === 'approve' ? 'Approval' : 'Rejection'}
                      </Button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </div>
        </div>

        {/* Why This is Useful */}
        <div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-5">
          <div className="flex items-start gap-3">
            <TrendingUp className="text-green-600 mt-1" size={24} />
            <div>
              <h3 className="font-bold text-gray-800 mb-2">Why This is Useful?</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• <strong>Faster processing:</strong> All information in one place reduces review time</li>
                <li>• <strong>Consistent decisions:</strong> AI score + training data ensures fair evaluation</li>
                <li>• <strong>Risk visibility:</strong> Fraud alerts help prevent bad loans</li>
                <li>• <strong>Audit trail:</strong> Every action is logged with reason and timestamp</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </MUDRA2Layout>
  );
}

export default function BankOfficerConsole() {
  return (
    <RoleProvider>
      <BankOfficerConsoleContent />
    </RoleProvider>
  );
}