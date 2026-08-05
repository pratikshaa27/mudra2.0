import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, Users, Target, Award, CheckCircle } from 'lucide-react';
import Header from '../components/home/Header';
import Footer from '../components/home/Footer';
import ChatBot from '../components/ChatBot';
import { useLanguage } from '../components/LanguageContext';

export default function About() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('vision');
  
  const highlights = [
    { icon: Building2, value: '₹33+ Lakh Cr', label: t('loansDisbursed') },
    { icon: Users, value: '50+ Crore', label: t('loansSanctioned') },
    { icon: Target, value: '70%', label: t('womenBeneficiaries') },
    { icon: Award, value: '10 Years', label: t('ofService') },
  ];

  const features = [
    'Collateral-free loans up to ₹20 Lakh',
    'Available through Banks, NBFCs, and MFIs',
    'No processing fee charged',
    'Quick loan processing',
    'Support for first-generation entrepreneurs',
    'Inclusive growth focus',
  ];

  const tabs = [
    { id: 'vision', label: 'Vision & Mission' },
    { id: 'genesis', label: 'Genesis and Role of MUDRA' },
    { id: 'structure', label: 'Organization Structure' },
    { id: 'board', label: 'Board of Directors' },
    { id: 'management', label: 'Management' },
    { id: 'shareholders', label: 'Shareholders' },
    { id: 'partners', label: 'Partners (MLI)' },
  ];

  const tabContent = {
    vision: {
      title: 'Vision & Mission',
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-red-700 mb-3">Vision</h3>
            <p className="text-gray-700 leading-relaxed">
              To be a premier refinancing institution that empowers micro and small enterprises through inclusive and sustainable financial inclusion, fostering entrepreneurship and economic development across India.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-red-700 mb-3">Mission</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex gap-3"><CheckCircle className="text-amber-500 flex-shrink-0" size={20} />To provide timely and hassle-free credit to micro and small enterprises.</li>
              <li className="flex gap-3"><CheckCircle className="text-amber-500 flex-shrink-0" size={20} />To empower first-generation entrepreneurs and women entrepreneurs.</li>
              <li className="flex gap-3"><CheckCircle className="text-amber-500 flex-shrink-0" size={20} />To support inclusive growth by reaching underserved areas and communities.</li>
              <li className="flex gap-3"><CheckCircle className="text-amber-500 flex-shrink-0" size={20} />To facilitate skill development and capacity building in the micro enterprise sector.</li>
            </ul>
          </div>
        </div>
      )
    },
    genesis: {
      title: 'Genesis and Role of MUDRA',
      content: (
        <div className="space-y-4 text-gray-700">
          <p>
            <strong>MUDRA (Micro Units Development and Refinance Agency Ltd.)</strong> was established on April 8, 2015, as an initiative of the Government of India to provide a supportive ecosystem for micro and small enterprises.
          </p>
          <div>
            <h4 className="font-bold text-lg text-red-700 mb-2">Key Role</h4>
            <ul className="space-y-2">
              <li>• Provides refinance support to Member Lending Institutions (MLIs) including Banks, NBFCs, and MFIs</li>
              <li>• Facilitates credit flow to unserved and underserved sections of the society</li>
              <li>• Monitors and supports implementation of Pradhan Mantri Mudra Yojana (PMMY)</li>
              <li>• Conducts research and collects data on micro enterprise sector</li>
              <li>• Provides capacity building and training support to partner institutions</li>
            </ul>
          </div>
          <p>
            MUDRA operates as a wholly owned subsidiary of SIDBI and is headquartered in Mumbai with regional offices across India.
          </p>
        </div>
      )
    },
    structure: {
      title: 'Organization Structure',
      content: (
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border-l-4 border-blue-600">
              <h4 className="font-bold text-gray-900 mb-3">Board of Directors</h4>
              <p className="text-sm text-gray-800">Consists of 8-10 members including Managing Director and Director nominees from SIDBI</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border-l-4 border-green-600">
              <h4 className="font-bold text-gray-900 mb-3">Management</h4>
              <p className="text-sm text-gray-800">Led by Managing Director with departments for Operations, Risk Management, and Finance</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border-l-4 border-purple-600">
              <h4 className="font-bold text-gray-900 mb-3">Regional Offices</h4>
              <p className="text-sm text-gray-800">12 Regional offices across India for on-ground operations and monitoring</p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg border-l-4 border-orange-600">
              <h4 className="font-bold text-gray-900 mb-3">Support Functions</h4>
              <p className="text-sm text-gray-800">Finance, HR, IT, Legal, and Compliance teams ensuring operational excellence</p>
            </div>
          </div>
        </div>
      )
    },
    board: {
      title: 'Board of Directors',
      content: (
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { name: 'Shri Rajesh Kumar Verma', title: 'Chairman', desc: 'Former Managing Director, SIDBI' },
              { name: 'Ms. Priya Sharma', title: 'Managing Director', desc: 'Chief Executive Officer, MUDRA Ltd.' },
              { name: 'Shri Arun Patel', title: 'Director (Finance)', desc: 'IAS Officer, Ministry of Finance' },
              { name: 'Ms. Deepa Singh', title: 'Director (Operations)', desc: 'Banking Expert with 25+ years experience' },
              { name: 'Shri Vikram Reddy', title: 'Independent Director', desc: 'Entrepreneur & Business Consultant' },
              { name: 'Ms. Anjali Gupta', title: 'Independent Director', desc: 'Women Entrepreneur & Social Worker' },
            ].map((member, idx) => (
              <div key={idx} className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-lg transition">
                <h4 className="font-bold text-gray-800">{member.name}</h4>
                <p className="text-red-700 font-semibold text-sm">{member.title}</p>
                <p className="text-gray-600 text-xs mt-2">{member.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )
    },
    management: {
      title: 'Management Team',
      content: (
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { name: 'Ms. Priya Sharma', role: 'Managing Director', dept: 'Overall Leadership & Strategy' },
              { name: 'Shri Suresh Patel', role: 'Chief Operating Officer', dept: 'Operations & Implementation' },
              { name: 'Dr. Ramesh Joshi', role: 'Chief Credit Officer', dept: 'Credit Risk & Compliance' },
              { name: 'Ms. Neha Kapoor', role: 'Chief Financial Officer', dept: 'Finance & Treasury' },
              { name: 'Shri Arjun Kumar', role: 'Head - Policy & Research', dept: 'Data Analytics & Reports' },
              { name: 'Ms. Priyanka Singh', role: 'Head - HR & Admin', dept: 'Human Resources & Operations' },
            ].map((member, idx) => (
              <div key={idx} className="bg-gradient-to-br from-amber-50 to-amber-100 p-4 rounded-lg border border-amber-200">
                <h4 className="font-bold text-gray-800">{member.name}</h4>
                <p className="text-red-700 font-semibold text-sm">{member.role}</p>
                <p className="text-gray-600 text-xs mt-2">{member.dept}</p>
              </div>
            ))}
          </div>
        </div>
      )
    },
    shareholders: {
      title: 'Shareholders',
      content: (
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-lg border-l-4 border-red-700">
            <h4 className="font-bold text-2xl text-red-700 mb-4">100% Government Ownership</h4>
            <p className="text-gray-700 mb-4">
              MUDRA Ltd. is a wholly owned subsidiary of SIDBI (Small Industries Development Bank of India).
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-4 p-3 bg-red-50 rounded">
                <div className="w-12 h-12 bg-red-700 text-white rounded-full flex items-center justify-center font-bold">100%</div>
                <div>
                  <p className="font-bold text-gray-800">SIDBI (Small Industries Development Bank of India)</p>
                  <p className="text-sm text-gray-600">Promoted by Government of India, Ministry of Finance</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
            <h4 className="font-bold text-gray-900 mb-3">Government Support</h4>
            <p className="text-gray-800 text-sm">
              MUDRA operates under the Government of India's policy to promote entrepreneurship and financial inclusion. All policy decisions are aligned with national priorities for economic development and job creation.
            </p>
          </div>
        </div>
      )
    },
    partners: {
      title: 'Partners (Member Lending Institutions)',
      content: (
        <div className="space-y-4">
          <p className="text-gray-700">
            MUDRA works with diverse Member Lending Institutions (MLIs) to reach micro enterprises across India:
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border-l-4 border-green-600">
              <h5 className="font-bold text-gray-900 mb-2">Public Sector Banks</h5>
              <p className="text-sm text-gray-800">SBI, Bank of India, Union Bank, Central Bank, and 14+ other PSU banks</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border-l-4 border-blue-600">
              <h5 className="font-bold text-gray-900 mb-2">Private Sector Banks</h5>
              <p className="text-sm text-gray-800">HDFC Bank, ICICI Bank, Axis Bank, Kotak Mahindra, Yes Bank</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border-l-4 border-purple-600">
              <h5 className="font-bold text-gray-900 mb-2">Regional Rural Banks</h5>
              <p className="text-sm text-gray-800">56+ RRBs across India focusing on rural and semi-urban areas</p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg border-l-4 border-orange-600">
              <h5 className="font-bold text-gray-900 mb-2">Small Finance Banks</h5>
              <p className="text-sm text-gray-800">Ujjivan SFB, Equitas SFB, and other specialized lenders</p>
            </div>
            <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-4 rounded-lg border-l-4 border-pink-600">
              <h5 className="font-bold text-gray-900 mb-2">MFIs</h5>
              <p className="text-sm text-gray-800">SVCL, Bandhan, Ujjivan, Equitas, and 200+ microfinance institutions</p>
            </div>
            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-4 rounded-lg border-l-4 border-indigo-600">
              <h5 className="font-bold text-gray-900 mb-2">NBFCs</h5>
              <p className="text-sm text-gray-800">Specialized NBFC lenders engaged in micro-credit disbursement</p>
            </div>
          </div>
        </div>
      )
    },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Page Header */}
      <div className="relative overflow-hidden py-8">
        <div className="absolute inset-0">
          <img 
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6978c66565209a38e92b1aa2/3818bf03f_image.png"
            alt="India"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-2xl" style={{ color: '#fff' }}>{t('aboutMudra')}</h1>
            <p className="text-lg max-w-2xl mx-auto drop-shadow-2xl font-semibold" style={{ color: '#fff' }}>
              {t('empoweringText')}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 -mt-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {highlights.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-xl shadow-xl p-6 text-center"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <item.icon className="text-white" size={24} />
              </div>
              <p className="text-2xl font-bold text-red-700">{item.value}</p>
              <p className="text-gray-500 text-sm">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Leadership & Achievement Section */}
      <div className="bg-gradient-to-br from-amber-50 to-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8 items-center"
          >
            <div className="flex justify-center">
              <div className="relative">
                <img 
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6978c66565209a38e92b1aa2/39d1e2421_image.png"
                  alt="Hon'ble Prime Minister of India"
                  className="w-72 h-80 object-cover rounded-2xl shadow-2xl border-4 border-white"
                />
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{t('messageFromLeadership')}</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-red-700 to-amber-500 mb-6"></div>
              <p className="text-gray-700 leading-relaxed mb-4">
                Pradhan Mantri MUDRA Yojana was launched to provide funding support to micro and small enterprises, 
                enabling them to grow their business and contribute to India's economic development.
              </p>
              <p className="text-gray-700 leading-relaxed">
                The scheme aims to empower entrepreneurs, especially women and youth, by providing easy access 
                to credit without collateral requirements, fostering inclusive growth across the nation.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Tab Navigation */}
          <div className="flex flex-wrap border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-4 py-4 text-sm font-medium transition-colors border-b-2 ${
                  activeTab === tab.id
                    ? 'text-red-700 border-red-700 bg-red-50'
                    : 'text-gray-600 border-transparent hover:text-gray-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="p-8"
          >
            <h3 className="text-3xl font-bold text-gray-800 mb-6">{tabContent[activeTab].title}</h3>
            <div className="w-20 h-1 bg-gradient-to-r from-red-700 to-amber-500 mb-6"></div>
            {tabContent[activeTab].content}
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Micro Units Development & Refinance Agency Ltd.
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-red-700 to-amber-500 mb-6"></div>
            
            <div className="prose prose-lg text-gray-600 space-y-4">
              <p>
                MUDRA (Micro Units Development and Refinance Agency Ltd.) is a financial institution 
                set up by the Government of India for development and refinancing of micro units enterprises. 
                It was announced by the Hon'ble Finance Minister while presenting the Union Budget for 
                FY 2015-16 and was formally launched on April 8, 2015.
              </p>
              <p>
                MUDRA provides refinance to lending institutions like Banks, NBFCs, and MFIs who 
                provide loans to micro enterprises, engaged in manufacturing, trading and service 
                activities, in both rural and urban areas.
              </p>
              <p>
                Under the aegis of PMMY (Pradhan Mantri Mudra Yojana), MUDRA has created four 
                products namely 'Shishu', 'Kishore', 'Tarun' and 'TarunPlus' to signify the stage 
                of growth/development and funding needs of the beneficiary micro unit/entrepreneur.
              </p>
            </div>
          </motion.div>

          {/* Right Content - Features */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-gradient-to-br from-red-800 to-red-900 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Key Features</h3>
              <ul className="space-y-4">
                {features.map((feature, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className="text-amber-400 flex-shrink-0 mt-0.5" size={20} />
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* CTA Card */}
            <div className="mt-6 bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-8 border-2 border-amber-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Apply for MUDRA Loan</h3>
              <p className="text-gray-600 mb-6">
                Visit the UdyamiMitra portal to apply online for MUDRA loans or visit your 
                nearest bank branch.
              </p>
              <a 
                href="https://www.udyamimitra.in" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-gradient-to-r from-red-700 to-red-800 text-white px-6 py-3 rounded-lg font-semibold hover:from-red-800 hover:to-red-900 transition-all shadow-lg"
              >
                Visit UdyamiMitra Portal
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Organization Section */}
      <div className="bg-white py-10">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Organization</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-red-700 to-amber-500 mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'SIDBI',
                desc: 'MUDRA is a wholly owned subsidiary of Small Industries Development Bank of India (SIDBI).'
              },
              {
                title: 'Partner Institutions',
                desc: 'Works with Banks, NBFCs, MFIs, and other financial institutions across India.'
              },
              {
                title: 'National Coverage',
                desc: 'MUDRA loans are available across all states and union territories of India.'
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 shadow-lg border border-gray-100"
              >
                <h3 className="text-xl font-bold text-red-700 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
      <ChatBot />
    </div>
  );
}