import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Award,
  MapPin,
  UserCheck,
  Search,
  Heart,
  X,
  ArrowRight,
  TrendingUp,
  Sparkles
} from 'lucide-react';
import Header from '../components/home/Header';
import Footer from '../components/home/Footer';
import ChatBot from '../components/ChatBot';
import { Reveal, RevealGroup } from '@/components/ui/reveal';

const categories = [
  { id: 'all', label: 'All Stories' },
  { id: 'women', label: 'Women Entrepreneurs' },
  { id: 'youth', label: 'Youth MSME Achievers' },
  { id: 'rural', label: 'Rural Enterprise Success' }
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
    image: 'https://images.unsplash.com/photo-1759738101532-0c2726bf68af?auto=format&fit=crop&w=800&q=80',
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
    image: 'https://images.unsplash.com/photo-1628477116196-48afe0d209e0?auto=format&fit=crop&w=800&q=80',
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
    image: 'https://images.unsplash.com/photo-1649433658557-54cf58577c68?auto=format&fit=crop&w=800&q=80',
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
    image: 'https://images.unsplash.com/photo-1705579603225-98952a9b5f8f?auto=format&fit=crop&w=800&q=80',
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
    image: 'https://images.unsplash.com/photo-1696371268939-5c5710319bde?auto=format&fit=crop&w=800&q=80',
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
    image: 'https://images.unsplash.com/photo-1613833684971-9411a2b00970?auto=format&fit=crop&w=800&q=80',
    description: 'Upgraded traditional manual pottery wheel to an electric pug mill and kiln. Reduced manufacturing cycle time by 60% and expanded to online handicraft platforms.',
    impactStats: [
      { label: 'Production Cycle', val: '60% Faster' },
      { label: 'Artisan Income', val: '3x Monthly' },
      { label: 'E-Commerce Reach', val: 'Pan-India' }
    ],
    quote: '"Shishu funding helped me switch to electric pottery wheels, turning traditional craft into a sustainable business."'
  }
];

const SCHEME_LABELS = { shishu: 'Shishu', kishore: 'Kishore', tarun: 'Tarun', tarunplus: 'TarunPlus' };

// Derived from each story's existing `location` / `schemeId` fields — no new taxonomy invented.
const states = [...new Set(stories.map((s) => s.location.split(',').pop().trim()))].sort();
const schemeOptions = [...new Set(stories.map((s) => s.schemeId))];

// Asymmetric column-span / aspect-ratio rhythm for the editorial grid below the
// featured story — cycled by position so the layout never settles into a
// uniform row of equal boxes, whatever the current filter returns.
const GRID_PATTERN = [
  { span: 'md:col-span-4', aspect: 'aspect-[16/10]' },
  { span: 'md:col-span-2', aspect: 'aspect-[3/4]' },
  { span: 'md:col-span-3', aspect: 'aspect-[4/3]' },
  { span: 'md:col-span-3', aspect: 'aspect-[4/3]' },
  { span: 'md:col-span-2', aspect: 'aspect-[3/4]' },
  { span: 'md:col-span-4', aspect: 'aspect-[16/10]' },
];

function FeaturedStory({ story, totalLikes, onOpen, onLike }) {
  return (
    <Reveal>
      <span className="block text-[11px] font-black uppercase tracking-[0.2em] text-blue-700 dark:text-blue-400 mb-4">
        Featured Impact Story
      </span>

      <div className="relative w-full aspect-[16/10] sm:aspect-[21/9] overflow-hidden bg-slate-200 dark:bg-slate-800 group">
        <img
          src={story.image}
          alt={story.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
        />
        <span className="absolute top-4 left-4 sm:top-5 sm:left-5 text-[11px] font-black uppercase tracking-wider px-3 py-1.5 bg-[#011a39]/90 text-amber-300 backdrop-blur-sm">
          {story.loanCategory}
        </span>
        <button
          type="button"
          onClick={onLike}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 text-white bg-black/40 backdrop-blur-sm hover:bg-black/60 transition-colors"
        >
          <Heart size={13} className="fill-current" />
          <span>{totalLikes}</span>
        </button>
      </div>

      <div className="pt-7 sm:pt-9 max-w-3xl">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#011a39] dark:text-white tracking-tight leading-tight mb-2">
          {story.name}
        </h2>
        <p className="text-sm sm:text-base font-bold text-blue-800 dark:text-blue-400 mb-1">{story.business}</p>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-semibold flex items-center gap-1.5 mb-5">
          <MapPin size={13} className="text-blue-500 shrink-0" />
          <span>{story.location}</span>
        </p>
        <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
          {story.description}
        </p>

        {/* Impact figures — large typography, thin dividers, no cards */}
        <div className="flex flex-wrap divide-x divide-slate-200 dark:divide-slate-800 border-y border-slate-200 dark:border-slate-800 my-8 py-7">
          {story.impactStats.map((st) => (
            <div key={st.label} className="px-6 sm:px-8 first:pl-0 first:sm:pl-0">
              <span className="block text-2xl sm:text-3xl md:text-4xl font-black text-[#011a39] dark:text-white tracking-tight leading-none">
                {st.val}
              </span>
              <span className="block mt-2 text-[10px] sm:text-[11px] font-black uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                {st.label}
              </span>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <motion.button
            whileHover={{ scale: 1.03, boxShadow: '0 10px 30px -8px rgba(7,89,133,0.5)' }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={onOpen}
            className="px-7 py-3.5 bg-gradient-to-r from-blue-800 to-[#011a39] hover:from-blue-700 hover:to-blue-950 text-white font-black text-sm tracking-wide flex items-center gap-2.5 transition-colors"
          >
            <span>Read Full Story</span>
            <ArrowRight size={16} />
          </motion.button>

          <blockquote className="hidden sm:block flex-1 min-w-0 text-xs italic font-semibold text-slate-500 dark:text-slate-400 border-l-2 border-amber-400 pl-4 leading-relaxed">
            {story.quote}
          </blockquote>
        </div>
      </div>
    </Reveal>
  );
}

function StoryTile({ story, pattern, totalLikes, onOpen, onLike }) {
  return (
    <Reveal className={`${pattern.span} group cursor-pointer`}>
      <div onClick={onOpen} className={`relative ${pattern.aspect} overflow-hidden bg-slate-200 dark:bg-slate-800`}>
        <img
          src={story.image}
          alt={story.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <span className="absolute top-3 left-3 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 bg-[#011a39]/90 text-amber-300 backdrop-blur-sm">
          {story.loanCategory}
        </span>
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onLike(e); }}
          className="absolute top-3 right-3 flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 text-white bg-black/40 backdrop-blur-sm hover:bg-black/60 transition-colors"
        >
          <Heart size={11} className="fill-current" />
          <span>{totalLikes}</span>
        </button>
      </div>

      <div className="pt-4" onClick={onOpen}>
        <h3 className="font-black text-lg text-[#011a39] dark:text-white tracking-tight leading-snug transition-transform duration-200 group-hover:translate-x-1">
          {story.name}
        </h3>
        <p className="text-xs font-bold text-blue-800 dark:text-blue-400 mt-0.5">{story.business}</p>
        <p className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold flex items-center gap-1 mt-1">
          <MapPin size={11} className="text-blue-500 shrink-0" />
          <span>{story.location}</span>
        </p>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed mt-2 line-clamp-2">
          {story.description}
        </p>
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onOpen(); }}
          className="mt-3 inline-flex items-center gap-1.5 text-xs font-black text-blue-800 dark:text-blue-400 group-hover:gap-2.5 transition-all"
        >
          <span>Read Full Story</span>
          <ArrowRight size={13} />
        </button>
      </div>
    </Reveal>
  );
}

export default function SuccessStories() {
  const [searchParams] = useSearchParams();
  const catParam = searchParams.get('cat');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeState, setActiveState] = useState('all');
  const [activeScheme, setActiveScheme] = useState('all');
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
    const matchesState = activeState === 'all' || story.location.endsWith(activeState);
    const matchesScheme = activeScheme === 'all' || story.schemeId === activeScheme;
    const matchesSearch = !searchQuery ||
      story.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.business.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.loanCategory.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesState && matchesScheme && matchesSearch;
  });

  const hasActiveFilters = activeCategory !== 'all' || activeState !== 'all' || activeScheme !== 'all' || searchQuery;

  const getTotalLikes = (story) => (likesMap[story.id] || 0) + 42 + story.id * 7;

  const [featuredStory, ...remainingStories] = filteredStories;

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-slate-50 dark:bg-[#021731] text-slate-900 dark:text-slate-100 transition-colors duration-300 flex flex-col">
      <div
        className="pointer-events-none fixed inset-0 z-0 bg-cover bg-center opacity-[0.05] dark:opacity-[0.04]"
        style={{ backgroundImage: `url('/photo/tajmahal.png')` }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col justify-between flex-1 w-full">
        <Header />

      <main className="flex-1 w-full">

        {/* Hero Page Header with Ambient Animations — filled with the same
            light-blue → accent → navy ramp traced by the S-curve below, so the
            band and its border read as one continuous piece. Text switches to
            white/gold here since it now sits on a saturated blue, not a pale
            tint. */}
        <div className="py-14 relative overflow-hidden bg-gradient-to-br from-[#075985] via-[#075985] to-[#021731]">

          {/* Animated Background Blobs — white-toned so they read as a soft
              highlight against the blue fill instead of blending into it. */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.12, 0.22, 0.12],
                x: [0, 20, 0]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-white/20 blur-3xl"
            />
            <motion.div
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.12, 0.2, 0.12],
                x: [0, -20, 0]
              }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-white/10 blur-3xl"
            />
          </div>

          <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >

<motion.span               whileHover={{ scale: 1.05 }}               className="inline-flex items-center gap-1.5 bg-[#f97316] text-white px-3 py-1 rounded-full text-[10px] font-black tracking-wider uppercase mb-2 shadow-sm"             >               <Sparkles size={12} className="text-white animate-pulse" />               <span> Transforming Lives Across India</span>             </motion.span>
              
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight mb-2 [text-shadow:0_4px_18px_rgba(2,23,49,0.55)]">
                PMMY Success Stories
              </h1>
              <p className="pb-5 text-blue-50 max-w-3xl mx-auto text-sm sm:text-base font-semibold leading-snug [text-shadow:0_2px_10px_rgba(2,23,49,0.5)]">
                Real inspirational journeys of grassroots entrepreneurs, women leaders, and rural innovators empowered by collateral-free MUDRA loans.
              </p>
            </motion.div>
          </div>

          {/* Dramatic filled S-curve — same treatment as the Home hero video's
              bottom border: the fill masks the banner's straight edge with an
              actual curved boundary into the page background, traced with the
              light-blue → accent → navy gradient line. */}
          <div className="pointer-events-none absolute inset-x-0 bottom-[-1px] z-10" aria-hidden="true">
            <svg viewBox="0 0 1440 140" preserveAspectRatio="none" className="block h-14 w-full sm:h-24">
              <defs>
                <linearGradient id="successStoriesHeroCurveBorder" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#7dd3fc" />
                  <stop offset="55%" stopColor="#00b6f0" />
                  <stop offset="100%" stopColor="#021731" />
                </linearGradient>
              </defs>
              <path
                d="M0,70 C360,0 720,140 1080,70 C1260,35 1350,20 1440,45 L1440,140 L0,140 Z"
                className="fill-slate-50 dark:fill-[#021731]"
              />
              <path
                d="M0,70 C360,0 720,140 1080,70 C1260,35 1350,20 1440,45"
                fill="none"
                stroke="url(#successStoriesHeroCurveBorder)"
                strokeWidth="7"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-16 w-full">

         {/* Search + Filters + Category nav — one powder-blue panel, sized up
             for prominence at the top of the page. */}
         <div 
         
        //  className="mb-16 sm:mb-20 w-full bg-[#E7F4FA] dark:bg-[#0d2c4a]/70 rounded-3xl px-6 sm:px-10 py-10 sm:py-12"
className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md text-center mb-10">
         {/* Search + Filters row */}
         <div className="mb-10 w-full">
           <div className="max-w-2xl mx-auto relative mb-6">
             <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
             <input
               type="text"
               placeholder="Search founder name, business, location, or scheme..."
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="w-full pl-12 pr-4 py-4 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm font-bold shadow-sm focus:outline-none focus:border-blue-800 dark:focus:border-blue-400 transition-colors"
             />
             {searchQuery && (
               <button
                 type="button"
                 onClick={() => setSearchQuery('')}
                 className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline"
               >
                 Clear
               </button>
             )}
           </div>

           <div className="flex flex-wrap items-center justify-center gap-4">
             <label className="flex items-center gap-2 text-sm font-bold text-slate-600 dark:text-slate-300">
               <span className="sr-only">Filter by State</span>
               <select
                 value={activeState}
                 onChange={(e) => setActiveState(e.target.value)}
                 aria-label="Filter by State"
                 className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 shadow-sm focus:border-blue-800 focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:focus:border-blue-400"
               >
                 <option value="all">All States</option>
                 {states.map((state) => (
                   <option key={state} value={state}>{state}</option>
                 ))}
               </select>
             </label>

             <label className="flex items-center gap-2 text-sm font-bold text-slate-600 dark:text-slate-300">
               <span className="sr-only">Filter by Loan Scheme</span>
               <select
                 value={activeScheme}
                 onChange={(e) => setActiveScheme(e.target.value)}
                 aria-label="Filter by Loan Scheme"
                 className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 shadow-sm focus:border-blue-800 focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:focus:border-blue-400"
               >
                 <option value="all">All Loan Schemes</option>
                 {schemeOptions.map((id) => (
                   <option key={id} value={id}>{SCHEME_LABELS[id] || id}</option>
                 ))}
               </select>
             </label>

             {hasActiveFilters && (
               <button
                 type="button"
                 onClick={() => {
                   setActiveCategory('all');
                   setActiveState('all');
                   setActiveScheme('all');
                   setSearchQuery('');
                 }}
                 className="text-sm font-bold text-blue-700 hover:underline dark:text-blue-400"
               >
                 Clear All Filters
               </button>
             )}
           </div>
         </div>

         {/* Category navigation — plain text tabs with a sliding underline,
             matching the rest of the site's editorial pages. */}
         <nav aria-label="Filter stories by category">
           <ul className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 border-b border-blue-200/70 dark:border-blue-900/40">
             {categories.map((cat) => {
               const isSelected = activeCategory === cat.id;
               return (
                 <li key={cat.id} className="relative">
                   <button
                     type="button"
                     onClick={() => setActiveCategory(cat.id)}
                     className={`pb-4 pt-1 text-sm sm:text-base font-black tracking-wide whitespace-nowrap transition-colors ${
                       isSelected
                         ? 'text-blue-800 dark:text-blue-300'
                         : 'text-slate-500 dark:text-slate-400 hover:text-blue-700 dark:hover:text-blue-400'
                     }`}
                   >
                     {cat.label}
                   </button>
                   {isSelected && (
                     <motion.div
                       layoutId="successCatUnderline"
                       transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                       className="absolute left-0 right-0 -bottom-px h-[2px] bg-blue-700 dark:bg-blue-400"
                     />
                   )}
                 </li>
               );
             })}
           </ul>
         </nav>

         </div>

         {/* Stories content */}
         {filteredStories.length === 0 ? (
           <div className="text-center py-20">
             <Search className="w-9 h-9 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
             <p className="text-sm font-bold text-slate-700 dark:text-slate-300">No stories found matching "{searchQuery}"</p>
             <button
               type="button"
               onClick={() => {
                 setSearchQuery('');
                 setActiveCategory('all');
                 setActiveState('all');
                 setActiveScheme('all');
               }}
               className="mt-3 text-xs font-black text-blue-800 dark:text-blue-400 hover:underline"
             >
               Reset Filters
             </button>
           </div>
         ) : (
           <AnimatePresence mode="wait">
             <motion.div
               key={`${activeCategory}-${activeState}-${activeScheme}-${searchQuery}`}
               initial={{ opacity: 0, y: 12 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -12 }}
               transition={{ duration: 0.3, ease: 'easeOut' }}
             >
               <FeaturedStory
                 story={featuredStory}
                 totalLikes={getTotalLikes(featuredStory)}
                 onOpen={() => setSelectedStory(featuredStory)}
                 onLike={(e) => handleLike(featuredStory.id, e)}
               />

               {remainingStories.length > 0 && (
                 <div className="mt-20 sm:mt-24">
                   <h3 className="text-2xl sm:text-3xl font-black text-[#011a39] dark:text-white tracking-tight mb-10">
                     More Impact Stories
                   </h3>
                   <RevealGroup as="div" className="grid grid-cols-1 md:grid-cols-6 gap-x-8 gap-y-14" stagger={70}>
                     {remainingStories.map((story, idx) => (
                       <StoryTile
                         key={story.id}
                         story={story}
                         pattern={GRID_PATTERN[idx % GRID_PATTERN.length]}
                         totalLikes={getTotalLikes(story)}
                         onOpen={() => setSelectedStory(story)}
                         onLike={(e) => handleLike(story.id, e)}
                       />
                     ))}
                   </RevealGroup>
                 </div>
               )}
             </motion.div>
           </AnimatePresence>
         )}

        </div>

        {/* Detailed Story Modal Popup */}
        <AnimatePresence>
          {selectedStory && (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.2 }}
                className="bg-white dark:bg-slate-900 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
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
                    className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-slate-900/80 text-white hover:bg-blue-700 transition-colors flex items-center justify-center border border-slate-700"
                    aria-label="Close modal"
                  >
                    <X size={18} />
                  </button>

                  <div className="absolute bottom-4 left-6 right-6 z-10">
                    <span className="text-[10px] font-black uppercase tracking-wider text-amber-300 mb-2 inline-block">
                      PMMY Beneficiary Story
                    </span>
                    <h3 className="text-3xl font-black text-white tracking-tight">
                      {selectedStory.name}
                    </h3>
                    <p className="text-xs font-bold text-blue-200 flex items-center gap-2">
                      <span>{selectedStory.business}</span>
                      <span>•</span>
                      <span>{selectedStory.location}</span>
                    </p>
                  </div>
                </div>

                {/* Modal Content Body */}
                <div className="p-6 md:p-8 space-y-6">

                  {/* Scheme row */}
                  <div className="flex items-center justify-between pb-5 border-b border-slate-200 dark:border-slate-800">
                    <div>
                      <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-1">Availed MUDRA Scheme</span>
                      <p className="text-lg font-black text-blue-800 dark:text-blue-400">
                        {selectedStory.loanCategory}
                      </p>
                    </div>
                    <Award size={26} className="text-amber-500 dark:text-amber-400 shrink-0" />
                  </div>

                  {/* Quote */}
                  <blockquote className="italic text-sm font-semibold text-slate-700 dark:text-slate-300 leading-relaxed border-l-2 border-amber-400 pl-4">
                    {selectedStory.quote}
                  </blockquote>

                  {/* Impact figures — same thin-divider treatment as the featured section */}
                  <div>
                    <h4 className="text-[11px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4 flex items-center gap-1.5">
                      <TrendingUp size={14} className="text-emerald-600 dark:text-emerald-400" />
                      <span>Key Business Transformation & Impact</span>
                    </h4>
                    <div className="flex flex-wrap divide-x divide-slate-200 dark:divide-slate-800 border-y border-slate-200 dark:border-slate-800 py-5">
                      {selectedStory.impactStats.map((st, sIdx) => (
                        <div key={sIdx} className="px-5 first:pl-0">
                          <span className="block text-lg font-black text-[#011a39] dark:text-white">{st.val}</span>
                          <span className="block mt-1 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">{st.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Full Story Description */}
                  <div>
                    <h4 className="text-[11px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2 flex items-center gap-1.5">
                      <UserCheck size={14} className="text-blue-700 dark:text-blue-400" />
                      <span>Inspirational Journey</span>
                    </h4>
                    <p className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 leading-relaxed">
                      {selectedStory.description}
                    </p>
                  </div>

                  {/* Modal Action Buttons */}
                  <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedStory(null)}
                      className="px-5 py-2.5 rounded-full text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      Close
                    </button>

                    <Link
                      to={`${createPageUrl('EntrepreneurOnboarding')}?scheme=${selectedStory.schemeId}`}
                      onClick={() => setSelectedStory(null)}
                      className="px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-800 to-[#011a39] hover:from-blue-700 hover:to-blue-950 text-white font-extrabold text-xs shadow-lg transition-colors flex items-center gap-2"
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
    </div>
  );
}
