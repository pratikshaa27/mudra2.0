import React from 'react';
import { motion } from 'framer-motion';

const products = [
  {
    name: 'Shishu',
    range: 'Upto ₹50,000/-',
    description: 'For startups and new businesses',
    color: 'from-blue-500 to-blue-700'
  },
  {
    name: 'Kishore',
    range: 'Above ₹50,000/- And Upto ₹5 Lakh',
    description: 'For growing businesses',
    color: 'from-emerald-500 to-emerald-700'
  },
  {
    name: 'Tarun',
    range: 'Above ₹5 Lakh And Upto ₹10 Lakh',
    description: 'For established enterprises',
    color: 'from-amber-500 to-amber-700'
  },
  {
    name: 'TarunPlus',
    range: 'Above ₹10 Lakh And Upto ₹20 Lakh',
    description: 'For repeat borrowers with good track record',
    color: 'from-red-500 to-red-700'
  }
];

export default function LoanProducts() {
  return (
    <section className="py-10 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            MUDRA Loan Products
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-red-700 to-amber-500 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Under PMMY, MUDRA has created four products to signify the stage of growth / 
            development and funding needs of the beneficiary micro unit / entrepreneur.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className="relative group cursor-pointer"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${product.color} rounded-2xl transform rotate-3 group-hover:rotate-6 transition-transform`}></div>
              <div className="relative bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
                <div className={`w-16 h-16 bg-gradient-to-br ${product.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                  <span className="text-white text-3xl font-bold">₹</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 text-center mb-2">
                  {product.name}
                </h3>
                <p className="text-center text-red-700 font-semibold text-sm mb-2">
                  Covering Loans {product.range}
                </p>
                <p className="text-center text-gray-500 text-xs">
                  {product.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}