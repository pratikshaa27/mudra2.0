import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const products = [
  {
    name: 'Shishu',
    range: 'Upto ₹50,000/-',
    description: 'For startups and new businesses',
    gradient: 'from-blue-600 to-indigo-700',
    ring: 'ring-blue-300 dark:ring-blue-900'
  },
  {
    name: 'Kishore',
    range: 'Above ₹50,000/- And Upto ₹5 Lakh',
    description: 'For growing businesses',
    gradient: 'from-emerald-600 to-teal-700',
    ring: 'ring-emerald-300 dark:ring-emerald-900'
  },
  {
    name: 'Tarun',
    range: 'Above ₹5 Lakh And Upto ₹10 Lakh',
    description: 'For established enterprises',
    gradient: 'from-amber-500 to-amber-700',
    ring: 'ring-amber-300 dark:ring-amber-900'
  },
  {
    name: 'TarunPlus',
    range: 'Above ₹10 Lakh And Upto ₹20 Lakh',
    description: 'For repeat borrowers with good track record',
    gradient: 'from-red-600 to-rose-800',
    ring: 'ring-red-300 dark:ring-red-900'
  }
];

export default function LoanProducts() {
  return (
    <section id="schemes" className="py-20 bg-slate-50 dark:bg-[#090d16] text-slate-900 dark:text-slate-100 transition-colors duration-300 relative">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
            MUDRA Loan Products
          </h2>

          <div className="w-32 h-1.5 bg-gradient-to-r from-red-700 via-amber-500 to-red-700 mx-auto rounded-full mb-6"></div>

          <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto text-sm md:text-base font-semibold leading-relaxed">
            Under PMMY, MUDRA has created four products to signify the stage of growth / 
            development and funding needs of the beneficiary micro unit / entrepreneur.
          </p>
        </motion.div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
          {products.map((product, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              whileHover={{ y: -8 }}
              className="relative group cursor-pointer"
            >
              <div className="relative bg-white dark:bg-slate-900 rounded-3xl p-7 shadow-lg dark:shadow-2xl border-2 border-slate-200 dark:border-slate-800 group-hover:border-amber-400 dark:group-hover:border-amber-500/50 transition-all h-full flex flex-col justify-between">
                
                <div>
                  {/* Icon Circle */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${product.gradient} rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300 ring-4 ${product.ring}`}>
                    <span className="text-white text-3xl font-black">₹</span>
                  </div>

                  <h3 className="text-2xl font-black text-slate-900 dark:text-white text-center mb-2 tracking-tight">
                    {product.name}
                  </h3>

                  <p className="text-center text-red-700 dark:text-amber-400 font-extrabold text-xs sm:text-sm mb-3 px-3 py-1.5 bg-red-50 dark:bg-slate-800 rounded-xl border border-red-200 dark:border-slate-700">
                    Covering Loans {product.range}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                  <p className="text-center text-slate-600 dark:text-slate-300 text-xs font-semibold leading-relaxed">
                    {product.description}
                  </p>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}