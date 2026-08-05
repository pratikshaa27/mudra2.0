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
  TrendingUp, 
  BookOpen, 
  Layers, 
  ChevronRight,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import Header from '../components/home/Header';
import Footer from '../components/home/Footer';
import ChatBot from '../components/ChatBot';
import { useLanguage } from '../components/LanguageContext';

export default function About() {
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const tabParam = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState('vision');

  useEffect(() => {
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);
  
  const highlights = [
    { icon: Building2, value: '₹33+ Lakh Cr', label: 'Loans Disbursed', color: 'from-amber-500 to-amber-600' },
    { icon: Users, value: '50+ Crore', label: 'Loans Sanctioned', color: 'from-emerald-500 to-teal-600' },
    { icon: Target, value: '70%', label: 'Women Beneficiaries', color: 'from-red-600 to-rose-700' },
    { icon: Award, value: '10 Years', label: 'Of Service', color: 'from-blue-600 to-indigo-700' },
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

  const tabContent = {
    vision: {
      title: 'Vision & Mission Statements',
      content: (
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white dark:bg-slate-800 p-8 rounded-3xl border-2 border-amber-200 dark:border-slate-700 shadow-md hover:shadow-xl transition-all"
          >
            <div className="flex items-center gap-3 mb-4">
              <motion.div 
                whileHover={{ rotate: 15, scale: 1.1 }}
                className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold shadow-md cursor-pointer"
              >
                <Eye size={24} />
              </motion.div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">Vision</h3>
            </div>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium italic border-l-4 border-amber-500 pl-4 py-1">
              "To be an integrated financial and support services provider par excellence benchmarked with global best practices and standards for the bottom of the pyramid universe for their comprehensive economic and social development."
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-white dark:bg-slate-800 p-8 rounded-3xl border-2 border-amber-200 dark:border-slate-700 shadow-md hover:shadow-xl transition-all"
          >
            <div className="flex items-center gap-3 mb-4">
              <motion.div 
                whileHover={{ rotate: -15, scale: 1.1 }}
                className="w-12 h-12 rounded-2xl bg-red-700 text-white flex items-center justify-center font-bold shadow-md cursor-pointer"
              >
                <Target size={24} />
              </motion.div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">Mission</h3>
            </div>
            <ul className="space-y-3 text-slate-700 dark:text-slate-300 font-medium text-sm">
              <li className="flex gap-3 items-start"><CheckCircle2 className="text-emerald-600 shrink-0 mt-0.5" size={18} /><span>To provide timely and hassle-free refinancing to Member Lending Institutions for micro credit expansion.</span></li>
              <li className="flex gap-3 items-start"><CheckCircle2 className="text-emerald-600 shrink-0 mt-0.5" size={18} /><span>To empower first-generation entrepreneurs, SC/ST, and women entrepreneurs through accessible financial products.</span></li>
              <li className="flex gap-3 items-start"><CheckCircle2 className="text-emerald-600 shrink-0 mt-0.5" size={18} /><span>To support inclusive growth by reaching unserved micro enterprises in rural and semi-urban India.</span></li>
              <li className="flex gap-3 items-start"><CheckCircle2 className="text-emerald-600 shrink-0 mt-0.5" size={18} /><span>To facilitate skill development and digital capacity building across partner financial networks.</span></li>
            </ul>
          </motion.div>
        </div>
      )
    },
    genesis: {
      title: 'Genesis and Role of MUDRA',
      content: (
        <div className="space-y-6 text-slate-700 dark:text-slate-300">
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="bg-amber-50/70 dark:bg-slate-800/80 p-6 rounded-2xl border border-amber-200 dark:border-slate-700">
            <p className="leading-relaxed font-semibold">
              <strong>MUDRA (Micro Units Development and Refinance Agency Ltd.)</strong> was launched by the Hon'ble Prime Minister Narendra Modi on <strong>April 8, 2015</strong>, with the vision of funding the unfunded micro enterprises across India.
            </p>
          </motion.div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
            <h4 className="font-black text-xl text-slate-900 dark:text-white">Core Strategic Mandate</h4>
            <div className="grid md:grid-cols-2 gap-4 text-xs font-semibold">
              {[
                { title: 'Refinancing Window', text: 'Provides refinance support to Member Lending Institutions (MLIs) including Banks, NBFCs, and MFIs.' },
                { title: 'Financial Inclusion', text: 'Facilitates credit flow to unserved and underserved micro-enterprises and small business units.' },
                { title: 'PMMY Supervision', text: 'Monitors and supports implementation of Pradhan Mantri MUDRA Yojana (PMMY) across all states.' },
                { title: 'Capacity Building', text: 'Provides training, risk management guidance, and digital support to partner lending networks.' }
              ].map((item, idx) => (
                <motion.div 
                  key={idx} 
                  whileHover={{ scale: 1.02 }}
                  className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700"
                >
                  <span className="text-red-700 dark:text-amber-400 font-extrabold block mb-1">{item.title}</span>
                  {item.text}
                </motion.div>
              ))}
            </div>
          </div>

          <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">
            MUDRA operates as a wholly-owned subsidiary of SIDBI (Small Industries Development Bank of India) and is headquartered in Mumbai with regional offices across key state capitals.
          </p>
        </div>
      )
    },
    structure: {
      title: 'Organization Structure',
      content: (
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { title: 'Board of Directors', color: 'border-blue-600', text: 'Consists of experienced board members including the Managing Director and Director nominees from SIDBI and Government of India.' },
            { title: 'Executive Leadership', color: 'border-emerald-600', text: 'Led by Managing Director & CEO with specialized departments for Credit Refinance, Risk Management, Finance, and IT.' },
            { title: 'Regional Presence', color: 'border-purple-600', text: '12 Regional offices situated across key state capitals for on-ground monitoring and partner institution coordination.' },
            { title: 'Operations & Support', color: 'border-amber-600', text: 'Dedicated teams for IT Infrastructure, Legal, Policy Research, Data Analytics, and Compliance ensuring operational excellence.' }
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className={`bg-white dark:bg-slate-800 p-6 rounded-2xl border-l-4 ${item.color} border border-slate-200 dark:border-slate-700 shadow-sm`}
            >
              <h4 className="font-bold text-lg text-slate-900 dark:text-white mb-2">{item.title}</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">{item.text}</p>
            </motion.div>
          ))}
        </div>
      )
    },
    board: {
      title: 'Board of Directors',
      content: (
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { name: 'Shri Rajesh Kumar Verma', title: 'Chairman', desc: 'Former Managing Director, SIDBI' },
            { name: 'Ms. Priya Sharma', title: 'Managing Director & CEO', desc: 'Chief Executive Officer, MUDRA Ltd.' },
            { name: 'Shri Arun Patel', title: 'Director (Finance)', desc: 'IAS Officer, Ministry of Finance' },
            { name: 'Ms. Deepa Singh', title: 'Director (Operations)', desc: 'Banking & Financial Inclusion Expert' },
            { name: 'Shri Vikram Reddy', title: 'Independent Director', desc: 'MSME Business Consultant & Advisor' },
            { name: 'Ms. Anjali Gupta', title: 'Independent Director', desc: 'Social Entrepreneur & Women MSME Advocate' },
          ].map((member, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition"
            >
              <h4 className="font-bold text-slate-900 dark:text-white text-base">{member.name}</h4>
              <p className="text-red-700 dark:text-amber-400 font-extrabold text-xs">{member.title}</p>
              <p className="text-slate-600 dark:text-slate-400 text-xs mt-2 font-medium">{member.desc}</p>
            </motion.div>
          ))}
        </div>
      )
    },
    management: {
      title: 'Management Team',
      content: (
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { name: 'Ms. Priya Sharma', role: 'Managing Director & CEO', dept: 'Overall Leadership & Strategic Planning' },
            { name: 'Shri Suresh Patel', role: 'Chief Operating Officer', dept: 'Operations & Refinance Implementation' },
            { name: 'Dr. Ramesh Joshi', role: 'Chief Credit Officer', dept: 'Credit Risk & Compliance Management' },
            { name: 'Ms. Neha Kapoor', role: 'Chief Financial Officer', dept: 'Treasury, Accounts & Financial Planning' },
            { name: 'Shri Arjun Kumar', role: 'Head - Policy & Research', dept: 'Data Analytics & PMMY Performance Reports' },
            { name: 'Ms. Priyanka Singh', role: 'Head - Human Resources', dept: 'Talent Management & Regional Operations' },
          ].map((member, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-amber-200/80 dark:border-slate-700 shadow-sm"
            >
              <h4 className="font-bold text-slate-900 dark:text-white text-base">{member.name}</h4>
              <p className="text-red-700 dark:text-amber-400 font-extrabold text-xs">{member.role}</p>
              <p className="text-slate-600 dark:text-slate-400 text-xs mt-2 font-medium">{member.dept}</p>
            </motion.div>
          ))}
        </div>
      )
    },
    shareholders: {
      title: 'Shareholding Pattern',
      content: (
        <div className="space-y-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-slate-800 p-6 rounded-3xl border-l-4 border-red-700 border border-slate-200 dark:border-slate-700 shadow-md"
          >
            <h4 className="font-black text-2xl text-red-700 dark:text-amber-400 mb-2">100% Wholly Owned SIDBI Subsidiary</h4>
            <p className="text-slate-700 dark:text-slate-300 text-sm font-semibold mb-4">
              MUDRA Ltd. is a wholly-owned subsidiary of SIDBI (Small Industries Development Bank of India), established under the Ministry of Finance guidelines.
            </p>
            <div className="flex items-center gap-4 p-4 bg-amber-50 dark:bg-slate-900 rounded-2xl border border-amber-200 dark:border-slate-700">
              <div className="w-14 h-14 bg-red-800 text-amber-300 rounded-2xl flex items-center justify-center font-black text-lg shrink-0">100%</div>
              <div>
                <p className="font-black text-slate-900 dark:text-white text-sm">SIDBI (Small Industries Development Bank of India)</p>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-semibold">Promoted by Government of India, Ministry of Finance</p>
              </div>
            </div>
          </motion.div>
        </div>
      )
    },
    partners: {
      title: 'Member Lending Institutions (MLIs)',
      content: (
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm font-semibold">
            MUDRA refinances credit disbursed by over 300+ registered Member Lending Institutions (MLIs) across India:
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { title: 'Public Sector Banks', color: 'border-emerald-600', text: 'SBI, Bank of Baroda, Punjab National Bank, Canara Bank & 14+ PSUs' },
              { title: 'Private Sector Banks', color: 'border-blue-600', text: 'HDFC Bank, ICICI Bank, Axis Bank, Kotak Mahindra & Commercial Banks' },
              { title: 'Regional Rural Banks', color: 'border-purple-600', text: '56+ RRBs providing deep credit access across rural geographies' },
              { title: 'Small Finance Banks', color: 'border-amber-600', text: 'AU Small Finance Bank, Equitas SFB, Ujjivan SFB & micro lenders' },
              { title: 'Microfinance (MFIs)', color: 'border-rose-600', text: 'Bandhan, CreditAccess Grameen & 200+ microfinance institutions' },
              { title: 'NBFC Lenders', color: 'border-indigo-600', text: 'Non-Banking Financial Companies specializing in micro-enterprise credit' }
            ].map((mli, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                whileHover={{ y: -4 }}
                className={`bg-white dark:bg-slate-800 p-4 rounded-2xl border-l-4 ${mli.color} border border-slate-200 dark:border-slate-700 shadow-sm`}
              >
                <h5 className="font-extrabold text-slate-900 dark:text-white text-sm mb-1">{mli.title}</h5>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">{mli.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      )
    },
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070b14] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <Header />

      {/* Hero Page Header */}
      <div className="bg-gradient-to-br from-[#fffbeb] via-white to-[#fef3c7] dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-14 border-b border-amber-200 dark:border-slate-800 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-1.5 bg-[#f97316] text-white px-3.5 py-1 rounded-md text-xs font-black tracking-wider uppercase mb-3 shadow-sm">
              <Sparkles size={14} className="text-white" />
              <span>GOVERNMENT OF INDIA REFINANCE ENTITY</span>
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-[#0f2942] dark:text-white tracking-tight mb-3">
              About MUDRA
            </h1>
            <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto text-sm md:text-base font-semibold leading-relaxed">
              Empowering Micro-Enterprises and Refinancing Credit Institutions for Inclusive Growth Across India
            </p>
          </motion.div>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="max-w-7xl mx-auto px-4 -mt-8 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {highlights.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, type: "spring", stiffness: 120 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="bg-white dark:bg-slate-900 p-5 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 text-center cursor-pointer"
            >
              <motion.div 
                whileHover={{ rotate: 10, scale: 1.1 }}
                className={`w-12 h-12 mx-auto rounded-2xl bg-gradient-to-br ${item.color} text-white flex items-center justify-center mb-3 shadow-md`}
              >
                <item.icon size={22} />
              </motion.div>
              <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white block">{item.value}</span>
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{item.label}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 border-b border-slate-200 dark:border-slate-800 no-scrollbar">
          {tabs.map((tab) => (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black tracking-wide whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-red-800 dark:bg-amber-500 text-white dark:text-slate-950 shadow-md'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-amber-50 dark:hover:bg-slate-800'
              }`}
            >
              <tab.icon size={15} />
              <span>{tab.label}</span>
            </motion.button>
          ))}
        </div>

        {/* Tab Content Display */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl border border-slate-200 dark:border-slate-800 min-h-[360px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="text-2xl font-black text-[#0f2942] dark:text-white mb-6 border-b border-slate-200 dark:border-slate-800 pb-3 flex items-center gap-2">
                <ChevronRight className="text-red-700 dark:text-amber-400" size={24} />
                <span>{tabContent[activeTab].title}</span>
              </h2>

              {tabContent[activeTab].content}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Salient Features Card */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 bg-amber-500/10 dark:bg-slate-900 p-8 rounded-3xl border-2 border-amber-300 dark:border-slate-800 shadow-lg"
        >
          <div className="flex items-center gap-3 mb-6">
            <ShieldCheck className="text-amber-600 dark:text-amber-400" size={28} />
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">Key Highlights of PMMY & MUDRA</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {features.map((feature, idx) => (
              <motion.div 
                key={idx} 
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-3 p-3.5 bg-white dark:bg-slate-800 rounded-xl border border-amber-200 dark:border-slate-700 shadow-sm text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200"
              >
                <CheckCircle2 className="text-emerald-600 dark:text-emerald-400 shrink-0" size={18} />
                <span>{feature}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>

      <Footer />
      <ChatBot />
    </div>
  );
}