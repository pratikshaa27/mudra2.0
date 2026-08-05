import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, Search, ShieldCheck, CheckCircle2, Phone, Sparkles } from 'lucide-react';
import Header from '../components/home/Header';
import Footer from '../components/home/Footer';
import ChatBot from '../components/ChatBot';

const faqCategories = [
  {
    id: 'general',
    title: 'General Overview',
    faqs: [
      {
        q: 'What is MUDRA and Pradhan Mantri MUDRA Yojana (PMMY)?',
        a: 'MUDRA (Micro Units Development & Refinance Agency Ltd.) is a financial institution set up by the Government of India for development and refinancing of micro enterprises. Pradhan Mantri MUDRA Yojana (PMMY) is a scheme launched on April 8, 2015, to provide collateral-free credit up to ₹20 Lakh to non-corporate, non-farm micro/small enterprises.'
      },
      {
        q: 'Does MUDRA lend directly to individuals?',
        a: 'No. MUDRA is a refinancing agency and does not lend directly to individuals. Loans under PMMY are disbursed by Member Lending Institutions (MLIs) such as Public/Private Banks, Regional Rural Banks (RRBs), Small Finance Banks (SFBs), Microfinance Institutions (MFIs), and NBFCs.'
      },
      {
        q: 'Who is eligible to apply for a MUDRA Loan?',
        a: 'Any Indian citizen who has a business plan for a non-farm income-generating activity such as manufacturing, processing, trading, or service sector, and whose credit requirement is up to ₹20 Lakh, can approach any MLI to apply for a MUDRA loan.'
      }
    ]
  },
  {
    id: 'categories',
    title: 'Loan Categories & Limits',
    faqs: [
      {
        q: 'What are the different categories of loans offered under PMMY?',
        a: 'PMMY offers four main loan products signifying stages of business growth:\n• Shishu: Covering loans up to ₹50,000/-\n• Kishore: Covering loans above ₹50,000/- and up to ₹5 Lakh\n• Tarun: Covering loans above ₹5 Lakh and up to ₹10 Lakh\n• TarunPlus: Covering loans above ₹10 Lakh and up to ₹20 Lakh (for repeat borrowers with a proven repayment track record).'
      },
      {
        q: 'Is collateral or third-party guarantee required for MUDRA loans?',
        a: 'As per RBI guidelines, Member Lending Institutions cannot demand collateral security for micro credit extended under PMMY up to ₹10 Lakhs. Credit guarantee coverage is provided through Credit Guarantee Fund for Micro Units (CGFMU).'
      },
      {
        q: 'Is there any processing fee charged on MUDRA loans?',
        a: 'No processing fee is charged by banks for Shishu category loans (up to ₹50,000). For Kishore, Tarun, and TarunPlus categories, nominal fees may be levied as per the respective lending institution policies.'
      }
    ]
  },
  {
    id: 'application',
    title: 'Application Process & JanSamarth',
    faqs: [
      {
        q: 'How can I apply for a MUDRA loan online?',
        a: 'You can file your loan application online through the official Udyamimitra portal (www.udyamimitra.in) or the Government of India JanSamarth Portal (www.jansamarth.in). You can also walk into any nearby branch of a commercial bank, RRB, SFB, or MFI.'
      },
      {
        q: 'What documents are required to apply for a MUDRA loan?',
        a: 'Basic documents include:\n1. Proof of Identity (Aadhaar / Voter ID / PAN / Passport / Driving License)\n2. Proof of Residence (Utility Bill / Aadhaar)\n3. Business Address & License Proof (Registration certificate, MSME Udyam Registration)\n4. Quotation of machinery/equipment to be purchased\n5. Past 6-month bank statement (if available).'
      },
      {
        q: 'Are there any official agents or middlemen appointed by MUDRA?',
        a: 'NO. MUDRA has NOT appointed any private agents, facilitators, or brokers for sanctioning MUDRA loans. Borrowers are strictly advised to beware of fraudulent individuals offering guaranteed loan approvals for money.'
      }
    ]
  },
  {
    id: 'rates',
    title: 'Interest Rates & Repayment',
    faqs: [
      {
        q: 'What are the interest rates charged on MUDRA loans?',
        a: 'The interest rates charged by Member Lending Institutions are linked to RBI Repo rate / MCLR guidelines and depend on the borrower profile and lending bank policies. MUDRA refinances banks to keep interest rates affordable.'
      },
      {
        q: 'What is the tenure for repayment of a MUDRA loan?',
        a: 'The repayment tenure generally ranges between 3 to 7 years, including a suitable moratorium period depending on the cash flow and nature of the business activity.'
      }
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
    <div className="min-h-screen bg-slate-50 dark:bg-[#070b14] text-slate-900 dark:text-slate-100 transition-colors duration-300 flex flex-col justify-between">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 py-12 w-full">
        
        {/* Hero Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 bg-[#f97316] text-white px-3.5 py-1 rounded-md text-xs font-black tracking-wider uppercase mb-3 shadow-sm">
            <Sparkles size={14} className="text-white" />
            <span>KNOWLEDGE BASE & SUPPORT</span>
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0f2942] dark:text-white tracking-tight mb-3">
            Frequently Asked Questions
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
        </div>

        {/* Category Pills */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
          <button
            type="button"
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
              activeCategory === 'all' 
                ? 'bg-red-800 dark:bg-amber-500 text-white dark:text-slate-950 shadow-md' 
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-amber-50'
            }`}
          >
            All Questions
          </button>
          {faqCategories.map(cat => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                activeCategory === cat.id 
                  ? 'bg-red-800 dark:bg-amber-500 text-white dark:text-slate-950 shadow-md' 
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-amber-50'
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div className="max-w-4xl mx-auto space-y-8">
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
                      <div 
                        key={faqIdx}
                        className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-all"
                      >
                        <button
                          type="button"
                          onClick={() => toggleFaq(globalIdx)}
                          className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-slate-900 dark:text-white text-xs sm:text-sm hover:text-red-700 dark:hover:text-amber-400 transition-colors"
                        >
                          <span className="flex items-center gap-2">
                            <HelpCircle size={18} className="text-red-700 dark:text-amber-400 shrink-0" />
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
                              transition={{ duration: 0.2 }}
                              className="px-5 pb-5 pt-1 text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-semibold border-t border-slate-100 dark:border-slate-800 bg-amber-50/50 dark:bg-slate-800/50"
                            >
                              <p className="whitespace-pre-line">{faq.a}</p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            )
          ))}
        </div>

        {/* Statutory Helpline Callout */}
        <div className="max-w-4xl mx-auto mt-14 bg-amber-500/10 dark:bg-slate-900 p-6 rounded-3xl border-2 border-amber-300 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
          <div className="flex items-center gap-3 text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
            <Phone className="text-red-700 dark:text-amber-400 shrink-0" size={24} />
            <div>
              <p className="text-base font-black">Still have queries?</p>
              <p className="text-slate-600 dark:text-slate-400">Call our official National Toll-Free Helpline: <strong className="text-red-800 dark:text-amber-400 font-black">1800-180-1111</strong></p>
            </div>
          </div>
          <a 
            href="https://www.jansamarth.in/login"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-red-800 hover:bg-red-900 text-white text-xs font-black rounded-xl shadow-md transition-all shrink-0"
          >
            Apply Online via JanSamarth
          </a>
        </div>

      </main>

      <Footer />
      <ChatBot />
    </div>
  );
}
