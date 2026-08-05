import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Award, MapPin, IndianRupee, UserCheck, Sparkles, ArrowRight, Quote } from 'lucide-react';

const stories = [
  {
    id: 1,
    category: 'women',
    categoryLabel: 'Women Entrepreneur',
    name: 'Savita Devi',
    business: 'Ananya Handloom & Textiles',
    location: 'Guwahati, Assam',
    loanCategory: 'Tarun (₹8.5 Lakh)',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    description: 'Started as a small home weaving setup with 2 looms. With a MUDRA Tarun loan, expanded to 14 automatic looms employing 22 local women weavers and exporting traditional Eri silk products.',
    impact: '22 Local Women Employed • 5x Revenue Growth'
  },
  {
    id: 2,
    category: 'youth',
    categoryLabel: 'Youth MSME Achiever',
    name: 'Rahul Sharma',
    business: 'Zenith Precision Engineering Works',
    location: 'Pune, Maharashtra',
    loanCategory: 'TarunPlus (₹15 Lakh)',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
    description: 'A young diploma engineer who established a CNC lathe component manufacturing unit supplying auto ancillaries. Scaled up under TarunPlus scheme with zero third-party collateral.',
    impact: 'Supplies 12 Auto OEM Manufacturers • ISO Certified'
  },
  {
    id: 3,
    category: 'women',
    categoryLabel: 'Women Leader',
    name: 'Meenakshi Sundaram',
    business: 'Sri Lakshmi Organic Spice Processing',
    location: 'Madurai, Tamil Nadu',
    loanCategory: 'Kishore (₹4.2 Lakh)',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    description: 'Procures organic spices from local smallholders, processes and vacuum packs them for retail chains across South India. Increased monthly revenue 5x post-MUDRA financial support.',
    impact: '45 Organic Farmers Onboarded • Pan-South Reach'
  },
  {
    id: 4,
    category: 'rural',
    categoryLabel: 'Rural Innovation',
    name: 'Rameshwar Mahato',
    business: 'Kisan Chilling & Dairy Processing',
    location: 'Anand, Gujarat',
    loanCategory: 'Kishore (₹3.8 Lakh)',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=800&q=80',
    description: 'Set up a bulk milk cooling unit in his village, collecting 1,200 liters daily from 45 dairy farmers and delivering directly to cooperative dairies.',
    impact: '1,200 Ltrs Daily Capacity • Village Dairy Cooperative'
  },
  {
    id: 5,
    category: 'youth',
    categoryLabel: 'Youth Entrepreneur',
    name: 'Arjun Verma',
    business: 'GreenWatt Solar Installation Solutions',
    location: 'Jaipur, Rajasthan',
    loanCategory: 'Tarun (₹10 Lakh)',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80',
    description: 'Provided rooftop solar installation services for commercial shops in Tier-2 cities. Utilized MUDRA credit to purchase testing equipment and inventory.',
    impact: '180+ Solar Roofs Installed • Green Clean Energy'
  },
  {
    id: 6,
    category: 'rural',
    categoryLabel: 'Artisan Revival',
    name: 'Sunil Kumar',
    business: 'EcoPottery Artisans Collective',
    location: 'Varanasi, Uttar Pradesh',
    loanCategory: 'Shishu (₹50,000)',
    image: 'https://images.unsplash.com/photo-1590682680695-43b964a3ae17?auto=format&fit=crop&w=800&q=80',
    description: 'Upgraded traditional manual pottery wheel to an electric pug mill and kiln. Reduced manufacturing cycle time by 60% and expanded to online handicraft platforms.',
    impact: '60% Production Time Saved • E-Commerce Seller'
  }
];

export default function SuccessStoriesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);

  useEffect(() => {
    if (!isAutoplay) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % stories.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoplay]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % stories.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + stories.length) % stories.length);
  };

  const current = stories[currentIndex];

  return (
    <section className="py-20 bg-transparent text-slate-900 dark:text-slate-100 transition-colors duration-300 relative overflow-hidden border-t border-slate-200 dark:border-slate-800">
      
      {/* Glow Orbs */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2"></div>
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Centered Uniform Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-100 dark:bg-red-950/60 border border-red-300 dark:border-red-800 text-red-900 dark:text-amber-300 text-xs font-black tracking-wider uppercase mb-3">
            <Sparkles size={14} className="text-red-700 dark:text-amber-400" />
            <span>GRASSROOTS INSPIRATION</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
            PMMY Success Stories Carousel
          </h2>

          <div className="w-32 h-1.5 bg-gradient-to-r from-red-700 via-amber-500 to-red-700 mx-auto rounded-full mb-6"></div>

          <p className="text-slate-600 dark:text-slate-300 max-w-3xl mx-auto text-sm md:text-base font-semibold leading-relaxed">
            Real stories of grassroots entrepreneurs, women leaders, and rural innovators empowered by collateral-free MUDRA loans.
          </p>

          <div className="flex items-center justify-center gap-4 mt-6">
            <Link
              to={createPageUrl('SuccessStories')}
              className="text-xs font-extrabold text-red-800 dark:text-amber-400 hover:underline flex items-center gap-1.5 uppercase tracking-wider"
            >
              <span>Explore All Stories</span>
              <ArrowRight size={14} />
            </Link>

            {/* Navigation Buttons */}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handlePrev}
                className="w-9 h-9 rounded-xl bg-white dark:bg-slate-800 hover:bg-amber-500 text-slate-800 dark:text-white hover:text-slate-950 flex items-center justify-center transition-all shadow-md border border-slate-200 dark:border-slate-700"
                aria-label="Previous story"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="w-9 h-9 rounded-xl bg-white dark:bg-slate-800 hover:bg-amber-500 text-slate-800 dark:text-white hover:text-slate-950 flex items-center justify-center transition-all shadow-md border border-slate-200 dark:border-slate-700"
                aria-label="Next story"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Featured Story Carousel Card */}
        <div
          className="relative max-w-5xl mx-auto"
          onMouseEnter={() => setIsAutoplay(false)}
          onMouseLeave={() => setIsAutoplay(true)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 60, scale: 0.97 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -60, scale: 0.97 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border-2 border-amber-200 dark:border-slate-800 grid grid-cols-1 md:grid-cols-12"
            >
              {/* Left Image Side */}
              <div className="md:col-span-5 relative min-h-[300px] md:min-h-[420px] bg-slate-800">
                <img
                  src={current.image}
                  alt={current.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>

                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                  className="absolute top-4 left-4 bg-amber-500 text-slate-950 px-3 py-1 rounded-full text-xs font-black shadow-md flex items-center gap-1"
                >
                  <Award size={13} />
                  <span>{current.categoryLabel}</span>
                </motion.div>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center gap-1.5 text-amber-300 text-xs font-bold mb-1">
                    <MapPin size={14} />
                    <span>{current.location}</span>
                  </div>
                  <h4 className="text-xl font-black">{current.name}</h4>
                  <p className="text-xs text-slate-300 font-semibold">{current.business}</p>
                </div>
              </div>

              {/* Right Details Side */}
              <div className="md:col-span-7 p-7 md:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-red-50 dark:bg-slate-800 text-red-800 dark:text-amber-400 font-black text-xs border border-red-200 dark:border-slate-700">
                      <IndianRupee size={13} />
                      <span>{current.loanCategory}</span>
                    </div>

                    <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <Award size={13} /> Collateral-Free Sanction
                    </span>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, rotate: -10 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                  >
                    <Quote size={36} className="text-amber-400/40 mb-2" />
                  </motion.div>

                  <p className="text-slate-700 dark:text-slate-200 text-sm md:text-base leading-relaxed font-semibold mb-6 italic">
                    "{current.description}"
                  </p>

                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.35 }}
                    className="bg-amber-50 dark:bg-slate-800/80 p-4 rounded-2xl border border-amber-200 dark:border-slate-700 mb-6"
                  >
                    <span className="text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">Measurable Business Impact</span>
                    <p className="text-xs sm:text-sm font-extrabold text-red-800 dark:text-amber-400">
                      {current.impact}
                    </p>
                  </motion.div>
                </div>

                {/* Footer Bar of Card */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex gap-1.5">
                    {stories.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setCurrentIndex(idx)}
                        className={`h-2 rounded-full transition-all ${
                          idx === currentIndex ? 'w-8 bg-red-800 dark:bg-amber-400' : 'w-2 bg-slate-300 dark:bg-slate-700'
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>

                  <Link
                    to={`${createPageUrl('SuccessStories')}?cat=${current.category}`}
                    className="text-xs font-black text-[#0f2942] dark:text-white hover:text-red-800 dark:hover:text-amber-400 flex items-center gap-1"
                  >
                    <span>Read Full Story</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
