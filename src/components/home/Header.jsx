import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Menu, X, ChevronDown, Search, LogIn, Clock, Globe, Sun, Moon, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../LanguageContext';
import { useTheme } from '../ThemeContext';

export default function Header() {
  const { language, toggleLanguage, t } = useLanguage();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const menuItems = [
    { label: t('home'), href: createPageUrl('Home') },
    { 
      label: t('aboutUs'), 
      href: createPageUrl('About'),
      dropdown: [
        { label: 'Vision & Mission', href: `${createPageUrl('About')}?tab=vision` },
        { label: 'Genesis & Role of MUDRA', href: `${createPageUrl('About')}?tab=genesis` },
        { label: 'Organization Structure', href: `${createPageUrl('About')}?tab=structure` },
        { label: 'Board of Directors', href: `${createPageUrl('About')}?tab=board` },
        { label: 'Management Team', href: `${createPageUrl('About')}?tab=management` },
        { label: 'Shareholders', href: `${createPageUrl('About')}?tab=shareholders` },
        { label: 'Partner Institutions (MLI)', href: `${createPageUrl('About')}?tab=partners` }
      ]
    },
    { 
      label: t('offerings'), 
      href: createPageUrl('Offerings'),
      dropdown: [
        { label: 'Shishu (Up to ₹50,000)', href: `${createPageUrl('Offerings')}?scheme=shishu` },
        { label: 'Kishore (₹50,000 - ₹5 Lakh)', href: `${createPageUrl('Offerings')}?scheme=kishore` },
        { label: 'Tarun (₹5 Lakh - ₹10 Lakh)', href: `${createPageUrl('Offerings')}?scheme=tarun` },
        { label: 'TarunPlus (₹10 Lakh - ₹20 Lakh)', href: `${createPageUrl('Offerings')}?scheme=tarunplus` },
        { label: 'Apply via JanSamarth', href: 'https://www.jansamarth.in/login' },
        { label: 'Eligibility & Interest Rates', href: createPageUrl('Offerings') }
      ]
    },
    { 
      label: t('financials'), 
      href: createPageUrl('Financials'),
      dropdown: [
        { label: 'Annual Reports', href: `${createPageUrl('Financials')}?tab=annual` },
        { label: 'Public Disclosures', href: `${createPageUrl('Financials')}?tab=disclosures` },
        { label: 'MGT-7', href: `${createPageUrl('Financials')}?tab=mgt7` }
      ]
    },
    { label: t('faq'), href: createPageUrl('FAQ') },
    { label: t('gallery'), href: createPageUrl('Gallery') },
    { 
      label: t('successStories'), 
      href: createPageUrl('SuccessStories'),
      dropdown: [
        { label: 'Women Entrepreneurs', href: `${createPageUrl('SuccessStories')}?cat=women` },
        { label: 'Youth MSME Achievers', href: `${createPageUrl('SuccessStories')}?cat=youth` },
        { label: 'Rural Enterprise Success', href: `${createPageUrl('SuccessStories')}?cat=rural` }
      ]
    },
    { 
      label: t('careers') || 'CAREERS', 
      href: createPageUrl('Careers'),
      dropdown: [
        { label: 'Current Openings', href: createPageUrl('Careers') },
        { label: 'Why Join MUDRA', href: createPageUrl('Careers') },
        { label: 'Application Process', href: createPageUrl('Careers') },
        { label: 'Employee Benefits', href: createPageUrl('Careers') }
      ]
    },
    { label: t('contactUs'), href: createPageUrl('Contact') },
  ];

  const formatDate = (date) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  return (
    <header className="w-full relative z-50">
      {/* Animated GoI Tricolor Top Accent */}
      <div className="h-1.5 w-full flex overflow-hidden">
        <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} transition={{ duration: 0.8 }} className="h-full w-1/3 bg-[#f97316]" />
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="h-full w-1/3 bg-white" />
        <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} transition={{ duration: 0.8 }} className="h-full w-1/3 bg-[#16a34a]" />
      </div>

      {/* Top Statutory Header Bar */}
      <div className="bg-[#0f2942] dark:bg-slate-950 text-white text-xs py-2 px-4 border-b border-slate-700">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          
          {/* Left Emblem & Ministry */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 font-bold text-amber-400">
              <Shield size={14} className="text-amber-400 animate-pulse" />
              <span>Government of India</span>
            </div>
            <span className="text-slate-600">|</span>
            <span className="text-slate-300 font-medium hidden sm:inline">Ministry of Finance</span>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <span className="text-emerald-400 font-semibold hidden md:inline">SIDBI Subsidiary Entity</span>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-4 text-slate-300">
            <div className="hidden lg:flex items-center gap-2 text-[11px] bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              <Clock size={12} className="text-amber-400 animate-pulse" />
              <span>{formatDate(currentTime)}</span>
              <span className="font-bold text-white pl-1">{formatTime(currentTime)}</span>
            </div>

            {/* Language Switcher */}
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 border border-slate-600 text-amber-300 font-bold transition-all text-[11px]"
            >
              <Globe size={12} className="text-amber-400" />
              <span>{language === 'en' ? 'हिंदी' : 'English'}</span>
            </motion.button>

            {/* Light / Dark Mode Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={toggleDarkMode}
              className="flex items-center gap-1.5 px-3 py-1 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-[11px] transition-all shadow-sm"
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? <Sun size={12} /> : <Moon size={12} />}
              <span>{isDarkMode ? 'Light' : 'Dark'}</span>
            </motion.button>

            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <Link 
                to={createPageUrl('PMMYPortal')}
                className="bg-red-800 hover:bg-red-900 text-white px-3.5 py-1 rounded-lg flex items-center gap-1.5 text-[11px] font-extrabold shadow transition-all border border-red-700"
              >
                <LogIn size={13} className="text-amber-300" />
                <span>{t('loginPortal')}</span>
              </Link>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Main White Logo Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 py-3.5 flex items-center justify-between gap-4">
          <motion.div whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 300 }}>
            <Link to={createPageUrl('Home')} className="flex items-center gap-3">
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6978c66565209a38e92b1aa2/282d5f6a9_image.png"
                alt="Pradhan Mantri MUDRA Yojana"
                className="h-12 md:h-14 w-auto object-contain filter drop-shadow-sm"
              />
            </Link>
          </motion.div>

          {/* Quick Role Access Pills */}
          <div className="hidden lg:flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold">
            <motion.div whileHover={{ scale: 1.04 }}>
              <Link to={createPageUrl('EntrepreneurOnboarding')} className="px-3.5 py-1.5 rounded-lg bg-[#0f2942] text-white shadow-sm hover:bg-[#153a5c] transition-colors block">
                Borrower Application
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }}>
              <Link to={createPageUrl('BankOfficerConsole')} className="px-3.5 py-1.5 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors block">
                Bank Portal
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }}>
              <Link to={createPageUrl('AdminDashboard')} className="px-3.5 py-1.5 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors block">
                Admin Portal
              </Link>
            </motion.div>
          </div>

          <button 
            type="button"
            className="lg:hidden p-2 rounded bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Main White Navigation Bar */}
      <nav className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
        <div className="max-w-7xl mx-auto px-4">
          <div className="hidden md:flex items-center justify-center relative py-1">
            <div className="flex items-center justify-center space-x-1 sm:space-x-2">
              {menuItems.map((item, index) => {
                const isTopExternal = item.href.startsWith('http');
                return (
                  <div 
                    key={index}
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(index)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    {isTopExternal ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 px-3.5 py-2.5 text-slate-800 dark:text-slate-100 text-xs font-extrabold tracking-wide transition-all rounded-lg hover:bg-amber-50 dark:hover:bg-slate-800 hover:text-red-800 dark:hover:text-amber-400"
                      >
                        <span>{item.label}</span>
                        {item.dropdown && <ChevronDown size={12} className="text-slate-500 dark:text-slate-400" />}
                      </a>
                    ) : (
                      <Link
                        to={item.href}
                        className="flex items-center gap-1 px-3.5 py-2.5 text-slate-800 dark:text-slate-100 text-xs font-extrabold tracking-wide transition-all rounded-lg hover:bg-amber-50 dark:hover:bg-slate-800 hover:text-red-800 dark:hover:text-amber-400"
                      >
                        <span>{item.label}</span>
                        {item.dropdown && <ChevronDown size={12} className="text-slate-500 dark:text-slate-400" />}
                      </Link>
                    )}
                  
                  <AnimatePresence>
                    {item.dropdown && activeDropdown === index && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 5, scale: 0.96 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 bg-white dark:bg-slate-900 shadow-2xl rounded-xl min-w-[240px] z-50 p-2 border border-slate-200 dark:border-slate-800"
                      >
                        {item.dropdown.map((subItem, subIndex) => {
                          const targetHref = typeof subItem === 'string' ? '#' : subItem.href;
                          const isExternal = targetHref.startsWith('http');
                          const labelText = typeof subItem === 'string' ? subItem : subItem.label;

                          return isExternal ? (
                            <a
                              key={subIndex}
                              href={targetHref}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-red-800 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-slate-800 rounded-lg transition-colors border-b border-slate-100 dark:border-slate-800 last:border-0"
                            >
                              {labelText}
                            </a>
                          ) : (
                            <Link
                              key={subIndex}
                              to={targetHref}
                              onClick={() => setActiveDropdown(null)}
                              className="block px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-red-800 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-slate-800 rounded-lg transition-colors border-b border-slate-100 dark:border-slate-800 last:border-0"
                            >
                              {labelText}
                            </Link>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
            </div>

            <motion.button 
              whileHover={{ scale: 1.1, rotate: 90 }}
              transition={{ duration: 0.2 }}
              type="button" 
              className="absolute right-0 p-2 text-slate-700 dark:text-slate-300 hover:text-red-800 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              <Search size={16} />
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-white dark:bg-slate-900 p-4 border-b border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 space-y-2 shadow-lg"
          >
            {menuItems.map((item, index) => (
              <Link
                key={index}
                to={item.href}
                className="block px-3 py-2 text-xs font-bold hover:bg-amber-50 dark:hover:bg-slate-800 hover:text-red-800 rounded"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}