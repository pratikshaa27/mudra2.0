import React, { useState } from 'react';
import { useCMS } from '../components/CMSContext';
import MockupSwitcher from '../components/home/MockupSwitcher';
import VisionMission from '../components/home/VisionMission';
import SocialMediaFeed from '../components/home/SocialMediaFeed';
import ChatBot from '../components/ChatBot';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, ExternalLink, GraduationCap, Brain
} from 'lucide-react';

export default function MUDRA2Home() {
  const { cmsData } = useCMS();
  const theme = cmsData.mockupTheme || 'mockup2';
  const isMockup1 = theme === 'mockup1';

  // Hero carousel state
  const [activeBannerIdx, setActiveBannerIdx] = useState(0);
  const banners = cmsData.banners || [];

  // Auto rotate banners every 6 seconds
  React.useEffect(() => {
    if (!banners.length) return;
    const interval = setInterval(() => {
      setActiveBannerIdx((prev) => (prev + 1) % banners.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [banners.length]);

  // EMI Calculator State
  const [loanAmount, setLoanAmount] = useState(350000); // 3.5 Lakhs
  const [tenureYears, setTenureYears] = useState(4);
  const [interestRate, setInterestRate] = useState(9.5);

  // Success Stories filter
  const [activeStoryIdx, setActiveStoryIdx] = useState(0);
  const stories = cmsData.successStories || [];

  // Calculate EMI
  const calculateEMI = () => {
    const principal = loanAmount;
    const monthlyRate = interestRate / 12 / 100;
    const months = tenureYears * 12;
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    return Math.round(emi);
  };

  // Determine optimal scheme
  const getRecommendedScheme = () => {
    if (loanAmount <= 50000) return cmsData.schemes.find(s => s.id === 'shishu');
    if (loanAmount <= 500000) return cmsData.schemes.find(s => s.id === 'kishore');
    if (loanAmount <= 1000000) return cmsData.schemes.find(s => s.id === 'tarun');
    return cmsData.schemes.find(s => s.id === 'tarunplus');
  };

  const recommendedScheme = getRecommendedScheme();
  const currentBanner = banners[activeBannerIdx] || banners[0];

  return (
    <div className="min-h-screen font-sans bg-slate-50 text-slate-900">
      {/* 1. TOP MOCKUP SWITCHER BAR FOR EVALUATORS */}
      <MockupSwitcher />

      {/* 2. DYNAMIC NEWS TICKER BAR */}
      <div className="bg-amber-500 text-slate-950 py-2 px-4 text-xs font-semibold border-b border-amber-600 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <span className="bg-slate-950 text-amber-400 px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider shrink-0 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span> Important Announcement
          </span>
          <div className="flex-1 overflow-x-auto whitespace-nowrap scrollbar-none flex items-center gap-8 text-xs">
            {(cmsData.announcements || []).map((ann, idx) => (
              <a key={ann.id || idx} href={ann.link || '#'} className="hover:underline flex items-center gap-2">
                <span className="bg-slate-900 text-white px-1.5 py-0.5 rounded text-[9px] font-bold">{ann.category}</span>
                <span>{ann.title}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* 3. HERO BANNER SECTION */}
      <section className="bg-gradient-to-br from-slate-100 via-white to-amber-50 text-slate-900 py-12 px-4 border-b border-slate-200 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          {currentBanner && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <motion.div
                key={currentBanner.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="lg:col-span-7"
              >
                <span className="inline-block px-3 py-1 rounded bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold uppercase tracking-wider mb-4">
                  {currentBanner.badge}
                </span>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0f2942] tracking-tight leading-tight">
                  {currentBanner.title}
                </h1>

                <p className="mt-4 text-sm sm:text-base text-slate-700 leading-relaxed max-w-2xl font-medium">
                  {currentBanner.subtitle}
                </p>

                {/* Statutory Feature Badges */}
                <div className="mt-6 flex flex-wrap gap-2 text-xs">
                  <span className="px-3 py-1.5 rounded bg-white border border-slate-300 text-emerald-800 font-bold shadow-sm flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 100% Collateral-Free Credit
                  </span>
                  <span className="px-3 py-1.5 rounded bg-white border border-slate-300 text-blue-900 font-bold shadow-sm flex items-center gap-1.5">
                    <Brain className="w-4 h-4 text-blue-600" /> AI Credit Assessment
                  </span>
                  <span className="px-3 py-1.5 rounded bg-white border border-slate-300 text-amber-900 font-bold shadow-sm flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4 text-amber-600" /> Skill India Rate Subvention
                  </span>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link
                    to={createPageUrl('EntrepreneurOnboarding')}
                    className="px-6 py-3 rounded-lg font-bold text-xs bg-[#0f2942] hover:bg-[#153a5c] text-white shadow-md transition-all flex items-center gap-2 uppercase tracking-wider"
                  >
                    <span>{currentBanner.ctaText}</span>
                    <ArrowRight className="w-4 h-4 text-amber-400" />
                  </Link>

                  <a
                    href="#calculator"
                    className="px-6 py-3 rounded-lg font-bold text-xs border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 shadow-sm transition-colors"
                  >
                    Calculate Loan EMI & Eligibility
                  </a>
                </div>
              </motion.div>

              {/* Simple Hero Image Frame */}
              <div className="lg:col-span-5 relative">
                <div className="rounded-2xl overflow-hidden border-2 border-slate-300 shadow-xl bg-white">
                  <img
                    src={currentBanner.image}
                    alt={currentBanner.title}
                    className="w-full h-72 sm:h-80 object-cover"
                  />
                  <div className="p-4 bg-slate-50 border-t border-slate-200 text-slate-800 text-xs flex items-center justify-between">
                    <div>
                      <p className="font-bold text-[#0f2942]">Shishu • Kishore • Tarun • TarunPlus</p>
                      <p className="text-[11px] text-slate-600">Sanctioned through Banks, MFIs & NBFCs</p>
                    </div>
                    <span className="px-2.5 py-1 rounded bg-emerald-600 text-white font-bold text-[10px]">
                      0% Processing Fee
                    </span>
                  </div>
                </div>

                {/* Banner controls */}
                <div className="mt-3 flex items-center justify-center gap-2">
                  {banners.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveBannerIdx(idx)}
                      className={`h-2 rounded-full transition-all ${
                        activeBannerIdx === idx ? 'w-6 bg-[#0f2942]' : 'w-2 bg-slate-300'
                      }`}
                    ></button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 6. IMPACT STATISTICS HIGHLIGHTS STRIP */}
      <section id="impact" className="py-10 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <p className="text-2xl sm:text-3xl font-black text-[#0f2942]">
                {cmsData.impactStats?.totalDisbursed || '₹33.5 Lakh Cr'}
              </p>
              <p className="text-xs font-semibold text-slate-600 mt-1">
                {cmsData.impactStats?.disbursedLabel || 'Total Disbursed Since Inception'}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <p className="text-2xl sm:text-3xl font-black text-[#0f2942]">
                {cmsData.impactStats?.totalAccounts || '46.2 Crore+'}
              </p>
              <p className="text-xs font-semibold text-slate-600 mt-1">
                {cmsData.impactStats?.accountsLabel || 'Sanctioned Loan Accounts'}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <p className="text-2xl sm:text-3xl font-black text-amber-700">
                {cmsData.impactStats?.womenBeneficiaries || '71%'}
              </p>
              <p className="text-xs font-semibold text-slate-600 mt-1">
                {cmsData.impactStats?.womenLabel || 'Women Entrepreneurs Benefited'}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <p className="text-2xl sm:text-3xl font-black text-emerald-700">
                {cmsData.impactStats?.newEntrepreneurs || '5.4 Crore+'}
              </p>
              <p className="text-xs font-semibold text-slate-600 mt-1">
                {cmsData.impactStats?.newLabel || 'First-time Business Owners'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. ABOUT MUDRA SECTION (SIDBI / CGTMSE STYLE) */}
      <section id="about" className="py-16 px-4 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <span className="px-3 py-1 rounded text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300">
                Statutory Framework
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f2942] mt-3">
                About MUDRA 2.0 (Pradhan Mantri MUDRA Yojana)
              </h2>
              <p className="text-slate-700 text-sm mt-3 leading-relaxed">
                Micro Units Development & Refinance Agency Ltd. (MUDRA) is an institution set up by Government of India to provide funding to the non-corporate, non-farm sector income generating activities of micro and small enterprises.
              </p>
              <p className="text-slate-700 text-sm mt-3 leading-relaxed">
                Under MUDRA 2.0, non-farm micro-enterprises in manufacturing, trading, services, and agri-allied sectors can access collateral-free credit from ₹50,000 to ₹20 Lakhs across 4 categories (Shishu, Kishore, Tarun, Tarun Plus).
              </p>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
                  <h4 className="font-bold text-[#0f2942] text-sm">🎯 Mission Statement</h4>
                  <p className="text-xs text-slate-600 mt-1">Financial inclusion and economic empowerment of micro-entrepreneurs.</p>
                </div>
                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
                  <h4 className="font-bold text-[#0f2942] text-sm">👁️ Vision 2030</h4>
                  <p className="text-xs text-slate-600 mt-1">Build a robust MSME ecosystem driving GDP growth and job creation.</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm">
                <div className="w-10 h-10 rounded bg-[#0f2942] text-amber-400 flex items-center justify-center font-black text-sm mb-2">
                  0%
                </div>
                <h4 className="font-bold text-slate-900 text-xs">Zero Collateral</h4>
                <p className="text-[11px] text-slate-500 mt-1">Backed by CGTMSE & NCGTC credit guarantee funds.</p>
              </div>

              <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm">
                <div className="w-10 h-10 rounded bg-[#0f2942] text-emerald-400 flex items-center justify-center font-black text-sm mb-2">
                  AI
                </div>
                <h4 className="font-bold text-slate-900 text-xs">AI Credit Scoring</h4>
                <p className="text-[11px] text-slate-500 mt-1">Transparent score evaluation with what-if simulation.</p>
              </div>

              <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm">
                <div className="w-10 h-10 rounded bg-[#0f2942] text-purple-400 flex items-center justify-center font-black text-sm mb-2">
                  🎓
                </div>
                <h4 className="font-bold text-slate-900 text-xs">Skill Subvention</h4>
                <p className="text-[11px] text-slate-500 mt-1">Skill India certified users unlock rate concessions.</p>
              </div>

              <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm">
                <div className="w-10 h-10 rounded bg-[#0f2942] text-cyan-400 flex items-center justify-center font-black text-sm mb-2">
                  ₹20L
                </div>
                <h4 className="font-bold text-slate-900 text-xs">Tarun Plus</h4>
                <p className="text-[11px] text-slate-500 mt-1">Enhanced credit limit for mature MSME units.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7b. VISION & MISSION SECTION */}
      <VisionMission />

      {/* 8. SCHEMES MATRIX (SIMPLE CLEAN CARDS) */}
      <section id="schemes" className="py-16 px-4 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="px-3 py-1 rounded text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-800 border border-slate-300">
              Loan Categories
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f2942] mt-3">
              MUDRA Loan Products Overview
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600">
              Four tailored funding slabs matching micro enterprise maturity from startup seed capital up to ₹20 Lakhs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(cmsData.schemes || []).map((scheme) => (
              <div
                key={scheme.id}
                className={`rounded-xl p-6 border flex flex-col justify-between transition-all bg-white ${
                  scheme.popular
                    ? 'border-amber-500 shadow-lg ring-1 ring-amber-500/30'
                    : 'border-slate-200 shadow-sm hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#0f2942] text-amber-400">
                      {scheme.name}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">{scheme.tenure}</span>
                  </div>

                  <h3 className="text-lg font-bold text-[#0f2942]">
                    {scheme.amount}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    {scheme.tagline}
                  </p>

                  <div className="my-5 p-3 rounded-lg bg-slate-50 border border-slate-200 text-center">
                    <p className="text-xs font-bold text-slate-700">Interest: {scheme.interestRate}</p>
                    <p className="text-[10px] text-emerald-700 font-semibold mt-0.5">Processing Fee: {scheme.processingFee}</p>
                  </div>

                  <ul className="space-y-2 text-xs mb-6 text-slate-700">
                    {scheme.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  to={createPageUrl('EntrepreneurOnboarding')}
                  className={`w-full py-2.5 rounded-lg text-xs font-bold text-center transition-all ${
                    scheme.popular
                      ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-sm'
                      : 'bg-[#0f2942] hover:bg-[#153a5c] text-white'
                  }`}
                >
                  Apply Under {scheme.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. EMI CALCULATOR SECTION (CLEAN STATUTORY STYLE) */}
      <section id="calculator" className="py-16 px-4 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <span className="px-3 py-1 rounded text-xs font-bold uppercase tracking-wider bg-slate-200 text-slate-800">
                Calculator
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f2942] mt-3">
                MUDRA EMI & Eligibility Calculator
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 mb-8">
                Estimate monthly installments and discover the optimal scheme category instantly.
              </p>

              <div className="space-y-6 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <div>
                  <div className="flex items-center justify-between text-xs font-bold mb-2">
                    <span className="text-slate-700">Required Loan Amount:</span>
                    <span className="text-lg font-black text-[#0f2942]">₹{loanAmount.toLocaleString('en-IN')}</span>
                  </div>
                  <input
                    type="range"
                    min="10000"
                    max="2000000"
                    step="10000"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0f2942]"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
                    <span>₹10,000</span>
                    <span>₹5 Lakhs</span>
                    <span>₹10 Lakhs</span>
                    <span>₹20 Lakhs</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs font-bold mb-2">
                    <span className="text-slate-700">Repayment Tenure:</span>
                    <span className="text-base font-bold text-amber-700">{tenureYears} Years</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="7"
                    step="1"
                    value={tenureYears}
                    onChange={(e) => setTenureYears(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="p-7 rounded-2xl bg-white text-slate-900 shadow-md border-2 border-slate-200">
                <div className="text-center">
                  <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">Estimated Monthly EMI</p>
                  <p className="text-4xl font-black text-[#0f2942] my-3">
                    ₹{calculateEMI().toLocaleString('en-IN')}<span className="text-xs text-slate-500 font-normal">/mo</span>
                  </p>
                  <p className="text-[11px] text-slate-600">Indicative rate ~9.5% p.a. • 0% processing fee</p>
                </div>

                {recommendedScheme && (
                  <div className="mt-6 pt-6 border-t border-slate-200 space-y-2.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Recommended Category:</span>
                      <span className="font-bold text-[#0f2942] bg-amber-100 border border-amber-300 px-2.5 py-0.5 rounded">
                        {recommendedScheme.name}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Collateral Requirement:</span>
                      <span className="font-bold text-emerald-700">Nil (CGTMSE Cover)</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Skill Subvention:</span>
                      <span className="font-bold text-blue-700">Eligible</span>
                    </div>
                  </div>
                )}

                <Link
                  to={createPageUrl('EntrepreneurOnboarding')}
                  className="mt-6 w-full py-3 rounded-lg font-bold text-xs text-center bg-[#0f2942] hover:bg-[#153a5c] text-white flex items-center justify-center gap-2 uppercase tracking-wider transition-colors shadow-sm"
                >
                  <span>Apply with Pre-approved Rate</span>
                  <ArrowRight className="w-4 h-4 text-amber-400" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. SUCCESS STORIES SHOWCASE */}
      <section id="stories" className="py-16 px-4 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="px-3 py-1 rounded text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-800 border border-slate-300">
                Beneficiary Impact
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f2942] mt-2">
                MUDRA Entrepreneur Success Stories
              </h2>
            </div>

            <div className="flex items-center gap-2">
              {stories.map((story, idx) => (
                <button
                  key={story.id}
                  onClick={() => setActiveStoryIdx(idx)}
                  className={`px-3 py-1.5 rounded text-xs font-bold transition-all ${
                    activeStoryIdx === idx
                      ? 'bg-[#0f2942] text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {story.name.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {stories[activeStoryIdx] && (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-7 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center shadow-sm">
              <div className="lg:col-span-5 relative">
                <img
                  src={stories[activeStoryIdx].photo}
                  alt={stories[activeStoryIdx].name}
                  className="w-full h-72 object-cover rounded-xl border border-slate-300 shadow-sm"
                />
                <span className="absolute top-3 left-3 px-3 py-1 rounded bg-[#0f2942] text-amber-400 text-xs font-bold">
                  {stories[activeStoryIdx].loanCategory}
                </span>
              </div>

              <div className="lg:col-span-7">
                <h3 className="text-xl font-bold text-[#0f2942]">
                  {stories[activeStoryIdx].name} • {stories[activeStoryIdx].venture}
                </h3>
                <p className="text-xs text-slate-500 mb-3">📍 {stories[activeStoryIdx].location}</p>

                <blockquote className="text-xs sm:text-sm italic leading-relaxed font-serif p-4 rounded-lg bg-white border-l-4 border-amber-500 text-slate-700 mb-4 shadow-sm">
                  "{stories[activeStoryIdx].quote}"
                </blockquote>

                <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs">
                  <p className="font-bold text-emerald-800">Impact Milestone:</p>
                  <p className="mt-0.5 text-slate-700">
                    {stories[activeStoryIdx].impact}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 11. LIVE SOCIAL MEDIA HUB */}
      <section id="social">
        <SocialMediaFeed theme={theme} />
      </section>

      {/* 12. STATUTORY PARTNERS SHOWCASE (SIDBI, CGTMSE, NCGTC) */}
      <section id="statutory" className="py-16 px-4 bg-slate-100 border-t border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Statutory Guarantee Partners</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f2942] mt-1">
              Supported by Official Financial Bodies
            </h2>
            <p className="text-xs text-slate-600 mt-1">Direct reference links to key credit guarantee & refinancing institutions</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a
              href="https://www.sidbi.in/en/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-xl border border-slate-200 bg-white hover:border-[#0f2942] hover:shadow-md transition-all group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded bg-[#0f2942] text-white flex items-center justify-center font-bold text-xs">
                  SIDBI
                </div>
                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-[#0f2942]" />
              </div>
              <h3 className="font-bold text-base text-[#0f2942]">SIDBI Official Portal</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Small Industries Development Bank of India - Principal Financial Institution for promotion & financing of MSMEs.
              </p>
              <span className="inline-block mt-3 text-xs font-bold text-amber-600 group-hover:underline">Visit sidbi.in →</span>
            </a>

            <a
              href="https://www.cgtmse.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-xl border border-slate-200 bg-white hover:border-[#0f2942] hover:shadow-md transition-all group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded bg-[#0f2942] text-amber-400 flex items-center justify-center font-bold text-xs">
                  CGTMSE
                </div>
                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-[#0f2942]" />
              </div>
              <h3 className="font-bold text-base text-[#0f2942]">CGTMSE Coverage</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Credit Guarantee Fund Trust for Micro and Small Enterprises - Providing sovereign credit guarantee cover.
              </p>
              <span className="inline-block mt-3 text-xs font-bold text-amber-600 group-hover:underline">Visit cgtmse.in →</span>
            </a>

            <a
              href="https://www.ncgtc.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-xl border border-slate-200 bg-white hover:border-[#0f2942] hover:shadow-md transition-all group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded bg-[#0f2942] text-cyan-400 flex items-center justify-center font-bold text-xs">
                  NCGTC
                </div>
                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-[#0f2942]" />
              </div>
              <h3 className="font-bold text-base text-[#0f2942]">NCGTC Framework</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                National Credit Guarantee Trustee Company Ltd. - Trustee entity managing credit guarantee funds.
              </p>
              <span className="inline-block mt-3 text-xs font-bold text-amber-600 group-hover:underline">Visit ncgtc.in →</span>
            </a>
          </div>
        </div>
      </section>

      {/* 14. GENAI RAG CHATBOT EMBEDDED */}
      <ChatBot />
    </div>
  );
}