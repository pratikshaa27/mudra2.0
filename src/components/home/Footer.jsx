import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Twitter, 
  Youtube, 
  Linkedin,
  ExternalLink,
  ShieldAlert,
  Building2,
  ExternalLink as ArrowUpRight
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  const quickLinks = [
    { label: 'Home Portal', href: createPageUrl('Home') },
    { label: 'About MUDRA', href: createPageUrl('About') },
    { label: 'Media Gallery', href: createPageUrl('Gallery') },
    { label: 'Contact Us', href: createPageUrl('Contact') },
    { label: 'Grievance Portal', href: createPageUrl('FAQ') },
    { label: 'Careers', href: createPageUrl('Careers') },
  ];

  const importantLinks = [
    { label: 'SIDBI Refinance', href: 'https://www.sidbi.in/' },
    { label: 'Department of Financial Services', href: 'https://financialservices.gov.in/' },
    { label: 'NABARD Rural Credit', href: 'https://www.nabard.org/' },
    { label: 'UdyamiMitra Portal', href: 'https://www.udyamimitra.in/' },
    { label: 'Stand Up India Scheme', href: 'https://www.standupmitra.in/' },
  ];

  return (
    <footer className="bg-slate-100 dark:bg-slate-950 text-slate-800 dark:text-slate-300 transition-colors duration-300 relative border-t border-slate-200 dark:border-slate-800">
      
      {/* Statutory Advisory Banner - Clean White Background */}
      <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 py-6 border-b border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 bg-red-50/80 dark:bg-slate-800/80 p-5 sm:p-6 rounded-3xl border-2 border-red-200 dark:border-red-900/50 shadow-sm">
            
            <div className="flex items-start gap-4 flex-1">
              <div className="w-12 h-12 rounded-2xl bg-red-800 text-white flex items-center justify-center font-black shrink-0 shadow-md mt-0.5">
                <ShieldAlert size={26} />
              </div>
              
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-red-800 dark:text-amber-400 font-black text-xs uppercase tracking-wider">
                    STATUTORY REFLECTION & CAUTIONARY ADVISORY
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-bold leading-relaxed">
                  *MUDRA is a refinancing Institution and does not lend directly to individuals. Borrowers can apply directly via Member Lending Institutions (Banks, MFIs, NBFCs) or online through the official Udyamimitra portal (<a href="https://www.udyamimitra.in" target="_blank" rel="noopener noreferrer" className="underline text-red-800 dark:text-amber-400 hover:text-red-900">www.udyamimitra.in</a>).
                </p>
                <p className="text-xs text-red-800 dark:text-amber-400 font-black flex items-center gap-1">
                  <span>⚠️ Warning: MUDRA has NOT engaged any agents or facilitators. Beware of fraudulent impostors.</span>
                </p>
              </div>
            </div>

            <a
              href="https://www.jansamarth.in/login"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-2xl bg-red-800 hover:bg-red-900 text-white text-xs font-black shadow-md transition-all shrink-0 text-center uppercase tracking-wide border border-red-700 flex items-center gap-2 self-stretch sm:self-auto justify-center"
            >
              <span>ENROLL TRAINED PARTNER</span>
              <ArrowUpRight size={14} />
            </a>

          </div>
        </div>
      </div>

      {/* Main Light/Dark Footer Grid */}
      <div className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            
            {/* Column 1: Brand & Ministry */}
            <div className="space-y-4">
              <div className="bg-white p-2.5 rounded-xl inline-block shadow-sm border border-slate-200">
                <img 
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6978c66565209a38e92b1aa2/282d5f6a9_image.png"
                  alt="Pradhan Mantri MUDRA Yojana"
                  className="h-12 w-auto object-contain"
                />
              </div>
              
              <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed font-semibold">
                Micro Units Development & Refinance Agency Ltd. (MUDRA) is a premier refinancing institution established by the Government of India for micro-enterprise credit expansion.
              </p>

              <div className="pt-2 flex items-center gap-2 text-xs text-red-800 dark:text-amber-400 font-extrabold">
                <Building2 size={14} />
                <span>SIDBI Wholly Owned Subsidiary</span>
              </div>
            </div>

            {/* Column 2: Navigation Links */}
            <div>
              <h4 className="text-[#0f2942] dark:text-white font-black mb-4 text-sm tracking-wider uppercase border-b border-slate-200 dark:border-slate-800 pb-2">
                Quick Portals
              </h4>
              <ul className="space-y-2 text-xs font-semibold">
                {quickLinks.map((link, idx) => (
                  <li key={idx}>
                    <Link 
                      to={link.href}
                      className="text-slate-600 dark:text-slate-400 hover:text-red-800 dark:hover:text-amber-400 flex items-center gap-2 transition-colors group"
                    >
                      <span className="text-amber-500 font-bold group-hover:translate-x-1 transition-transform">»</span>
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Partner Portals */}
            <div>
              <h4 className="text-[#0f2942] dark:text-white font-black mb-4 text-sm tracking-wider uppercase border-b border-slate-200 dark:border-slate-800 pb-2">
                Partner Portals
              </h4>
              <ul className="space-y-2 text-xs font-semibold">
                {importantLinks.map((link, idx) => (
                  <li key={idx}>
                    <a 
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-600 dark:text-slate-400 hover:text-red-800 dark:hover:text-amber-400 flex items-center gap-2 transition-colors group"
                    >
                      <ExternalLink size={12} className="text-amber-500 shrink-0" />
                      <span>{link.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Contact & Support */}
            <div>
              <h4 className="text-[#0f2942] dark:text-white font-black mb-4 text-sm tracking-wider uppercase border-b border-slate-200 dark:border-slate-800 pb-2">
                Corporate Office
              </h4>
              <div className="space-y-3 text-xs text-slate-700 dark:text-slate-300 font-semibold">
                <div className="flex items-start gap-2.5">
                  <MapPin className="text-red-800 dark:text-amber-400 shrink-0 mt-0.5" size={16} />
                  <p className="leading-relaxed">
                    SWAVALAMBAN BHAWAN, C-11, G-Block,<br />
                    Bandra Kurla Complex, Bandra (E),<br />
                    Mumbai - 400051
                  </p>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="text-red-800 dark:text-amber-400 shrink-0" size={16} />
                  <p className="font-black text-slate-900 dark:text-white">1800-180-1111 [Toll Free]</p>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="text-red-800 dark:text-amber-400 shrink-0" size={16} />
                  <p>helpdesk@mudra.org.in</p>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-2 mt-5">
                {[Facebook, Twitter, Youtube, Linkedin].map((Icon, idx) => (
                  <motion.a 
                    whileHover={{ scale: 1.1, y: -2 }}
                    key={idx}
                    href="#"
                    className="w-8 h-8 bg-white dark:bg-slate-800 hover:bg-red-800 dark:hover:bg-amber-400 hover:text-white dark:hover:text-slate-950 rounded-xl flex items-center justify-center text-slate-700 dark:text-slate-300 transition-colors shadow-sm border border-slate-200 dark:border-slate-700"
                  >
                    <Icon size={14} />
                  </motion.a>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="bg-slate-200/80 dark:bg-slate-950 py-4 text-xs text-slate-600 dark:text-slate-400 font-semibold border-t border-slate-300 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p>© {new Date().getFullYear()} MUDRA Ltd. Government of India Refinance Entity. All Rights Reserved.</p>
          <div className="flex gap-4 text-slate-600 dark:text-slate-400">
            <a href="#" className="hover:text-red-800 dark:hover:text-amber-400 transition-colors">Terms of Use</a>
            <span>•</span>
            <a href="#" className="hover:text-red-800 dark:hover:text-amber-400 transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-red-800 dark:hover:text-amber-400 transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}