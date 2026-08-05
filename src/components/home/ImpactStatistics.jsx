import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { TrendingUp, Users, Award, ShieldCheck, PieChart, Sparkles, ArrowUpRight } from 'lucide-react';

const statsCards = [
  {
    value: '₹33.07 Lakh Cr',
    countTo: 33.07,
    prefix: '₹',
    suffix: ' Lakh Cr',
    decimals: 2,
    label: 'Total Disbursement',
    subtitle: 'Collateral-free credit issued under PMMY',
    icon: TrendingUp,
    color: 'from-amber-500 to-amber-600',
    badge: 'CUMULATIVE DISBURSED'
  },
  {
    value: '50.2+ Crore',
    countTo: 50.2,
    prefix: '',
    suffix: '+ Crore',
    decimals: 1,
    label: 'Loans Sanctioned',
    subtitle: 'Across Shishu, Kishore & Tarun schemes',
    icon: ShieldCheck,
    color: 'from-red-700 to-red-800',
    badge: 'BENEFICIARY LOANS'
  },
  {
    value: '70%',
    countTo: 70,
    prefix: '',
    suffix: '%',
    decimals: 0,
    label: 'Women Beneficiaries',
    subtitle: 'Empowering women entrepreneurs across India',
    icon: Users,
    color: 'from-emerald-600 to-teal-700',
    badge: 'WOMEN EMPOWERMENT'
  },
  {
    value: '4.5+ Crore',
    countTo: 4.5,
    prefix: '',
    suffix: '+ Crore',
    decimals: 1,
    label: 'New Entrepreneurs',
    subtitle: 'First-generation micro enterprise founders',
    icon: Award,
    color: 'from-blue-600 to-indigo-700',
    badge: 'JOB CREATORS'
  }
];

const demographicBreakdown = [
  { label: 'Women Entrepreneurs', percentage: 70, color: 'bg-emerald-500' },
  { label: 'SC / ST / OBC Beneficiaries', percentage: 52, color: 'bg-amber-500' },
  { label: 'New / First-Time Borrowers', percentage: 48, color: 'bg-blue-500' },
  { label: 'Rural & Semi-Urban Coverage', percentage: 65, color: 'bg-purple-500' }
];

// Animated Counter Component
function AnimatedCounter({ countTo, prefix, suffix, decimals, inView }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const end = countTo;
    const duration = 2000;
    const steps = 60;
    const increment = end / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [inView, countTo]);

  return (
    <span>
      {prefix}{count.toFixed(decimals)}{suffix}
    </span>
  );
}

export default function ImpactStatistics() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="py-20 bg-slate-50 dark:bg-[#070b14] text-slate-900 dark:text-slate-100 transition-colors duration-300 relative overflow-hidden border-t border-slate-200 dark:border-slate-800">
      
      {/* Subtle Background Orbs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-100 dark:bg-red-950/60 border border-red-300 dark:border-red-800 text-red-900 dark:text-amber-300 text-xs font-black tracking-wider uppercase mb-3">
            <Sparkles size={14} className="text-red-700 dark:text-amber-400" />
            <span>NATIONAL INCLUSION IMPACT</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
            MUDRA Impact & Performance Statistics
          </h2>

          <div className="w-32 h-1.5 bg-gradient-to-r from-red-700 via-amber-500 to-red-700 mx-auto rounded-full mb-6"></div>

          <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base font-semibold leading-relaxed">
            A decade of empowering grassroots micro enterprises, fostering self-employment, and bridging the formal financial credit gap across all 28 States and 8 Union Territories.
          </p>
        </motion.div>

        {/* 4 Cards Counter Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {statsCards.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 35, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.12, duration: 0.5, ease: 'easeOut' }}
              whileHover={{ y: -8, scale: 1.03, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.15)" }}
              className="bg-white dark:bg-slate-900 rounded-3xl p-6 border-2 border-slate-200 dark:border-slate-800 hover:border-amber-400 dark:hover:border-amber-500/50 transition-all flex flex-col justify-between shadow-lg group relative overflow-hidden"
            >
              {/* Top accent glow line on hover */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-700 via-amber-500 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    {stat.badge}
                  </span>
                  <motion.div 
                    whileHover={{ rotate: 12, scale: 1.15 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} text-white flex items-center justify-center shadow-md`}
                  >
                    <stat.icon size={20} />
                  </motion.div>
                </div>

                <h3 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mb-1 tracking-tight">
                  <AnimatedCounter 
                    countTo={stat.countTo} 
                    prefix={stat.prefix} 
                    suffix={stat.suffix} 
                    decimals={stat.decimals} 
                    inView={isInView} 
                  />
                </h3>
                <p className="text-sm font-extrabold text-red-800 dark:text-amber-400 mb-2">
                  {stat.label}
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-semibold leading-relaxed">
                  {stat.subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Demographic Reach & Distribution Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-slate-900 rounded-3xl p-7 md:p-10 border-2 border-slate-200 dark:border-slate-800 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
        >
          
          {/* Left Column: Progress Bars */}
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center gap-2 mb-2">
              <PieChart className="text-red-700 dark:text-amber-400 w-5 h-5" />
              <h3 className="text-xl font-black text-slate-900 dark:text-white">
                Demographic & Social Financial Reach
              </h3>
            </div>
            
            <p className="text-xs text-slate-600 dark:text-slate-300 font-semibold mb-6">
              MUDRA loans prioritize social equity, ensuring priority sector lending reaches women, SC/ST, and rural micro-entrepreneurs.
            </p>

            <div className="space-y-4">
              {demographicBreakdown.map((item, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold text-slate-800 dark:text-slate-200">
                    <span>{item.label}</span>
                    <span className="text-red-800 dark:text-amber-400 font-extrabold">{item.percentage}%</span>
                  </div>
                  <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: idx * 0.15, ease: "easeOut" }}
                      className={`h-full ${item.color} rounded-full`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Key Highlights Box */}
          <div className="lg:col-span-5 bg-amber-50/70 dark:bg-slate-800/80 p-6 rounded-2xl border-2 border-amber-200 dark:border-slate-700 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs font-black text-red-800 dark:text-amber-400 uppercase tracking-wider block mb-2">PMMY PAN-INDIA FOOTPRINT</span>
              <h4 className="text-lg font-black text-slate-900 dark:text-white mb-2">
                100% Coverage Across All 700+ Districts
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-semibold leading-relaxed">
                MUDRA loans are accessible through 1,500+ Member Lending Institutions (Public Banks, RRBs, Cooperative Banks, MFIs, and NBFCs) connected via the Udyamimitra portal.
              </p>
            </div>

            <div className="pt-3 border-t border-amber-200 dark:border-slate-700 flex items-center justify-between">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-bold">Updated Statistical Bulletin 2024</span>
              <a
                href="https://www.mudra.org.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-black text-red-800 dark:text-amber-400 hover:underline flex items-center gap-1"
              >
                <span>Download Report</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
