import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Target } from 'lucide-react';

export default function VisionMission() {
  return (
    <section className="py-10 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Vision Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-8 shadow-xl border-2 border-amber-200 hover:shadow-2xl transition-shadow"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-lg">
                <Eye className="text-white" size={28} />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">MUDRA VISION</h3>
            </div>
            <p className="text-gray-700 leading-relaxed italic">
              "To be an integrated financial and support services provider par excellence 
              benchmarked with global best practices and standards for the bottom of the 
              pyramid universe for their comprehensive economic and social development."
            </p>
          </motion.div>

          {/* Mission Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-8 shadow-xl border-2 border-amber-200 hover:shadow-2xl transition-shadow"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-lg">
                <Target className="text-white" size={28} />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">MUDRA MISSION</h3>
            </div>
            <p className="text-gray-700 leading-relaxed italic">
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