import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, ChevronRight, FileText, ShieldAlert, Search, CheckCircle2 } from 'lucide-react';
import Header from '../components/home/Header';
import Footer from '../components/home/Footer';
import ChatBot from '../components/ChatBot';

const careerNotices = [
  {
    year: '2024-25',
    title: 'Recruitment of Suitable Professionals at MUDRA (2024-25)',
    items: [
      {
        name: 'Recruitment for the post of Company Secretary cum Compliance Officer',
        date: '2024-06-15',
        size: '448 KB',
        type: 'PDF',
        pdf: '/career/Recruitment for the post of Company Secretary cum Compliance Officer.docx'
      },
      {
        name: 'Addendum - Company Secretary cum Compliance Officer',
        date: '2024-06-20',
        size: '48 KB',
        type: 'DOCX',
        pdf: '/career/Addendum_CSCO.docx'
      },
      {
        name: 'Terms of Reference',
        date: '2024-07-01',
        size: '146 KB',
        type: 'PDF',
        pdf: '/career/Terms_of_Reference.pdf'
      }
    ]
  },
  {
    year: '2023-24',
    title: 'Recruitment of Suitable Professionals at MUDRA (2023-24)',
    items: [
      {
        name: 'Recruitment for the post of Chief Risk Officer (CRO)',
        date: '2023-11-20',
        size: '304 KB',
        type: 'PDF',
        pdf: '/career/MUDRA%20-Recruitment%20of%20Chief%20Risk%20Officer.pdf'
      },
      {
        name: 'Biodata Format',
        date: '2023-11-25',
        size: '36 KB',
        type: 'PDF',
        pdf: '/career/Biodata_Format.pdf'
      }
    ]
  },
  {
    year: '2022-23',
    title: 'Recruitment of Suitable Professionals at MUDRA (2022-23)',
    items: [
      {
        name: 'Detailed Advertisement-Recruitment of HOD at MUDRA dated August 05, 2022',
        date: '2022-08-05',
        size: '3.3 MB',
        type: 'PDF',
        pdf: '/career/Detailed%20Advertisement_August%202022.pdf'
      },
      {
        name: 'Corrigendum - Change of Application Email ID',
        date: '2022-08-15',
        size: '33 KB',
        type: 'PDF',
        pdf: '/career/Corringedum%20-%20Change%20of%20email%20ID.pdf'
      },
      {
        name: 'Detailed Advertisement-Recruitment at MUDRA 2021-22',
        date: '2022-01-14',
        size: '571 KB',
        type: 'PDF',
        pdf: '/career/Detailed%20Advertisement-January%202022.pdf'
      }
    ]
  },
  {
    year: '2021',
    title: 'Recruitment Application Form & Guidelines (2021)',
    items: [
      {
        name: 'Application Form',
        date: '2021-05-10',
        size: '52 KB',
        type: 'DOCX',
        pdf: '/career/Application_Form_May_2021.docx'
      }
    ]
  },
  {
    year: '2019-20',
    title: 'Recruitment of Suitable Professionals at MUDRA (2019-20)',
    items: [
      {
        name: 'Revised detailed advertisement',
        date: '2019-05-18',
        size: '664 KB',
        type: 'PDF',
        pdf: '/career/Revised%20Detailed%20Advertisement%20-%20Recruitment%20at%20MUDRA%202019.pdf'
      },
      {
        name: 'Detailed Advertisement',
        date: '2019-05-25',
        size: '636 KB',
        type: 'PDF',
        pdf: '/career/Detailed-Recruitment-Advertisement-Revised-May.pdf'
      },
      {
        name: 'Advertisement for Recruitment of suitable professionals at MUDRA',
        date: '2019-06-01',
        size: '141 KB',
        type: 'PDF',
        pdf: '/career/Advertisement_for_Recruitment_of_suitable_professionals_at_MUDRA.pdf'
      },
      {
        name: 'Application Form',
        date: '2019-06-05',
        size: '58 KB',
        type: 'DOCX',
        pdf: '/career/Application%20Form%20-%20Recruitment%20at%20MUDRA%202019.docx'
      }
    ]
  },
  {
    year: '2016',
    title: 'Recruitment for the post of Managing Director & Chief Executive Officer, MUDRA',
    items: [
      {
        name: 'Advertisement for the post of Managing Director & Chief Executive Officer, Mudra',
        date: '2016-03-10',
        size: '222 KB',
        type: 'PDF',
        pdf: '/career/Advertisement_for_the_post_of_Managing_Director_Chief_Executive_Officer.pdf'
      },
      {
        name: 'Detailed advertisement- MD & CEO MUDRA',
        date: '2016-03-12',
        size: '162 KB',
        type: 'PDF',
        pdf: '/career/Detailed_Advertisement_MD_CEO_MUDRA.pdf'
      },
      {
        name: 'Application form - MD & CEO MUDRA',
        date: '2016-03-15',
        size: '539 KB',
        type: 'PDF',
        pdf: '/career/Application_form_MD_CEO_MUDRA.pdf'
      },
      {
        name: 'Corrigendum',
        date: '2016-03-25',
        size: '91 KB',
        type: 'PDF',
        pdf: '/career/Corrigendum_EN.pdf'
      }
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
    <div className="min-h-screen bg-slate-50 dark:bg-[#070b14] text-slate-900 dark:text-slate-100 transition-colors duration-300 flex flex-col justify-between relative overflow-hidden">
      
      {/* Taj Mahal Fixed Background Image Effect */}
      <div 
        className="absolute inset-0 pointer-events-none bg-cover bg-center bg-fixed filter brightness-105 contrast-110 opacity-75 dark:opacity-55"
        style={{ backgroundImage: `url('/photo/tajmahal.png')` }}
      />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#fffbeb]/75 via-white/55 to-[#fffbeb]/85 dark:from-[#070b14]/85 dark:via-[#070b14]/75 dark:to-[#070b14]/90" />

      <Header />

      {/* Main Content */}
      <main className="flex-1 max-w-6xl mx-auto px-4 py-10 w-full space-y-8 relative z-10">

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
                        <span className="px-2 py-0.5 rounded bg-red-100 dark:bg-red-950/80 text-red-800 dark:text-amber-400 font-black text-[10px] uppercase">
                          {item.type || 'PDF'}
                        </span>
                        <span>Date: {item.date}</span>
                        <span>•</span>
                        <span>Size: {item.size}</span>
                      </div>
                    </div>

                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={item.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                      onClick={() => handleDownload(item)}
                      className="px-5 py-2.5 rounded-full bg-amber-400 hover:bg-amber-500 text-slate-950 text-xs font-black shadow-md flex items-center justify-center gap-2 transition-all shrink-0 cursor-pointer"
                    >
                      <span>DOWNLOAD {item.type || 'FILE'}</span>
                      <Download size={14} className="text-slate-950" />
                    </motion.a>
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
