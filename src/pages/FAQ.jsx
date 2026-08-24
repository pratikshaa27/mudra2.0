import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search, Phone, Sparkles } from 'lucide-react';
import Header from '../components/home/Header';
import Footer from '../components/home/Footer';
import ChatBot from '../components/ChatBot';

const faqCategories = [
  {
    id: 'profile',
    title: 'MUDRA Profile & Governance',
    faqs: [
      { q: '1. What is MUDRA?', a: 'Micro Units Development & Refinance Agency Ltd. (MUDRA) is a financial institution set up by the Government of India for the development and refinancing of micro-enterprises. It provides funding to non-corporate small business sectors through banks, NBFCs, and MFIs.' },
      { q: '2. Why has MUDRA been set up?', a: 'It was created to address the financial inclusion and funding needs of micro-units and small businesses, enabling them to access institutional credit easily without collateral constraints.' },
      { q: '3. What are the roles and responsibilities of MUDRA?', a: 'MUDRA acts as a refinancing agency, formulates policy guidelines, registers MFIs, monitors performance, and provides credit guarantee cover for micro-unit lending.' },
      { q: '4. Who will monitor the implementation of PMMY?', a: 'The State Level Bankers\' Committee (SLBC) at the state level, District Consultative Committees (DCC) at the district level, and the Department of Financial Services (DFS), Government of India, along with MUDRA.' },
      { q: '5. Kindly provide a brief profile of MUDRA.', a: 'MUDRA is a wholly owned subsidiary of SIDBI established in 2015 to refinance and support micro-enterprise lending across India.' },
      { q: '6. Is PMMY applicable to all banks all over India?', a: 'Yes, PMMY is implemented through all Public Sector Banks, Private Sector Banks, Regional Rural Banks, Cooperative Banks, NBFCs, and MFIs across India.' },
      { q: '7. Is PMMY operational nationwide including all bank branches?', a: 'PMMY is operational nationwide across all commercial bank branches (including SBI, Bank of Baroda, PNB, etc.) and regional centers.' }
    ]
  },
  {
    id: 'products',
    title: 'Products & Schemes',
    faqs: [
      { q: '8. What are the offerings and products of MUDRA under PMMY?', a: 'MUDRA offers refinance support to Last Mile Financiers through main loan products under Pradhan Mantri Mudra Yojana: Shishu (up to ₹50,000), Kishore (₹50,000 to ₹5 Lakh), Tarun (₹5 Lakh to ₹10 Lakh), and Tarun Plus (₹10 Lakh to ₹20 Lakh).' },
      { q: '9. What is the scope of PMMY and agencies providing loans?', a: 'PMMY provides loans up to ₹20 lakh categorized as Shishu, Kishore, Tarun, and Tarun Plus. Agencies providing loans include Public/Private Banks, RRBs, Small Finance Banks, NBFCs, and MFIs.' },
      { q: '10. Is there any capital subsidy under PMMY?', a: 'There is no direct capital subsidy built into PMMY loans unless linked with specific government subsidy schemes (such as PMEGP).' },
      { q: '11. Can you provide information on the MUDRA Card?', a: 'The MUDRA Card is a RuPay debit card issued against the working capital limit provided to borrowers, allowing multiple cash withdrawals and shop purchases to minimize interest burden.' },
      { q: '12. What is the turnaround time for processing Shishu loan proposals?', a: 'The processing time for Shishu loans (up to ₹50,000) is designed to be minimal, typically handled within 7 to 14 days of complete application submission.' }
    ]
  },
  {
    id: 'borrowers',
    title: 'Target Borrowers & Eligibility',
    faqs: [
      { q: '13. Who are the target clients and eligible borrowers of MUDRA?', a: 'Non-corporate small business segment (NCSBS) individuals, proprietary concerns, partnership firms, small manufacturing units, service sector units, shopkeepers, fruit/vegetable vendors, and artisans.' },
      { q: '14. Are Regional Rural Banks (RRBs) eligible for assistance from MUDRA?', a: 'Yes, Regional Rural Banks are eligible to receive refinance assistance from MUDRA for lending to micro-enterprises.' },
      { q: '15. I graduated recently and want to start my own business. Can MUDRA help me?', a: 'Yes, fresh graduates planning to set up micro-enterprises can apply for loans under the Shishu or Kishore category through eligible banks/institutions.' },
      { q: '16. What is the eligibility of persons for availing MUDRA loans?', a: 'Any Indian citizen who has a valid business plan for a non-farm income-generating activity, has no prior default history with any financial institution, and meets the lender\'s credit requirements.' },
      { q: '17. Are handicapped persons / persons with disabilities eligible for PMMY loans?', a: 'Yes, persons with disabilities are fully eligible to apply for MUDRA loans for income-generating micro-business activities.' },
      { q: '18. Who are the eligible legal entities under PMMY?', a: 'Individuals, Proprietary Concerns, Partnership Firms, Private Limited Companies, Cooperatives, and groups involved in non-farm business activities.' },
      { q: '19. Does having an existing savings bank account help in getting a MUDRA loan?', a: 'Yes, having an active savings bank account helps establish a banking relationship and KYC verification for availing a MUDRA loan from that branch.' }
    ]
  },
  {
    id: 'activities',
    title: 'Eligible Business Activities',
    faqs: [
      { q: '20. I have a small business dealing in paper goods. Can MUDRA help me?', a: 'Yes, non-farm income-generating activities, including paper goods trading and manufacturing, are covered under PMMY through member lending institutions.' },
      { q: '21. I have a diploma in food processing technology and want to start a unit. What guidance is available?', a: 'You can approach any commercial bank, RRB, or MFI with a detailed project report and business plan for setting up a food processing unit under PMMY.' },
      { q: '22. I am an artisan specializing in Jari work. Can MUDRA help me start independent work?', a: 'Yes, artisans doing traditional work like Jari work are eligible for financial assistance under PMMY for establishing independent operations.' },
      { q: '23. Can I get a MUDRA loan for opening an ice cream parlour on a franchisee model?', a: 'Yes, setting up service or retail businesses, including franchisee ice cream parlours, qualifies for MUDRA loans.' },
      { q: '24. I want to expand my pottery business. What help can I get from MUDRA?', a: 'You can obtain expansion capital under the Kishore or Tarun categories from nearby scheduled commercial banks or MFIs.' },
      { q: '25. Are carpentry and RO water plant installation eligible for MUDRA loans?', a: 'Yes, both are eligible service/manufacturing activities. Minimum loan amount depends on requirement (under Shishu), and maximum limit is up to ₹10–20 lakh.' },
      { q: '26. Would people of the Kumhar community benefit from PMMY for potter work?', a: 'Yes, artisans and traditional craftsmen including potters (Kumhar community) are eligible for funding under PMMY.' },
      { q: '27. Are MUDRA loans available for purchase of commercial vehicles (CNG tempo/taxi)?', a: 'Yes, transport vehicle purchases for commercial use (like CNG tempos, auto-rickshaws, taxis, e-rickshaws, and goods carriers) are eligible activities under PMMY.' },
      { q: '28. Is Khadi activity eligible under PMMY loans?', a: 'Yes, micro-activities related to Khadi manufacturing, handloom, and textile products are eligible under PMMY loans.' }
    ]
  },
  {
    id: 'collateral',
    title: 'Security, Collateral & Guarantees',
    faqs: [
      { q: '29. Is there any scheme providing loans without collateral/guarantee nationwide?', a: 'Yes, PMMY offers collateral-free loans across India, backed by the Credit Guarantee Fund for Micro Units (CGFMU).' },
      { q: '30. Can you elaborate on the security to be deposited for MUDRA loans?', a: 'No collateral security or third-party guarantee is required for loans sanctioned under PMMY up to ₹10 Lakh (and up to ₹20 Lakh under Tarun Plus), as they are covered under credit guarantee funds.' },
      { q: '31. Is life insurance a mandatory requirement for MUDRA scheme?', a: 'Life insurance is not a mandatory requirement for obtaining a MUDRA loan, though borrowers may opt for insurance independently.' },
      { q: '32. Where should a complaint be made if a bank demands security or collateral for PMMY loans?', a: 'As per RBI guidelines, banks cannot demand collateral for MUDRA loans. If demanded, complaints should be registered with the Bank Nodal Officer, Banking Ombudsman, SLBC Coordinator, or DFS via CPGRAMS.' }
    ]
  },
  {
    id: 'terms',
    title: 'Interest Rates & Loan Terms',
    faqs: [
      { q: '33. What is the rate of interest charged by MUDRA to financial intermediaries?', a: 'MUDRA provides refinance at reasonable interest rates to financial intermediaries. Banks charge end-borrowers reasonable interest based on RBI Repo/MCLR guidelines and risk assessments.' },
      { q: '34. What are the repayment terms and moratorium allowed for MUDRA loans?', a: 'Repayment tenure ranges between 3 to 7 years depending on the cash flow of the business, with moratorium periods allowed where applicable.' },
      { q: '35. What is the rate of interest charged by banks on MUDRA loans?', a: 'Interest rates depend on RBI guidelines and are charged on a cost-plus basis by the respective lending institution based on risk assessment.' },
      { q: '36. Is it required to submit Income Tax Returns (ITR) for 2 years for ₹10 Lakh loans?', a: 'For larger loan amounts under Tarun (up to ₹10 lakh) and Tarun Plus, lenders generally request financial statements and Income Tax Returns for the last 1-2 years to evaluate repayment capacity.' }
    ]
  },
  {
    id: 'process',
    title: 'Application Process & Grievances',
    faqs: [
      { q: '37. What documents are required to be submitted for availing loans under MUDRA?', a: 'Standard documents include identity proof, address proof, passport photos, proof of business ownership/registration (Udyam), project proposal/cost estimates, and bank statements.' },
      { q: '38. What is the grievance mechanism available if a bank does not sanction the loan?', a: 'Complaints can be escalated to the Higher Bank Management/Nodal Officer, District Collector, SLBC Coordinator, or submitted online on the JanSamarth/Udyamimitra portal or CPGRAMS portal.' },
      { q: '39. Is there any standard application format to avail MUDRA loans?', a: 'Yes, standard 1-page application forms exist for Shishu loans, and a common standard application form is used for Kishore and Tarun loans.' },
      { q: '40. Is obtaining a PAN Card mandatory to avail PMMY loans?', a: 'PAN Card is desirable, but standard KYC documents like Aadhaar, Voter ID, or Passport can be accepted if PAN is unavailable for smaller loans.' },
      { q: '41. If lending institutions do not give PMMY loans, what can I do to get it?', a: 'You can apply online via the JanSamarth or Udyamimitra portal, approach other participating banks/NBFCs/MFIs in your region, or raise a complaint with the higher authorities/SLBC nodal officer.' }
    ]
  }
];

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const filteredCategories = faqCategories.map(cat => ({
    ...cat,
    faqs: cat.faqs.filter(faq => 
      faq.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
      faq.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(cat => activeCategory === 'all' || cat.id === activeCategory);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#021731] text-slate-900 dark:text-slate-100 transition-colors duration-300 flex flex-col justify-between relative overflow-hidden">

      {/* Global heritage backdrop: a faint watermark, not a competing photo —
          kept subtle so every section reads as a clean, high-contrast surface
          like the reference institutional sites (SIDBI/CGTMSE/NCGTC). */}
      <div
        className="pointer-events-none fixed inset-0 z-0 bg-cover bg-center opacity-[0.05] dark:opacity-[0.04]"
        style={{ backgroundImage: `url('/photo/tajmahal.png')` }}
        aria-hidden="true"
      />

      <Header />

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
            animate={{ scale: [1, 1.2, 1], opacity: [0.12, 0.22, 0.12], x: [0, 20, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-white/20 blur-3xl"
          />
          <motion.div
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.12, 0.2, 0.12], x: [0, -20, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-white/10 blur-3xl"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <motion.span whileHover={{ scale: 1.05 }} className="inline-flex items-center gap-1.5 bg-[#f97316] text-white px-3 py-1 rounded-full text-[10px] font-black tracking-wider uppercase mb-2 shadow-sm">
              <Sparkles size={12} className="text-white animate-pulse" />
              <span>KNOWLEDGE BASE & SUPPORT</span>
            </motion.span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight mb-2 [text-shadow:0_4px_18px_rgba(2,23,49,0.55)]">
              Frequently Asked <span className="bg-gradient-to-r from-amber-200 via-amber-300 to-amber-400 bg-clip-text text-transparent">Questions</span>
            </h1>
            <p className="text-blue-50 max-w-3xl mx-auto text-sm sm:text-base font-semibold leading-snug mb-6 [text-shadow:0_2px_10px_rgba(2,23,49,0.5)]">
              Clear answers regarding PMMY loan categories, zero-collateral guidelines, online application portals, and interest rate structures.
            </p>

            {/* Search Box */}
            <div className="relative max-w-xl mx-auto pb-6">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search questions (e.g. collateral, Shishu, documents, JanSamarth)..."
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white dark:bg-slate-900 border-2 border-white/40 dark:border-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm font-semibold shadow-lg focus:border-blue-700 dark:focus:border-blue-400 outline-none transition-all"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            </div>
          </motion.div>
        </div>

        {/* Dramatic filled S-curve — same treatment as the Home hero video's
            bottom border: the fill masks the banner's straight edge with an
            actual curved boundary into the page background, traced with the
            light-blue → accent → navy gradient line. */}
        <div className="pointer-events-none absolute inset-x-0 bottom-[-1px] z-10" aria-hidden="true">
          <svg viewBox="0 0 1440 140" preserveAspectRatio="none" className="block h-14 w-full sm:h-24">
            <defs>
              <linearGradient id="faqHeroCurveBorder" x1="0" y1="0" x2="1" y2="0">
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
              stroke="url(#faqHeroCurveBorder)"
              strokeWidth="7"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      {/* Ambient Animated Background Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.25, 1],
            x: [0, 30, 0],
            opacity: [0.15, 0.25, 0.15]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-amber-400/20 dark:bg-amber-500/10 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -30, 0],
            opacity: [0.15, 0.25, 0.15]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute -bottom-20 -right-20 w-[28rem] h-[28rem] rounded-full bg-red-600/15 dark:bg-red-600/10 blur-3xl"
        />
      </div>

      <main className="flex-1 max-w-7xl mx-auto px-4 py-12 w-full relative z-10">

        {/* Category Pills with Smooth Animated Active Pill */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
          <button
            type="button"
            onClick={() => setActiveCategory('all')}
            className={`relative px-4 py-2 rounded-xl text-xs font-black transition-colors z-10 ${
              activeCategory === 'all' 
                ? 'text-white dark:text-slate-950 font-black' 
                : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
            }`}
          >
            {activeCategory === 'all' && (
              <motion.div
                layoutId="activeFaqCategory"
                transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                className="absolute inset-0 bg-blue-800 dark:bg-blue-400 rounded-xl shadow-md z-[-1]"
              />
            )}
            All Questions
          </button>
          {faqCategories.map(cat => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`relative px-4 py-2 rounded-xl text-xs font-black transition-colors z-10 ${
                  isSelected 
                    ? 'text-white dark:text-slate-950 font-black' 
                    : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="activeFaqCategory"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                    className="absolute inset-0 bg-blue-800 dark:bg-blue-400 rounded-xl shadow-md z-[-1]"
                  />
                )}
                {cat.title}
              </button>
            );
          })}
        </div>

        {/* Accordion List with Staggered Entrance */}
        <div className="max-w-4xl mx-auto space-y-8">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeCategory + searchQuery}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-8"
            >
              {filteredCategories.map((category, catIdx) => (
                category.faqs.length > 0 && (
                  <div key={catIdx} className="space-y-4">
                    <h3 className="text-xl font-black text-[#011a39] dark:text-amber-400 border-b border-slate-200 dark:border-slate-800 pb-2">
                      {category.title}
                    </h3>

                    <div className="space-y-3">
                      {category.faqs.map((faq, faqIdx) => {
                        const globalIdx = `${catIdx}-${faqIdx}`;
                        const isOpen = openFaq === globalIdx;

                        return (
                          <motion.div 
                            key={faqIdx}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: faqIdx * 0.04 }}
                            whileHover={{ y: -2, scale: 1.005 }}
                            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-all"
                          >
                            <button
                              type="button"
                              onClick={() => toggleFaq(globalIdx)}
                              className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-slate-900 dark:text-white text-xs sm:text-sm hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
                            >
                              <span className="flex items-center gap-2">
                                {faq.q}
                              </span>
                              <ChevronDown 
                                size={18} 
                                className={`shrink-0 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-blue-700 dark:text-blue-400' : ''}`}
                              />
                            </button>

                            <AnimatePresence>
                              {isOpen && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.25, ease: [0.04, 0.62, 0.23, 0.98] }}
                                  className="px-5 pb-5 pt-1 text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-semibold border-t border-slate-100 dark:border-slate-800 bg-amber-50/50 dark:bg-slate-800/50"
                                >
                                  <p className="whitespace-pre-line">{faq.a}</p>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                )
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Statutory Helpline Callout */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mt-14 bg-amber-500/10 dark:bg-slate-900 p-6 rounded-3xl border-2 border-amber-300 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg"
        >
          <div className="flex items-center gap-3 text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
            <Phone className="text-blue-700 dark:text-blue-400 shrink-0 animate-pulse" size={24} />
            <div>
              <p className="text-base font-black">Still have queries?</p>
              <p className="text-slate-600 dark:text-slate-400">Call our official National Toll-Free Helpline: <strong className="text-blue-800 dark:text-blue-400 font-black">1800-180-1111</strong></p>
            </div>
          </div>
          <motion.a
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            href="https://www.jansamarth.in/login"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-blue-800 hover:bg-blue-900 text-white text-xs font-black rounded-xl shadow-md transition-all shrink-0"
          >
            Apply Online via JanSamarth
          </motion.a>
        </motion.div>

      </main>

      <Footer />
      <ChatBot />
    </div>
  );
}
