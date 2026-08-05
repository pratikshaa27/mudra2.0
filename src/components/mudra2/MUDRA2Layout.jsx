import React from 'react';
import Sidebar from './Sidebar';
import RoleSwitcher from './RoleSwitcher';
import { Clock } from 'lucide-react';

export default function MUDRA2Layout({ children }) {
  const [currentTime, setCurrentTime] = React.useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
      <Sidebar />
      
      <div className="flex-1 ml-64">
        {/* Top Bar */}
        <div className="bg-white/80 backdrop-blur-xl border-b border-gray-200 px-8 py-4 sticky top-0 z-40 shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold theme-text-primary">
                MUDRA 2.0 - Digital Empowerment Platform
              </h1>
              <p className="text-xs text-gray-600 mt-1 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Proof of Concept (POC) • Live Demo
              </p>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-sm text-gray-700 bg-gray-100 px-4 py-2 rounded-lg">
                <Clock size={16} className="theme-text-primary" />
                <span className="font-medium">{currentTime.toLocaleTimeString('en-IN')}</span>
              </div>
              <RoleSwitcher />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
  );
}