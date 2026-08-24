import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import {
  Menu,
  X,
  ChevronDown,
  LogIn,
  Shield,
  Clock,
  Globe,
  Sun,
  Moon,
  Search,
  Home as HomeIcon,
  Landmark,
  CreditCard,
  BarChart3,
  HelpCircle,
  Image as ImageIcon,
  Trophy,
  Briefcase,
  Phone,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../LanguageContext';
import { useTheme } from '../ThemeContext';

// Decorative icon per nav item (mobile drawer only) — presentational, labels/links unchanged.
const NAV_ICONS = [HomeIcon, Landmark, CreditCard, BarChart3, HelpCircle, ImageIcon, Trophy, Briefcase, Phone];

const MUDRA_LOGO_URL = 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6978c66565209a38e92b1aa2/282d5f6a9_image.png';

export default function Header() {
  const { language, toggleLanguage, t } = useLanguage();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openItem, setOpenItem] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const location = useLocation();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  const desktopNavRef = useRef(null);

  // Desktop dropdowns are overlay panels now, not inline-pushed content —
  // clicking anywhere outside the navbar should close whichever one is open.
  useEffect(() => {
    if (openItem === null) return undefined;
    const handlePointerDown = (e) => {
      if (desktopNavRef.current && !desktopNavRef.current.contains(e.target)) {
        setOpenItem(null);
      }
    };
    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, [openItem]);

  // Close the drawer / open dropdown when the route changes.
  useEffect(() => {
    setMobileMenuOpen(false);
    setOpenItem(null);
  }, [location.pathname, location.search]);

  // Escape closes whichever dropdown/drawer is open.
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setOpenItem(null);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const toggleItem = useCallback((index) => {
    setOpenItem((prev) => (prev === index ? null : index));
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

  // Determine active nav index based on pathname
  const activeNavIndex = menuItems.findIndex((item) => {
    if (item.href === '/Home' || item.href === '/') {
      return location.pathname === '/' || location.pathname === '/Home';
    }
    return location.pathname.startsWith(item.href);
  });
  const resolvedActive = activeNavIndex === -1 ? 0 : activeNavIndex;

  const closeMobile = () => setMobileMenuOpen(false);

  const formatDate = (date) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  };

  const formatTime = (date) => date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  /** Desktop horizontal nav — light pill bar, dropdowns open as panels below each item. */
  const renderDesktopNav = () => (
    <ul className="flex flex-wrap items-center gap-1 rounded-full border border-slate-200 bg-white p-1.5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      {menuItems.map((item, index) => {
        const isTopExternal = item.href.startsWith('http');
        const isActive = resolvedActive === index;
        const isOpen = openItem === index;

        const linkClasses = `flex items-center whitespace-nowrap rounded-full px-4 py-2 text-[12px] xl:text-[12.5px] font-bold uppercase tracking-wide transition-colors duration-200 ${
          isActive
            ? 'bg-[#011a39] text-white shadow-sm dark:bg-blue-600'
            : 'text-slate-600 hover:text-blue-700 dark:text-slate-300 dark:hover:text-blue-400'
        }`;

        return (
          <li key={item.label} className="relative">
            <div className="flex items-center">
              {isTopExternal ? (
                <a href={item.href} target="_blank" rel="noopener noreferrer" className={linkClasses}>
                  <span>{item.label}</span>
                </a>
              ) : (
                <Link to={item.href} aria-current={isActive ? 'page' : undefined} className={linkClasses}>
                  <span>{item.label}</span>
                </Link>
              )}

              {item.dropdown && (
                <button
                  type="button"
                  onClick={() => toggleItem(index)}
                  aria-label={`Toggle ${item.label} submenu`}
                  aria-expanded={isOpen}
                  className="relative z-10 -ml-2 flex h-9 w-9 shrink-0 items-center justify-center rounded text-slate-400 transition-colors duration-200 hover:text-blue-700 dark:text-slate-500 dark:hover:text-blue-400"
                >
                  <ChevronDown size={12} aria-hidden="true" className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
              )}
            </div>

            <AnimatePresence>
              {item.dropdown && isOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute left-0 top-full z-20 mt-2 w-64 space-y-0.5 rounded-xl border border-slate-200 bg-white p-2 shadow-2xl dark:border-slate-700 dark:bg-slate-800"
                >
                  {item.dropdown.map((subItem) => {
                    const isExternal = subItem.href.startsWith('http');
                    const subClasses =
                      'flex items-center gap-2 rounded-lg px-3 py-2 text-[12px] font-semibold text-slate-600 transition-colors duration-200 hover:bg-blue-50 hover:text-blue-700 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-blue-300';
                    return (
                      <li key={subItem.label}>
                        {isExternal ? (
                          <a href={subItem.href} target="_blank" rel="noopener noreferrer" className={subClasses}>
                            <span>{subItem.label}</span>
                          </a>
                        ) : (
                          <Link to={subItem.href} className={subClasses}>
                            <span>{subItem.label}</span>
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </motion.ul>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );

  /** Vertical nav list for the mobile slide-out drawer. */
  const renderMobileNavList = () => (
    <ul className="space-y-1 px-3">
      {menuItems.map((item, index) => {
        const Icon = NAV_ICONS[index] ?? HomeIcon;
        const isTopExternal = item.href.startsWith('http');
        const isActive = resolvedActive === index;
        const isOpen = openItem === index;

        const linkClasses = `group relative flex flex-1 items-center gap-3 rounded-xl pl-4 pr-2 py-3.5 text-[13px] font-bold uppercase tracking-wide transition-colors duration-[250ms] ${
          isActive ? 'text-white' : 'text-[#9fc2c9] hover:text-white'
        }`;

        return (
          <li key={item.label} className="relative">
            <span
              aria-hidden="true"
              className={`absolute inset-y-0.5 left-0 right-0 rounded-xl transition-colors duration-[250ms] ${
                isActive ? 'bg-[#f59e0b]/15' : 'bg-transparent group-hover:bg-white/[0.06]'
              }`}
            />
            <span
              aria-hidden="true"
              className={`absolute inset-y-1 left-0 w-[3px] rounded-full bg-[#f59e0b] transition-all duration-300 ${
                isActive ? 'opacity-100' : 'opacity-0'
              }`}
            />

            <div className="relative flex items-center">
              {isTopExternal ? (
                <a href={item.href} target="_blank" rel="noopener noreferrer" className={linkClasses}>
                  <Icon size={16} className="shrink-0 transition-transform duration-[250ms] group-hover:translate-x-0.5" aria-hidden="true" />
                  <span className="truncate">{item.label}</span>
                </a>
              ) : (
                <Link
                  to={item.href}
                  onClick={closeMobile}
                  aria-current={isActive ? 'page' : undefined}
                  className={linkClasses}
                >
                  <Icon size={16} className={`shrink-0 transition-transform duration-[250ms] group-hover:translate-x-0.5 ${isActive ? 'text-[#fbbf24]' : ''}`} aria-hidden="true" />
                  <span className="truncate">{item.label}</span>
                </Link>
              )}

              {item.dropdown && (
                <button
                  type="button"
                  onClick={() => toggleItem(index)}
                  aria-label={`Toggle ${item.label} submenu`}
                  aria-expanded={isOpen}
                  className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[#7fa7b0] transition-colors duration-200 hover:bg-white/10 hover:text-[#fbbf24]"
                >
                  <ChevronDown size={14} aria-hidden="true" className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
              )}
            </div>

            <AnimatePresence initial={false}>
              {item.dropdown && isOpen && (
                <motion.ul
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden pl-6"
                >
                  {item.dropdown.map((subItem) => {
                    const isExternal = subItem.href.startsWith('http');
                    const subClasses =
                      'group/sub flex items-center justify-between gap-2 rounded-lg border-l-2 border-white/10 py-2 pl-3 pr-2 text-[11px] font-semibold text-[#8fb2ba] transition-colors duration-200 hover:border-[#f59e0b]/80 hover:text-white';
                    return (
                      <li key={subItem.label}>
                        {isExternal ? (
                          <a href={subItem.href} target="_blank" rel="noopener noreferrer" className={subClasses}>
                            <span>{subItem.label}</span>
                          </a>
                        ) : (
                          <Link to={subItem.href} onClick={closeMobile} className={subClasses}>
                            <span>{subItem.label}</span>
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </motion.ul>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );

  // Deep teal → petrol gradient: distinct from the page navy, still institutional.
  const panelSurface =
    'bg-[linear-gradient(180deg,#083a46_0%,#05262f_48%,#072f3a_100%)]';

  return (
    <>
      {/* ================= Desktop header (scrolls with the page, three rows) ================= */}
      <header
        ref={desktopNavRef}
        className={`mudra-navbar relative z-30 hidden flex-col border-b border-white/[0.08] ${panelSurface} shadow-[0_8px_28px_-12px_rgba(3,25,32,0.6)] lg:flex`}
        aria-label="Primary site header"
      >
        <div className="flex h-1.5 w-full shrink-0" aria-hidden="true">
          <div className="h-full w-1/3 bg-[#ff6800]" />
          <div className="h-full w-1/3 bg-white" />
          <div className="h-full w-1/3 bg-[#16a34a]" />
        </div>

        {/* Row 1 — statutory identity strip, live clock, language/theme, login */}
        <div className="flex h-10 shrink-0 items-center justify-between gap-4 border-b border-white/10 px-5 text-[12px] font-bold xl:px-8">
          <div className="flex min-w-0 items-center gap-2.5 truncate">
            <span className="flex shrink-0 items-center gap-1.5 text-[#fbbf24]">
              <Shield size={13} aria-hidden="true" />
              <span>Government of India</span>
            </span>
            <span className="text-white/25" aria-hidden="true">|</span>
            <span className="shrink-0 text-white/90">Ministry of Finance</span>
            <span className="hidden text-white/25 xl:inline" aria-hidden="true">|</span>
            <span className="hidden truncate text-[#7dd3fc] xl:inline">SIDBI (Small Industries Development Bank of India)</span>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <div className="hidden items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-semibold text-[#c3dae0] sm:flex">
              <Clock size={12} className="shrink-0 text-[#fbbf24]" aria-hidden="true" />
              <span className="truncate">{formatDate(currentTime)}</span>
              <span className="shrink-0 font-bold text-white">{formatTime(currentTime)}</span>
            </div>

            <button
              type="button"
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 rounded-full bg-[#0e5a68] px-3 py-1.5 text-[11px] font-bold text-[#a8e6ef] transition-colors duration-200 hover:bg-[#12717f]"
            >
              <Globe size={13} aria-hidden="true" />
              <span>{language === 'en' ? 'हिंदी' : 'EN'}</span>
            </button>

            <button
              type="button"
              onClick={toggleDarkMode}
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="flex items-center gap-1.5 rounded-full bg-[#0e5a68] px-3 py-1.5 text-[11px] font-bold text-[#a8e6ef] transition-colors duration-200 hover:bg-[#12717f]"
            >
              {isDarkMode ? <Sun size={13} aria-hidden="true" /> : <Moon size={13} aria-hidden="true" />}
              <span>{isDarkMode ? 'Light' : 'Dark'}</span>
            </button>

            <Link
              to={createPageUrl('PMMYPortal')}
              className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#f59e0b] to-[#c2410c] px-3.5 py-1.5 text-[11px] font-bold text-white shadow-sm transition-all duration-200 hover:-translate-y-px hover:shadow-lg hover:brightness-110"
            >
              <LogIn size={13} aria-hidden="true" />
              <span>{t('loginPortal')}</span>
            </Link>
          </div>
        </div>

        {/* Row 2 — logo & identity, SIDBI toll-free helpline */}
        <div className="flex h-20 shrink-0 items-center justify-between gap-6 border-b border-slate-200 bg-white px-5 dark:border-slate-800 dark:bg-slate-950 xl:px-8">
          <Link to={createPageUrl('Home')} className="flex min-w-0 items-center gap-4">
            <img src={MUDRA_LOGO_URL} alt="Pradhan Mantri MUDRA Yojana" className="h-12 w-auto shrink-0 object-contain xl:h-14" />
            <span className="hidden h-10 w-px shrink-0 bg-slate-200 dark:bg-slate-700 sm:block" aria-hidden="true" />
            <span className="hidden min-w-0 flex-col leading-tight sm:flex">
              <span className="truncate text-base font-black text-blue-800 dark:text-blue-300 xl:text-lg">भारतीय लघु उद्योग विकास बैंक</span>
              <span className="truncate text-[10.5px] font-bold uppercase tracking-wide text-slate-600 dark:text-slate-400 xl:text-[11px]">Small Industries Development Bank of India</span>
              <span className="truncate text-[10px] font-semibold text-teal-600 dark:text-teal-400 xl:text-[10.5px]">Apex Institution for MSME Financing &amp; Development</span>
            </span>
          </Link>

          <div className="hidden shrink-0 items-center gap-2.5 rounded-2xl border border-teal-200 bg-teal-50 px-4 py-2.5 dark:border-slate-700 dark:bg-slate-800 lg:flex">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal-600 text-white">
              <Shield size={15} aria-hidden="true" />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-[10px] font-bold uppercase tracking-wide text-teal-700 dark:text-teal-300">Mudra Toll-Free Helpline</span>
              <span className="text-sm font-black text-blue-900 dark:text-white">1800 180 1111 / 1800 110 001</span>
            </span>
          </div>
        </div>

        {/* Row 3 — primary navigation, centered */}
        <div className="flex h-[68px] shrink-0 items-center justify-center gap-4 bg-slate-50 px-5 dark:bg-slate-900 xl:px-8">
          <nav aria-label="Primary" className="min-w-0">
            {renderDesktopNav()}
          </nav>

          <button
            type="button"
            aria-label="Search"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-slate-500 transition-colors duration-200 hover:bg-white hover:text-blue-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-blue-400"
          >
            <Search size={17} aria-hidden="true" />
          </button>
        </div>
      </header>

      {/* ================= Mobile top bar (hamburger trigger, scrolls with the page) ================= */}
      <div className="relative z-30 flex items-center justify-between gap-3 border-b border-slate-200 bg-white/95 px-4 py-2.5 backdrop-blur-md dark:border-[#0d4d5c] dark:bg-[#05262f]/95 lg:hidden">
        <div className="flex h-1 w-10 shrink-0 overflow-hidden rounded-full" aria-hidden="true">
          <div className="h-full w-1/3 bg-[#ff6800]" />
          <div className="h-full w-1/3 bg-white dark:bg-slate-600" />
          <div className="h-full w-1/3 bg-[#16a34a]" />
        </div>

        <button
          type="button"
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileMenuOpen}
          className="ml-auto inline-flex h-11 w-11 items-center justify-center rounded-lg bg-[#083a46] text-white transition-colors duration-200 hover:bg-[#0d4d5c]"
          onClick={() => setMobileMenuOpen((open) => !open)}
        >
          {mobileMenuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
      </div>

      {/* ================= Mobile slide-out drawer ================= */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-[#03191f]/70 backdrop-blur-sm lg:hidden"
              onClick={closeMobile}
              aria-hidden="true"
            />

            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className={`mudra-sidebar-mobile fixed inset-y-0 left-0 z-50 flex w-[86vw] max-w-[320px] flex-col border-r border-white/[0.08] ${panelSurface} shadow-2xl lg:hidden`}
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
            >
              <div className="flex items-center justify-end px-4 pt-4">
                <button
                  type="button"
                  onClick={closeMobile}
                  aria-label="Close navigation menu"
                  className="flex h-10 w-10 items-center justify-center rounded-lg text-[#9fc2c9] hover:bg-white/10 hover:text-white"
                >
                  <X size={20} aria-hidden="true" />
                </button>
              </div>

              <nav aria-label="Primary" className="min-h-0 flex-1 overflow-y-auto py-4">
                {renderMobileNavList()}
              </nav>

              <div className="space-y-3 border-t border-white/10 px-4 py-4">
                <div className="space-y-1 text-[10.5px] font-semibold text-[#8fb2ba]">
                  <p className="flex items-center gap-1.5 font-bold text-[#7dd3fc]">
                    <Shield size={12} aria-hidden="true" />
                    <span>Government of India</span>
                  </p>
                  <p>Ministry of Finance</p>
                  <p className="font-bold text-emerald-400">SIDBI Subsidiary Entity</p>
                </div>

                <Link
                  to={createPageUrl('PMMYPortal')}
                  onClick={closeMobile}
                  className="flex items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-[#f59e0b] to-[#c2410c] px-3.5 py-2.5 text-[12px] font-bold text-white shadow-sm transition-all duration-200 hover:-translate-y-px hover:shadow-lg hover:brightness-110"
                >
                  <LogIn size={13} aria-hidden="true" />
                  <span>{t('loginPortal')}</span>
                </Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
