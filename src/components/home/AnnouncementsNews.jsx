import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, FileText, ShieldAlert, Calendar, Download, ExternalLink, Sparkles, ChevronRight, Megaphone } from 'lucide-react';

const announcementsData = {
  news: [
    {
      id: 1,
      date: 'Aug 02, 2026',
      tag: 'POLICY UPDATE',
      title: 'MUDRA 2.0 TarunPlus Loan Category Enhanced to ₹20 Lakhs',
      desc: 'Union Finance Ministry expands loan ceiling for repeat borrowers under Pradhan Mantri MUDRA Yojana to foster MSME scaling.',
      pdf: '#'
    },
    {
      id: 2,
      date: 'Jul 28, 2026',
      tag: 'PRESS RELEASE',
      title: 'Over 50 Crore MUDRA Loans Disbursed Benchmark Achieved',
      desc: 'National celebration of 10 years of MUDRA financial inclusion with over ₹33 Lakh Crore credit disbursed to micro units.',
      pdf: '#'
    },
    {
      id: 3,
      date: 'Jul 15, 2026',
      tag: 'DIGITAL PORTAL',
      title: 'AI-Powered Credit Eligibility Assistant Integrated into MUDRA Portal',
      desc: 'Borrowers can now calculate estimated credit scores and get direct recommendations before applying to Member Lending Institutions.',
      pdf: '#'
    }
  ],
  circulars: [
    {
      id: 4,
      date: 'Jun 30, 2026',
      tag: 'BANK CIRCULAR',
      title: 'Master Guidelines on Collateral-Free Credit Coverage via CGFMU',
      desc: 'Updated instructions for all Member Lending Institutions regarding guarantee fee waivers and seamless claim settlement.',
      pdf: '#'
    },
    {
      id: 5,
      date: 'Jun 12, 2026',
      tag: 'MLI INSTRUCTION',
      title: 'MUDRA RuPay Debit Card Issuance Mandate for Kishore & Tarun Borrowers',
      desc: 'Mandatory issuance of RuPay debit card working capital limits to ensure liquidity for small shopkeepers and artisans.',
      pdf: '#'
    }
  ],
  advisories: [
    {
      id: 6,
      date: 'IMMEDIATE NOTICE',
      tag: 'CAUTION ADVISORY',
      title: 'Caution Against Fraudulent Individuals Posing as Official MUDRA Agents',
      desc: 'MUDRA Ltd. does NOT charge any upfront processing fee nor engage middle agents. Always apply directly via Banks or JanSamarth portal.',
      pdf: '#'
    },
    {
      id: 7,
      date: 'STATUTORY ALERT',
      tag: 'VIGILANCE WEEK',
      title: 'Vigilance Awareness Week & Direct Whistleblower Helpline',
      desc: 'Report any unauthorized fee demands or fake loan approval letters to MUDRA Vigilance Officers at toll-free helpline 1800-180-1111.',
      pdf: '#'
    }
  ]
};

export default function AnnouncementsNews() {
  const [activeTab, setActiveTab] = useState('news');
  const items = announcementsData[activeTab] || [];

  return (
    <section className="py-20 bg-transparent text-slate-900 dark:text-slate-100 transition-colors duration-300 relative border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Centered Uniform Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-100 dark:bg-red-950/60 border border-red-300 dark:border-red-800 text-red-900 dark:text-amber-300 text-xs font-black tracking-wider uppercase mb-3">
            <Megaphone size={14} className="text-red-700 dark:text-amber-400" />
            <span>OFFICIAL BULLETIN & NOTIFICATIONS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
            Announcements & Latest News
          </h2>

          <div className="w-32 h-1.5 bg-gradient-to-r from-red-700 via-amber-500 to-red-700 mx-auto rounded-full mb-6"></div>

          <p className="text-slate-600 dark:text-slate-300 max-w-3xl mx-auto text-sm md:text-base font-semibold leading-relaxed mb-8">
            Stay informed with official press releases, government circulars, statutory vigilance alerts, and policy guidelines directly from MUDRA.
          </p>

          {/* Centered Tab Switcher with Sliding Pill Animation */}
          <div className="inline-flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-full border border-slate-200 dark:border-slate-700 text-xs font-black shadow-inner">
            {[
              { id: 'news', label: 'Press News', icon: Bell },
              { id: 'circulars', label: 'Official Circulars', icon: FileText },
              { id: 'advisories', label: 'Statutory Advisories', icon: ShieldAlert }
            ].map((tab) => {
              const isSelected = activeTab === tab.id;
              const TabIcon = tab.icon;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative z-10 px-4 py-2 rounded-full transition-colors flex items-center gap-1.5 ${
                    isSelected
                      ? 'text-white dark:text-slate-950 font-black'
                      : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="newsActivePill"
                      transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                      className="absolute inset-0 bg-red-800 dark:bg-amber-400 rounded-full shadow-md z-[-1]"
                    />
                  )}
                  <TabIcon size={14} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Content List */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AnimatePresence mode="wait">
            {items.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                whileHover={{ y: -6, scale: 1.02, boxShadow: "0 20px 40px -10px rgba(0,0,0,0.12)" }}
                className="bg-amber-50/50 dark:bg-slate-900/90 rounded-3xl p-6 border-2 border-amber-200/80 dark:border-slate-800 hover:border-amber-400 dark:hover:border-amber-500 transition-all flex flex-col justify-between relative overflow-hidden group"
              >
                {/* Top accent glow line on hover */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-700 via-amber-500 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-red-100 dark:bg-red-950/60 text-red-800 dark:text-amber-300 border border-red-200 dark:border-red-800">
                      {item.tag}
                    </span>
                    <div className="flex items-center gap-1 text-[11px] font-bold text-slate-500 dark:text-slate-400">
                      <Calendar size={12} />
                      <span>{item.date}</span>
                    </div>
                  </div>

                  <h3 className="text-base font-black text-slate-900 dark:text-white mb-2 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-300 font-semibold leading-relaxed mb-4">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-xs font-black">
                  <a
                    href="#"
                    className="text-red-800 dark:text-amber-400 hover:underline flex items-center gap-1"
                  >
                    <span>Read Circular</span>
                    <ChevronRight size={14} />
                  </a>

                  <button
                    type="button"
                    className="p-2 rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-amber-500 hover:text-slate-950 transition-colors shadow-sm"
                    title="Download Official Notice"
                  >
                    <Download size={14} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
