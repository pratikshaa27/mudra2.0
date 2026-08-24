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
  ExternalLink as ArrowUpRight,
  Globe
} from 'lucide-react';

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

  const socialLinks = [
    { Icon: Facebook, label: 'Facebook' },
    { Icon: Twitter, label: 'X (Twitter)' },
    { Icon: Youtube, label: 'YouTube' },
    { Icon: Linkedin, label: 'LinkedIn' },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-red-900/40 bg-slate-950 text-white">
      
      {/* Heritage backdrop */}
      <img 
        src="/photo/redfort.jpg" 
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover object-center opacity-20"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-950/88 to-slate-950/95" aria-hidden="true" />

      <div className="relative">
        
        {/* Statutory advisory */}
        <div className="shell border-b border-white/10 py-10">
          <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-amber-400/25 bg-white/[0.04] p-6 backdrop-blur-sm sm:p-7 lg:flex-row lg:items-center">
            <div className="flex flex-1 items-start gap-4">
              <span className="mt-0.5 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-red-500/40 bg-red-600/90 text-amber-300">
                <ShieldAlert size={24} aria-hidden="true" />
              </span>
              
              <div className="space-y-2">
                <span className="block text-[11px] font-bold uppercase tracking-[0.14em] text-amber-400">
                  STATUTORY REFLECTION &amp; CAUTIONARY ADVISORY
                </span>

                <p className="text-xs font-medium leading-relaxed text-slate-100 sm:text-sm">
                  *MUDRA is a refinancing Institution and does not lend directly to individuals. Borrowers can apply directly via Member Lending Institutions (Banks, MFIs, NBFCs) or online through the official Udyamimitra portal (<a href="https://www.udyamimitra.in" target="_blank" rel="noopener noreferrer" className="link-underline font-bold text-amber-300 hover:text-white">www.udyamimitra.in</a>).
                </p>

                <p className="text-xs font-bold text-amber-300">
                  ⚠️ Warning: MUDRA has NOT engaged any agents or facilitators. Beware of fraudulent impostors.
                </p>
              </div>
            </div>

            <a
              href=""
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary w-full shrink-0 text-xs uppercase tracking-wide lg:w-auto"
            >
              <span>ENROLL TRAINED PARTNER</span>
              <ArrowUpRight size={14} className="btn-icon" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Multi-column directory */}
        <div className="shell py-14">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 xl:grid-cols-4">
            
            {/* Brand */}
            <div className="space-y-4">
              <div className="inline-block rounded-xl bg-white p-2.5 shadow-sm">
                <img 
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6978c66565209a38e92b1aa2/282d5f6a9_image.png"
                  alt="Pradhan Mantri MUDRA Yojana"
                  className="h-12 w-auto object-contain"
                />
              </div>
              
              <p className="text-xs font-medium leading-relaxed text-slate-300">
                Micro Units Development &amp; Refinance Agency Ltd. (MUDRA) is a premier refinancing institution established by the Government of India for micro-enterprise credit expansion.
              </p>

              <p className="flex items-center gap-2 pt-1 text-xs font-bold text-blue-400">
                <Building2 size={14} aria-hidden="true" />
                <span>SIDBI Wholly Owned Subsidiary</span>
              </p>
            </div>

            {/* Internal navigation */}
            <nav aria-labelledby="footer-quick-portals">
              <h4 id="footer-quick-portals" className="mb-4 border-b border-white/15 pb-2.5 text-sm font-bold uppercase tracking-wide text-white">
                Quick Portals
              </h4>
              <ul className="space-y-1">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <Link 
                      to={link.href}
                      className="group flex items-center gap-2 rounded-md py-1.5 text-xs font-semibold text-slate-300 transition-colors duration-200 hover:text-blue-400"
                    >
                      <span className="font-bold text-blue-400 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true">»</span>
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* External portals */}
            <nav aria-labelledby="footer-partner-portals">
              <h4 id="footer-partner-portals" className="mb-4 border-b border-white/15 pb-2.5 text-sm font-bold uppercase tracking-wide text-white">
                Partner Portals
              </h4>
              <ul className="space-y-1">
                {importantLinks.map((link) => (
                  <li key={link.label}>
                    <a 
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 rounded-md py-1.5 text-xs font-semibold text-slate-300 transition-colors duration-200 hover:text-blue-400"
                    >
                      <ExternalLink size={12} className="shrink-0 text-blue-400 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
                      <span>{link.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Contact */}
            <div>
              <h4 className="mb-4 border-b border-white/15 pb-2.5 text-sm font-bold uppercase tracking-wide text-white">
                Corporate Office
              </h4>

              <address className="space-y-3.5 text-xs font-medium not-italic text-slate-300">
                <div className="flex items-start gap-2.5">
                  <MapPin className="mt-0.5 shrink-0 text-blue-400" size={15} aria-hidden="true" />
                  <p className="leading-relaxed">
                    SWAVALAMBAN BHAWAN, C-11, G-Block,<br />
                    Bandra Kurla Complex, Bandra (E),<br />
                    Mumbai - 400051
                  </p>
                </div>

                <div className="flex items-center gap-2.5">
                  <Phone className="shrink-0 text-blue-400" size={15} aria-hidden="true" />
                  <a href="tel:18001801111" className="link-underline font-bold text-white">
                    1800-180-1111 [Toll Free]
                  </a>
                </div>

                <div className="flex items-center gap-2.5">
                  <Mail className="shrink-0 text-blue-400" size={15} aria-hidden="true" />
                  <a href="mailto:helpdesk@mudra.org.in" className="link-underline">
                    helpdesk@mudra.org.in
                  </a>
                </div>
              </address>

              <div className="mt-5 flex gap-2">
                {socialLinks.map(({ Icon, label }) => (
                  <a 
                    key={label}
                    href="#"
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-600 hover:text-white"
                  >
                    <Icon size={15} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Legal bar */}
        <div className="border-t border-white/10 bg-slate-950/80 py-5">
          <div className="shell flex flex-col items-center justify-between gap-4 text-xs font-medium text-slate-400 sm:flex-row">
            <p>© {new Date().getFullYear()} MUDRA Ltd. Government of India Refinance Entity. All Rights Reserved.</p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              {/* NCGTC-style font-size accessibility toggle */}
              <div
                className="flex items-center gap-1 rounded border border-slate-700"
                role="radiogroup"
                aria-label="Font size"
                title="Adjust font size (A- / A / A+)"
              >
                <button
                  type="button"
                  aria-label="Decrease font size"
                  className="px-2.5 py-1.5 text-slate-400 hover:text-white"
                >
                  A-
                </button>
                <span className="border-l border-slate-700 px-2.5 py-1.5">A</span>
                <button
                  type="button"
                  aria-label="Increase font size"
                  className="px-2.5 py-1.5 text-slate-400 hover:text-white"
                >
                  A+
                </button>
              </div>

              <span aria-hidden="true" className="text-white/20">•</span>
              <span className="flex items-center gap-1.5">
                <Globe size={12} className="text-slate-300" aria-hidden="true" />
                <span className="text-slate-300">English | हिंदी</span>
              </span>

              <span aria-hidden="true" className="text-white/20">•</span>
              <a href="#" className="transition-colors duration-200 hover:text-blue-400">Terms of Use</a>
              <span aria-hidden="true" className="text-white/20">•</span>
              <a href="#" className="transition-colors duration-200 hover:text-blue-400">Privacy Policy</a>
              <span aria-hidden="true" className="text-white/20">•</span>
              <Link to={createPageUrl('Sitemap')} className="transition-colors duration-200 hover:text-blue-400">Sitemap</Link>
            </div>

            {/* SIDBI-style certifications badge */}
            <div className="mt-3 sm:mt-0">
              <img
                src="https://www.sidbi.in/assets/front/images/Small_Industries_Development_Bank_of_India_IN_English_2025_Certification_Badge_transparent.png"
                alt="Great Place to Work Certified"
                className="h-7 w-auto opacity-80 grayscale hover:grayscale-0"
                loading="lazy"
              />
            </div>
          </div>
        </div>
        </div>
      </footer>
    );
  }

