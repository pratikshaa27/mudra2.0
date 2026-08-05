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
  ExternalLink
} from 'lucide-react';

export default function Footer() {
  const quickLinks = [
    { label: 'Home', href: createPageUrl('Home') },
    { label: 'About Us', href: createPageUrl('About') },
    { label: 'Gallery', href: createPageUrl('Gallery') },
    { label: 'Contact Us', href: createPageUrl('Contact') },
    { label: 'FAQ', href: '#' },
    { label: 'Careers', href: '#' },
  ];

  const importantLinks = [
    { label: 'SIDBI', href: '#' },
    { label: 'DFS', href: '#' },
    { label: 'NABARD', href: '#' },
    { label: 'UdyamiMitra Portal', href: '#' },
    { label: 'Stand Up India', href: '#' },
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950">
      {/* Disclaimer */}
      <div className="bg-red-900/90 py-3">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-amber-100 text-sm">
            *MUDRA is a refinancing Institution. MUDRA does not lend directly to the micro entrepreneurs / individuals. 
            Mudra loans under Pradhan Mantri Mudra Yojana (PMMY) can be availed of from nearby branch office of a bank, 
            NBFC, MFIs etc. Borrowers can also now file online application for MUDRA loans on Udyamimitra portal (www.udyamimitra.in).
          </p>
          <p className="text-amber-200 text-sm mt-2 font-medium">
            Note: There are no agents or middleman engaged by MUDRA for availing of Mudra Loans. The borrowers 
            are advised to keep away from persons posing as Agents/facilitators of MUDRA/PMMY.
          </p>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* About */}
            <div>
              <div className="mb-6 bg-amber-50 p-3 rounded-lg inline-block">
                <img 
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6978c66565209a38e92b1aa2/282d5f6a9_image.png"
                  alt="Pradhan Mantri MUDRA Yojana"
                  className="h-16 w-auto object-contain"
                />
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Micro Units Development & Refinance Agency Ltd. (MUDRA) is a financial institution 
                set up by Government of India for development and refinancing micro units enterprises.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-bold mb-6 text-lg">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link, idx) => (
                  <li key={idx}>
                    <Link 
                      to={link.href}
                      className="text-gray-400 hover:text-amber-400 text-sm flex items-center gap-2 transition-colors"
                    >
                      <span className="text-amber-500">»</span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Important Links */}
            <div>
              <h4 className="text-white font-bold mb-6 text-lg">Important Links</h4>
              <ul className="space-y-3">
                {importantLinks.map((link, idx) => (
                  <li key={idx}>
                    <a 
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-amber-400 text-sm flex items-center gap-2 transition-colors"
                    >
                      <ExternalLink size={12} className="text-amber-500" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-bold mb-6 text-lg">Contact Us</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="text-amber-500 flex-shrink-0 mt-1" size={18} />
                  <p className="text-gray-400 text-sm">
                    SWAVALAMBAN BHAWAN, C-11, G-Block,<br />
                    Bandra Kurla Complex, Bandra (E),<br />
                    Mumbai - 400051
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="text-amber-500" size={18} />
                  <p className="text-gray-400 text-sm">1800-xxx-xxxx (Toll Free)</p>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="text-amber-500" size={18} />
                  <p className="text-gray-400 text-sm">contact@mudra.org.in</p>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-3 mt-6">
                {[Facebook, Twitter, Youtube, Linkedin].map((Icon, idx) => (
                  <a 
                    key={idx}
                    href="#"
                    className="w-10 h-10 bg-gray-800 hover:bg-amber-600 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-all"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} MUDRA. All Rights Reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-gray-500 hover:text-amber-400">Terms of Use</a>
            <a href="#" className="text-gray-500 hover:text-amber-400">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-amber-400">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}