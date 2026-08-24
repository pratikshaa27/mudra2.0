import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from './LanguageContext';
import { useTheme } from './ThemeContext';
import { createPageUrl } from '@/utils';
import {
  Phone, Sparkles, Building2, ShieldCheck, UserCheck,
  Search, Menu, X, ArrowRight, Brain, BookOpen,
  LayoutDashboard, FileText, Globe, Moon, Sun, Award
} from 'lucide-react';

export default function Header({ currentPageName }) {
  const { language, toggleLanguage } = useLanguage();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  const navLinks = [
    { name: language === 'hi' ? 'मुख्य पृष्ठ' : 'Home', path: 'Home', icon: Building2 },
    { name: language === 'hi' ? 'योजनाएं' : 'Schemes Matrix', path: 'PMMYPortal', icon: Award },
    { name: language === 'hi' ? 'एआई क्रेडिट स्कोर' : 'AI Credit Score', path: 'AICreditScore', icon: Brain },
    { name: language === 'hi' ? 'ऋण ट्रैकिंग' : 'Track Loan', path: 'LoanTracking', icon: FileText },
    { name: language === 'hi' ? 'डिजिटल पासबुक' : 'Passbook', path: 'LoanPassbook', icon: BookOpen },
    { name: language === 'hi' ? 'बैंक अफसर कंसोल' : 'Bank Officer', path: 'BankOfficerConsole', icon: UserCheck },
    { name: language === 'hi' ? 'कौशल विकास' : 'Skill Training', path: 'SkillTraining', icon: Sparkles },
    { name: language === 'hi' ? 'एडमिन पोर्टल' : 'Admin Portal', path: 'AdminDashboard', icon: LayoutDashboard },
  ];

  return (
    <header className="w-full z-50 shadow-md">
      {/* 1. TOP GOI STATUTORY BAR */}
      <div className="bg-[#011a39] text-white text-[11px] py-1.5 px-4 border-b border-slate-700/80">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Emblem & Ministry */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-amber-400 font-bold tracking-wide">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Government of India</span>
            </div>
            <span className="text-slate-500">|</span>
            <span className="text-slate-300 font-medium hidden sm:inline">Ministry of Finance</span>
            <span className="text-slate-500 hidden sm:inline">|</span>
            <span className="text-amber-300 font-semibold">SIDBI Subsidiary Entity</span>
          </div>

          {/* Contact, Language & Theme Controls */}
          <div className="flex items-center gap-4 text-slate-300">
            <a
              href="tel:18001801111"
              className="flex items-center gap-1 hover:text-amber-400 transition-colors font-medium"
            >
              <Phone className="w-3 h-3 text-amber-400" />
              <span className="hidden md:inline">Toll-Free Helpline:</span>
              <span className="font-bold text-white">1800-180-1111</span>
            </a>

            <span className="text-slate-600">|</span>

            {/* Language Toggle */}
            <button
              type="button"
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold border border-slate-600 transition-all text-[11px]"
              title="Change Language"
            >
              <Globe className="w-3 h-3 text-amber-400" />
              <span>{language === 'en' ? 'हिंदी' : 'English'}</span>
            </button>

            {/* Light / Dark Mode Toggle Button */}
            <button
              type="button"
              onClick={toggleDarkMode}
              className="flex items-center gap-1.5 px-3 py-1 rounded bg-amber-500 hover:bg-amber-600 text-slate-950 font-black transition-all text-[11px] shadow-sm border border-amber-400"
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-slate-950" />
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-slate-950" />
                  <span>Dark Mode</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 2. MAIN CORPORATE HEADER */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 py-3.5 flex items-center justify-between gap-4">
          {/* Logo & Emblem Branding */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#011a39] to-[#153a5c] text-white flex items-center justify-center font-black text-xl border-2 border-amber-500/80 shadow-md group-hover:scale-105 transition-transform">
              M2
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl text-[#011a39] dark:text-white tracking-tight group-hover:text-amber-600 transition-colors">
                  MUDRA 2.0
                </span>
                <span className="text-[10px] font-extrabold bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-300 px-2 py-0.5 rounded border border-amber-300 dark:border-amber-700 uppercase tracking-wider">
                  PMMY Official
                </span>
              </div>
              <p className="text-[10px] text-slate-600 dark:text-slate-400 font-semibold tracking-tight">
                Micro Units Development & Refinance Agency Ltd.
              </p>
            </div>
          </Link>

          {/* Quick Portal Role Switcher Badges */}
          <div className="hidden lg:flex items-center gap-2 bg-slate-100/80 dark:bg-slate-800/80 p-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold">
            <Link
              to={createPageUrl('EntrepreneurOnboarding')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                location.pathname.includes('Entrepreneur') || location.pathname.includes('LoanApplication')
                  ? 'bg-[#011a39] text-white shadow-sm'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200/70 dark:hover:bg-slate-700'
              }`}
            >
              Borrower / Applicant
            </Link>
            <Link
              to={createPageUrl('BankOfficerConsole')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                location.pathname.includes('BankOfficer')
                  ? 'bg-[#011a39] text-white shadow-sm'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200/70 dark:hover:bg-slate-700'
              }`}
            >
              Bank Officer
            </Link>
            <Link
              to={createPageUrl('AdminDashboard')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                location.pathname.includes('Admin')
                  ? 'bg-[#011a39] text-white shadow-sm'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200/70 dark:hover:bg-slate-700'
              }`}
            >
              CMS Admin
            </Link>
          </div>

          {/* Apply Button & Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            <Link
              to={createPageUrl('EntrepreneurOnboarding')}
              className="px-4 py-2.5 rounded-xl text-xs font-extrabold bg-[#011a39] hover:bg-[#153a5c] text-white shadow-md hover:shadow-lg transition-all flex items-center gap-2 group border border-amber-500/40"
            >
              <span>Apply for MUDRA Loan</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-400 group-hover:translate-x-1 transition-transform" />
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* 3. NAVIGATION BAR */}
      <nav className="bg-[#011a39] text-white border-b border-slate-800 shadow-inner hidden lg:block">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-1 py-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname.includes(link.path) || (currentPageName === link.path);
              return (
                <Link
                  key={link.path}
                  to={createPageUrl(link.path)}
                  className={`px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 shadow-sm font-extrabold'
                      : 'text-slate-200 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-slate-950' : 'text-amber-400'}`} />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Quick Search */}
          <div className="relative py-1">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search scheme, status..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-44 focus:w-60 transition-all text-xs bg-slate-900 border border-slate-700 text-white placeholder-slate-400 pl-8 pr-3 py-1.5 rounded-lg focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>
      </nav>

      {/* 4. MOBILE DRAWER MENU */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 text-white border-b border-slate-800 p-4 space-y-3">
          <div className="grid grid-cols-2 gap-2 mb-3">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={createPageUrl(link.path)}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-800 text-xs font-bold text-slate-200 hover:bg-slate-700 hover:text-white"
                >
                  <Icon className="w-4 h-4 text-amber-400" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
