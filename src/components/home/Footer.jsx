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
    <footer className="bg-slate-950 text-white transition-colors duration-300 relative overflow-hidden border-t border-red-900/50 shadow-2xl">
      
      {/* ONE Single Red Fort Background Image for the WHOLE Area - Bright & Visible */}
      <img 
        src="/photo/redfort.jpg" 
        alt="Red Fort Full Background" 
        className="absolute inset-0 w-full h-full object-cover object-center filter brightness-110 contrast-110 opacity-90"
      />

      {/* Light Gradient Overlay for High Text Readability while keeping Red Fort Photo Clearly Visible */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/45 via-slate-950/40 to-slate-950/65"></div>

      {/* Main Content Area over the single Red Fort Background */}
      <div className="relative z-10">
        
        {/* Statutory Advisory Banner */}
        <div className="py-8 px-4 sm:px-6 border-b border-white/10 max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 bg-slate-950/40 p-6 sm:p-7 rounded-3xl border border-amber-400/30 backdrop-blur-sm shadow-2xl">
            <div className="flex items-start gap-4 flex-1">
              <div className="w-12 h-12 rounded-2xl bg-red-600/90 text-amber-300 flex items-center justify-center font-black shrink-0 shadow-lg border border-red-500/50 mt-0.5">
                <ShieldAlert size={26} />
              </div>
              
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-amber-400 font-black text-xs uppercase tracking-wider">
                    STATUTORY REFLECTION & CAUTIONARY ADVISORY
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-100 font-bold leading-relaxed">
                  *MUDRA is a refinancing Institution and does not lend directly to individuals. Borrowers can apply directly via Member Lending Institutions (Banks, MFIs, NBFCs) or online through the official Udyamimitra portal (<a href="https://www.udyamimitra.in" target="_blank" rel="noopener noreferrer" className="underline text-amber-300 hover:text-white font-extrabold">www.udyamimitra.in</a>).
                </p>
                <p className="text-xs text-amber-300 font-black flex items-center gap-1">
                  <span>⚠️ Warning: MUDRA has NOT engaged any agents or facilitators. Beware of fraudulent impostors.</span>
                </p>
              </div>
            </div>

            <a
              href="https://www.jansamarth.in/login"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 text-white text-xs font-black shadow-lg transition-all shrink-0 text-center uppercase tracking-wide border border-amber-400/40 flex items-center gap-2 self-stretch sm:self-auto justify-center"
            >
              <span>ENROLL TRAINED PARTNER</span>
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>

        {/* Quick Links & Portals Grid */}
        <div className="py-14 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            
            {/* Column 1: Brand & Ministry */}
            <div className="space-y-4">
              <div className="bg-white p-2.5 rounded-xl inline-block shadow-md">
                <img 
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6978c66565209a38e92b1aa2/282d5f6a9_image.png"
                  alt="Pradhan Mantri MUDRA Yojana"
                  className="h-12 w-auto object-contain"
                />
              </div>
              
              <p className="text-slate-200 text-xs leading-relaxed font-medium">
                Micro Units Development & Refinance Agency Ltd. (MUDRA) is a premier refinancing institution established by the Government of India for micro-enterprise credit expansion.
              </p>

              <div className="pt-2 flex items-center gap-2 text-xs text-amber-400 font-black">
                <Building2 size={14} />
                <span>SIDBI Wholly Owned Subsidiary</span>
              </div>
            </div>

            {/* Column 2: Navigation Links */}
            <div>
              <h4 className="text-white font-black mb-4 text-sm tracking-wider uppercase border-b border-white/20 pb-2">
                Quick Portals
              </h4>
              <ul className="space-y-2 text-xs font-semibold">
                {quickLinks.map((link, idx) => (
                  <li key={idx}>
                    <Link 
                      to={link.href}
                      className="text-slate-200 hover:text-amber-400 flex items-center gap-2 transition-colors group"
                    >
                      <span className="text-amber-400 font-bold group-hover:translate-x-1 transition-transform">»</span>
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Partner Portals */}
            <div>
              <h4 className="text-white font-black mb-4 text-sm tracking-wider uppercase border-b border-white/20 pb-2">
                Partner Portals
              </h4>
              <ul className="space-y-2 text-xs font-semibold">
                {importantLinks.map((link, idx) => (
                  <li key={idx}>
                    <a 
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-200 hover:text-amber-400 flex items-center gap-2 transition-colors group"
                    >
                      <ExternalLink size={12} className="text-amber-400 shrink-0" />
                      <span>{link.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Contact & Support */}
            <div>
              <h4 className="text-white font-black mb-4 text-sm tracking-wider uppercase border-b border-white/20 pb-2">
                Corporate Office
              </h4>
              <div className="space-y-3 text-xs text-slate-200 font-semibold">
                <div className="flex items-start gap-2.5">
                  <MapPin className="text-amber-400 shrink-0 mt-0.5" size={16} />
                  <p className="leading-relaxed">
                    SWAVALAMBAN BHAWAN, C-11, G-Block,<br />
                    Bandra Kurla Complex, Bandra (E),<br />
                    Mumbai - 400051
                  </p>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="text-amber-400 shrink-0" size={16} />
                  <p className="font-black text-white">1800-180-1111 [Toll Free]</p>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="text-amber-400 shrink-0" size={16} />
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
                    className="w-8 h-8 bg-white/10 hover:bg-amber-400 hover:text-slate-950 rounded-xl flex items-center justify-center text-white transition-colors shadow-sm border border-white/20"
                  >
                    <Icon size={14} />
                  </motion.a>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Copyright Bar */}
        <div className="bg-slate-950/90 py-4 text-xs text-slate-300 font-semibold border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center gap-3">
            <p>© {new Date().getFullYear()} MUDRA Ltd. Government of India Refinance Entity. All Rights Reserved.</p>
            <div className="flex gap-4 text-slate-300">
              <a href="#" className="hover:text-amber-400 transition-colors">Terms of Use</a>
              <span>•</span>
              <a href="#" className="hover:text-amber-400 transition-colors">Privacy Policy</a>
              <span>•</span>
              <a href="#" className="hover:text-amber-400 transition-colors">Sitemap</a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}