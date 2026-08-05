import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, ChevronRight, FileText, ShieldAlert, Search, CheckCircle2 } from 'lucide-react';
import Header from '../components/home/Header';
import Footer from '../components/home/Footer';
import ChatBot from '../components/ChatBot';

const careerNotices = [
  {
    year: '2024-25',
    title: 'Recruitment of Suitable Professionals at MUDRA 2024-25',
    items: [
      { name: 'Recruitment for the post of Company Secretary cum Compliance Officer', date: '2024-06-15', size: '1.2 MB' },
      { name: 'Addendum to CS cum Compliance Officer Advertisement', date: '2024-07-01', size: '450 KB' }
    ]
  },
  {
    year: '2023-24',
    title: 'Recruitment of Suitable Professionals at MUDRA 2023-24',
    items: [
      { name: 'Recruitment for the post of Chief Risk Officer (CRO)', date: '2023-11-20', size: '1.8 MB' },
      { name: 'Detailed Application Eligibility Criteria & Guidelines', date: '2023-11-25', size: '890 KB' }
    ]
  },
  {
    year: '2022-23',
    title: 'Recruitment of Suitable Professionals at MUDRA 2022-23',
    items: [
      { name: 'Recruitment for the post of Company Secretary cum Compliance Officer', date: '2022-09-10', size: '1.4 MB' },
      { name: 'Addendum - Revised Qualifications', date: '2022-09-22', size: '510 KB' },
      { name: 'Detailed Advertisement Recruitment of HOD at MUDRA dated August 05, 2022', date: '2022-08-05', size: '2.1 MB' }
    ]
  },
  {
    year: '2022',
    title: 'Recruitment of Suitable Professionals at MUDRA 2022',
    items: [
      { name: 'Detailed Advertisement Recruitment at MUDRA January 2022', date: '2022-01-14', size: '1.6 MB' }
    ]
  },
  {
    year: '2021',
    title: 'Recruitment of Suitable Professionals at MUDRA 2021',
    items: [
      { name: 'Detailed Advertisement Recruitment at MUDRA 2021-22', date: '2021-10-05', size: '1.5 MB' },
      { name: 'Official Bio-Data Application Form Format', date: '2021-10-10', size: '320 KB' }
    ]
  },
  {
    year: '2019',
    title: 'Recruitment of Suitable Professionals at MUDRA 2019',
    items: [
      { name: 'Revised Detailed Advertisement for Senior Analysts', date: '2019-05-18', size: '1.3 MB' },
      { name: 'Application Form - General Candidates', date: '2019-05-20', size: '280 KB' },
      { name: 'Corrigendum & Extension of Submission Deadline', date: '2019-06-01', size: '190 KB' }
    ]
  },
  {
    year: '2018',
    title: 'Advertisement for Recruitment of Suitable Professionals at MUDRA 2018',
    items: [
      { name: 'Detailed Advertisement - Credit & Risk Managers', date: '2018-04-12', size: '1.1 MB' },
      { name: 'Application Form Format 2018', date: '2018-04-15', size: '310 KB' }
    ]
  },
  {
    year: '2017',
    title: 'Recruitment of Company Secretary cum Compliance Officer',
    items: [
      { name: 'Advertisement for Post of Company Secretary cum Compliance Officer', date: '2017-08-02', size: '980 KB' },
      { name: 'Terms of Reference & Remuneration Structure', date: '2017-08-05', size: '420 KB' },
      { name: 'Bio-Data Format for Application Submission', date: '2017-08-08', size: '290 KB' }
    ]
  },
  {
    year: '2016',
    title: 'Advertisement for the post of Managing Director & Chief Executive Officer, MUDRA',
    items: [
      { name: 'Advertisement for the post of Managing Director & Chief Executive Officer (MD & CEO)', date: '2016-03-10', size: '1.7 MB' },
      { name: 'Extension Date for Application Submission', date: '2016-03-25', size: '210 KB' },
      { name: 'Detailed Advertisement - MD & CEO MUDRA Ltd.', date: '2016-03-12', size: '2.0 MB' },
      { name: 'Official Application Form - MD & CEO MUDRA', date: '2016-03-15', size: '350 KB' }
    ]
  }
];

export default function Careers() {
  const [searchQuery, setSearchQuery] = useState('');
  const [downloadModalItem, setDownloadModalItem] = useState(null);

  const filteredNotices = careerNotices.map(group => ({
    ...group,
    items: group.items.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(group => group.items.length > 0);

  const handleDownload = (item) => {
    setDownloadModalItem(item);
    setTimeout(() => {
      setDownloadModalItem(null);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070b14] text-slate-900 dark:text-slate-100 transition-colors duration-300 flex flex-col justify-between">
      <Header />

      {/* Hero Banner with Dark Emerald/Slate Overlay */}
      <div className="relative bg-[#0b1d2e] text-white py-12 px-4 border-b border-slate-800 shadow-inner">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 mb-2">
              <span>Home</span>
              <ChevronRight size={12} />
              <span className="text-white">Careers</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
              CAREERS
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 font-semibold mt-1">
              Official Recruitment Notifications, Advertisements & Application Form Formats
            </p>
          </div>

          {/* Live Filter Search */}
          <div className="w-full md:w-80 relative">
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search notifications..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white placeholder-slate-400 text-xs font-semibold focus:border-amber-400 outline-none transition-all shadow-md"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl mx-auto px-4 py-10 w-full space-y-8">
        
        {/* Recruitment Groups */}
        <div className="space-y-6">
          {filteredNotices.map((group, groupIdx) => (
            <motion.div 
              key={groupIdx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: groupIdx * 0.04 }}
              className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800"
            >
              {/* Deep Red Official Header */}
              <div className="bg-gradient-to-r from-red-800 to-red-900 px-6 py-4 flex items-center justify-between text-white">
                <h2 className="text-sm sm:text-base font-black tracking-wide flex items-center gap-2">
                  <FileText size={18} className="text-amber-400" />
                  <span>{group.title}</span>
                </h2>
                <span className="text-[11px] font-black bg-white/15 px-3 py-1 rounded-full text-amber-300 border border-white/10 shrink-0">
                  {group.items.length} {group.items.length === 1 ? 'Notice' : 'Documents'}
                </span>
              </div>

              {/* Items List */}
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {group.items.map((item, itemIdx) => (
                  <div 
                    key={itemIdx}
                    className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-amber-50/50 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <div className="space-y-1">
                      <p className="text-xs sm:text-sm font-black text-slate-800 dark:text-slate-200">
                        {item.name}
                      </p>
                      <div className="flex items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400 font-bold">
                        <span>Date: {item.date}</span>
                        <span>•</span>
                        <span>Size: {item.size}</span>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      onClick={() => handleDownload(item)}
                      className="px-5 py-2.5 rounded-full bg-amber-400 hover:bg-amber-500 text-slate-950 text-xs font-black shadow-md flex items-center justify-center gap-2 transition-all shrink-0"
                    >
                      <span>DOWNLOAD</span>
                      <Download size={14} className="text-slate-950" />
                    </motion.button>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Official Statutory Caution Banner */}
        <div className="bg-gradient-to-r from-red-900 to-red-950 text-white p-6 sm:p-8 rounded-3xl border-2 border-amber-400/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-black text-xs uppercase tracking-wider">
              <ShieldAlert size={18} />
              <span>OFFICIAL CAUTION ADVISORY</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 font-semibold leading-relaxed max-w-3xl">
              MUDRA is a refinancing institution. MUDRA does not directly extend micro-loans to individual borrowers. All loans under Pradhan Mantri MUDRA Yojana (PMMY) are extended exclusively through Banks, MFIs, and NBFCs.
            </p>
            <p className="text-[11px] text-amber-300 font-bold italic">
              Note: There are no agents or middlemen engaged by MUDRA for availing MUDRA loans. Borrowers are advised to stay away from persons posing as agents/facilitators of MUDRA/DEMAT.
            </p>
          </div>

          <a 
            href="https://www.jansamarth.in/login"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black shadow-lg transition-all shrink-0 text-center uppercase tracking-wide border border-amber-300"
          >
            ENROLL TRAINED PARTNER
          </a>
        </div>

        {/* Download Modal Indicator */}
        <AnimatePresence>
          {downloadModalItem && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-2xl border border-emerald-500 shadow-2xl flex items-center gap-3"
            >
              <CheckCircle2 size={20} className="text-emerald-400 animate-bounce" />
              <div className="text-xs font-bold">
                <p className="text-emerald-400 font-black">Downloading Document...</p>
                <p className="text-slate-300 truncate max-w-xs">{downloadModalItem.name}</p>
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
