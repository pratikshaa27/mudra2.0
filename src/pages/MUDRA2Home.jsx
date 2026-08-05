import React from 'react';
import { RoleProvider, useRole } from '../components/RoleContext';
import MUDRA2Layout from '../components/mudra2/MUDRA2Layout';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { 
  UserPlus, GraduationCap, Brain, AlertTriangle, 
  Lightbulb, FileText, Wallet, Smartphone, 
  Briefcase, BarChart3, Shield, CheckCircle
} from 'lucide-react';

function MUDRA2HomeContent() {
  const { currentRole, roles } = useRole();
  const roleData = roles[currentRole];

  const allFeatures = [
    { 
      title: 'Entrepreneur Onboarding', 
      icon: UserPlus, 
      page: 'EntrepreneurOnboarding',
      description: 'OTP login, guided profile, geo-tagging',
      roles: ['entrepreneur']
    },
    { 
      title: 'Skill India Training', 
      icon: GraduationCap, 
      page: 'SkillTraining',
      description: 'Training modules, certificates, progress tracking',
      roles: ['entrepreneur']
    },
    { 
      title: 'AI Credit Score (Explainable)', 
      icon: Brain, 
      page: 'AICreditScore',
      description: 'Transparent scoring with what-if simulation',
      roles: ['entrepreneur', 'bank', 'admin']
    },
    { 
      title: 'Fraud / Risk Alerts', 
      icon: AlertTriangle, 
      page: 'FraudAlerts',
      description: 'Real-time fraud detection & prevention',
      roles: ['bank', 'admin']
    },
    { 
      title: 'Smart Loan Recommendations', 
      icon: Lightbulb, 
      page: 'LoanRecommendations',
      description: 'AI-matched loan products',
      roles: ['entrepreneur']
    },
    { 
      title: 'Apply & Track Loan', 
      icon: FileText, 
      page: 'LoanTracking',
      description: 'Application + real-time status tracking',
      roles: ['entrepreneur']
    },
    { 
      title: 'Digital Loan Passbook', 
      icon: Wallet, 
      page: 'LoanPassbook',
      description: 'EMI schedule, repayment history',
      roles: ['entrepreneur']
    },
    { 
      title: 'Mobile App Preview', 
      icon: Smartphone, 
      page: 'MobilePreview',
      description: 'Mobile-first experience preview',
      roles: ['entrepreneur', 'admin']
    },
    { 
      title: 'Bank Officer Console', 
      icon: Briefcase, 
      page: 'BankOfficerConsole',
      description: 'Application queue, approve/reject workflow',
      roles: ['bank']
    },
    { 
      title: 'Admin Dashboard', 
      icon: BarChart3, 
      page: 'AdminDashboard',
      description: 'Analytics, heatmaps, policy monitoring',
      roles: ['admin']
    },
    { 
      title: 'Audit Logs & Compliance', 
      icon: Shield, 
      page: 'AuditLogs',
      description: 'RBAC, encryption, audit trails',
      roles: ['admin']
    },
  ];

  const visibleFeatures = allFeatures.filter(f => f.roles.includes(currentRole));

  return (
    <MUDRA2Layout>
      <div className="max-w-6xl mx-auto">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-gradient-to-br from-red-700 via-red-800 to-red-900 text-white rounded-2xl p-8 mb-8 shadow-2xl overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl"></div>
          
          <div className="relative">
            <div className="flex items-center gap-4 mb-4">
              <div className="text-6xl filter drop-shadow-lg">{roleData.avatar}</div>
              <div className="flex-1">
                <div className="text-sm text-amber-200 font-semibold mb-1">Welcome back,</div>
                <h2 className="text-3xl font-black mb-2">{roleData.name}</h2>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <p className="text-red-100 font-medium">{roleData.type}</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 inline-block border border-white/20">
              <p className="text-sm text-amber-100">
                📍 {roleData.district || roleData.bank || roleData.department}
              </p>
            </div>
          </div>
        </motion.div>

        {/* POC Highlights */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-2xl p-6 mb-8 shadow-xl">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-600 rounded-xl shadow-lg">
              <CheckCircle className="text-white" size={28} />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-black text-gray-900 mb-3">POC Objective</h3>
              <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                This portal demonstrates an end-to-end entrepreneur journey with AI-driven credit intelligence, 
                transparent governance, and seamless bank integration for micro-enterprise lending.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="bg-white rounded-xl p-3 shadow-md border border-blue-200 hover:border-blue-400 transition-all">
                  <div className="font-bold text-blue-700 text-sm">✓ Skills + Credit Linkage</div>
                </div>
                <div className="bg-white rounded-xl p-3 shadow-md border border-blue-200 hover:border-blue-400 transition-all">
                  <div className="font-bold text-blue-700 text-sm">✓ Explainable AI Scoring</div>
                </div>
                <div className="bg-white rounded-xl p-3 shadow-md border border-blue-200 hover:border-blue-400 transition-all">
                  <div className="font-bold text-blue-700 text-sm">✓ End-to-End Transparency</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-2xl font-black text-gray-900">Available Features for Your Role</h3>
          <span className="text-sm text-gray-600 bg-gray-200 px-3 py-1 rounded-full font-medium">
            {visibleFeatures.length} modules
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleFeatures.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08, type: "spring", stiffness: 100 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <Link
                  to={createPageUrl(feature.page)}
                  className="group block bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-red-500 overflow-hidden relative"
                >
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-amber-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all">
                      <Icon className="text-white" size={28} />
                    </div>
                    <h4 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-red-700 transition-colors">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                    
                    {/* Arrow indicator */}
                    <div className="mt-4 flex items-center text-red-600 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all">
                      <span>Explore</span>
                      <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </MUDRA2Layout>
  );
}

export default function MUDRA2Home() {
  return (
    <RoleProvider>
      <MUDRA2HomeContent />
    </RoleProvider>
  );
}