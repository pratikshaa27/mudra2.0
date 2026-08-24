import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Building2,
  Users,
  Target,
  Award,
  CheckCircle2,
  Eye,
  ShieldCheck,
  Briefcase,
  BookOpen,
  Layers,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import Header from '../components/home/Header';
import Footer from '../components/home/Footer';
import ChatBot from '../components/ChatBot';
import { useLanguage } from '../components/LanguageContext';
import { Reveal, RevealGroup, CountUp } from '@/components/ui/reveal';

// A small, theme-relevant accent cycle reused across the page wherever a set
// of exactly four items benefits from a bit of color rhythm — stats, mission
// statements, organization units. Text/dot/gradient only, never a fill.
const ACCENT_CYCLE = [
  { text: 'text-orange-600 dark:text-orange-400', hoverText: 'group-hover:text-orange-600 dark:group-hover:text-orange-400', dot: 'bg-orange-500 dark:bg-orange-400', grad: 'from-orange-600 via-orange-500 to-orange-600 dark:from-orange-300 dark:via-orange-400 dark:to-orange-300' },
  { text: 'text-blue-700 dark:text-blue-400', hoverText: 'group-hover:text-blue-700 dark:group-hover:text-blue-400', dot: 'bg-blue-600 dark:bg-blue-400', grad: 'from-blue-600 via-blue-600 to-blue-500 dark:from-blue-300 dark:via-blue-300 dark:to-blue-400' },
  { text: 'text-green-600 dark:text-green-400', hoverText: 'group-hover:text-green-600 dark:group-hover:text-green-400', dot: 'bg-green-600 dark:bg-green-400', grad: 'from-green-600 via-green-600 to-green-500 dark:from-green-300 dark:via-green-300 dark:to-green-400' },
  { text: 'text-violet-600 dark:text-violet-400', hoverText: 'group-hover:text-violet-600 dark:group-hover:text-violet-400', dot: 'bg-violet-600 dark:bg-violet-400', grad: 'from-violet-600 via-violet-600 to-violet-500 dark:from-violet-300 dark:via-violet-300 dark:to-violet-400' },
];

const highlights = [
  { value: 33, prefix: '₹', suffix: '+ Lakh Cr', label: 'Loans Disbursed', accent: ACCENT_CYCLE[0] },
  { value: 50, suffix: '+ Crore', label: 'Loans Sanctioned', accent: ACCENT_CYCLE[1] },
  { value: 70, suffix: '%', label: 'Women Beneficiaries', accent: ACCENT_CYCLE[2] },
  { value: 10, suffix: ' Years', label: 'Of Service', accent: ACCENT_CYCLE[3] },
];

const features = [
  'Collateral-free loans up to ₹20 Lakh',
  'Refinance available via Banks, NBFCs, and MFIs',
  'No processing fee charged for micro units',
  'Hassle-free, quick credit disbursement',
  'Dedicated support for first-generation entrepreneurs',
  'Inclusive growth focusing on women and rural enterprises',
];

const tabs = [
  { id: 'vision', label: 'Vision & Mission', icon: Eye },
  { id: 'genesis', label: 'Genesis & Role', icon: BookOpen },
  { id: 'structure', label: 'Organization Structure', icon: Layers },
  { id: 'board', label: 'Board of Directors', icon: Users },
  { id: 'management', label: 'Management Team', icon: Briefcase },
  { id: 'shareholders', label: 'Shareholders', icon: Building2 },
  { id: 'partners', label: 'Partner Institutions', icon: ShieldCheck },
];

const missionStatements = [
  'To provide timely and hassle-free refinancing to Member Lending Institutions for micro credit expansion.',
  'To empower first-generation entrepreneurs, SC/ST, and women entrepreneurs through accessible financial products.',
  'To support inclusive growth by reaching unserved micro enterprises in rural and semi-urban India.',
  'To facilitate skill development and digital capacity building across partner financial networks.'
];

const mandateItems = [
  { title: 'Refinancing Window', text: 'Provides refinance support to Member Lending Institutions (MLIs) including Banks, NBFCs, and MFIs.' },
  { title: 'Financial Inclusion', text: 'Facilitates credit flow to unserved and underserved micro-enterprises and small business units.' },
  { title: 'PMMY Supervision', text: 'Monitors and supports implementation of Pradhan Mantri MUDRA Yojana (PMMY) across all states.' },
  { title: 'Capacity Building', text: 'Provides training, risk management guidance, and digital support to partner lending networks.' }
];

const orgUnits = [
  { title: 'Board of Directors', text: 'Consists of experienced board members including the Managing Director and Director nominees from SIDBI and Government of India.', accent: ACCENT_CYCLE[1] },
  { title: 'Executive Leadership', text: 'Led by Managing Director & CEO with specialized departments for Credit Refinance, Risk Management, Finance, and IT.', accent: ACCENT_CYCLE[2] },
  { title: 'Regional Presence', text: '12 Regional offices situated across key state capitals for on-ground monitoring and partner institution coordination.', accent: ACCENT_CYCLE[3] },
  { title: 'Operations & Support', text: 'Dedicated teams for IT Infrastructure, Legal, Policy Research, Data Analytics, and Compliance ensuring operational excellence.', accent: ACCENT_CYCLE[0] }
];

const boardMembers = [
  { name: 'Shri Rajesh Kumar Verma', title: 'Chairman', desc: 'Former Managing Director, SIDBI' },
  { name: 'Ms. Priya Sharma', title: 'Managing Director & CEO', desc: 'Chief Executive Officer, MUDRA Ltd.' },
  { name: 'Shri Arun Patel', title: 'Director (Finance)', desc: 'IAS Officer, Ministry of Finance' },
  { name: 'Ms. Deepa Singh', title: 'Director (Operations)', desc: 'Banking & Financial Inclusion Expert' },
  { name: 'Shri Vikram Reddy', title: 'Independent Director', desc: 'MSME Business Consultant & Advisor' },
  { name: 'Ms. Anjali Gupta', title: 'Independent Director', desc: 'Social Entrepreneur & Women MSME Advocate' },
];

const managementTeam = [
  { name: 'Ms. Priya Sharma', role: 'Managing Director & CEO', dept: 'Overall Leadership & Strategic Planning' },
  { name: 'Shri Suresh Patel', role: 'Chief Operating Officer', dept: 'Operations & Refinance Implementation' },
  { name: 'Dr. Ramesh Joshi', role: 'Chief Credit Officer', dept: 'Credit Risk & Compliance Management' },
  { name: 'Ms. Neha Kapoor', role: 'Chief Financial Officer', dept: 'Treasury, Accounts & Financial Planning' },
  { name: 'Shri Arjun Kumar', role: 'Head - Policy & Research', dept: 'Data Analytics & PMMY Performance Reports' },
  { name: 'Ms. Priyanka Singh', role: 'Head - Human Resources', dept: 'Talent Management & Regional Operations' },
];

const MLI_ACCENTS = [
  { text: 'text-green-700 dark:text-green-400', dot: 'bg-green-600 dark:bg-green-400' },
  { text: 'text-blue-700 dark:text-blue-400', dot: 'bg-blue-600 dark:bg-blue-400' },
  { text: 'text-violet-700 dark:text-violet-400', dot: 'bg-violet-600 dark:bg-violet-400' },
  { text: 'text-orange-700 dark:text-orange-400', dot: 'bg-orange-600 dark:bg-orange-400' },
  { text: 'text-yellow-700 dark:text-yellow-400', dot: 'bg-yellow-500 dark:bg-yellow-400' },
  { text: 'text-blue-700 dark:text-blue-400', dot: 'bg-blue-600 dark:bg-blue-400' },
];

const mliCategories = [
  { title: 'Public Sector Banks', text: 'SBI, Bank of Baroda, Punjab National Bank, Canara Bank & 14+ PSUs', accent: MLI_ACCENTS[0] },
  { title: 'Private Sector Banks', text: 'HDFC Bank, ICICI Bank, Axis Bank, Kotak Mahindra & Commercial Banks', accent: MLI_ACCENTS[1] },
  { title: 'Regional Rural Banks', text: '56+ RRBs providing deep credit access across rural geographies', accent: MLI_ACCENTS[2] },
  { title: 'Small Finance Banks', text: 'AU Small Finance Bank, Equitas SFB, Ujjivan SFB & micro lenders', accent: MLI_ACCENTS[3] },
  { title: 'Microfinance (MFIs)', text: 'Bandhan, CreditAccess Grameen & 200+ microfinance institutions', accent: MLI_ACCENTS[4] },
  { title: 'NBFC Lenders', text: 'Non-Banking Financial Companies specializing in micro-enterprise credit', accent: MLI_ACCENTS[5] }
];

const genesisMilestones = [
  {
    marker: '2015',
    accent: ACCENT_CYCLE[0],
    title: 'Launch of MUDRA',
    body: (
      <p>
        <strong className="text-slate-800 dark:text-slate-200">MUDRA (Micro Units Development and Refinance Agency Ltd.)</strong> was
        launched by the Hon'ble Prime Minister Narendra Modi on <strong className="text-slate-800 dark:text-slate-200">April 8, 2015</strong>,
        with the vision of funding the unfunded micro enterprises across India.
      </p>
    )
  },
  {
    marker: 'Mandate',
    accent: ACCENT_CYCLE[1],
    title: 'Core Strategic Mandate',
    body: (
      <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
        {mandateItems.map((item, idx) => (
          <li key={idx}>
            <span className="block text-orange-700 dark:text-orange-400 font-extrabold text-xs mb-0.5">{item.title}</span>
            <span>{item.text}</span>
          </li>
        ))}
      </ul>
    )
  },
  {
    marker: 'Today',
    accent: ACCENT_CYCLE[2],
    title: "MUDRA's Institutional Position",
    body: (
      <p>
        MUDRA operates as a wholly-owned subsidiary of SIDBI (Small Industries Development Bank of India) and is headquartered
        in Mumbai with regional offices across key state capitals.
      </p>
    )
  }
];

function GenesisTimeline() {
  return (
    <div className="relative">
      <div className="hidden md:block absolute top-[13px] h-px bg-gradient-to-r from-orange-300 via-blue-300 to-green-300 dark:from-orange-700 dark:via-blue-700 dark:to-green-700 opacity-60" style={{ left: '8%', right: '8%' }} aria-hidden="true" />
      <div className="md:hidden absolute left-[13px] top-1 bottom-1 w-px bg-gradient-to-b from-orange-300 via-blue-300 to-green-300 dark:from-orange-700 dark:via-blue-700 dark:to-green-700 opacity-60" aria-hidden="true" />
      <ol className="relative flex flex-col md:flex-row gap-10 md:gap-8">
        {genesisMilestones.map((m, idx) => (
          <Reveal as="li" key={m.marker} index={idx} className="group relative pl-11 md:pl-0 md:flex-1">
            <motion.span
              whileHover={{ scale: 1.15 }}
              className={`absolute left-0 top-0 md:static h-[26px] w-[26px] rounded-full ${m.accent.dot} text-white dark:text-[#021731] text-[11px] font-black flex items-center justify-center shrink-0 ring-4 ring-slate-50 dark:ring-[#021731] transition-shadow`}
            >
              {idx + 1}
            </motion.span>
            <div className="md:mt-4">
              <span className={`block text-[11px] font-black uppercase tracking-[0.2em] mb-1.5 ${m.accent.text}`}>
                {m.marker}
              </span>
              <h4 className="text-base sm:text-lg font-black text-[#011a39] dark:text-white mb-2 tracking-tight transition-transform duration-300 group-hover:translate-x-1">
                {m.title}
              </h4>
              <div className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400 leading-relaxed">
                {m.body}
              </div>
            </div>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}

function OrganizationTree() {
  return (
    <div>
      {/* Desktop / tablet — a real tree: root, branch line, four units */}
      <div className="hidden sm:block">
        <Reveal className="text-center mb-3">
          <span className="text-xl font-black tracking-wide text-[#011a39] dark:text-white uppercase">MUDRA Ltd.</span>
        </Reveal>
        <div className="w-px h-8 bg-slate-300 dark:bg-slate-700 mx-auto" aria-hidden="true" />
        <div className="relative">
          <div className="absolute top-0 h-px bg-slate-300 dark:bg-slate-700" style={{ left: '12.5%', right: '12.5%' }} aria-hidden="true" />
          <RevealGroup as="div" className="grid grid-cols-2 lg:grid-cols-4 gap-y-8">
            {orgUnits.map((unit, idx) => (
              <Reveal key={idx} index={idx} className="group flex flex-col items-center text-center px-3 transition-transform duration-300 hover:-translate-y-1.5">
                <div className={`w-px h-8 ${unit.accent.dot} opacity-70`} aria-hidden="true" />
                <span className={`h-1.5 w-1.5 rounded-full ${unit.accent.dot} mt-2 mb-2`} aria-hidden="true" />
                <h4 className={`font-black text-base sm:text-lg mt-1 mb-2 tracking-tight transition-colors duration-300 text-[#011a39] dark:text-white ${unit.accent.hoverText}`}>{unit.title}</h4>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-semibold leading-relaxed">{unit.text}</p>
              </Reveal>
            ))}
          </RevealGroup>
        </div>
      </div>

      {/* Mobile — stacked, divided list */}
      <div className="sm:hidden divide-y divide-slate-200 dark:divide-slate-800">
        {orgUnits.map((unit, idx) => (
          <div key={idx} className="py-5 first:pt-0">
            <h4 className="font-black text-base text-[#011a39] dark:text-white mb-1.5 flex items-center gap-2">
              <span className={`h-1.5 w-1.5 rounded-full ${unit.accent.dot} shrink-0`} aria-hidden="true" />
              {unit.title}
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 font-semibold leading-relaxed">{unit.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProfileList({ items, primaryKey, secondaryKey, descKey }) {
  return (
    <ul className="divide-y divide-slate-200 dark:divide-slate-800">
      {items.map((item, idx) => {
        const accent = ACCENT_CYCLE[idx % ACCENT_CYCLE.length];
        return (
          <Reveal
            as="li"
            key={idx}
            index={idx}
            className="group py-5 first:pt-0 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1.5 transition-all duration-200 hover:translate-x-1.5"
          >
            <div className="flex items-baseline gap-2.5">
              <span className={`h-1.5 w-1.5 rounded-full ${accent.dot} shrink-0 translate-y-[-2px]`} aria-hidden="true" />
              <div>
                <h4 className="font-black text-base sm:text-lg text-[#011a39] dark:text-white transition-colors duration-200 group-hover:text-blue-700 dark:group-hover:text-blue-400">
                  {item[primaryKey]}
                </h4>
                <p className={`font-extrabold text-xs uppercase tracking-wide mt-0.5 ${accent.text}`}>
                  {item[secondaryKey]}
                </p>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-semibold sm:max-w-xs sm:text-right">
              {item[descKey]}
            </p>
          </Reveal>
        );
      })}
    </ul>
  );
}

const tabContent = {
  vision: {
    title: 'Vision & Mission Statements',
    content: (
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center">
              <Eye size={22} />
            </div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">Vision</h3>
          </div>
          <div className="bg-slate-100 dark:bg-slate-700/60 rounded-2xl border-l-4 border-blue-500 p-5">
            <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-semibold italic text-sm sm:text-base">
              "To be an integrated financial and support services provider par excellence benchmarked with global best practices and standards for the bottom of the pyramid universe for their comprehensive economic and social development."
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center">
              <Target size={22} />
            </div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">Mission</h3>
          </div>
          <ul className="space-y-4 text-slate-700 dark:text-slate-300 font-medium text-sm">
            {[
              "To provide timely and hassle-free refinancing to Member Lending Institutions for micro credit expansion.",
              "To empower first-generation entrepreneurs, SC/ST, and women entrepreneurs through accessible financial products.",
              "To support inclusive growth by reaching unserved micro enterprises in rural and semi-urban India.",
              "To facilitate skill development and digital capacity building across partner financial networks."
            ].map((item, idx) => (
              <li key={idx} className="flex gap-3 items-start">
                <CheckCircle2 className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" size={18} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  },
  genesis: {
    title: 'Genesis and Role of MUDRA',
    content: <GenesisTimeline />
  },
  structure: {
    title: 'Organization Structure',
    content: <OrganizationTree />
  },
  board: {
    title: 'Board of Directors',
    content: <ProfileList items={boardMembers} primaryKey="name" secondaryKey="title" descKey="desc" />
  },
  management: {
    title: 'Management Team',
    content: <ProfileList items={managementTeam} primaryKey="name" secondaryKey="role" descKey="dept" />
  },
  shareholders: {
    title: 'Shareholding Pattern',
    content: (
      <div className='bg-[#FFF3A3]/60 p-10'>
        <Reveal className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-10 pb-8 border-b border-slate-200 dark:border-slate-800">
          <motion.span
            whileHover={{ scale: 1.04 }}
            className="text-6xl sm:text-7xl font-black leading-none tracking-tight shrink-0 bg-gradient-to-r from-blue-800 via-sky-600 to-blue-600 dark:from-sky-300 dark:via-blue-300 dark:to-sky-400 bg-clip-text text-transparent"
          >
            100%
          </motion.span>
          <div>
            <h4 className="font-black text-lg sm:text-xl text-[#011a39] dark:text-white mb-1.5 tracking-tight">
              Wholly Owned SIDBI Subsidiary
            </h4>
            <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed">
              MUDRA Ltd. is a wholly-owned subsidiary of SIDBI (Small Industries Development Bank of India), established
              under the Ministry of Finance guidelines.
            </p>
          </div>
        </Reveal>

        <Reveal className="flex items-start gap-4 sm:gap-6 pt-8">
          <span className="text-[11px] font-black uppercase tracking-[0.15em] text-slate-400 dark:text-slate-500 shrink-0 pt-1 w-20 sm:w-28">
            Promoter
          </span>
          <div>
            <p className="font-black text-sm sm:text-base text-[#011a39] dark:text-white">
              SIDBI (Small Industries Development Bank of India)
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-semibold mt-1">
              Promoted by Government of India, Ministry of Finance
            </p>
          </div>
        </Reveal>
      </div>
    )
  },
  partners: {
    title: 'Member Lending Institutions (MLIs)',
    content: (
      <div>
        <Reveal>
          <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 max-w-3xl mb-10 leading-relaxed">
            MUDRA refinances credit disbursed by over 300+ registered Member Lending Institutions (MLIs) across India:
          </p>
        </Reveal>
        <RevealGroup as="div" className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8" stagger={60}>
          {mliCategories.map((mli, idx) => (
            <Reveal
              key={idx}
              index={idx}
              className="group pt-5 border-t border-slate-200 dark:border-slate-800 transition-transform duration-300 hover:-translate-y-1"
            >
              <h5 className="font-black text-sm text-[#011a39] dark:text-white mb-1.5 flex items-center gap-2">
                <span className={`h-1.5 w-1.5 rounded-full ${mli.accent.dot} shrink-0 transition-transform duration-300 group-hover:scale-150`} aria-hidden="true" />
                <span className={mli.accent.text}>{mli.title}</span>
              </h5>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-semibold leading-relaxed">{mli.text}</p>
            </Reveal>
          ))}
        </RevealGroup>
      </div>
    )
  },
};

export default function About() {
  useLanguage();
  const [searchParams] = useSearchParams();
  const tabParam = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState('vision');

  useEffect(() => {
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-slate-50 transition-colors duration-300 dark:bg-[#021731] text-slate-900 dark:text-slate-100">

      {/* Global heritage backdrop: a faint watermark, matching Home's treatment */}
      <div
        className="pointer-events-none fixed inset-0 z-0 bg-cover bg-center opacity-[0.05] dark:opacity-[0.04]"
        style={{ backgroundImage: `url('/photo/tajmahal.png')` }}
        aria-hidden="true"
      />

      <div className="relative z-10">
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
              {/* <span className="inline-flex items-center gap-1.5 text-orange-400 text-[11px] font-black tracking-[0.2em] uppercase mb-3">
                Government of India Refinance Entity
              </span> */}
 <motion.span
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-1.5 bg-[#f97316] text-white px-3 py-1 rounded-full text-[10px] font-black tracking-wider uppercase mb-2 shadow-sm"
            >
              <Sparkles size={12} className="text-white animate-pulse" />
              <span>Government of India Refinance Entity</span>
            </motion.span>
              
          
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight mb-2 [text-shadow:0_4px_18px_rgba(2,23,49,0.55)]">
              About MUDRA
            </h1>
              <p className="pb-5 text-blue-50 max-w-3xl mx-auto text-sm sm:text-base font-semibold leading-snug [text-shadow:0_2px_10px_rgba(2,23,49,0.5)]">
                Empowering Micro-Enterprises and Refinancing Credit Institutions for Inclusive Growth Across India
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
                <linearGradient id="aboutHeroCurveBorder" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#7dd3fc" />
                  <stop offset="55%" stopColor="#00b6f0" />
                  <stop offset="100%" stopColor="#011a39" />
                </linearGradient>
              </defs>
              <path
                d="M0,70 C360,0 720,140 1080,70 C1260,35 1350,20 1440,45 L1440,140 L0,140 Z"
                className="fill-slate-50 dark:fill-[#021731]"
              />
              <path
                d="M0,70 C360,0 720,140 1080,70 C1260,35 1350,20 1440,45"
                fill="none"
                stroke="url(#aboutHeroCurveBorder)"
                strokeWidth="7"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        {/* Impact strip — large typography, thin dividers, subtle count-up.
            Replaces the four floating stat cards with a single open row. */}
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-slate-200/80 dark:divide-slate-800 border-y border-slate-200/80 dark:border-slate-800">
            {highlights.map((item, idx) => (
              <Reveal
                key={idx}
                index={idx}
                className="group py-8 px-3 sm:px-6 md:px-8 text-center md:text-left transition-transform duration-300 hover:-translate-y-1"
              >
                <p
                  className={`text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-none bg-gradient-to-r ${item.accent.grad} bg-clip-text text-transparent`}
                >
                  <CountUp value={item.value} prefix={item.prefix || ''} suffix={item.suffix} />
                </p>
                <p className="mt-2.5 text-[10px] sm:text-[11px] font-black uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400 flex items-center justify-center md:justify-start gap-1.5">
                  <span className={`h-1.5 w-1.5 rounded-full ${item.accent.dot} transition-transform duration-300 group-hover:scale-150`} aria-hidden="true" />
                  {item.label}
                </p>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="max-w-6xl mx-auto px-4 py-16 sm:py-20">

          {/* Section navigation — plain text with a sliding blue underline,
              no enclosing rounded pill or container. */}
          <nav aria-label="About MUDRA sections" className="mb-14 sm:mb-16">
            <ul className="flex items-center gap-7 sm:gap-10 overflow-x-auto pb-px no-scrollbar border-b border-slate-200 dark:border-slate-800">
              {tabs.map((tab) => {
                const isSelected = activeTab === tab.id;
                return (
                  <li key={tab.id} className="relative shrink-0">
                    <button
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      aria-current={isSelected ? 'true' : undefined}
                      className={`flex items-center gap-2 pb-4 pt-1 text-xs sm:text-sm font-black tracking-wide whitespace-nowrap transition-colors ${
                        isSelected
                          ? 'text-blue-800 dark:text-blue-300'
                          : 'text-slate-500 dark:text-slate-400 hover:text-blue-700 dark:hover:text-blue-400'
                      }`}
                    >
                      <tab.icon size={15} />
                      <span>{tab.label}</span>
                    </button>
                    {isSelected && (
                      <motion.div
                        layoutId="aboutTabUnderline"
                        transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                        className="absolute left-0 right-0 -bottom-px h-[2px] bg-blue-700 dark:bg-blue-400"
                      />
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Tab content — open canvas, no card, no border box. */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <span className="block text-sm font-black uppercase tracking-[0.2em] text-blue-700 dark:text-blue-400 mb-3">
                {tabs.find((t) => t.id === activeTab)?.label}
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#011a39] dark:text-white tracking-tight mb-10">
                {tabContent[activeTab].title}
              </h2>

              {tabContent[activeTab].content}
            </motion.div>
          </AnimatePresence>

          {/* Key highlights — open checklist, thin top divider instead of a card */}
          <div className="bg-[#FFF3A3]/60 p-10 mt-20 pt-14 border-t border-slate-200 dark:border-slate-800">
            <Reveal>
              <span className="block text-[11px] font-black uppercase tracking-[0.2em] text-blue-700 dark:text-blue-400 mb-4">
                Key Highlights
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-[#011a39] dark:text-white tracking-tight mb-10">
                PMMY & MUDRA at a Glance
              </h3>
            </Reveal>
            <RevealGroup as="ul" className="grid sm:grid-cols-2 gap-x-12 gap-y-5" stagger={50}>
              {features.map((feature, idx) => (
                <Reveal
                  as="li"
                  key={idx}
                  index={idx}
                  className="group flex items-start gap-3 text-sm sm:text-base font-semibold text-slate-700 dark:text-slate-300 leading-snug transition-all duration-200 hover:translate-x-1.5"
                >
                  <CheckCircle2
                    size={17}
                    className="text-blue-700 dark:text-blue-400 shrink-0 mt-0.5 transition-transform duration-200 group-hover:scale-125"
                  />
                  <span className="transition-colors duration-200 group-hover:text-[#011a39] dark:group-hover:text-white">{feature}</span>
                </Reveal>
              ))}
            </RevealGroup>
          </div>
        </div>

        <Footer />
        <ChatBot />
      </div>
    </div>
  );
}
