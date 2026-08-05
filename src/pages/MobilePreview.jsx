import React, { useState } from 'react';
import { RoleProvider } from '../components/RoleContext';
import MUDRA2Layout from '../components/mudra2/MUDRA2Layout';
import { motion } from 'framer-motion';
import { Smartphone, Bell, CheckCircle, GraduationCap, Wallet, TrendingUp } from 'lucide-react';

function MobilePreviewContent() {
  const [language, setLanguage] = useState('hindi');

  const notifications = {
    english: [
      { 
        icon: CheckCircle, 
        title: 'Loan Approved! 🎉', 
        message: 'Your Kishor loan of ₹2,00,000 has been approved. Amount will be disbursed on 05-Feb-2026.',
        time: '2 hours ago',
        color: 'bg-green-500'
      },
      { 
        icon: GraduationCap, 
        title: 'Training Reminder', 
        message: 'Complete "Digital Payments Basics" to earn +30 credit score points.',
        time: '1 day ago',
        color: 'bg-blue-500'
      },
      { 
        icon: Wallet, 
        title: 'EMI Reminder', 
        message: 'Your next EMI of ₹10,500 is due on 05-Feb-2026 (in 2 days)',
        time: '3 hours ago',
        color: 'bg-orange-500'
      }
    ],
    hindi: [
      { 
        icon: CheckCircle, 
        title: 'लोन स्वीकृत! 🎉', 
        message: 'आपका ₹2,00,000 का किशोर लोन स्वीकृत हो गया है। राशि 05-फरवरी-2026 को जमा की जाएगी।',
        time: '2 घंटे पहले',
        color: 'bg-green-500'
      },
      { 
        icon: GraduationCap, 
        title: 'प्रशिक्षण रिमाइंडर', 
        message: '"डिजिटल पेमेंट बेसिक्स" पूरा करें और +30 क्रेडिट स्कोर अंक प्राप्त करें।',
        time: '1 दिन पहले',
        color: 'bg-blue-500'
      },
      { 
        icon: Wallet, 
        title: 'EMI रिमाइंडर', 
        message: 'आपकी अगली ₹10,500 की EMI 05-फरवरी-2026 को देय है (2 दिन में)',
        time: '3 घंटे पहले',
        color: 'bg-orange-500'
      }
    ]
  };

  const currentNotifications = notifications[language];

  return (
    <MUDRA2Layout>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-700 to-pink-800 text-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center">
              <Smartphone className="text-pink-700" size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-1">Mobile App Preview</h2>
              <p className="text-pink-100">Mobile-first experience for rural and low-tech users</p>
            </div>
          </div>
        </div>

        {/* Language Selector */}
        <div className="text-center mb-6">
          <div className="inline-flex bg-white rounded-lg shadow-md p-1">
            <button
              onClick={() => setLanguage('english')}
              className={`px-6 py-2 rounded-lg font-semibold text-sm transition-colors ${
                language === 'english' ? 'bg-pink-600 text-white' : 'text-gray-600'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLanguage('hindi')}
              className={`px-6 py-2 rounded-lg font-semibold text-sm transition-colors ${
                language === 'hindi' ? 'bg-pink-600 text-white' : 'text-gray-600'
              }`}
            >
              हिंदी (Hindi)
            </button>
          </div>
        </div>

        <div className="flex justify-center">
          {/* Mobile Frame */}
          <div className="relative">
            {/* Phone Frame */}
            <div className="w-[375px] h-[700px] bg-gray-900 rounded-[3rem] p-4 shadow-2xl">
              {/* Notch */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-7 bg-gray-900 rounded-b-3xl z-10"></div>
              
              {/* Screen */}
              <div className="bg-white h-full rounded-[2.5rem] overflow-hidden">
                {/* Status Bar */}
                <div className="bg-pink-700 text-white px-6 py-3 flex justify-between items-center text-xs">
                  <span className="font-semibold">MUDRA 2.0</span>
                  <span>2:17 PM</span>
                </div>

                {/* App Content */}
                <div className="p-4 h-full overflow-y-auto bg-gray-50">
                  {/* Header */}
                  <div className="bg-gradient-to-r from-pink-600 to-pink-700 text-white rounded-xl p-4 mb-4">
                    <div className="text-2xl mb-1">👩‍🌾</div>
                    <div className="font-bold text-lg">Sita Devi</div>
                    <div className="text-xs text-pink-100">Nashik, Maharashtra</div>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-white rounded-lg p-3 shadow">
                      <div className="text-xs text-gray-600">Credit Score</div>
                      <div className="text-xl font-bold text-green-600">742</div>
                    </div>
                    <div className="bg-white rounded-lg p-3 shadow">
                      <div className="text-xs text-gray-600">Active Loan</div>
                      <div className="text-xl font-bold text-blue-600">₹2.0L</div>
                    </div>
                  </div>

                  {/* Notifications */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Bell size={16} className="text-gray-700" />
                      <span className="font-bold text-gray-800 text-sm">
                        {language === 'hindi' ? 'सूचनाएं' : 'Notifications'}
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      {currentNotifications.map((notif, idx) => {
                        const Icon = notif.icon;
                        return (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white rounded-lg p-3 shadow-sm border border-gray-200"
                          >
                            <div className="flex items-start gap-3">
                              <div className={`w-8 h-8 ${notif.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                                <Icon className="text-white" size={16} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="font-semibold text-gray-800 text-xs mb-1">{notif.title}</div>
                                <div className="text-xs text-gray-600 leading-relaxed mb-1">{notif.message}</div>
                                <div className="text-xs text-gray-400">{notif.time}</div>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="grid grid-cols-2 gap-2">
                    <button className="bg-blue-600 text-white rounded-lg p-3 text-xs font-semibold">
                      {language === 'hindi' ? 'EMI भुगतान करें' : 'Pay EMI'}
                    </button>
                    <button className="bg-green-600 text-white rounded-lg p-3 text-xs font-semibold">
                      {language === 'hindi' ? 'प्रशिक्षण देखें' : 'View Training'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Why This is Useful */}
        <div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-5 mt-6">
          <div className="flex items-start gap-3">
            <TrendingUp className="text-green-600 mt-1" size={24} />
            <div>
              <h3 className="font-bold text-gray-800 mb-2">Why This is Useful?</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• <strong>Mobile-first inclusion:</strong> Most rural users access services via mobile</li>
                <li>• <strong>Regional language support:</strong> Breaks literacy barriers</li>
                <li>• <strong>Push notifications:</strong> Timely reminders improve repayment rates</li>
                <li>• <strong>Low-tech friendly:</strong> Simple UI for users with limited digital skills</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </MUDRA2Layout>
  );
}

export default function MobilePreview() {
  return (
    <RoleProvider>
      <MobilePreviewContent />
    </RoleProvider>
  );
}