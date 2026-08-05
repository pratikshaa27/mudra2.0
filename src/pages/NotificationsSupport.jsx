import React, { useState } from 'react';
import { RoleProvider } from '../components/RoleContext';
import MUDRA2Layout from '../components/mudra2/MUDRA2Layout';
import { motion } from 'framer-motion';
import { Bell, MessageSquare, Mail, Phone, HelpCircle, TrendingUp, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

function NotificationsSupportContent() {
  const [activeTab, setActiveTab] = useState('notifications');

  const notifications = [
    {
      id: 1,
      type: 'success',
      icon: CheckCircle,
      title: 'Loan Approved',
      message: 'Your Kishor loan application has been approved for ₹2,00,000',
      timestamp: '2 hours ago',
      read: false,
      channels: ['SMS', 'WhatsApp', 'Email']
    },
    {
      id: 2,
      type: 'reminder',
      icon: Bell,
      title: 'Training Completion',
      message: 'Complete "Digital Payments Basics" to boost your credit score by +30 points',
      timestamp: '1 day ago',
      read: false,
      channels: ['WhatsApp', 'Email']
    },
    {
      id: 3,
      type: 'alert',
      icon: MessageSquare,
      title: 'EMI Due Soon',
      message: 'Your next EMI of ₹10,500 is due on 05-Feb-2026 (in 2 days)',
      timestamp: '3 hours ago',
      read: true,
      channels: ['SMS', 'WhatsApp']
    }
  ];

  return (
    <MUDRA2Layout>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-cyan-700 to-cyan-800 text-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center">
              <Bell className="text-cyan-700" size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-1">Notifications & Support</h2>
              <p className="text-cyan-100">Stay informed and get help when needed</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-6">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('notifications')}
              className={`flex-1 py-4 font-semibold transition-colors ${
                activeTab === 'notifications'
                  ? 'text-cyan-700 border-b-2 border-cyan-700'
                  : 'text-gray-500'
              }`}
            >
              Notifications
            </button>
            <button
              onClick={() => setActiveTab('support')}
              className={`flex-1 py-4 font-semibold transition-colors ${
                activeTab === 'support'
                  ? 'text-cyan-700 border-b-2 border-cyan-700'
                  : 'text-gray-500'
              }`}
            >
              Support & Help
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'notifications' && (
              <div className="space-y-4">
                {notifications.map((notif, idx) => {
                  const Icon = notif.icon;
                  return (
                    <motion.div
                      key={notif.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className={`p-4 rounded-lg border-2 ${
                        notif.read ? 'bg-gray-50 border-gray-200' : 'bg-blue-50 border-blue-300'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          notif.type === 'success' ? 'bg-green-500' :
                          notif.type === 'reminder' ? 'bg-blue-500' :
                          'bg-orange-500'
                        }`}>
                          <Icon className="text-white" size={20} />
                        </div>
                        <div className="flex-1">
                          <div className="font-bold text-gray-800 mb-1">{notif.title}</div>
                          <div className="text-sm text-gray-600 mb-2">{notif.message}</div>
                          <div className="flex items-center gap-3">
                            <span className="text-xs text-gray-500">{notif.timestamp}</span>
                            <div className="flex gap-2">
                              {notif.channels.map(ch => (
                                <span key={ch} className="bg-white px-2 py-0.5 rounded text-xs text-gray-600 border">
                                  {ch}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        {!notif.read && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}

            {activeTab === 'support' && (
              <div className="space-y-6">
                {/* Contact Options */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4 text-center">
                    <Phone className="text-blue-600 mx-auto mb-2" size={32} />
                    <div className="font-semibold text-gray-800">Helpline</div>
                    <div className="text-sm text-gray-600 mb-2">1800-180-MUDRA</div>
                    <Button size="sm" className="bg-blue-600">Call Now</Button>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4 text-center">
                    <MessageSquare className="text-green-600 mx-auto mb-2" size={32} />
                    <div className="font-semibold text-gray-800">WhatsApp Support</div>
                    <div className="text-sm text-gray-600 mb-2">+91-9876543210</div>
                    <Button size="sm" className="bg-green-600">Chat</Button>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-4 text-center">
                    <Mail className="text-orange-600 mx-auto mb-2" size={32} />
                    <div className="font-semibold text-gray-800">Email Support</div>
                    <div className="text-sm text-gray-600 mb-2">support@mudra.org.in</div>
                    <Button size="sm" className="bg-orange-600">Email</Button>
                  </div>
                </div>

                {/* FAQ */}
                <div>
                  <h4 className="font-bold text-gray-800 mb-3">Frequently Asked Questions</h4>
                  <div className="space-y-3">
                    {[
                      'How do I check my loan application status?',
                      'What documents are required for Kishor loan?',
                      'How does training affect my credit score?',
                      'How can I pay my EMI online?'
                    ].map((q, idx) => (
                      <div key={idx} className="bg-gray-50 rounded-lg p-3 flex items-center gap-3 hover:bg-gray-100 cursor-pointer">
                        <HelpCircle className="text-gray-400" size={18} />
                        <span className="text-sm text-gray-700">{q}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Raise a Ticket */}
                <div>
                  <h4 className="font-bold text-gray-800 mb-3">Raise a Support Ticket</h4>
                  <div className="space-y-3">
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                      <option>Select Issue Type</option>
                      <option>Application Status Query</option>
                      <option>Document Upload Issue</option>
                      <option>Training Module Access</option>
                      <option>EMI Payment Problem</option>
                      <option>Other</option>
                    </select>
                    <Textarea placeholder="Describe your issue in detail..." className="h-24" />
                    <Button className="w-full bg-cyan-700">Submit Ticket</Button>
                  </div>
                </div>
              </div>
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
                <li>• <strong>Multi-channel reach:</strong> SMS, WhatsApp, and email ensure everyone is informed</li>
                <li>• <strong>Timely reminders:</strong> Reduce missed EMIs and defaults</li>
                <li>• <strong>Quick support access:</strong> Help available through multiple channels</li>
                <li>• <strong>Better user experience:</strong> Proactive communication builds trust</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </MUDRA2Layout>
  );
}

export default function NotificationsSupport() {
  return (
    <RoleProvider>
      <NotificationsSupportContent />
    </RoleProvider>
  );
}