import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, Search, Phone, Sparkles } from 'lucide-react';
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
    <div className="min-h-screen bg-slate-50 dark:bg-[#070b14] text-slate-900 dark:text-slate-100 transition-colors duration-300 flex flex-col justify-between relative overflow-hidden">
      
      {/* Taj Mahal Fixed Background Image Effect */}
      <div 
        className="absolute inset-0 pointer-events-none bg-cover bg-center bg-fixed filter brightness-105 contrast-110 opacity-75 dark:opacity-55"
        style={{ backgroundImage: `url('/photo/tajmahal.png')` }}
      />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#fffbeb]/75 via-white/55 to-[#fffbeb]/85 dark:from-[#070b14]/85 dark:via-[#070b14]/75 dark:to-[#070b14]/90" />

      <Header />

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
        
        {/* Hero Page Header */}
        <motion.div 
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <motion.span 
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-1.5 bg-[#f97316] text-white px-4 py-1 rounded-full text-xs font-black tracking-wider uppercase mb-3 shadow-sm"
          >
            <Sparkles size={14} className="text-white animate-pulse" />
            <span>KNOWLEDGE BASE & SUPPORT</span>
          </motion.span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0f2942] dark:text-white tracking-tight mb-3">
            Frequently Asked <span className="bg-gradient-to-r from-red-700 via-amber-600 to-amber-500 bg-clip-text text-transparent">Questions</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base font-semibold">
            Clear answers regarding PMMY loan categories, zero-collateral guidelines, online application portals, and interest rate structures.
          </p>

          {/* Search Box */}
          <div className="mt-8 relative max-w-xl mx-auto">
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions (e.g. collateral, Shishu, documents, JanSamarth)..."
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm font-semibold shadow-lg focus:border-red-700 dark:focus:border-amber-400 outline-none transition-all"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          </div>
        </motion.div>

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
                className="absolute inset-0 bg-red-800 dark:bg-amber-400 rounded-xl shadow-md z-[-1]"
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
                    className="absolute inset-0 bg-red-800 dark:bg-amber-400 rounded-xl shadow-md z-[-1]"
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
                    <h3 className="text-xl font-black text-[#0f2942] dark:text-amber-400 border-b border-slate-200 dark:border-slate-800 pb-2">
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
                              className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-slate-900 dark:text-white text-xs sm:text-sm hover:text-red-700 dark:hover:text-amber-400 transition-colors"
                            >
                              <span className="flex items-center gap-2">
                                {faq.q}
                              </span>
                              <ChevronDown 
                                size={18} 
                                className={`shrink-0 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-red-700 dark:text-amber-400' : ''}`}
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
            <Phone className="text-red-700 dark:text-amber-400 shrink-0 animate-pulse" size={24} />
            <div>
              <p className="text-base font-black">Still have queries?</p>
              <p className="text-slate-600 dark:text-slate-400">Call our official National Toll-Free Helpline: <strong className="text-red-800 dark:text-amber-400 font-black">1800-180-1111</strong></p>
            </div>
          </div>
          <motion.a 
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            href="https://www.jansamarth.in/login"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-red-800 hover:bg-red-900 text-white text-xs font-black rounded-xl shadow-md transition-all shrink-0"
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
