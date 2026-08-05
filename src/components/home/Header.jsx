import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Menu, X, ChevronDown, Search, LogIn } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../LanguageContext';
import ThemeSelector from '../ThemeSelector';

export default function Header() {
  const { language, toggleLanguage, t } = useLanguage();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const menuItems = [
    { label: t('home'), href: createPageUrl('Home') },
    // { label: 'Apply for Loan', href: createPageUrl('LoanApplication') },
    { 
      label: t('aboutUs'), 
      href: createPageUrl('About'),
      dropdown: [
        { label: 'Vision & Mission', href: '#vision' },
        { label: 'Genesis and Role of MUDRA', href: '#genesis' },
        { label: 'Organization Structure', href: '#structure' },
        { label: 'Board of Directors', href: '#board' },
        { label: 'Management', href: '#management' },
        { label: 'Shareholders', href: '#shareholders' },
        { label: 'Partners (MLI)', href: '#partners' }
      ]
    },
    { 
      label: t('offerings'), 
      href: '#',
      dropdown: [
        'Shishu (up to ₹50,000)',
        'Kishore (₹50,000 - ₹5 Lakh)',
        'Tarun (₹5 Lakh - ₹10 Lakh)',
        'TarunPlus (₹10 Lakh - ₹20 Lakh)',
        { label: 'Apply for Loan', href: 'https://www.jansamarth.in/login' },
        'Eligibility Criteria',
        'How to Apply',
        'Interest Rates'
      ]
    },
    { 
      label: t('financials'), 
      href: '#',
      dropdown: [
        'Annual Reports',
        'Quarterly Performance',
        'State-wise Data',
        'Scheme-wise Progress',
        'Audited Statements',
        'Credit Ratings'
      ]
    },
    { label: t('faq'), href: '#' },
    { label: t('gallery'), href: createPageUrl('Gallery') },
    { 
      label: t('successStories'), 
      href: '#',
      dropdown: [
        'Women Entrepreneurs',
        'Youth Success Stories',
        'Rural Enterprises',
        'Manufacturing Units',
        'Service Sector',
        'Trading Business'
      ]
    },
    { 
      label: t('careers'), 
      href: '#',
      dropdown: [
        'Current Openings',
        'Why Join MUDRA',
        'Application Process',
        'Employee Benefits'
      ]
    },
    { label: t('contactUs'), href: createPageUrl('Contact') },
  ];

  const formatDate = (date) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return `${days[date.getDay()]}   |   ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  return (
    <header className="w-full">
      {/* Top Bar */}
      <div className="border-b-2" style={{ background: 'linear-gradient(to right, #fffbeb, #fef3c7)', borderColor: '#eab308' }}>
        <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6978c66565209a38e92b1aa2/282d5f6a9_image.png"
                alt="Pradhan Mantri MUDRA Yojana"
                className="h-12 md:h-14 w-auto object-contain"
              />
            </div>
          </div>

          {/* Date, Time & Actions */}
          <div className="hidden md:flex items-center gap-6">
            <div className="text-sm text-gray-700">
              <span>{formatDate(currentTime)}</span>
              <span className="ml-4 font-semibold" style={{ color: '#b91c1c' }}>{formatTime(currentTime)}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <button 
                onClick={toggleLanguage}
                className="font-semibold hover:opacity-80"
                style={{ color: language === 'hi' ? '#b91c1c' : 'inherit' }}
              >
                {language === 'en' ? 'हिंदी' : 'English'}
              </button>
              <span>|</span>
              <button className="text-xs hover:opacity-80" style={{ color: 'inherit' }}>A-</button>
              <button className="hover:opacity-80" style={{ color: 'inherit' }}>A</button>
              <button className="text-lg hover:opacity-80" style={{ color: 'inherit' }}>A+</button>
            </div>
            <ThemeSelector />
            <Link 
              to={createPageUrl('PMMYPortal')}
              className="text-white px-3 py-1.5 rounded-lg flex items-center gap-2 text-xs font-medium transition-all shadow-sm"
              style={{ backgroundColor: '#b91c1c' }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#991b1b'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#b91c1c'}
            >
              <LogIn size={14} />
              {t('loginPortal')}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="shadow-lg" style={{ background: 'linear-gradient(to right, #991b1b, #7f1d1d)' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="hidden md:flex items-center justify-between">
            {menuItems.map((item, index) => (
              <div 
                key={index}
                className="relative"
                onMouseEnter={() => setActiveDropdown(index)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to={item.href}
                  className="flex items-center gap-1 px-2 py-3 text-white text-xs font-medium transition-colors"
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#b91c1c'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  {item.label}
                  {item.dropdown && <ChevronDown size={14} />}
                </Link>
                
                {item.dropdown && activeDropdown === index && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full left-0 bg-white shadow-xl rounded-b-lg min-w-[220px] z-50"
                  >
                    {item.dropdown.map((subItem, subIndex) => (
                      <a
                        key={subIndex}
                        href={typeof subItem === 'string' ? '#' : subItem.href}
                        className="block px-4 py-3 text-sm text-gray-700 border-b border-gray-100 last:border-0"
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = '#fffbeb';
                          e.target.style.color = '#b91c1c';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = 'transparent';
                          e.target.style.color = '#374151';
                        }}
                      >
                        {typeof subItem === 'string' ? subItem : subItem.label}
                      </a>
                    ))}
                  </motion.div>
                )}
              </div>
            ))}
            <button 
              className="p-4 text-white transition-colors"
              onMouseEnter={(e) => e.target.style.backgroundColor = '#b91c1c'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              <Search size={18} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden"
            style={{ backgroundColor: '#991b1b' }}
          >
            {menuItems.map((item, index) => (
              <Link
                key={index}
                to={item.href}
                className="block px-4 py-3 text-white text-sm"
                style={{ borderBottom: '1px solid #b91c1c' }}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link 
              to={createPageUrl('PMMYPortal')}
              className="w-full text-white px-4 py-3 flex items-center justify-center gap-2"
              style={{ backgroundColor: '#b91c1c' }}
              onClick={() => setMobileMenuOpen(false)}
            >
              <LogIn size={16} />
              {t('loginPortal')}
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}