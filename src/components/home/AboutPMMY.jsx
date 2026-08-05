import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, TrendingUp, Calendar } from 'lucide-react';

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

export default function AboutPMMY() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextData = () => setCurrentIndex((prev) => (prev + 1) % achievements.length);
  const prevData = () => setCurrentIndex((prev) => (prev - 1 + achievements.length) % achievements.length);

  const current = achievements[currentIndex];

  return (
    <section className="py-20 bg-white dark:bg-[#070b14] text-slate-900 dark:text-slate-100 transition-colors duration-300 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
            Pradhan Mantri MUDRA Yojana (PMMY)
          </h2>

          <div className="w-32 h-1.5 bg-gradient-to-r from-red-700 via-amber-500 to-red-700 mx-auto rounded-full mb-6"></div>

          <p className="text-slate-600 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed text-sm md:text-base font-medium">
            Pradhan Mantri MUDRA Yojana (PMMY) is a scheme launched by the Hon'ble Prime Minister 
            on April 8, 2015 for providing loans up to ₹20 lakh (for those entrepreneurs who have 
            availed and successfully repaid previous loans under the 'Tarun' category) to the 
            non-corporate, non-farm small/micro enterprises. These loans are classified as MUDRA 
            loans under PMMY.
          </p>
        </motion.div>

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
                Achievements Under PMMY Since Inception
              </h3>
            </div>

            {/* Financial Year Selector Pills */}
            <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold">
              {achievements.map((item, idx) => (
                <button
                  key={item.year}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    currentIndex === idx 
                      ? 'bg-red-800 text-white shadow-md font-extrabold' 
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {item.year}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-amber-50/70 dark:bg-slate-900 rounded-3xl shadow-xl overflow-hidden border-2 border-amber-200 dark:border-slate-800">
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

            <div className="bg-amber-100/70 dark:bg-slate-800/90 py-3.5 px-6 text-center text-xs font-bold text-slate-700 dark:text-slate-300 border-t border-amber-200 dark:border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-amber-800 dark:text-amber-400" />
                <span>Last Updated on: <strong className="text-slate-900 dark:text-white">{current.updated}</strong></span>
              </div>

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
        </motion.div>
      </div>
    </section>
  );
}