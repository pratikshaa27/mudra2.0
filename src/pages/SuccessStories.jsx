import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Award, 
  MapPin, 
  IndianRupee, 
  UserCheck, 
  Search, 
  Heart, 
  Share2, 
  X, 
  ArrowRight, 
  Building2, 
  TrendingUp, 
  CheckCircle2,
  Maximize2
} from 'lucide-react';
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
    schemeId: 'tarun',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    description: 'Started as a small home weaving setup with 2 looms. With a MUDRA Tarun loan, expanded to 14 automatic looms employing 22 local women weavers and exporting traditional Eri silk products.',
    impactStats: [
      { label: 'Looms Expanded', val: '2 ➔ 14 Looms' },
      { label: 'Local Jobs Created', val: '22 Artisans' },
      { label: 'Revenue Growth', val: '450% YoY' }
    ],
    quote: '"MUDRA collateral-free credit gave financial independence not just to me, but to 22 rural women in my village."'
  },
  {
    id: 2,
    category: 'women',
    name: 'Meenakshi Sundaram',
    business: 'Sri Lakshmi Organic Spice Processing',
    location: 'Madurai, Tamil Nadu',
    loanCategory: 'Kishore (₹4.2 Lakh)',
    schemeId: 'kishore',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    description: 'Procures organic spices from local smallholders, processes and vacuum packs them for retail chains across South India. Increased monthly revenue 5x post-MUDRA financial support.',
    impactStats: [
      { label: 'Farmers Onboarded', val: '60+ Farmers' },
      { label: 'Processing Output', val: '5 Tons / Mo' },
      { label: 'Revenue Growth', val: '500% Increase' }
    ],
    quote: '"With Kishore loan, we bought automated pulverizers and sealed our brand presence in 40+ supermarkets."'
  },
  {
    id: 3,
    category: 'youth',
    name: 'Rahul Sharma',
    business: 'Zenith Precision Engineering Works',
    location: 'Pune, Maharashtra',
    loanCategory: 'TarunPlus (₹15 Lakh)',
    schemeId: 'tarunplus',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
    description: 'A young diploma engineer who established a CNC lathe component manufacturing unit supplying auto ancillaries. Scaled up under TarunPlus scheme with zero third-party collateral.',
    impactStats: [
      { label: 'CNC Machines', val: '4 Units' },
      { label: 'OEM Contracts', val: '8 Tier-1 Auto' },
      { label: 'Team Strength', val: '15 Technicians' }
    ],
    quote: '"TarunPlus doubled our credit limit without demanding property collateral, enabling high-precision CNC machinery."'
  },
  {
    id: 4,
    category: 'youth',
    name: 'Arjun Verma',
    business: 'GreenWatt Solar Installation Solutions',
    location: 'Jaipur, Rajasthan',
    loanCategory: 'Tarun (₹10 Lakh)',
    schemeId: 'tarun',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80',
    description: 'Provided rooftop solar installation services for commercial shops in Tier-2 cities. Utilized MUDRA credit to purchase testing equipment and inventory.',
    impactStats: [
      { label: 'Solar Rooftops', val: '120+ Commercial' },
      { label: 'Carbon Offset', val: '300 Tons CO2/Yr' },
      { label: 'Technicians Employed', val: '12 Solar Techs' }
    ],
    quote: '"MUDRA credit funded our initial solar inventory so we could execute turnkey rooftop solar contracts."'
  },
  {
    id: 5,
    category: 'rural',
    name: 'Rameshwar Mahato',
    business: 'Kisan Chilling & Dairy Processing',
    location: 'Anand, Gujarat',
    loanCategory: 'Kishore (₹3.8 Lakh)',
    schemeId: 'kishore',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=800&q=80',
    description: 'Set up a bulk milk cooling unit in his village, collecting 1,200 liters daily from 45 dairy farmers and delivering to cooperative dairies.',
    impactStats: [
      { label: 'Daily Collection', val: '1,200 Liters/Day' },
      { label: 'Dairy Farmers', val: '45 Families' },
      { label: 'Milk Spoilage', val: 'Reduced 0%' }
    ],
    quote: '"The bulk milk chiller preserved milk freshness and ensured guaranteed daily payouts for village dairy farmers."'
  },
  {
    id: 6,
    category: 'rural',
    name: 'Sunil Kumar',
    business: 'EcoPottery Artisans Collective',
    location: 'Varanasi, Uttar Pradesh',
    loanCategory: 'Shishu (₹50,000)',
    schemeId: 'shishu',
    image: 'https://images.unsplash.com/photo-1590682680695-43b964a3ae17?auto=format&fit=crop&w=800&q=80',
    description: 'Upgraded traditional manual pottery wheel to an electric pug mill and kiln. Reduced manufacturing cycle time by 60% and expanded to online handicraft platforms.',
    impactStats: [
      { label: 'Production Cycle', val: '60% Faster' },
      { label: 'Artisan Income', val: '3x Monthly' },
      { label: 'E-Commerce Reach', val: 'Pan-India' }
    ],
    quote: '"Shishu funding helped me switch to electric pottery wheels, turning traditional craft into a sustainable business."'
  }
];

export default function SuccessStories() {
  const [searchParams] = useSearchParams();
  const catParam = searchParams.get('cat');
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStory, setSelectedStory] = useState(null);
  const [likesMap, setLikesMap] = useState({});

  useEffect(() => {
    if (catParam && ['women', 'youth', 'rural', 'all'].includes(catParam)) {
      setActiveCategory(catParam);
    }
  }, [catParam]);

  const handleLike = (id, e) => {
    e.stopPropagation();
    setLikesMap(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  const filteredStories = stories.filter(story => {
    const matchesCat = activeCategory === 'all' || story.category === activeCategory;
    const matchesSearch = !searchQuery || 
      story.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.business.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.loanCategory.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070b14] text-slate-900 dark:text-slate-100 transition-colors duration-300 flex flex-col justify-between">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-12 w-full">
        
        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-100 dark:bg-red-950/60 border border-red-300 dark:border-red-800 text-red-900 dark:text-amber-300 text-xs font-black tracking-wider uppercase mb-3 shadow-sm">
            <Sparkles size={14} className="text-red-700 dark:text-amber-400" />
            <span>TRANSFORMING LIVES ACROSS INDIA</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
            PMMY Success Stories
          </h1>

          <div className="w-32 h-1.5 bg-gradient-to-r from-red-700 via-amber-500 to-red-700 mx-auto rounded-full mb-6"></div>

          <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base font-semibold leading-relaxed">
            Real inspirational journeys of grassroots entrepreneurs, women leaders, and rural innovators empowered by collateral-free MUDRA loans. Click any story card to open full details.
          </p>
        </motion.div>

        {/* Search & Category Filter Navigation */}
        <div className="space-y-6 mb-12">
          
          {/* Interactive Search Bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search founder name, business, location, or scheme..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs font-bold shadow-md focus:outline-none focus:border-red-800 dark:focus:border-amber-400 transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-red-500 hover:underline"
              >
                Clear
              </button>
            )}
          </div>

          {/* Animated Category Tabs with Spring Pill */}
          <div className="flex items-center justify-center gap-1.5 bg-white dark:bg-slate-900 p-1.5 rounded-full border-2 border-slate-200 dark:border-slate-800 shadow-md flex-wrap justify-center max-w-3xl mx-auto">
            {categories.map((cat) => {
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`relative z-10 px-4 py-2 rounded-full text-xs font-black tracking-wider transition-colors ${
                    isSelected
                      ? 'text-white dark:text-slate-950 font-black'
                      : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="successCatPill"
                      transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                      className="absolute inset-0 bg-red-800 dark:bg-amber-400 rounded-full shadow-md z-[-1]"
                    />
                  )}
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

        </div>

        {/* Success Stories Grid */}
        {filteredStories.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 max-w-md mx-auto">
            <Search className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <p className="text-sm font-bold text-slate-700 dark:text-slate-300">No stories found matching "{searchQuery}"</p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="mt-3 text-xs font-black text-red-800 dark:text-amber-400 hover:underline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            <AnimatePresence mode="wait">
              {filteredStories.map((story) => {
                const totalLikes = (likesMap[story.id] || 0) + 42 + story.id * 7;
                return (
                  <motion.div
                    key={story.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    onClick={() => setSelectedStory(story)}
                    className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-xl border-2 border-slate-200 dark:border-slate-800 hover:border-amber-400 dark:hover:border-amber-500/70 transition-all cursor-pointer flex flex-col justify-between group"
                  >
                    <div>
                      {/* Story Card Image */}
                      <div className="relative h-60 overflow-hidden bg-slate-200 dark:bg-slate-800">
                        <img 
                          src={story.image} 
                          alt={story.name}
                          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent"></div>
                        
                        <div className="absolute top-3 left-3 right-3 flex justify-between items-center z-10">
                          <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-slate-900/90 text-amber-300 backdrop-blur-md border border-slate-700 shadow-md">
                            {story.loanCategory}
                          </span>
                          <button
                            type="button"
                            onClick={(e) => handleLike(story.id, e)}
                            className="flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full bg-red-800/90 text-white backdrop-blur-md hover:bg-red-700 transition-colors shadow-md"
                          >
                            <Heart size={12} className="fill-current" />
                            <span>{totalLikes}</span>
                          </button>
                        </div>

                        <div className="absolute bottom-3 left-4 right-4 z-10">
                          <h3 className="text-xl font-black text-white tracking-tight leading-snug">
                            {story.name}
                          </h3>
                          <p className="text-xs font-bold text-amber-300 flex items-center gap-1">
                            <span>{story.business}</span>
                          </p>
                          <p className="text-[11px] text-slate-300 font-semibold flex items-center gap-1 mt-0.5">
                            <MapPin size={12} className="text-red-400" />
                            <span>{story.location}</span>
                          </p>
                        </div>
                      </div>

                      {/* Card Content Snippet */}
                      <div className="p-5">
                        <p className="text-xs text-slate-600 dark:text-slate-300 font-semibold leading-relaxed line-clamp-3 mb-4">
                          {story.description}
                        </p>
                      </div>
                    </div>

                    {/* Footer Trigger Button */}
                    <div className="p-5 pt-0">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedStory(story);
                        }}
                        className="w-full py-2.5 rounded-xl bg-[#0f2942] group-hover:bg-red-800 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
                      >
                        <Maximize2 size={14} className="text-amber-400" />
                        <span>Read Full Story & Impact</span>
                      </button>
                    </div>

                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}

        {/* Detailed Story Modal Popup */}
        <AnimatePresence>
          {selectedStory && (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.2 }}
                className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border-2 border-slate-200 dark:border-slate-800 shadow-2xl relative"
              >
                {/* Modal Photo Header */}
                <div className="relative h-64 w-full overflow-hidden bg-slate-800">
                  <img 
                    src={selectedStory.image} 
                    alt={selectedStory.name}
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

                  <button
                    type="button"
                    onClick={() => setSelectedStory(null)}
                    className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-slate-900/80 text-white hover:bg-red-700 transition-colors flex items-center justify-center border border-slate-700"
                    aria-label="Close modal"
                  >
                    <X size={18} />
                  </button>

                  <div className="absolute bottom-4 left-6 right-6 z-10">
                    <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-amber-400 text-slate-950 mb-2 inline-block shadow-md">
                      PMMY BENEFICIARY STORY
                    </span>
                    <h3 className="text-3xl font-black text-white tracking-tight">
                      {selectedStory.name}
                    </h3>
                    <p className="text-xs font-bold text-amber-300 flex items-center gap-2">
                      <span>{selectedStory.business}</span>
                      <span>•</span>
                      <span>📍 {selectedStory.location}</span>
                    </p>
                  </div>
                </div>

                {/* Modal Content Body */}
                <div className="p-6 md:p-8 space-y-6">
                  
                  {/* Scheme Badge Box */}
                  <div className="flex items-center justify-between p-4 bg-amber-50/70 dark:bg-slate-800/80 rounded-2xl border border-amber-200 dark:border-slate-700">
                    <div>
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider block">AVAILED MUDRA SCHEME</span>
                      <p className="text-sm font-black text-red-800 dark:text-amber-400">
                        {selectedStory.loanCategory}
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-red-800 text-white flex items-center justify-center font-black">
                      <Award size={20} />
                    </div>
                  </div>

                  {/* Quote Banner */}
                  <blockquote className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border-l-4 border-red-800 dark:border-amber-400 italic text-sm font-semibold text-slate-800 dark:text-slate-200 leading-relaxed">
                    {selectedStory.quote}
                  </blockquote>

                  {/* Impact Stats Grid */}
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3 flex items-center gap-1.5">
                      <TrendingUp size={14} className="text-emerald-600 dark:text-emerald-400" />
                      <span>Key Business Transformation & Impact</span>
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {selectedStory.impactStats.map((st, sIdx) => (
                        <div key={sIdx} className="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 text-center">
                          <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 block mb-1">{st.label}</span>
                          <span className="text-xs font-black text-red-800 dark:text-amber-400">{st.val}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Full Story Description */}
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2 flex items-center gap-1.5">
                      <UserCheck size={14} className="text-red-700 dark:text-amber-400" />
                      <span>Inspirational Journey</span>
                    </h4>
                    <p className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
                      {selectedStory.description}
                    </p>
                  </div>

                  {/* Modal Action Buttons */}
                  <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedStory(null)}
                      className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      Close
                    </button>

                    <Link
                      to={`${createPageUrl('EntrepreneurOnboarding')}?scheme=${selectedStory.schemeId}`}
                      onClick={() => setSelectedStory(null)}
                      className="px-6 py-2.5 rounded-xl bg-red-800 hover:bg-red-900 text-white font-extrabold text-xs shadow-lg transition-all flex items-center gap-2"
                    >
                      <span>Apply for Similar MUDRA Loan</span>
                      <ArrowRight size={16} />
                    </Link>
                  </div>

                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </main>

      <Footer />
      <ChatBot />
    </div>
  );
}
