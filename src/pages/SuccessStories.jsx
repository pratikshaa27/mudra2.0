import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Award, MapPin, IndianRupee, Briefcase, UserCheck } from 'lucide-react';
import Header from '../components/home/Header';
import Footer from '../components/home/Footer';
import ChatBot from '../components/ChatBot';

const categories = [
  { id: 'all', label: 'ALL STORIES' },
  { id: 'women', label: 'WOMEN ENTREPRENEURS' },
  { id: 'youth', label: 'YOUTH MSME ACHIEVERS' },
  { id: 'rural', label: 'RURAL ENTERPRISE SUCCESS' }
];

const stories = [
  {
    id: 1,
    category: 'women',
    name: 'Savita Devi',
    business: 'Ananya Handloom & Textiles',
    location: 'Guwahati, Assam',
    loanCategory: 'Tarun (₹8.5 Lakh)',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    description: 'Started as a small home weaving setup with 2 looms. With a MUDRA Tarun loan, expanded to 14 automatic looms employing 22 local women weavers and exporting traditional Eri silk products.'
  },
  {
    id: 2,
    category: 'women',
    name: 'Meenakshi Sundaram',
    business: 'Sri Lakshmi Organic Spice Processing',
    location: 'Madurai, Tamil Nadu',
    loanCategory: 'Kishore (₹4.2 Lakh)',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    description: 'Procures organic spices from local smallholders, processes and vacuum packs them for retail chains across South India. Increased monthly revenue 5x post-MUDRA financial support.'
  },
  {
    id: 3,
    category: 'youth',
    name: 'Rahul Sharma',
    business: 'Zenith Precision Engineering Works',
    location: 'Pune, Maharashtra',
    loanCategory: 'TarunPlus (₹15 Lakh)',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
    description: 'A young diploma engineer who established a CNC lathe component manufacturing unit supplying auto ancillaries. Scaled up under TarunPlus scheme with zero third-party collateral.'
  },
  {
    id: 4,
    category: 'youth',
    name: 'Arjun Verma',
    business: 'GreenWatt Solar Installation Solutions',
    location: 'Jaipur, Rajasthan',
    loanCategory: 'Tarun (₹10 Lakh)',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80',
    description: 'Provided rooftop solar installation services for commercial shops in Tier-2 cities. Utilized MUDRA credit to purchase testing equipment and inventory.'
  },
  {
    id: 5,
    category: 'rural',
    name: 'Rameshwar Mahato',
    business: 'Kisan Chilling & Dairy Processing',
    location: 'Anand, Gujarat',
    loanCategory: 'Kishore (₹3.8 Lakh)',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=800&q=80',
    description: 'Set up a bulk milk cooling unit in his village, collecting 1,200 liters daily from 45 dairy farmers and delivering to cooperative dairies.'
  },
  {
    id: 6,
    category: 'rural',
    name: 'Sunil Kumar',
    business: 'EcoPottery Artisans Collective',
    location: 'Varanasi, Uttar Pradesh',
    loanCategory: 'Shishu (₹50,000)',
    image: 'https://images.unsplash.com/photo-1590682680695-43b964a3ae17?auto=format&fit=crop&w=800&q=80',
    description: 'Upgraded traditional manual pottery wheel to an electric pug mill and kiln. Reduced manufacturing cycle time by 60% and expanded to online handicraft platforms.'
  }
];

export default function SuccessStories() {
  const [searchParams] = useSearchParams();
  const catParam = searchParams.get('cat');
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    if (catParam && ['women', 'youth', 'rural', 'all'].includes(catParam)) {
      setActiveCategory(catParam);
    }
  }, [catParam]);

  const filteredStories = activeCategory === 'all' 
    ? stories 
    : stories.filter(s => s.category === activeCategory);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070b14] text-slate-900 dark:text-slate-100 transition-colors duration-300 flex flex-col justify-between">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 py-12 w-full">
        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 bg-[#f97316] text-white px-3.5 py-1 rounded-md text-xs font-black tracking-wider uppercase mb-3 shadow-sm">
            <Sparkles size={14} className="text-white" />
            <span>TRANSFORMING LIVES ACROSS INDIA</span>
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0f2942] dark:text-white tracking-tight mb-3">
            PMMY Success Stories
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base font-semibold">
            Real stories of grassroots entrepreneurs, women leaders, and rural innovators empowered by MUDRA loans.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
          {categories.map((cat) => (
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-black tracking-wider transition-all ${
                activeCategory === cat.id
                  ? 'bg-red-800 dark:bg-amber-500 text-white dark:text-slate-950 shadow-md'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-amber-50'
              }`}
            >
              {cat.label}
            </motion.button>
          ))}
        </div>

        {/* Success Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="wait">
            {filteredStories.map((story) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -6 }}
                className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800 flex flex-col justify-between"
              >
                <div className="relative h-56 overflow-hidden bg-slate-200 dark:bg-slate-800">
                  <img 
                    src={story.image} 
                    alt={story.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-amber-500 text-slate-950 px-3 py-1 rounded-full text-[11px] font-black shadow-md flex items-center gap-1">
                    <IndianRupee size={12} />
                    <span>{story.loanCategory}</span>
                  </div>
                </div>

                <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">
                      <MapPin size={13} className="text-red-700 dark:text-amber-400" />
                      <span>{story.location}</span>
                    </div>

                    <h3 className="text-lg font-black text-[#0f2942] dark:text-white">
                      {story.business}
                    </h3>
                    <p className="text-xs font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1 mt-0.5">
                      <UserCheck size={13} />
                      <span>Founder: {story.name}</span>
                    </p>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-semibold mt-3">
                      "{story.description}"
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                    <span className="flex items-center gap-1">
                      <Award size={13} />
                      Zero Collateral Security
                    </span>
                    <span className="uppercase text-[10px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-600 dark:text-slate-400">
                      PMMY Beneficiary
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </main>

      <Footer />
      <ChatBot />
    </div>
  );
}
