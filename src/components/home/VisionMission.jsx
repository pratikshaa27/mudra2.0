import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Target } from 'lucide-react';

export default function VisionMission() {
  return (
    <section id="vision" className="py-16 bg-slate-50 dark:bg-[#090d16] text-slate-900 dark:text-slate-100 transition-colors duration-300 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* MUDRA VISION CARD */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -6 }}
            className="group relative bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-10 shadow-lg dark:shadow-2xl border-2 border-amber-200/90 dark:border-slate-800 hover:border-amber-400 dark:hover:border-amber-500/50 transition-all duration-300"
          >
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 rounded-t-3xl"></div>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-amber-500 text-slate-950 rounded-2xl flex items-center justify-center shadow-md font-bold shrink-0">
                <Eye size={28} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                MUDRA VISION
              </h3>
            </div>
            
            <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed italic font-semibold border-l-4 border-amber-400 pl-4 py-1">
              "To be an integrated financial and support services provider par excellence 
              benchmarked with global best practices and standards for the bottom of the 
              pyramid universe for their comprehensive economic and social development."
            </p>
          </motion.div>

          {/* MUDRA MISSION CARD */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            whileHover={{ y: -6 }}
            className="group relative bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-10 shadow-lg dark:shadow-2xl border-2 border-amber-200/90 dark:border-slate-800 hover:border-amber-400 dark:hover:border-amber-500/50 transition-all duration-300"
          >
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-amber-600 to-red-600 rounded-t-3xl"></div>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-amber-500 text-slate-950 rounded-2xl flex items-center justify-center shadow-md font-bold shrink-0">
                <Target size={28} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                MUDRA MISSION
              </h3>
            </div>
            
            <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed italic font-semibold border-l-4 border-amber-500 pl-4 py-1">
              "To create an inclusive, sustainable and value based entrepreneurial 
              culture, in collaboration with our partner institutions in achieving 
              economic success and financial security."
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}