import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Pradhan Mantri MUDRA Yojana (PMMY)
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-red-700 to-amber-500 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Pradhan Mantri MUDRA Yojana (PMMY) is a scheme launched by the Hon'ble Prime Minister 
            on April 8, 2015 for providing loans up to ₹20 lakh (for those entrepreneurs who have 
            availed and successfully repaid previous loans under the 'Tarun' category) to the 
            non-corporate, non-farm small/micro enterprises. These loans are classified as MUDRA 
            loans under PMMY.
          </p>
        </motion.div>

        {/* Achievements Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h3 className="text-xl font-semibold text-center text-gray-800 mb-6">
            Achievements Under PMMY Since Inception
          </h3>

          <div className="bg-gradient-to-br from-amber-50 to-white rounded-2xl shadow-xl overflow-hidden border border-amber-200">
            <table className="w-full">
              <tbody>
                <tr className="border-b border-amber-200">
                  <td className="px-6 py-4 bg-amber-100 font-medium text-gray-700">Financial Year :</td>
                  <td className="px-6 py-4 text-red-700 font-bold text-lg">: {current.year}</td>
                </tr>
                <tr className="border-b border-amber-200">
                  <td className="px-6 py-4 bg-amber-100 font-medium text-gray-700">No. Of PMMY Loans Sanctioned :</td>
                  <td className="px-6 py-4 text-red-700 font-bold text-lg">: {current.loans}</td>
                </tr>
                <tr className="border-b border-amber-200">
                  <td className="px-6 py-4 bg-amber-100 font-medium text-gray-700">Amount Sanctioned :</td>
                  <td className="px-6 py-4 text-red-700 font-bold text-lg">: {current.sanctioned}</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 bg-amber-100 font-medium text-gray-700">Amount Disbursed :</td>
                  <td className="px-6 py-4 text-red-700 font-bold text-lg">: {current.disbursed}</td>
                </tr>
              </tbody>
            </table>
            <p className="text-center text-sm text-gray-500 py-3 border-t border-amber-200">
              Last Updated on: {current.updated}
            </p>
          </div>

          {/* Navigation */}
          <div className="flex justify-center gap-3 mt-6">
            <button 
              onClick={prevData}
              className="bg-gradient-to-r from-amber-500 to-amber-600 text-white p-3 rounded-lg shadow-lg hover:from-amber-600 hover:to-amber-700 transition-all"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={nextData}
              className="bg-gradient-to-r from-amber-500 to-amber-600 text-white p-3 rounded-lg shadow-lg hover:from-amber-600 hover:to-amber-700 transition-all"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}