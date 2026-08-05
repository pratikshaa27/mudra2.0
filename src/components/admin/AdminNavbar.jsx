import React from 'react';
import { LogOut, Home, BarChart3, Users, Settings, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function AdminNavbar({ onLogout, lastUpdated }) {
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title */}
          <div className="flex items-center gap-4">
            <img 
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6978c66565209a38e92b1aa2/282d5f6a9_image.png"
              alt="PMMY"
              className="h-12 w-auto object-contain"
            />
            <div className="border-l border-gray-300 pl-4">
              <h2 className="text-lg font-bold text-gray-800">Admin Dashboard</h2>
              <p className="text-xs text-gray-500">MUDRA Analytics Portal</p>
            </div>
          </div>

          {/* Right Side - Portal Home, Last Updated & Logout */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate(createPageUrl('Home'))}
              className="flex items-center gap-2 text-gray-700 hover:text-red-700 transition-colors"
            >
              <Home size={18} />
              <span className="text-sm font-medium">Portal Home</span>
            </button>
            <div className="hidden md:flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded">
              <Clock size={16} />
              <span>{lastUpdated.toLocaleTimeString()}</span>
            </div>
            <button
              onClick={onLogout}
              className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded flex items-center gap-2 transition-colors text-sm font-medium"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}