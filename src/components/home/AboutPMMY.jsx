import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, TrendingUp, Calendar, ShieldCheck, Building2, Landmark, Award, ArrowRight, Lightbulb, Users, CreditCard } from 'lucide-react';

const achievements = [
  {
    year: '2023-2024',
    loans: '6,72,56,612',
    sanctioned: '₹5,34,934.57 CRORE',
    disbursed: '₹5,20,687.23 CRORE',
    updated: '31/03/2024'
  },
  {
    year: '2022-2023',
    loans: '6,23,44,938',
    sanctioned: '₹4,67,982.43 CRORE',
    disbursed: '₹4,54,628.12 CRORE',
    updated: '31/03/2023'
  },
  {
    year: '2021-2022',
    loans: '5,38,41,721',
    sanctioned: '₹3,39,110.35 CRORE',
    disbursed: '₹3,31,012.54 CRORE',
    updated: '31/03/2022'
  },
  {
    year: '2015-2016',
    loans: '3,48,80,924',
    sanctioned: '₹1,37,449.27 CRORE',
    disbursed: '₹1,32,954.73 CRORE',
    updated: '31/03/2016'
  }
];

const pillars = [
  {
    icon: Landmark,
    title: 'Refinance Assistance',
    desc: 'Provides low-cost refinancing support to Banks, MFIs, and NBFCs for last-mile credit flow to micro units.'
  },
  {
    icon: ShieldCheck,
    title: 'Credit Guarantee Scheme',
    desc: 'Protects lending institutions through CGFMU guarantee cover to ensure collateral-free credit access.'
  },
  {
    icon: CreditCard,
    title: 'MUDRA Card Facility',
    desc: 'Empowers borrowers with pre-approved working capital RuPay debit cards for hassle-free liquid credit withdrawals.'
  },
  {
    icon: Lightbulb,
    title: 'Capacity & Skill Development',
    desc: 'Partners with RSETIs and EDP institutes to train, mentor, and onboard first-generation entrepreneurs.'
  }
];

export default function AboutPMMY() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextData = () => setCurrentIndex((prev) => (prev + 1) % achievements.length);
  const prevData = () => setCurrentIndex((prev) => (prev - 1 + achievements.length) % achievements.length);

  const current = achievements[currentIndex];

  return (
    <section id="about-mudra" className="py-20 bg-slate-50 dark:bg-[#070b14] text-slate-900 dark:text-slate-100 transition-colors duration-300 relative overflow-hidden border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-100 dark:bg-red-950/60 border border-red-300 dark:border-red-800 text-red-900 dark:text-amber-300 text-xs font-black tracking-wider uppercase mb-3">
            <Building2 size={14} className="text-red-700 dark:text-amber-400" />
            <span>WHOLLY OWNED SUBSIDIARY OF SIDBI</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
            About MUDRA & Pradhan Mantri MUDRA Yojana
          </h2>

          <div className="w-32 h-1.5 bg-gradient-to-r from-red-700 via-amber-500 to-red-700 mx-auto rounded-full mb-6"></div>

          <p className="text-slate-600 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed text-sm md:text-base font-medium">
            Micro Units Development & Refinance Agency Ltd. (MUDRA) was set up by the Government of India on April 8, 2015 
            to provide formal financial institution credit up to <strong>₹20 Lakh</strong> to non-corporate, non-farm small and micro enterprises. 
            MUDRA acts as a statutory refinancing bridge, empowering banks, MFIs, and NBFCs to extend collateral-free loans across India.
          </p>
        </motion.div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="bg-amber-50/50 dark:bg-slate-900/90 rounded-2xl p-6 border-2 border-amber-200/80 dark:border-slate-800 shadow-sm hover:border-amber-400 dark:hover:border-amber-500 transition-all flex flex-col justify-between relative overflow-hidden group"
            >
              {/* Top accent glow line on hover */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-700 via-amber-500 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div>
                <motion.div
                  whileHover={{ rotate: 12, scale: 1.15 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="w-12 h-12 rounded-xl bg-red-800 text-amber-300 flex items-center justify-center mb-4 shadow-md"
                >
                  <pillar.icon size={22} />
                </motion.div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2">
                  {pillar.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 font-semibold leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Achievements Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-red-700 dark:bg-red-800 text-white flex items-center justify-center font-bold">
                <TrendingUp size={18} />
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white">
                Key PMMY Achievements & National Reach
              </h3>
            </div>

            {/* Financial Year Selector Pills with Spring Sliding Animation */}
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-full border border-slate-200 dark:border-slate-700 text-xs font-bold shadow-inner">
              {achievements.map((item, idx) => {
                const isSelected = currentIndex === idx;
                return (
                  <button
                    key={item.year}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    className={`relative z-10 px-4 py-1.5 rounded-full transition-colors ${
                      isSelected 
                        ? 'text-white dark:text-slate-950 font-black' 
                        : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
                    }`}
                  >
                    {isSelected && (
                      <motion.div
                        layoutId="fyActivePill"
                        transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                        className="absolute inset-0 bg-red-800 dark:bg-amber-400 rounded-full shadow-md z-[-1]"
                      />
                    )}
                    <span>{item.year}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-50 via-white to-amber-100/50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 rounded-3xl shadow-xl overflow-hidden border-2 border-amber-200 dark:border-slate-800">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.year}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="p-3 sm:p-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-2">
                  <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-amber-200/80 dark:border-slate-700 shadow-sm flex flex-col justify-between">
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Financial Year</span>
                    <span className="text-2xl font-black text-slate-900 dark:text-white mt-2">{current.year}</span>
                  </div>

                  <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-amber-200/80 dark:border-slate-700 shadow-sm flex flex-col justify-between">
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">PMMY Loans Sanctioned</span>
                    <span className="text-2xl font-black text-red-700 dark:text-red-400 mt-2">{current.loans}</span>
                  </div>

                  <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-amber-200/80 dark:border-slate-700 shadow-sm flex flex-col justify-between">
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Amount Sanctioned</span>
                    <span className="text-2xl font-black text-red-700 dark:text-amber-400 mt-2">{current.sanctioned}</span>
                  </div>

                  <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-amber-200/80 dark:border-slate-700 shadow-sm flex flex-col justify-between">
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Amount Disbursed</span>
                    <span className="text-2xl font-black text-emerald-700 dark:text-emerald-400 mt-2">{current.disbursed}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="bg-amber-100/70 dark:bg-slate-800/90 py-3.5 px-6 text-center text-xs font-bold text-slate-700 dark:text-slate-300 border-t border-amber-200 dark:border-slate-700 flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-amber-800 dark:text-amber-400" />
                <span>Last Updated on: <strong className="text-slate-900 dark:text-white">{current.updated}</strong></span>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  to={createPageUrl('About')}
                  className="text-xs font-extrabold text-red-800 dark:text-amber-400 hover:underline flex items-center gap-1"
                >
                  <span>Read Full History</span>
                  <ArrowRight size={14} />
                </Link>

                <div className="flex gap-2">
                  <button 
                    type="button"
                    onClick={prevData}
                    className="bg-amber-500 hover:bg-amber-600 text-slate-950 p-2 rounded-lg transition-all font-bold shadow-md"
                    aria-label="Previous Data"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button 
                    type="button"
                    onClick={nextData}
                    className="bg-amber-500 hover:bg-amber-600 text-slate-950 p-2 rounded-lg transition-all font-bold shadow-md"
                    aria-label="Next Data"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}