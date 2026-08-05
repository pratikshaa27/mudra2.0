import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Target, Sparkles, Compass, ShieldCheck, HeartHandshake, Zap, Globe } from 'lucide-react';

const visionPillars = [
  "Integrated Financial Services",
  "Global Best Practices",
  "Bottom of Pyramid Support",
  "Comprehensive Social Growth"
];

const missionPillars = [
  "Inclusive Enterprise Culture",
  "Partner Institution Synergy",
  "Sustainable Financial Security",
  "Value-Based Empowerment"
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 100, damping: 15 }
  }
};

export default function VisionMission() {
  return (
    <section id="vision" className="py-20 bg-transparent text-slate-900 dark:text-slate-100 transition-colors duration-500 relative overflow-hidden">
      
      {/* Dynamic Animated Ambient Background Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.25, 1],
            x: [0, 30, 0],
            y: [0, -30, 0],
            opacity: [0.15, 0.3, 0.15]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-amber-400/20 dark:bg-amber-500/10 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -40, 0],
            y: [0, 40, 0],
            opacity: [0.15, 0.3, 0.15]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute -bottom-24 -right-24 w-[28rem] h-[28rem] rounded-full bg-red-600/15 dark:bg-red-600/10 blur-3xl"
        />
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-40"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Animated Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100/90 dark:bg-amber-950/70 border border-amber-300 dark:border-amber-700/60 text-amber-900 dark:text-amber-300 text-xs font-black tracking-wider uppercase mb-4 shadow-sm"
          >
            <Sparkles size={14} className="text-amber-600 dark:text-amber-400 animate-pulse" />
            <span>OUR GUIDING PHILOSOPHY</span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
            Vision & Mission of <span className="bg-gradient-to-r from-red-700 via-amber-600 to-amber-500 bg-clip-text text-transparent">MUDRA</span>
          </h2>

          <div className="w-24 h-1.5 bg-gradient-to-r from-amber-500 via-amber-600 to-red-600 mx-auto rounded-full mb-4"></div>

          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base font-medium">
            Building an inclusive, resilient financial ecosystem that fosters micro-entrepreneurship and economic self-reliance across India.
          </p>
        </motion.div>

        {/* Vision & Mission Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid md:grid-cols-2 gap-8 lg:gap-12"
        >
          
          {/* MUDRA VISION CARD */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="group relative bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-3xl p-8 sm:p-10 shadow-xl dark:shadow-2xl border-2 border-amber-200/90 dark:border-slate-800 hover:border-amber-400 dark:hover:border-amber-500/60 transition-all duration-500 overflow-hidden flex flex-col justify-between"
          >
            {/* Animated Top Accent Border Bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 rounded-t-3xl"></div>

            {/* Background Watermark Icon */}
            <Eye className="absolute -bottom-8 -right-8 w-48 h-48 text-amber-500/5 dark:text-amber-400/5 group-hover:text-amber-500/10 group-hover:scale-110 transition-all duration-500 pointer-events-none" />

            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <motion.div
                    whileHover={{ rotate: 15, scale: 1.15 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="w-14 h-14 bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 rounded-2xl flex items-center justify-center shadow-lg font-bold shrink-0 border border-amber-300"
                  >
                    <Eye size={28} />
                  </motion.div>
                  <div>
                    <span className="text-xs font-black uppercase text-amber-600 dark:text-amber-400 tracking-widest">STRATEGIC OUTLOOK</span>
                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                      MUDRA VISION
                    </h3>
                  </div>
                </div>

                <div className="hidden sm:flex items-center gap-1 text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 px-3 py-1 rounded-full border border-amber-200 dark:border-amber-900">
                  <Compass size={14} />
                  <span>Future Benchmark</span>
                </div>
              </div>

              {/* Quote Body */}
              <div className="relative mb-8 bg-amber-50/60 dark:bg-slate-800/60 p-6 rounded-2xl border-l-4 border-amber-500 shadow-inner">
                <span className="absolute -top-3 left-4 text-4xl text-amber-400/40 font-serif leading-none">“</span>
                <p className="text-slate-700 dark:text-slate-200 text-sm sm:text-base leading-relaxed italic font-semibold relative z-10">
                  "To be an integrated financial and support services provider par excellence 
                  benchmarked with global best practices and standards for the bottom of the 
                  pyramid universe for their comprehensive economic and social development."
                </p>
              </div>

              {/* Pillars / Key Highlights Badges */}
              <div>
                <h4 className="text-xs font-extrabold uppercase text-slate-500 dark:text-slate-400 mb-3 tracking-wider flex items-center gap-1.5">
                  <Zap size={14} className="text-amber-500" />
                  Key Vision Drivers:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {visionPillars.map((pillar, idx) => (
                    <motion.span
                      key={idx}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-100/70 dark:bg-amber-950/40 text-amber-900 dark:text-amber-300 border border-amber-300/70 dark:border-amber-800/50 transition-colors"
                    >
                      ✓ {pillar}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Glow Line */}
            <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1 text-amber-700 dark:text-amber-400 font-extrabold">
                <Globe size={14} /> National Standard
              </span>
              <span>Bottom of Pyramid Focus</span>
            </div>
          </motion.div>

          {/* MUDRA MISSION CARD */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="group relative bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-3xl p-8 sm:p-10 shadow-xl dark:shadow-2xl border-2 border-amber-200/90 dark:border-slate-800 hover:border-amber-400 dark:hover:border-amber-500/60 transition-all duration-500 overflow-hidden flex flex-col justify-between"
          >
            {/* Animated Top Accent Border Bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-amber-600 to-red-600 rounded-t-3xl"></div>

            {/* Background Watermark Icon */}
            <Target className="absolute -bottom-8 -right-8 w-48 h-48 text-red-500/5 dark:text-red-400/5 group-hover:text-red-500/10 group-hover:scale-110 transition-all duration-500 pointer-events-none" />

            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <motion.div
                    whileHover={{ rotate: -15, scale: 1.15 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="w-14 h-14 bg-gradient-to-br from-amber-500 to-red-600 text-white rounded-2xl flex items-center justify-center shadow-lg font-bold shrink-0 border border-amber-400"
                  >
                    <Target size={28} />
                  </motion.div>
                  <div>
                    <span className="text-xs font-black uppercase text-red-600 dark:text-amber-400 tracking-widest">ACTION OBJECTIVE</span>
                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                      MUDRA MISSION
                    </h3>
                  </div>
                </div>

                <div className="hidden sm:flex items-center gap-1 text-xs font-bold text-red-700 dark:text-amber-400 bg-red-50 dark:bg-red-950/50 px-3 py-1 rounded-full border border-red-200 dark:border-red-900">
                  <ShieldCheck size={14} />
                  <span>Institutional Synergy</span>
                </div>
              </div>

              {/* Quote Body */}
              <div className="relative mb-8 bg-red-50/60 dark:bg-slate-800/60 p-6 rounded-2xl border-l-4 border-red-600 shadow-inner">
                <span className="absolute -top-3 left-4 text-4xl text-red-400/40 font-serif leading-none">“</span>
                <p className="text-slate-700 dark:text-slate-200 text-sm sm:text-base leading-relaxed italic font-semibold relative z-10">
                  "To create an inclusive, sustainable and value based entrepreneurial 
                  culture, in collaboration with our partner institutions in achieving 
                  economic success and financial security."
                </p>
              </div>

              {/* Pillars / Key Highlights Badges */}
              <div>
                <h4 className="text-xs font-extrabold uppercase text-slate-500 dark:text-slate-400 mb-3 tracking-wider flex items-center gap-1.5">
                  <HeartHandshake size={14} className="text-red-500" />
                  Key Mission Pillars:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {missionPillars.map((pillar, idx) => (
                    <motion.span
                      key={idx}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold bg-red-100/70 dark:bg-red-950/40 text-red-900 dark:text-red-300 border border-red-300/70 dark:border-red-800/50 transition-colors"
                    >
                      ✓ {pillar}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Glow Line */}
            <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1 text-red-700 dark:text-amber-400 font-extrabold">
                <ShieldCheck size={14} /> Partner Institutions
              </span>
              <span>Financial Security</span>
            </div>
          </motion.div>

          </motion.div>

      </div>
    </section>
  );
}