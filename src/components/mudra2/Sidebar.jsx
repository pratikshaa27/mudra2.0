import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { LayoutDashboard, FileText, Bell, CreditCard, Award, Settings } from 'lucide-react';

const menuItems = [
  { label: 'Dashboard', page: 'Dashboard', icon: LayoutDashboard },
  { label: 'AI Credit Score', page: 'AICreditScore', icon: CreditCard },
  { label: 'Loan Recommendations', page: 'LoanRecommendations', icon: FileText },
  { label: 'Loan Passbook', page: 'LoanPassbook', icon: Award },
  { label: 'Notifications & Support', page: 'NotificationsSupport', icon: Bell },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-4 shrink-0 hidden md:block rounded-2xl shadow-sm">
      <div className="space-y-1">
        {menuItems.map((item) => {
          const path = createPageUrl(item.page);
          const isActive = location.pathname === path;
          const Icon = item.icon;
          return (
            <Link
              key={item.page}
              to={path}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-black transition-all ${
                isActive
                  ? 'bg-red-800 text-white shadow-md'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-amber-50 dark:hover:bg-slate-800'
              }`}
            >
              <Icon size={16} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
