import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Download, TrendingUp, ShieldCheck, CheckCircle2, Sparkles, Award, Search, Eye, X } from 'lucide-react';
import Header from '../components/home/Header';
import Footer from '../components/home/Footer';
import ChatBot from '../components/ChatBot';
import AnalyticsDashboard from '../components/financials/AnalyticsDashboard';

const financialTabs = [
  { id: 'annual', label: 'ANNUAL REPORTS' },
  { id: 'disclosures', label: 'PUBLIC DISCLOSURES' },
  { id: 'mgt7', label: 'MGT-7 (ANNUAL RETURNS)' }
];

const financialData = {
  annual: [
    {
      title: 'Annual Performance Report FY 2024-25',
      year: 'FY 2024-25',
      size: '20.9 MB',
      filename: 'Annual-Report-2024-25.pdf',
      link: '/pdf/Annual-Report-2024-25.pdf'
    },
    {
      title: 'Audited Financial Statements & Balance Sheet FY 2023-24',
      year: 'FY 2023-24',
      size: '14.7 MB',
      filename: 'Annual-Report-2023-24.pdf',
      link: '/pdf/Annual-Report-2023-24.pdf'
    },
    {
      title: 'Audited Financial Statements & Annual Report FY 2022-23',
      year: 'FY 2022-23',
      size: '10.5 MB',
      filename: 'Annual-Report-2022-23.pdf',
      link: '/pdf/Annual-Report-2022-23.pdf'
    },
    {
      title: 'Annual Performance Report FY 2020-21',
      year: 'FY 2020-21',
      size: '32.8 MB',
      filename: 'Annual-Report-2020-21.pdf',
      link: '/pdf/Annual-Report-2020-21.pdf'
    }
  ],
  disclosures: [
    {
      title: 'Public Disclosure Report FY 2025-26 Q2',
      year: 'FY 2025-26 Q2',
      size: '209 KB',
      filename: 'FY-2025-2026-Q2.pdf',
      link: '/pdf/FY-2025-2026-Q2.pdf'
    },
    {
      title: 'Public Disclosure Report FY 2025-26 Q1',
      year: 'FY 2025-26 Q1',
      size: '756 KB',
      filename: 'FY-2025-2026-Q1.pdf',
      link: '/pdf/FY-2025-2026-Q1.pdf'
    },
    {
      title: 'Public Disclosure Report FY 2024-25 Q4',
      year: 'FY 2024-25 Q4',
      size: '761 KB',
      filename: 'FY-2024-2025-Q4.pdf',
      link: '/pdf/FY-2024-2025-Q4.pdf'
    },
    {
      title: 'Public Disclosure Report FY 2024-25 Q3',
      year: 'FY 2024-25 Q3',
      size: '804 KB',
      filename: 'FY-2024-2025-Q3.pdf',
      link: '/pdf/FY-2024-2025-Q3.pdf'
    },
    {
      title: 'Public Disclosure Report FY 2024-25 Q2',
      year: 'FY 2024-25 Q2',
      size: '803 KB',
      filename: 'FY-2024-2025-Q2.pdf',
      link: '/pdf/FY-2024-2025-Q2.pdf'
    },
    {
      title: 'Public Disclosure Report FY 2024-25 Q1',
      year: 'FY 2024-25 Q1',
      size: '913 KB',
      filename: 'FY-2024-2025-Q1.pdf',
      link: '/pdf/FY-2024-2025-Q1.pdf'
    }
  ],
  mgt7: [
    {
      title: 'Form MGT-7 (Annual Return of MUDRA Ltd.) FY 2023-24',
      year: 'FY 2023-24',
      size: '991 KB',
      filename: 'MGT_7 - 2023-24.pdf',
      link: '/pdf/MGT_7%20-%202023-24.pdf'
    },
    {
      title: 'Form MGT-7 (Annual Return of MUDRA Ltd.) FY 2022-23',
      year: 'FY 2022-23',
      size: '1.0 MB',
      filename: 'MGT-7 FY 2022-23.pdf',
      link: '/pdf/MGT-7%20FY%202022-23.pdf'
    },
    {
      title: 'Form MGT-7 (Annual Return of MUDRA Ltd.) FY 2021-22',
      year: 'FY 2021-22',
      size: '992 KB',
      filename: 'MGT-7 FY 2021-22.pdf',
      link: '/pdf/MGT-7%20FY%202021-22.pdf'
    }
  ]
};

export default function Financials() {
  const [searchParams] = useSearchParams();
  const tabParam = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState('annual');
  const [downloadToast, setDownloadToast] = useState(null);
  const [docSearch, setDocSearch] = useState('');
  const [fyFilter, setFyFilter] = useState('all');
  const [previewReport, setPreviewReport] = useState(null);

  useEffect(() => {
    if (tabParam && financialData[tabParam]) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  // Reset the FY filter when switching document type — the year list differs per tab.
  useEffect(() => {
    setFyFilter('all');
  }, [activeTab]);

  const allReportsInTab = financialData[activeTab] || financialData.annual;
  const fyOptions = [...new Set(allReportsInTab.map((r) => r.year))];
  const activeReports = allReportsInTab.filter((r) => {
    const matchesSearch = !docSearch || r.title.toLowerCase().includes(docSearch.toLowerCase());
    const matchesFy = fyFilter === 'all' || r.year === fyFilter;
    return matchesSearch && matchesFy;
  });

  const handleDownload = (report) => {
    setDownloadToast(report.title);
    setTimeout(() => {
      setDownloadToast(null);
    }, 3000);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-[#021731] dark:text-slate-100 flex flex-col justify-between">

      {/* Global heritage backdrop: a faint watermark, not a competing photo —
          kept subtle so every section reads as a clean, high-contrast surface
          like the reference institutional sites (SIDBI/CGTMSE/NCGTC). */}
      <div
        className="pointer-events-none fixed inset-0 z-0 bg-cover bg-center opacity-[0.05] dark:opacity-[0.04]"
        style={{ backgroundImage: `url('/photo/tajmahal.png')` }}
        aria-hidden="true"
      />

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
              <span>FINANCIAL TRANSPARENCY & STATEMENTS</span>
            </motion.span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight mb-2 [text-shadow:0_4px_18px_rgba(2,23,49,0.55)]">
              Financials & Statutory Reports
            </h1>
            <p className="pb-5 text-blue-50 max-w-3xl mx-auto text-sm sm:text-base font-semibold leading-snug [text-shadow:0_2px_10px_rgba(2,23,49,0.5)]">
              Official audited annual reports, regulatory public disclosures, and Form MGT-7 statutory filings of MUDRA Ltd.
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
              <linearGradient id="financialsHeroCurveBorder" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#7dd3fc" />
                <stop offset="55%" stopColor="#00b6f0" />
                <stop offset="100%" stopColor="#021731" />
              </linearGradient>
            </defs>
            <path d="M0,70 C360,0 720,140 1080,70 C1260,35 1350,20 1440,45 L1440,140 L0,140 Z" className="fill-slate-50 dark:fill-[#021731]" />
            <path d="M0,70 C360,0 720,140 1080,70 C1260,35 1350,20 1440,45" fill="none" stroke="url(#financialsHeroCurveBorder)" strokeWidth="7" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto px-4 py-12 w-full relative z-10">
        {/* Stats Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md text-center">
            <TrendingUp size={28} className="text-emerald-500 mx-auto mb-2" />
            <p className="text-3xl font-black text-[#011a39] dark:text-white">₹27.5+ Lakh Cr</p>
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-1">Cumulative Capital Disbursed</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md text-center">
            <Award size={28} className="text-amber-500 mx-auto mb-2" />
            <p className="text-3xl font-black text-[#011a39] dark:text-white">48.5+ Crore</p>
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-1">Total Loan Accounts Sanctioned</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md text-center">
            <ShieldCheck size={28} className="text-blue-500 mx-auto mb-2" />
            <p className="text-3xl font-black text-[#011a39] dark:text-white">AAA Rating</p>
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-1">Highest Credit Rating (CARE / CRISIL)</p>
          </div>
        </div>

        {/* Analytics dashboard — filters, charts, exports */}
        <AnalyticsDashboard />

        {/* Category Tabs */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
          {financialTabs.map((tab) => (
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-black tracking-wide transition-all ${
                activeTab === tab.id
                  ? 'bg-blue-800 dark:bg-blue-600 text-white shadow-lg'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-amber-50'
              }`}
            >
              {tab.label}
            </motion.button>
          ))}
        </div>

        {/* Document library search + FY filter */}
        <div className="mx-auto mb-8 flex max-w-5xl flex-wrap items-center gap-3">
          <div className="relative max-w-xs flex-1">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
            <input
              type="text"
              value={docSearch}
              onChange={(e) => setDocSearch(e.target.value)}
              placeholder="Search document titles..."
              aria-label="Search documents"
              className="w-full rounded-full border-2 border-slate-200 bg-white py-2 pl-10 pr-4 text-xs font-bold text-slate-900 shadow-sm focus:border-[#00b6f0] focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-white"
            />
          </div>
          <select
            value={fyFilter}
            onChange={(e) => setFyFilter(e.target.value)}
            aria-label="Filter by Financial Year"
            className="rounded-full border-2 border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 shadow-sm focus:border-[#00b6f0] focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
          >
            <option value="all">All Financial Years</option>
            {fyOptions.map((y) => <option key={y} value={y}>{y}</option>)}
          </select>
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            {activeReports.length} of {allReportsInTab.length} documents
          </span>
        </div>

        {/* Reports Download Grid */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {activeReports.map((report, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -4 }}
                className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-slate-800 px-2.5 py-0.5 rounded-md flex items-center gap-1">
                      <FileText size={12} />
                      {report.year}
                    </span>
                    <span className="text-xs font-bold text-slate-500">PDF ({report.size})</span>
                  </div>

                  <h3 className="text-base font-black text-[#011a39] dark:text-white">
                    {report.title}
                  </h3>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setPreviewReport(report)}
                    className="px-4 py-2.5 rounded-full border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-black shadow-sm flex items-center gap-1.5 transition-all uppercase tracking-wide hover:border-[#00b6f0] hover:text-[#004265]"
                  >
                    <Eye size={13} />
                    <span>Preview</span>
                  </button>

                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={report.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleDownload(report)}
                    className="px-5 py-2.5 rounded-full bg-amber-400 hover:bg-amber-500 text-slate-950 text-xs font-black shadow flex items-center gap-1.5 transition-all uppercase tracking-wide"
                  >
                    <span>DOWNLOAD</span>
                    <Download size={13} />
                  </motion.a>
                </div>
              </motion.div>
            ))}

            {activeReports.length === 0 && (
              <div className="col-span-full text-center py-14 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
                <Search className="w-9 h-9 text-slate-400 mx-auto mb-3" />
                <p className="text-sm font-bold text-slate-700 dark:text-slate-300">No documents match your search or filter.</p>
                <button
                  type="button"
                  onClick={() => { setDocSearch(''); setFyFilter('all'); }}
                  className="mt-3 text-xs font-black text-blue-800 dark:text-blue-400 hover:underline"
                >
                  Clear Search &amp; Filter
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* In-browser document preview */}
        <AnimatePresence>
          {previewReport && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md"
              onClick={() => setPreviewReport(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 12 }}
                onClick={(e) => e.stopPropagation()}
                className="relative flex h-[88vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-slate-900"
              >
                <div className="flex items-center justify-between border-b border-slate-200 px-5 py-3.5 dark:border-slate-800">
                  <h3 className="truncate text-sm font-extrabold text-slate-900 dark:text-white">{previewReport.title}</h3>
                  <div className="flex items-center gap-2">
                    <a
                      href={previewReport.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-600 hover:border-[#00b6f0] hover:text-[#004265] dark:border-slate-700 dark:text-slate-300"
                    >
                      Open in New Tab
                    </a>
                    <button
                      type="button"
                      onClick={() => setPreviewReport(null)}
                      aria-label="Close preview"
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
                <iframe title={previewReport.title} src={previewReport.link} className="flex-1 bg-slate-100 dark:bg-slate-800" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Download Toast */}
        <AnimatePresence>
          {downloadToast && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-2xl border border-emerald-500 shadow-2xl flex items-center gap-3"
            >
              <CheckCircle2 size={20} className="text-emerald-400 animate-bounce" />
              <div className="text-xs font-bold">
                <p className="text-emerald-400 font-black">Opening PDF Document...</p>
                <p className="text-slate-300">{downloadToast}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </main>

      <Footer />
      <ChatBot />
    </div>
  );
}
