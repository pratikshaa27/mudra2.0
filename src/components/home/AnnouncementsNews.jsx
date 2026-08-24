import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, FileText, ShieldAlert, Calendar, Download, Megaphone, ChevronRight } from 'lucide-react';
import { Reveal } from '@/components/ui/reveal';
import SectionHeading from '@/components/ui/section-heading';
import { useLanguage } from '../LanguageContext';

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
  const { t } = useLanguage();
  const tabs = [
    { id: 'news', label: t('newsTabPress'), icon: Bell },
    { id: 'circulars', label: t('newsTabCirculars'), icon: FileText },
    { id: 'advisories', label: t('newsTabAdvisories'), icon: ShieldAlert }
  ];
  const [activeTab, setActiveTab] = useState('news');
  const items = announcementsData[activeTab] || [];

  return (
    <section className="section-y relative border-t border-slate-200 text-slate-900 dark:border-slate-800 dark:text-slate-100">
      <div className="shell">
        {/* CGTMSE-style statutory advisory ribbon — surfaces the fraud warning
            that already exists in the 'advisories' tab up front, so it is
            immediately visible like the reference site's caution banner. */}
        <Reveal variant="up">
          <div className="mb-8 rounded-xl border border-amber-200 bg-amber-50/80 px-4 py-3.5 text-xs font-semibold text-amber-900 dark:border-amber-900/40 dark:bg-amber-950/30 dark:text-amber-200 md:py-4 md:text-sm">
            <ShieldAlert className="inline-block h-4 w-4 shrink-0 text-amber-700 dark:text-amber-400" aria-hidden="true" />
            <span className="ml-2 font-bold">{t('newsAdvisoryLabel')}</span>
            <span className="ml-1">
              {t('newsAdvisoryText')}
              (<a
                href="https://www.jansamarth.in/login"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-amber-700/50 dark:decoration-amber-400/50"
              >
                www.jansamarth.in
              </a>
              ). Report fraud to <strong className="font-extrabold">1800-180-1111</strong>.
            </span>
          </div>
        </Reveal>

        <SectionHeading
          eyebrow={t('newsEyebrow')}
          icon={Megaphone}
          title={t('newsTitle')}
          description={t('newsDescription')}
        >
          <div
            role="tablist"
            aria-label="Announcement categories"
            className="no-scrollbar fade-scroll-x inline-flex max-w-full items-center gap-1 overflow-x-auto rounded-full border border-slate-200 bg-slate-100 p-1.5 text-xs font-bold dark:border-slate-700 dark:bg-slate-800"
          >
            {tabs.map((tab) => {
              const isSelected = activeTab === tab.id;
              const TabIcon = tab.icon;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2 transition-colors duration-200 ${
                    isSelected
                      ? 'text-white dark:text-slate-950'
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
                  }`}
                >
                  {isSelected && (
                    <motion.span
                      layoutId="newsActivePill"
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                      className="absolute inset-0 -z-10 rounded-full bg-blue-700 shadow-sm dark:bg-blue-400"
                    />
                  )}
                  <TabIcon size={13} aria-hidden="true" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </SectionHeading>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <AnimatePresence mode="wait">
            {items.map((item, idx) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3, delay: idx * 0.07, ease: [0.22, 1, 0.36, 1] }}
                className="card-lift card-accent-top relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:border-blue-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-600/50"
              >
                <div className="mb-3.5 flex flex-wrap items-center justify-between gap-2">
                  <span className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-blue-700 dark:border-blue-900 dark:bg-blue-950/50 dark:text-blue-300">
                    {item.tag}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                    <Calendar size={12} aria-hidden="true" />
                    <span>{item.date}</span>
                  </span>
                </div>

                <h3 className="mb-2.5 text-base font-extrabold leading-snug text-slate-900 dark:text-white">
                  {item.title}
                </h3>

                <p className="mb-5 text-xs font-medium leading-relaxed text-slate-600 dark:text-slate-300">
                  {item.desc}
                </p>

                <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
                  <a
                    href="#"
                    className="link-underline group flex items-center gap-1 text-xs font-bold text-blue-700 dark:text-blue-400"
                  >
                    <span>{t('newsReadCircular')}</span>
                    <ChevronRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
                  </a>

                  <button
                    type="button"
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-400 hover:text-blue-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                    title="Download Official Notice"
                    aria-label="Download Official Notice"
                  >
                    <Download size={14} aria-hidden="true" />
                  </button>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
