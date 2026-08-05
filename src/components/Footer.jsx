import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import {
  ShieldCheck, Phone, Mail, MapPin, ExternalLink, CheckCircle2
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0b1d30] text-slate-300 text-xs border-t border-slate-800 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-slate-800">

          {/* Col 1: About & Headquarters */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 font-black text-xl flex items-center justify-center border border-amber-400">
                M2
              </div>
              <div>
                <h3 className="text-white font-extrabold text-base tracking-wide">MUDRA 2.0 PORTAL</h3>
                <p className="text-[11px] text-amber-400 font-semibold">Micro Units Development & Refinance Agency Ltd.</p>
              </div>
            </div>

            <p className="text-slate-400 leading-relaxed text-xs max-w-md">
              A wholly-owned subsidiary of Small Industries Development Bank of India (SIDBI), established by the Government of India to refinance and empower financial institutions lending to micro-enterprises across the nation.
            </p>

            <div className="space-y-2 text-slate-300 pt-1">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>MUDRA Ltd., MSME Development Centre, Plot No. C-11, G Block, Bandra-Kurla Complex, Bandra (E), Mumbai - 400 051</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Toll-Free National Helpline: 1800-180-1111 / 1800-11-0001</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>help@mudra.org.in</span>
              </div>
            </div>
          </div>

          {/* Col 2: Schemes & Services */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wide border-b border-slate-800 pb-2">PMMY Schemes</h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <Link to={createPageUrl('PMMYPortal')} className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Shishu (Loans up to ₹50,000)
                </Link>
              </li>
              <li>
                <Link to={createPageUrl('PMMYPortal')} className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Kishore (₹50,000 to ₹5 Lakh)
                </Link>
              </li>
              <li>
                <Link to={createPageUrl('PMMYPortal')} className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Tarun (₹5 Lakh to ₹10 Lakh)
                </Link>
              </li>
              <li>
                <Link to={createPageUrl('PMMYPortal')} className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-amber-400" /> Tarun Plus (₹10 Lakh to ₹20 Lakh)
                </Link>
              </li>
              <li>
                <Link to={createPageUrl('AICreditScore')} className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-cyan-400" /> AI Credit Score Assessment
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Portal Portals & Tools */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wide border-b border-slate-800 pb-2">Key Portals</h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <Link to={createPageUrl('EntrepreneurOnboarding')} className="hover:text-white transition-colors">
                  Online Loan Application
                </Link>
              </li>
              <li>
                <Link to={createPageUrl('LoanTracking')} className="hover:text-white transition-colors">
                  Application Status Tracking
                </Link>
              </li>
              <li>
                <Link to={createPageUrl('LoanPassbook')} className="hover:text-white transition-colors">
                  Digital Passbook & Statements
                </Link>
              </li>
              <li>
                <Link to={createPageUrl('BankOfficerConsole')} className="hover:text-white transition-colors">
                  Bank Officer Sanction Console
                </Link>
              </li>
              <li>
                <Link to={createPageUrl('SkillTraining')} className="hover:text-white transition-colors">
                  Skill India Integration
                </Link>
              </li>
              <li>
                <Link to={createPageUrl('AdminDashboard')} className="hover:text-white transition-colors">
                  CMS Administrative Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Statutory & Partner Agencies */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wide border-b border-slate-800 pb-2">Statutory Partners</h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a href="https://www.sidbi.in/" target="_blank" rel="noopener noreferrer" className="hover:text-amber-300 transition-colors flex items-center gap-1">
                  SIDBI Official Portal <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://www.cgtmse.in/" target="_blank" rel="noopener noreferrer" className="hover:text-amber-300 transition-colors flex items-center gap-1">
                  CGTMSE Guarantee Fund <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://www.ncgtc.in/" target="_blank" rel="noopener noreferrer" className="hover:text-amber-300 transition-colors flex items-center gap-1">
                  NCGTC Credit Guarantee <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://financialservices.gov.in/" target="_blank" rel="noopener noreferrer" className="hover:text-amber-300 transition-colors flex items-center gap-1">
                  Department of Financial Services <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://pgportal.gov.in/" target="_blank" rel="noopener noreferrer" className="hover:text-amber-300 transition-colors flex items-center gap-1">
                  CPGRAMS Public Grievances <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Advisory Warning Note */}
        <div className="my-6 p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-white font-bold text-xs">Official Statutory Advisory Notice</p>
              <p className="text-slate-400 text-[11px] mt-0.5 leading-relaxed">
                MUDRA Ltd. does not sanction individual loans directly. Loans under PMMY are sanctioned exclusively through Member Lending Institutions (Banks, MFIs, NBFCs). MUDRA does not charge any upfront fees or engage third-party agents.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Rights & Links */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 pt-4 border-t border-slate-800/60">
          <div>
            © {new Date().getFullYear()} MUDRA Ltd. (Subsidiary of SIDBI). All Rights Reserved. Govt. of India Enterprise.
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#terms" className="hover:text-white transition-colors">Terms of Service</a>
            <span>•</span>
            <a href="#disclaimer" className="hover:text-white transition-colors">Disclaimer</a>
            <span>•</span>
            <a href="#accessibility" className="hover:text-white transition-colors">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
