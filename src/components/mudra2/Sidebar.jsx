import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { 
  Home, UserPlus, GraduationCap, Brain, AlertTriangle, 
  Lightbulb, FileText, Wallet, Bell, Smartphone, 
  Briefcase, BarChart3, Shield, FileCheck
} from 'lucide-react';

export default function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { name: 'Home / Overview', icon: Home, page: 'MUDRA2Home' },
    { name: 'Entrepreneur Onboarding', icon: UserPlus, page: 'EntrepreneurOnboarding' },
    { name: 'Skill India Training', icon: GraduationCap, page: 'SkillTraining' },
    { name: 'AI Credit Score', icon: Brain, page: 'AICreditScore' },
    { name: 'Fraud / Risk Alerts', icon: AlertTriangle, page: 'FraudAlerts' },
    { name: 'Loan Recommendations', icon: Lightbulb, page: 'LoanRecommendations' },
    { name: 'Apply & Track Loan', icon: FileText, page: 'LoanTracking' },
    { name: 'Digital Loan Passbook', icon: Wallet, page: 'LoanPassbook' },
    { name: 'Notifications & Support', icon: Bell, page: 'NotificationsSupport' },
    { name: 'Mobile App Preview', icon: Smartphone, page: 'MobilePreview' },
    { name: 'Bank Officer Console', icon: Briefcase, page: 'BankOfficerConsole' },
    { name: 'Admin Dashboard', icon: BarChart3, page: 'AdminDashboard' },
    { name: 'Audit Logs & Compliance', icon: Shield, page: 'AuditLogs' },
    { name: 'POC Scope & Next Steps', icon: FileCheck, page: 'POCScope' },
  ];

  const isActive = (page) => {
    return location.pathname === createPageUrl(page) || location.pathname === `/${page}`;
  };

  return (
    <div className="w-64 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white h-screen overflow-y-auto fixed left-0 top-0 shadow-2xl border-r border-gray-700">
      {/* Logo */}
      <div className="p-6 border-b border-gray-700 theme-bg-gradient">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-lg">
            <img 
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6978c66565209a38e92b1aa2/282d5f6a9_image.png"
              alt="MUDRA"
              className="w-12 h-12 object-contain"
            />
          </div>
          <div>
            <div className="font-bold text-xl tracking-tight">MUDRA 2.0</div>
            <div className="text-xs font-medium" style={{ color: 'var(--theme-accent)' }}>Digital Empowerment</div>
          </div>
        </div>
      </div>

      {/* Menu */}
      <nav className="p-4 space-y-1">
        {menuItems.map((item, idx) => {
          const Icon = item.icon;
          const active = isActive(item.page);
          return (
            <Link
              key={idx}
              to={createPageUrl(item.page)}
              className={`group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                active
                  ? 'theme-bg-gradient text-white shadow-lg'
                  : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
              }`}
            >
              <div className={`p-2 rounded-lg transition-all ${
                active 
                  ? 'bg-white/20' 
                  : 'bg-gray-700/50 group-hover:bg-gray-600/50'
              }`}>
                <Icon size={18} />
              </div>
              <span className="text-sm font-medium">{item.name}</span>
              {active && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: 'var(--theme-accent)' }}></div>
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}