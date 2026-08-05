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
    <div className="min-h-screen bg-slate-50 dark:bg-[#070b14] text-slate-900 dark:text-slate-100 transition-colors duration-300 flex flex-col justify-between relative overflow-hidden">
      
      {/* Taj Mahal Fixed Background Image Effect */}
      <div 
        className="absolute inset-0 pointer-events-none bg-cover bg-center bg-fixed filter brightness-105 contrast-110 opacity-75 dark:opacity-55"
        style={{ backgroundImage: `url('/photo/tajmahal.png')` }}
      />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#fffbeb]/75 via-white/55 to-[#fffbeb]/85 dark:from-[#070b14]/85 dark:via-[#070b14]/75 dark:to-[#070b14]/90" />

      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 py-12 w-full relative z-10">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="px-3.5 py-1 rounded-md text-xs font-black uppercase tracking-wider bg-red-800 text-white shadow-sm inline-block mb-3">
            GOVERNMENT OF INDIA HELPDESK
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-[#0f2942] dark:text-white tracking-tight">
            Contact & Support
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base font-semibold mt-3">
            Reach out to MUDRA Corporate Office, Toll-Free Helpline, or download official contact directories.
          </p>
        </div>

        {/* Contact Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
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
            <FileText className="text-red-700 dark:text-amber-400" size={26} />
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[#0f2942] dark:text-white">Official Contact Directories & PDF Downloads</h2>
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

        {/* Contact Form Section */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl border border-slate-200 dark:border-slate-800 max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6 border-b border-slate-200 dark:border-slate-800 pb-4">
            <MessageSquare className="text-red-700 dark:text-amber-400" size={26} />
            <h2 className="text-2xl font-black text-[#0f2942] dark:text-white">Submit an Official Inquiry</h2>
          </div>

          {submitted ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10 space-y-3">
              <CheckCircle2 size={48} className="text-emerald-600 mx-auto" />
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">Inquiry Submitted Successfully</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-semibold max-w-md mx-auto">
                Thank you for contacting MUDRA. Your inquiry reference number is <strong className="text-red-700 dark:text-amber-400">#MUDRA-{Math.floor(100000 + Math.random() * 900000)}</strong>. Our support team will get back to you shortly.
              </p>
              <button onClick={() => setSubmitted(false)} className="mt-4 px-4 py-2 bg-red-800 text-white text-xs font-bold rounded-xl shadow">
                Submit Another Message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Full Name *</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Enter your full name" 
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold focus:ring-2 focus:ring-red-700 outline-none"
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
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold focus:ring-2 focus:ring-red-700 outline-none"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Mobile Number *</label>
                  <input 
                    type="tel" 
                    required 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="+91 Mobile number" 
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold focus:ring-2 focus:ring-red-700 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Inquiry Subject</label>
                  <select 
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold focus:ring-2 focus:ring-red-700 outline-none"
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
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold focus:ring-2 focus:ring-red-700 outline-none"
                />
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-3 bg-red-800 hover:bg-red-900 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Send size={15} />
                <span>{isSubmitting ? 'Submitting Inquiry...' : 'Submit Official Inquiry'}</span>
              </motion.button>
            </form>
          )}
        </div>

        {/* Download Toast */}
        <AnimatePresence>
          {downloadToast && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-2xl border border-emerald-500 shadow-2xl flex items-center gap-3"
            >
              <CheckCircle2 size={20} className="text-emerald-400 animate-bounce" />
              <div className="text-xs font-bold">
                <p className="text-emerald-400 font-black">Opening PDF Document...</p>
                <p className="text-slate-300">{downloadToast}</p>
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