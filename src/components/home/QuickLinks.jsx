import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Link2, FileText, Image, Calendar } from 'lucide-react';

const linkCategories = [
  {
    title: 'QUICK LINKS',
    icon: Link2,
    items: ['SIDBI', 'Stand Up India', 'DFS', 'MFIN', 'SA-DHAN', 'NABARD', 'UdyamiMitra', 'Jansamarth Portal']
  },
  {
    title: 'PMMY REPORTS',
    icon: FileText,
    items: ['PMMY Performance: 2023-24', 'Overall Performance', 'State wise Performance', 'Bank wise Performance']
  },
  {
    title: 'DOCUMENTS',
    icon: FileText,
    items: ['Coffee Table Book - MUDRA', 'Success Stories', 'Success Stories-II', 'Success Stories-III', 'Profile of MUDRA Udyamis']
  },
  {
    title: 'EVENTS GALLERY',
    icon: Image,
    items: ['MUDRA Inauguration', 'Awards', 'Conferences', 'Programmes']
  }
];

export default function QuickLinks() {
  return (
    <section 
      className="py-16 relative"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-gray-900/80"></div>
      
      <div className="relative max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {linkCategories.map((category, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden"
            >
              <div className="bg-gradient-to-r from-red-700 to-red-800 px-4 py-3 flex items-center gap-3">
                <category.icon className="text-amber-300" size={20} />
                <h3 className="text-white font-bold text-sm tracking-wide">{category.title}</h3>
              </div>
              <ul className="p-4 space-y-1">
                {category.items.map((item, itemIdx) => (
                  <li key={itemIdx}>
                    <a 
                      href="#" 
                      className="flex items-center gap-2 py-2 text-gray-700 hover:text-red-700 text-sm transition-colors group"
                    >
                      <span className="text-amber-500 group-hover:translate-x-1 transition-transform">»</span>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="px-4 pb-4">
                <a 
                  href="#" 
                  className="flex items-center gap-2 text-red-700 font-semibold text-sm hover:gap-3 transition-all"
                >
                  VIEW ALL <ArrowRight size={16} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}