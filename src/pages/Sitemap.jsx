import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Network, ArrowRight } from 'lucide-react';
import Header from '../components/home/Header';
import Footer from '../components/home/Footer';
import ChatBot from '../components/ChatBot';
import SDivider from '@/components/ui/s-divider';
import { createPageUrl } from '@/utils';

const sections = [
  {
    title: 'Company',
    links: [
      { label: 'Home', href: createPageUrl('Home') },
      { label: 'About Us', href: createPageUrl('About') },
      { label: 'Careers', href: createPageUrl('Careers') },
      { label: 'Contact Us', href: createPageUrl('Contact') },
    ],
  },
  {
    title: 'Loan Offerings',
    links: [
      { label: 'Offerings & Scheme Categories', href: createPageUrl('Offerings') },
      { label: 'Financials & Statutory Reports', href: createPageUrl('Financials') },
      { label: 'Frequently Asked Questions', href: createPageUrl('FAQ') },
    ],
  },
  {
    title: 'Media & Stories',
    links: [
      { label: 'Photo Gallery', href: createPageUrl('Gallery') },
      { label: 'Success Stories', href: createPageUrl('SuccessStories') },
    ],
  },
  {
    title: 'Borrower Tools',
    links: [
      { label: 'PMMY Portal Login', href: createPageUrl('PMMYPortal') },
      { label: 'Entrepreneur Onboarding', href: createPageUrl('EntrepreneurOnboarding') },
      { label: 'AI Credit Score', href: createPageUrl('AICreditScore') },
      { label: 'Loan Recommendations', href: createPageUrl('LoanRecommendations') },
      { label: 'Loan Tracking', href: createPageUrl('LoanTracking') },
      { label: 'Loan Passbook', href: createPageUrl('LoanPassbook') },
      { label: 'Skill Training', href: createPageUrl('SkillTraining') },
    ],
  },
];

export default function Sitemap() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-slate-50 transition-colors duration-300 dark:bg-[#021731]">
      <div
        className="pointer-events-none fixed inset-0 z-0 bg-cover bg-center opacity-[0.05] dark:opacity-[0.04]"
        style={{ backgroundImage: `url('/photo/tajmahal.png')` }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex min-h-screen flex-col justify-between">
        <Header />

        <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-12 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto mb-12 max-w-2xl text-center"
          >
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-300 bg-blue-100 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-blue-900 shadow-sm dark:border-blue-800 dark:bg-blue-950/60 dark:text-blue-300">
              <Network size={14} className="text-blue-700 dark:text-blue-400" aria-hidden="true" />
              <span>Site Directory</span>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-4xl md:text-5xl">
              Sitemap
            </h1>
            <SDivider className="mx-auto mb-6" />
            <p className="text-sm font-semibold text-slate-600 dark:text-slate-300 md:text-base">
              Every section of the MUDRA site in one place, grouped by topic.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {sections.map((section, idx) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md dark:border-slate-800 dark:bg-slate-900"
              >
                <h2 className="mb-4 text-sm font-black uppercase tracking-wider text-blue-700 dark:text-blue-400">
                  {section.title}
                </h2>
                <ul className="space-y-2.5">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        to={link.href}
                        className="group flex items-center justify-between gap-2 text-sm font-semibold text-slate-700 transition-colors duration-200 hover:text-blue-700 dark:text-slate-300 dark:hover:text-blue-400"
                      >
                        <span>{link.label}</span>
                        <ArrowRight size={14} className="shrink-0 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100" aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </main>

        <Footer />
        <ChatBot />
      </div>
    </div>
  );
}
