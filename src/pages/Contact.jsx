import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, MessageSquare, CheckCircle2, Download, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/home/Header';
import Footer from '../components/home/Footer';
import ChatBot from '../components/ChatBot';

const pdfDownloads = [
  {
    title: 'PMMY Toll Free Numbers',
    filename: 'Toll_Free_NOs_under_PMMY.pdf',
    link: '/pdf/Toll_Free_NOs_under_PMMY.pdf'
  },
  {
    title: 'MUDRA Officers - Mumbai',
    filename: 'Micro Units Development- Contact Number.pdf',
    link: '/pdf/Micro%20Units%20Development-%20Contact%20Number.pdf'
  },
  {
    title: 'PMMY Mission office Contact Details',
    filename: 'Mission_office_Contact_details.pdf',
    link: '/pdf/Mission_office_Contact_details.pdf'
  },
  {
    title: 'Grievance Officers',
    filename: 'Grievance Officers Docs.pdf',
    link: '/pdf/Grievance%20Officers%20Docs.pdf'
  }
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'loan_inquiry',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [downloadToast, setDownloadToast] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1200));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const handlePdfDownload = (pdf) => {
    setDownloadToast(pdf.title);
    setTimeout(() => {
      setDownloadToast(null);
    }, 3000);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Corporate Address',
      details: ['SWAVALAMBAN BHAWAN, C-11, G-Block,', 'Bandra Kurla Complex, Bandra (E),', 'Mumbai - 400051']
    },
    {
      icon: Phone,
      title: 'Toll-Free Helpline',
      details: ['1800-180-1111 (Toll Free)', '+91-22-6722-1000 (Board)']
    },
    {
      icon: Mail,
      title: 'Official Email',
      details: ['helpdesk@mudra.org.in', 'grievance@mudra.org.in']
    },
    {
      icon: Clock,
      title: 'Working Hours',
      details: ['Monday - Friday: 9:30 AM - 6:00 PM', 'Saturday & Sunday: Closed']
    }
  ];

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-[#021731] text-slate-900 dark:text-slate-100 transition-colors duration-300 flex flex-col justify-between overflow-x-hidden">

      {/* Global heritage backdrop */}
      <div
        className="pointer-events-none fixed inset-0 z-0 bg-cover bg-center opacity-[0.05] dark:opacity-[0.04]"
        style={{ backgroundImage: `url('/photo/tajmahal.png')` }}
        aria-hidden="true"
      />

      <Header />

      {/* Hero Page Header with Ambient Animations */}
      <div className="py-14 relative overflow-hidden bg-gradient-to-br from-[#075985] via-[#075985] to-[#021731]">

        {/* Animated Background Blobs */}
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
              <span>GOVERNMENT OF INDIA HELPDESK</span>
            </motion.span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight mb-2 [text-shadow:0_4px_18px_rgba(2,23,49,0.55)]">
              Contact & Support
            </h1>
            <p className="pb-5 text-blue-50 max-w-3xl mx-auto text-sm sm:text-base font-semibold leading-snug [text-shadow:0_2px_10px_rgba(2,23,49,0.5)]">
              Reach out to MUDRA Corporate Office, Toll-Free Helpline, or download official contact directories.
            </p>
          </motion.div>
        </div>

        {/* Dramatic filled S-curve */}
        <div className="pointer-events-none absolute inset-x-0 bottom-[-1px] z-10" aria-hidden="true">
          <svg viewBox="0 0 1440 140" preserveAspectRatio="none" className="block h-14 w-full sm:h-24">
            <defs>
              <linearGradient id="contactHeroCurveBorder" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#7dd3fc" />
                <stop offset="55%" stopColor="#00b6f0" />
                <stop offset="100%" stopColor="#021731" />
              </linearGradient>
            </defs>
            <path d="M0,70 C360,0 720,140 1080,70 C1260,35 1350,20 1440,45 L1440,140 L0,140 Z" className="fill-slate-50 dark:fill-[#021731]" />
            <path d="M0,70 C360,0 720,140 1080,70 C1260,35 1350,20 1440,45" fill="none" stroke="url(#contactHeroCurveBorder)" strokeWidth="7" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto px-4 py-12 w-full relative z-10">
        {/* Contact Form Section */}
        <div className="flex items-center gap-3 mb-6 max-w-5xl mx-auto">
          <MessageSquare className="text-blue-700 dark:text-blue-400 shrink-0" size={26} />
          <h2 className="text-2xl font-black text-[#011a39] dark:text-white">Submit an Official Inquiry</h2>
        </div>

        <div className="max-w-5xl mx-auto rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden grid grid-cols-1 lg:grid-cols-[320px_1fr] mb-12">

          {/* Left promo panel */}
          <div className="relative overflow-hidden bg-gradient-to-br from-[#021731] via-[#0e3a5c] to-[#194d70] p-8 sm:p-10 flex flex-col justify-between">
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.08]"
              style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1.5px, transparent 1.5px)', backgroundSize: '24px 24px' }}
              aria-hidden="true"
            />
            <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-blue-400/20 blur-3xl" aria-hidden="true" />
            <div className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-blue-600/20 blur-3xl" aria-hidden="true" />

            <div className="relative z-10">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-blue-200 mb-6">
                <MessageSquare size={12} aria-hidden="true" />
                <span>We're here to help</span>
              </span>

              <h3 className="text-2xl sm:text-3xl font-black text-white leading-snug">
                Need help with a MUDRA loan query?
              </h3>
            </div>

            <div className="relative z-10 mt-8 space-y-4">
              <a href="tel:18001801111" className="flex items-center gap-2 text-sm font-bold text-white transition-colors hover:text-blue-200">
                <Phone size={16} className="shrink-0 text-blue-300" aria-hidden="true" />
                <span>1800-180-1111 (Toll Free)</span>
              </a>
              <a href="mailto:helpdesk@mudra.org.in" className="flex items-center gap-2 text-sm font-bold text-white transition-colors hover:text-blue-200">
                <Mail size={16} className="shrink-0 text-blue-300" aria-hidden="true" />
                <span>helpdesk@mudra.org.in</span>
              </a>
              <a
                href="#contact-form"
                className="mt-2 inline-flex items-center gap-2 rounded-full bg-blue-500 px-5 py-2.5 text-xs font-black uppercase tracking-wide text-[#021731] shadow-md transition-all hover:bg-blue-400"
              >
                <span>Fill The Form</span>
                <Send size={13} aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Right form panel */}
          <div className="bg-white dark:bg-slate-900 p-6 sm:p-8">
            {submitted ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex h-full flex-col items-center justify-center py-10 text-center space-y-3">
                <CheckCircle2 size={48} className="text-emerald-600 mx-auto" />
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">Inquiry Submitted Successfully</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-semibold max-w-md mx-auto">
                  Thank you for contacting MUDRA. Your inquiry reference number is <strong className="text-blue-700 dark:text-blue-400">#MUDRA-{Math.floor(100000 + Math.random() * 900000)}</strong>. Our support team will get back to you shortly.
                </p>
                <button onClick={() => setSubmitted(false)} className="mt-4 px-4 py-2 bg-blue-800 text-white text-xs font-bold rounded-xl shadow">
                  Submit Another Message
                </button>
              </motion.div>
            ) : (
              <>
                {/* Mandatory-fields note */}
                <div className="mb-6 flex items-center gap-2 rounded-r-lg border-l-4 border-blue-700 bg-blue-50 py-2.5 pl-3 dark:border-blue-400 dark:bg-slate-800/60">
                  <span className="text-sm font-black text-red-600 dark:text-red-400">*</span>
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">denotes mandatory fields</span>
                </div>

                <form id="contact-form" onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="Enter your full name"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold focus:ring-2 focus:ring-blue-700 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="name@example.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold focus:ring-2 focus:ring-blue-700 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Mobile Number *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        placeholder="+91 Mobile number"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold focus:ring-2 focus:ring-blue-700 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Inquiry Subject</label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({...formData, subject: e.target.value})}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold focus:ring-2 focus:ring-blue-700 outline-none"
                      >
                        <option value="loan_inquiry">General Loan Inquiry</option>
                        <option value="tarun_plus">Tarun Plus (₹10-20 Lakh)</option>
                        <option value="grievance">Official Grievance / Fraud Report</option>
                        <option value="mli_partner">MLI Refinance Partnership</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Message Details *</label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder="Describe your query in detail..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold focus:ring-2 focus:ring-blue-700 outline-none"
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-8 py-3 bg-blue-800 hover:bg-blue-900 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <Send size={15} aria-hidden="true" />
                    <span>{isSubmitting ? 'Submitting Inquiry...' : 'Submit Official Inquiry'}</span>
                  </motion.button>
                </form>
              </>
            )}
          </div>
        </div>

        {/* Contact Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
          {contactInfo.map((info, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg text-center"
            >
              <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center mx-auto mb-4 font-bold shadow-md">
                <info.icon size={22} />
              </div>
              <h3 className="font-black text-slate-900 dark:text-white text-base mb-2">{info.title}</h3>
              {info.details.map((detail, dIdx) => (
                <p key={dIdx} className="text-xs font-semibold text-slate-600 dark:text-slate-400 leading-relaxed">{detail}</p>
              ))}
            </motion.div>
          ))}
        </div>

        {/* Official Directory & Contact PDFs Section */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 dark:border-slate-800 mb-12">
          <div className="flex items-center gap-3 mb-6 border-b border-slate-200 dark:border-slate-800 pb-4">
            <FileText className="text-blue-700 dark:text-blue-400" size={26} />
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[#011a39] dark:text-white">Official Contact Directories & PDF Downloads</h2>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Download official toll-free lists, Mumbai corporate officers, mission office contacts, and grievance authority directories.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {pdfDownloads.map((pdf, idx) => (
              <div 
                key={idx}
                className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-between gap-4 hover:border-amber-400 transition-all"
              >
                <span className="text-xs sm:text-sm font-black text-slate-800 dark:text-slate-200">
                  {pdf.title}
                </span>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={pdf.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handlePdfDownload(pdf)}
                  className="px-5 py-2.5 rounded-full bg-amber-400 hover:bg-amber-500 text-slate-950 text-xs font-black shadow-md flex items-center justify-center gap-2 transition-all shrink-0 uppercase tracking-wide"
                >
                  <span>DOWNLOAD</span>
                  <Download size={14} className="text-slate-950" />
                </motion.a>
              </div>
            ))}
          </div>
        </div>

        {/* Download Toast */}
        <AnimatePresence>
          {downloadToast && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed inset-x-4 bottom-6 z-50 flex items-center gap-3 rounded-2xl border border-emerald-500 bg-slate-900 px-5 py-3.5 text-white shadow-2xl sm:inset-x-auto sm:left-auto sm:right-6 sm:max-w-sm"
            >
              <CheckCircle2 size={20} className="shrink-0 text-emerald-400 animate-bounce" />
              <div className="min-w-0 text-xs font-bold">
                <p className="text-emerald-400 font-black">Opening PDF Document...</p>
                <p className="truncate text-slate-300">{downloadToast}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </main>

      <Footer />
      <ChatBot />
    </div>
  );
}