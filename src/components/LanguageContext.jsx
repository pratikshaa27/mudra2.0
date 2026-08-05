import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

export const translations = {
  en: {
    home: 'HOME',
    aboutUs: 'ABOUT US',
    offerings: 'OFFERINGS',
    financials: 'FINANCIALS',
    faq: 'FAQ',
    gallery: 'GALLERY',
    successStories: 'SUCCESS STORIES',
    careers: 'CAREERS',
    contactUs: 'CONTACT US',
    loginPortal: 'LOGIN FOR PMMY PORTAL',
    aboutMudra: 'About MUDRA',
    empoweringText: 'Empowering micro enterprises across India through accessible and affordable credit',
    messageFromLeadership: 'Message from Leadership',
    visionTitle: 'MUDRA VISION',
    missionTitle: 'MUDRA MISSION',
    loansDisbursed: 'Loans Disbursed',
    loansSanctioned: 'Loans Sanctioned',
    womenBeneficiaries: 'Women Beneficiaries',
    ofService: 'Of Service',
  },
  hi: {
    home: 'मुख्य पृष्ठ',
    aboutUs: 'हमारे बारे में',
    offerings: 'योजनाएं',
    financials: 'वित्तीय',
    faq: 'सामान्य प्रश्न',
    gallery: 'गैलरी',
    successStories: 'सफलता की कहानियां',
    careers: 'करियर',
    contactUs: 'संपर्क करें',
    loginPortal: 'PMMY पोर्टल लॉगिन',
    aboutMudra: 'मुद्रा के बारे में',
    empoweringText: 'सुलभ और किफायती ऋण के माध्यम से भारत भर में सूक्ष्म उद्यमों को सशक्त बनाना',
    messageFromLeadership: 'नेतृत्व से संदेश',
    visionTitle: 'मुद्रा दृष्टिकोण',
    missionTitle: 'मुद्रा मिशन',
    loansDisbursed: 'वितरित ऋण',
    loansSanctioned: 'स्वीकृत ऋण',
    womenBeneficiaries: 'महिला लाभार्थी',
    ofService: 'सेवा के वर्ष',
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'hi' : 'en');
  };

  const t = (key) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};