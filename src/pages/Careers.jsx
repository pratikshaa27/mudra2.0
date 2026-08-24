import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, FileText, ShieldAlert, CheckCircle2 } from 'lucide-react';
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
    <div className="min-h-screen bg-slate-50 dark:bg-[#021731] text-slate-900 dark:text-slate-100 transition-colors duration-300 flex flex-col justify-between relative overflow-hidden">

      {/* Global heritage backdrop: a faint watermark, not a competing photo —
          kept subtle so every section reads as a clean, high-contrast surface. */}
      <div
        className="pointer-events-none fixed inset-0 z-0 bg-cover bg-center opacity-[0.05] dark:opacity-[0.04]"
        style={{ backgroundImage: `url('/photo/tajmahal.png')` }}
        aria-hidden="true"
      />

      <Header />

      {/* Main Content */}
      <main className="flex-1 w-full relative z-10">

        {/* Hero Page Header with Ambient Animations — filled with the same
            light-blue → accent → navy ramp traced by the S-curve below, so the
            band and its border read as one continuous piece. Text switches to
            white/gold here since it now sits on a saturated blue, not a pale
            tint. Sits directly in the unconstrained <main>, so it bleeds the
            full viewport width instead of being capped by the content column. */}
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
                <FileText size={12} className="text-white animate-pulse" />
                <span>Careers at MUDRA</span>
              </motion.span>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight mb-2 [text-shadow:0_4px_18px_rgba(2,23,49,0.55)]">
                Recruitment & Careers
              </h1>
              <p className="pb-5 text-blue-50 max-w-3xl mx-auto text-sm sm:text-base font-semibold leading-snug [text-shadow:0_2px_10px_rgba(2,23,49,0.5)]">
                Explore current and past recruitment notices, detailed advertisements, and application forms for professional positions at MUDRA.
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
                <linearGradient id="careersHeroCurveBorder" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#7dd3fc" />
                  <stop offset="55%" stopColor="#00b6f0" />
                  <stop offset="100%" stopColor="#021731" />
                </linearGradient>
              </defs>
              <path d="M0,70 C360,0 720,140 1080,70 C1260,35 1350,20 1440,45 L1440,140 L0,140 Z" className="fill-slate-50 dark:fill-[#021731]" />
              <path d="M0,70 C360,0 720,140 1080,70 C1260,35 1350,20 1440,45" fill="none" stroke="url(#careersHeroCurveBorder)" strokeWidth="7" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-10 w-full space-y-8">

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
              {/* Deep Blue Official Header */}
              <div className="bg-gradient-to-r from-blue-800 to-blue-900 px-6 py-4 flex items-center justify-between text-white">
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
                        <span className="px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-400 font-black text-[10px] uppercase">
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
            href=""
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black shadow-lg transition-all shrink-0 text-center uppercase tracking-wide border border-amber-300"
          >
            ENROLL TRAINED PARTNER
          </a>
        </div>

        </div>

        {/* Download Modal Indicator */}
        <AnimatePresence>
          {downloadModalItem && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed inset-x-4 bottom-6 z-50 flex items-center gap-3 rounded-2xl border border-emerald-500 bg-slate-900 px-5 py-3.5 text-white shadow-2xl sm:inset-x-auto sm:left-auto sm:right-6 sm:max-w-sm"
            >
              <CheckCircle2 size={20} className="shrink-0 text-emerald-400 animate-bounce" />
              <div className="min-w-0 text-xs font-bold">
                <p className="text-emerald-400 font-black">Downloading Document...</p>
                <p className="truncate text-slate-300">{downloadModalItem.name}</p>
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
