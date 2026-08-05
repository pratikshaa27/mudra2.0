import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Download, TrendingUp, ShieldCheck, CheckCircle2, Sparkles, Award } from 'lucide-react';
import Header from '../components/home/Header';
import Footer from '../components/home/Footer';
import ChatBot from '../components/ChatBot';

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

  useEffect(() => {
    if (tabParam && financialData[tabParam]) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  const activeReports = financialData[activeTab] || financialData.annual;

  const handleDownload = (report) => {
    setDownloadToast(report.title);
    setTimeout(() => {
      setDownloadToast(null);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070b14] text-slate-900 dark:text-slate-100 transition-colors duration-300 flex flex-col justify-between">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 py-12 w-full">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 bg-[#f97316] text-white px-3.5 py-1 rounded-md text-xs font-black tracking-wider uppercase mb-3 shadow-sm">
            <Sparkles size={14} className="text-white" />
            <span>FINANCIAL TRANSPARENCY & STATEMENTS</span>
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0f2942] dark:text-white tracking-tight mb-3">
            Financials & Statutory Reports
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base font-semibold">
            Official audited annual reports, regulatory public disclosures, and Form MGT-7 statutory filings of MUDRA Ltd.
          </p>
        </div>

        {/* Stats Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md text-center">
            <TrendingUp size={28} className="text-emerald-500 mx-auto mb-2" />
            <p className="text-3xl font-black text-[#0f2942] dark:text-white">₹27.5+ Lakh Cr</p>
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-1">Cumulative Capital Disbursed</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md text-center">
            <Award size={28} className="text-amber-500 mx-auto mb-2" />
            <p className="text-3xl font-black text-[#0f2942] dark:text-white">48.5+ Crore</p>
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-1">Total Loan Accounts Sanctioned</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md text-center">
            <ShieldCheck size={28} className="text-blue-500 mx-auto mb-2" />
            <p className="text-3xl font-black text-[#0f2942] dark:text-white">AAA Rating</p>
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-1">Highest Credit Rating (CARE / CRISIL)</p>
          </div>
        </div>

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
                  ? 'bg-red-800 dark:bg-amber-500 text-white dark:text-slate-950 shadow-lg'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-amber-50'
              }`}
            >
              {tab.label}
            </motion.button>
          ))}
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
                    <span className="text-[10px] font-black uppercase text-red-700 dark:text-amber-400 bg-red-50 dark:bg-slate-800 px-2.5 py-0.5 rounded-md flex items-center gap-1">
                      <FileText size={12} />
                      {report.year}
                    </span>
                    <span className="text-xs font-bold text-slate-500">PDF ({report.size})</span>
                  </div>

                  <h3 className="text-base font-black text-[#0f2942] dark:text-white">
                    {report.title}
                  </h3>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Official PDF Document</span>
                  
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={report.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleDownload(report)}
                    className="px-5 py-2.5 rounded-full bg-amber-400 hover:bg-amber-500 text-slate-950 text-xs font-black shadow flex items-center gap-1.5 transition-all uppercase tracking-wide"
                  >
                    <span>VIEW / DOWNLOAD PDF</span>
                    <Download size={13} />
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </motion.div>
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
