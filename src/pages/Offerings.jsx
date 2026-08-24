import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2, Landmark, Sparkles } from 'lucide-react';
import Header from '../components/home/Header';
import Footer from '../components/home/Footer';
import ChatBot from '../components/ChatBot';
import { Reveal, RevealGroup } from '@/components/ui/reveal';
import { createPageUrl } from '@/utils';

// Each MUDRA category gets its own theme-relevant accent — a colorful growth
// journey from seed (gold) through expansion (sky), scale (emerald) to the
// enhanced repeat-borrower ceiling (violet) — used only for text/dots/gradients,
// never as a fill behind a box, so the open editorial layout stays intact.
const CATEGORY_THEMES = {
  shishu: {
    dot: 'bg-amber-500 border-amber-500 dark:bg-amber-400 dark:border-amber-400',
    ring: 'ring-amber-200 dark:ring-amber-400/25',
    hoverBorder: 'group-hover:border-amber-400',
    text: 'text-amber-700 dark:text-amber-400',
    hoverText: 'group-hover:text-amber-700 dark:group-hover:text-amber-400',
    gradient: 'from-amber-600 via-amber-500 to-orange-500 dark:from-amber-300 dark:via-amber-400 dark:to-orange-300',
    line: 'bg-amber-500 dark:bg-amber-400',
    border: 'border-amber-300 dark:border-amber-700',
    hoverTextLink: 'hover:text-amber-700 dark:hover:text-amber-400',
    hoverFill: 'group-hover:bg-amber-600 group-hover:border-amber-600 dark:group-hover:bg-amber-400 dark:group-hover:border-amber-400 group-hover:text-white dark:group-hover:text-[#021731]',
  },
  kishore: {
    dot: 'bg-sky-600 border-sky-600 dark:bg-sky-400 dark:border-sky-400',
    ring: 'ring-sky-200 dark:ring-sky-400/25',
    hoverBorder: 'group-hover:border-sky-400',
    text: 'text-sky-700 dark:text-sky-400',
    hoverText: 'group-hover:text-sky-700 dark:group-hover:text-sky-400',
    gradient: 'from-sky-600 via-blue-600 to-sky-500 dark:from-sky-300 dark:via-blue-300 dark:to-sky-400',
    line: 'bg-sky-600 dark:bg-sky-400',
    border: 'border-sky-300 dark:border-sky-700',
    hoverTextLink: 'hover:text-sky-700 dark:hover:text-sky-400',
    hoverFill: 'group-hover:bg-sky-600 group-hover:border-sky-600 dark:group-hover:bg-sky-400 dark:group-hover:border-sky-400 group-hover:text-white dark:group-hover:text-[#021731]',
  },
  tarun: {
    dot: 'bg-emerald-600 border-emerald-600 dark:bg-emerald-400 dark:border-emerald-400',
    ring: 'ring-emerald-200 dark:ring-emerald-400/25',
    hoverBorder: 'group-hover:border-emerald-400',
    text: 'text-emerald-700 dark:text-emerald-400',
    hoverText: 'group-hover:text-emerald-700 dark:group-hover:text-emerald-400',
    gradient: 'from-emerald-600 via-teal-600 to-emerald-500 dark:from-emerald-300 dark:via-teal-300 dark:to-emerald-400',
    line: 'bg-emerald-600 dark:bg-emerald-400',
    border: 'border-emerald-300 dark:border-emerald-700',
    hoverTextLink: 'hover:text-emerald-700 dark:hover:text-emerald-400',
    hoverFill: 'group-hover:bg-emerald-600 group-hover:border-emerald-600 dark:group-hover:bg-emerald-400 dark:group-hover:border-emerald-400 group-hover:text-white dark:group-hover:text-[#021731]',
  },
  tarunplus: {
    dot: 'bg-violet-600 border-violet-600 dark:bg-violet-400 dark:border-violet-400',
    ring: 'ring-violet-200 dark:ring-violet-400/25',
    hoverBorder: 'group-hover:border-violet-400',
    text: 'text-violet-700 dark:text-violet-400',
    hoverText: 'group-hover:text-violet-700 dark:group-hover:text-violet-400',
    gradient: 'from-violet-600 via-purple-600 to-fuchsia-500 dark:from-violet-300 dark:via-purple-300 dark:to-fuchsia-400',
    line: 'bg-violet-600 dark:bg-violet-400',
    border: 'border-violet-300 dark:border-violet-700',
    hoverTextLink: 'hover:text-violet-700 dark:hover:text-violet-400',
    hoverFill: 'group-hover:bg-violet-600 group-hover:border-violet-600 dark:group-hover:bg-violet-400 dark:group-hover:border-violet-400 group-hover:text-white dark:group-hover:text-[#021731]',
  },
};

const loanProducts = [
  {
    id: 'shishu',
    shortName: 'Shishu',
    title: 'Shishu Category',
    tagline: 'Seed capital for micro-enterprises and early stage entrepreneurs',
    limit: 'Up to ₹50,000/-',
    targetAudience: 'Small vendors, artisans, shopkeepers, fruit/vegetable sellers, micro service units',
    features: [
      'Zero collateral security required',
      'No processing fee charged by banks',
      'Flexible repayment tenure up to 5 years',
      'MUDRA Card for working capital drawdown'
    ],
    documents: [
      'Proof of Identity (Aadhaar / Voter ID / PAN)',
      'Proof of Residence (Utility Bill / Aadhaar)',
      'Business quotation for machinery / equipment'
    ]
  },
  {
    id: 'kishore',
    shortName: 'Kishore',
    title: 'Kishore Category',
    tagline: 'Expansion credit for growing micro enterprises seeking equipment or stock',
    limit: 'Above ₹50,000 to ₹5 Lakh',
    targetAudience: 'Small manufacturing units, food processing units, repair workshops, retail stores',
    features: [
      'Credit guarantee coverage via CGFMU',
      'Repayment tenure 3 to 5 years',
      'Competitive interest rates linked to bank MCLR',
      'Working capital & term loan facility'
    ],
    documents: [
      'Identity & Residence Proofs',
      'MSME Udyam Registration Certificate',
      'Bank statement for past 6 months',
      'Unaudited balance sheet / income projections'
    ]
  },
  {
    id: 'tarun',
    shortName: 'Tarun',
    title: 'Tarun Category',
    tagline: 'Scaling capital for established small enterprises modernizing operations',
    limit: 'Above ₹5 Lakh to ₹10 Lakh',
    targetAudience: 'Established manufacturing plants, logistics operators, IT services, commercial units',
    features: [
      'No third-party collateral guarantee needed',
      'Moratorium period up to 6 months available',
      'Term loan for machinery & equipment purchase',
      'MUDRA Card facility for working capital'
    ],
    documents: [
      'KYC documents & Udyam Registration',
      'Past 2-year audited financial statements',
      'GST Returns for past 12 months',
      'Machinery quotation & project report'
    ]
  },
  {
    id: 'tarunplus',
    shortName: 'Tarun Plus',
    title: 'Tarun Plus Category',
    tagline: 'Enhanced ceiling for proven repeat borrowers scaling enterprise capacity',
    limit: 'Above ₹10 Lakh to ₹20 Lakh',
    targetAudience: 'Repeat PMMY borrowers with clean repayment track record expanding production capacity',
    features: [
      'Enhanced ceiling introduced under Budget 2024-25',
      'Extended repayment tenure up to 7 years',
      'Priority processing at Member Lending Institutions',
      'Comprehensive CGFMU guarantee coverage'
    ],
    documents: [
      'Previous PMMY loan closure / track record certificate',
      'Audited financial statements for last 2 years',
      'Bank statement for last 12 months',
      'Detailed expansion project report'
    ]
  }
];

export default function Offerings() {
  const [searchParams] = useSearchParams();
  const schemeParam = searchParams.get('scheme');
  const [activeTab, setActiveTab] = useState('shishu');

  useEffect(() => {
    if (schemeParam && loanProducts.some(p => p.id === schemeParam)) {
      setActiveTab(schemeParam);
    }
  }, [schemeParam]);

  const activeProduct = loanProducts.find(p => p.id === activeTab) || loanProducts[0];
  const activeIndex = loanProducts.findIndex(p => p.id === activeTab);
  const activeTheme = CATEGORY_THEMES[activeProduct.id];

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-slate-50 text-slate-900 dark:text-slate-100 transition-colors duration-300 dark:bg-[#021731] flex flex-col justify-between">

      {/* Global heritage backdrop: a faint watermark, not a competing photo —
          kept subtle so every section reads as a clean, high-contrast surface
          like the reference institutional sites (SIDBI/CGTMSE/NCGTC). */}
      <div
        className="pointer-events-none fixed inset-0 z-0 bg-cover bg-center opacity-[0.05] dark:opacity-[0.04]"
        style={{ backgroundImage: `url('/photo/tajmahal.png')` }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col flex-1 justify-between">
        <Header />

        {/* Hero Page Header with Ambient Animations — filled with the same
            light-blue → accent → navy ramp traced by the S-curve below, so the
            band and its border read as one continuous piece. Text switches to
            white/gold here since it now sits on a saturated blue, not a pale
            tint. */}
        <div className="py-14 relative overflow-hidden bg-gradient-to-br from-[#075985] via-[#075985] to-[#021731]">

          {/* Animated Background Blobs — white-toned so they read as a soft
              highlight against the blue fill instead of blending into it. */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.12, 0.22, 0.12],
                x: [0, 20, 0]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-white/20 blur-3xl"
            />
            <motion.div
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.12, 0.2, 0.12],
                x: [0, -20, 0]
              }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-white/10 blur-3xl"
            />
          </div>

          <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
          
               <motion.span
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-1.5 bg-[#f97316] text-white px-3 py-1 rounded-full text-[10px] font-black tracking-wider uppercase mb-2 shadow-sm"
            >
              <Sparkles size={12} className="text-white animate-pulse" />
              <span>PMMY Credit Products</span>
            </motion.span>

              
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight mb-2 [text-shadow:0_4px_18px_rgba(2,23,49,0.55)]">
                <span className="bg-gradient-to-r from-amber-200 via-amber-300 to-amber-400 bg-clip-text text-transparent"></span>MUDRA Offerings & Scheme Categories
              </h1>
              <p className="pb-5 text-blue-50 max-w-3xl mx-auto text-sm sm:text-base font-semibold leading-snug [text-shadow:0_2px_10px_rgba(2,23,49,0.5)]">
                Tailored collateral-free credit products signifying stages of growth of micro enterprises across India.
              </p>
            </motion.div>
          </div>

          {/* Dramatic filled S-curve — same treatment as the Home hero video's
              bottom border: the fill masks the banner's straight edge with an
              actual curved boundary into the page background, traced with the
              light-blue → accent → navy gradient line. */}
          <div className="pointer-events-none absolute inset-x-0 bottom-[-1px] z-10" aria-hidden="true">
            <svg viewBox="0 0 1440 140" preserveAspectRatio="none" className="block h-14 w-full sm:h-24">
              <defs>
                <linearGradient id="offeringsHeroCurveBorder" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#7dd3fc" />
                  <stop offset="55%" stopColor="#00b6f0" />
                  <stop offset="100%" stopColor="#021731" />
                </linearGradient>
              </defs>
              <path
                d="M0,70 C360,0 720,140 1080,70 C1260,35 1350,20 1440,45 L1440,140 L0,140 Z"
                className="fill-slate-50 dark:fill-[#021731]"
              />
              <path
                d="M0,70 C360,0 720,140 1080,70 C1260,35 1350,20 1440,45"
                fill="none"
                stroke="url(#offeringsHeroCurveBorder)"
                strokeWidth="7"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20 w-full">

          {/* Loan-category journey — a linear progression, not a set of tabs.
              A single connecting line runs through every step; the active
              category is picked out with deep-blue type and a filled dot
              instead of a pill or bordered button. */}
          <Reveal>
            <nav
              aria-label="MUDRA loan category journey"
              // className="mb-16 sm:mb-20 bg-[#FFF3A3]/60 dark:bg-[#0d2c4a]/70 rounded-3xl px-6 sm:px-10 py-10 sm:py-12"
              className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md text-center mb-10"
            >
              <ol className="flex flex-col sm:flex-row sm:items-start">
                {loanProducts.map((product, idx) => {
                  const isActive = product.id === activeTab;
                  const isPast = idx < activeIndex;
                  const theme = CATEGORY_THEMES[product.id];
                  const prevTheme = idx !== 0 ? CATEGORY_THEMES[loanProducts[idx - 1].id] : null;
                  return (
                    <li key={product.id} className="relative flex-1">
                      {/* Horizontal connector (desktop) */}
                      {idx !== 0 && (
                        <div
                          className={`hidden sm:block absolute top-[13px] right-1/2 w-full h-px transition-colors duration-500 ${
                            isPast || isActive ? prevTheme.line : 'bg-blue-200/70 dark:bg-blue-900/40'
                          }`}
                          aria-hidden="true"
                        />
                      )}
                      {/* Vertical connector (mobile) */}
                      {idx !== loanProducts.length - 1 && (
                        <div
                          className="sm:hidden absolute left-[12px] top-[30px] bottom-[-32px] w-px bg-blue-200/70 dark:bg-blue-900/40"
                          aria-hidden="true"
                        />
                      )}
                      <button
                        type="button"
                        onClick={() => setActiveTab(product.id)}
                        aria-current={isActive ? 'step' : undefined}
                        className="group relative z-10 flex sm:flex-col items-center sm:items-center gap-4 sm:gap-4 w-full sm:text-center text-left py-3.5 sm:py-0"
                      >
                        <motion.span
                          animate={isActive ? { scale: [1, 1.25, 1] } : { scale: 1 }}
                          transition={isActive ? { duration: 1.6, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.3 }}
                          className={`h-[26px] w-[26px] shrink-0 rounded-full border-2 transition-colors duration-300 ${
                            isActive
                              ? `${theme.dot} ring-4 ${theme.ring}`
                              : isPast
                              ? theme.dot
                              : `bg-slate-50 border-slate-300 dark:bg-[#021731] dark:border-slate-700 ${theme.hoverBorder}`
                          }`}
                        />
                        <span>
                          <span
                            className={`block text-base sm:text-lg font-black tracking-tight transition-colors duration-300 ${
                              isActive
                                ? theme.text
                                : `text-slate-500 dark:text-slate-400 ${theme.hoverText}`
                            }`}
                          >
                            {product.shortName}
                          </span>
                          <span className="block text-xs sm:text-sm font-semibold text-slate-400 dark:text-slate-500 mt-1">
                            {product.limit}
                          </span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </nav>
          </Reveal>

          {/* Editorial detail — a dedicated powder-blue panel, still no
              borders/shadows within it. */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProduct.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              // className="bg-[#FFF3A3]/40 dark:bg-[#0d2c4a]/70 rounded-3xl px-6 sm:px-10 md:px-14 py-10 sm:py-12 md:py-14"
              className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md text-center"
            >
              {/* Category heading + credit limit */}
              <div className="mb-10">
                <span className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] mb-3">
                  <motion.span
                    animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                    className={`h-2 w-2 rounded-full ${activeTheme.dot}`}
                    aria-hidden="true"
                  />
                  <span className={activeTheme.text}>MUDRA Loan Category</span>
                </span>
                <h2 className="text-4xl sm:text-5xl font-black text-[#011a39] dark:text-white tracking-tight mb-4">
                  {activeProduct.shortName}
                </h2>
                <p className="text-sm sm:text-base font-semibold text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
                  {activeProduct.tagline}
                </p>
              </div>

              <div className="h-px bg-blue-200/70 dark:bg-blue-900/40 mb-10" />

              {/* Large credit-limit statement */}
              <div className="mb-10">
                <span className="block text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 mb-2">
                  Credit Limit
                </span>
                <motion.p
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className={`text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-none bg-gradient-to-r ${activeTheme.gradient} bg-clip-text text-transparent`}
                >
                  {activeProduct.limit}
                </motion.p>
              </div>

              {/* Eligible target audience */}
              <div className="mb-10">
                <span className="block text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 mb-2">
                  Eligible Target Audience
                </span>
                <p className="text-sm sm:text-base font-semibold text-slate-700 dark:text-slate-300 max-w-3xl leading-relaxed">
                  {activeProduct.targetAudience}
                </p>
              </div>

              <div className="h-px bg-blue-200/70 dark:bg-blue-900/40 mb-10" />

              {/* Open two-column layout: Key Features / Required Documentation */}
              <RevealGroup as="div" className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 mb-10" stagger={60}>
                <Reveal variant="left">
                  <h3 className="text-xs font-black uppercase tracking-[0.15em] text-[#011a39] dark:text-white mb-5">
                    Key Features & Highlights
                  </h3>
                  <ul className="space-y-4">
                    {activeProduct.features.map((feat, fIdx) => (
                      <li
                        key={fIdx}
                        className="group flex items-start gap-3 text-sm font-semibold text-slate-700 dark:text-slate-300 leading-snug transition-all duration-200 hover:translate-x-1.5"
                      >
                        <CheckCircle2
                          size={16}
                          className={`${activeTheme.text} shrink-0 mt-0.5 transition-transform duration-200 group-hover:scale-125`}
                        />
                        <span className="transition-colors duration-200 group-hover:text-[#011a39] dark:group-hover:text-white">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </Reveal>

                <Reveal variant="right">
                  <h3 className="text-xs font-black uppercase tracking-[0.15em] text-[#011a39] dark:text-white mb-5">
                    Required Documentation
                  </h3>
                  <ol className="space-y-4">
                    {activeProduct.documents.map((doc, dIdx) => (
                      <li
                        key={dIdx}
                        className="group flex items-start gap-3 text-sm font-semibold text-slate-700 dark:text-slate-300 leading-snug transition-all duration-200 hover:translate-x-1.5"
                      >
                        <span
                          className={`shrink-0 h-5 w-5 flex items-center justify-center text-[11px] font-black rounded-full mt-0.5 border transition-colors duration-200 ${activeTheme.text} ${activeTheme.border} ${activeTheme.hoverFill}`}
                        >
                          {dIdx + 1}
                        </span>
                        <span className="transition-colors duration-200 group-hover:text-[#011a39] dark:group-hover:text-white">{doc}</span>
                      </li>
                    ))}
                  </ol>
                </Reveal>
              </RevealGroup>

              <div className="h-px bg-blue-200/70 dark:bg-blue-900/40 mb-8" />

              {/* Application CTA */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-bold">
                  <motion.span
                    animate={{ rotate: [0, -6, 6, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <Landmark size={16} className={`${activeTheme.text} shrink-0`} />
                  </motion.span>
                  <span>Loans disbursed through Banks, RRBs, SFBs & MFIs under RBI Guidelines</span>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <Link
                    to={createPageUrl('EntrepreneurOnboarding')}
                    className={`text-xs font-black text-[#011a39] dark:text-white transition-colors underline underline-offset-4 decoration-slate-300 dark:decoration-slate-700 ${activeTheme.hoverTextLink}`}
                  >
                    Start Borrower Self-Check
                  </Link>
                  <motion.a
                    whileHover={{ scale: 1.045, boxShadow: '0 10px 30px -8px rgba(7,89,133,0.55)' }}
                    whileTap={{ scale: 0.98 }}
                    href="https://www.jansamarth.in/login"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-gradient-to-r from-blue-800 to-[#011a39] hover:from-blue-700 hover:to-blue-950 text-white text-xs font-black rounded-full shadow-sm transition-colors flex items-center justify-center gap-2 uppercase tracking-wide"
                  >
                    <span>Apply via JanSamarth</span>
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <ArrowRight size={14} />
                    </motion.span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </main>

        <Footer />
        <ChatBot />
      </div>
    </div>
  );
}
