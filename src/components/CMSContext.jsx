import React, { createContext, useContext, useState, useEffect } from 'react';

const CMSContext = createContext();

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
};

// Initial default data for MUDRA 2.0 homepage
const initialCMSData = {
  mockupTheme: 'mockup1', // 'mockup1' (Light FinTech Neo-MUDRA) or 'mockup2' (Executive Financial Light)
  announcements: [
    { id: '1', title: 'Tarun Plus Loan Category Launched - Funding up to ₹20 Lakhs for Expanding MSMEs', category: 'Scheme Update', date: 'Aug 2026', link: '#tarunplus', urgent: true },
    { id: '2', title: '100% Interest Subvention for Women-led Micro-Enterprises in North East Region', category: 'Special Incentive', date: 'Jul 2026', link: '#women-empowerment', urgent: false },
    { id: '3', title: 'Integrated Skill India Portal Linkage: Get Automatic Pre-approved Credit Rating upon Course Completion', category: 'Feature Launch', date: 'Jul 2026', link: '#skill-linkage', urgent: false },
    { id: '4', title: 'MUDRA Mega Loan Mela 2026: Sanctions in under 15 Minutes across 500+ Districts', category: 'Event', date: 'Aug 2026', link: '#loan-mela', urgent: true }
  ],
  banners: [
    {
      id: 'b1',
      title: '₹33,00,000+ Crore Disbursed',
      subtitle: 'Collateral-free MUDRA loans empowering micro-enterprises and small businesses across India.',
      badge: '10 Years of MUDRA',
      image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6978c66565209a38e92b1aa2/39d1e2421_image.png',
      ctaText: 'Apply For Loan',
      ctaLink: '/EntrepreneurOnboarding',
      secondaryCtaText: 'Explore Schemes',
      secondaryCtaLink: '#schemes',
      highlightTag: 'Instant Sanction'
    },
    {
      id: 'b2',
      title: 'Fueling MSME Innovation & Skill Linkage',
      subtitle: 'Gain certified Skill India training and unlock enhanced credit limits with zero third-party guarantees.',
      badge: 'Skill + Credit Synergy',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
      ctaText: 'Skill Training Portal',
      ctaLink: '/SkillTraining',
      secondaryCtaText: 'Check AI Score',
      secondaryCtaLink: '/AICreditScore',
      highlightTag: 'Pre-Approved'
    },
    {
      id: 'b3',
      title: 'Women Entrepreneurship Guarantee Scheme',
      subtitle: 'Special concession on interest rates & priority processing for women micro-entrepreneurs.',
      badge: '70%+ Women Beneficiaries',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80',
      ctaText: 'Women MSME Portal',
      ctaLink: '/EntrepreneurOnboarding',
      secondaryCtaText: 'Success Stories',
      secondaryCtaLink: '#stories',
      highlightTag: 'Priority Access'
    }
  ],
  impactStats: {
    totalDisbursed: '₹33.5 Lakh Cr',
    disbursedLabel: 'Total Disbursed Since Inception',
    totalAccounts: '46.2 Crore+',
    accountsLabel: 'Sanctioned Loan Accounts',
    womenBeneficiaries: '71%',
    womenLabel: 'Women Entrepreneurs Benefited',
    newEntrepreneurs: '5.4 Crore+',
    newLabel: 'First-time Business Owners'
  },
  schemes: [
    {
      id: 'shishu',
      name: 'Shishu Loan',
      tagline: 'Seed capital for new micro-businesses & startups',
      amount: 'Up to ₹50,000',
      tenure: 'Up to 5 Years',
      interestRate: '8.5% - 10.0%',
      processingFee: 'Nil',
      collateral: 'No Collateral Required',
      features: ['Ideal for street vendors, artisans, small traders', 'Minimal documentation & instant Aadhar verification', 'Flexible repayment schedule'],
      badgeColor: 'bg-emerald-500',
      popular: false
    },
    {
      id: 'kishore',
      name: 'Kishore Loan',
      tagline: 'Working capital & machinery for growing ventures',
      amount: '₹50,001 to ₹5.00 Lakhs',
      tenure: '3 to 5 Years',
      interestRate: '9.0% - 11.5%',
      processingFee: 'Nil to Nominal',
      collateral: 'No Collateral Required',
      features: ['Equipment purchase & inventory expansion', 'Seamless digital passbook integration', 'Subvention for Skill India certified users'],
      badgeColor: 'bg-blue-600',
      popular: true
    },
    {
      id: 'tarun',
      name: 'Tarun Loan',
      tagline: 'Scaling up established micro-enterprises',
      amount: '₹5.00 Lakhs to ₹10.00 Lakhs',
      tenure: '5 to 7 Years',
      interestRate: '9.5% - 12.0%',
      processingFee: 'As per Lender Policy',
      collateral: 'No Collateral Required',
      features: ['Business diversification & technology upgrades', 'AI credit scoring with custom EMI builder', 'CGTMSE guarantee backed'],
      badgeColor: 'bg-purple-600',
      popular: false
    },
    {
      id: 'tarunplus',
      name: 'Tarun Plus Loan',
      tagline: 'MUDRA 2.0 flagship for high-growth mature MSMEs',
      amount: '₹10.00 Lakhs to ₹20.00 Lakhs',
      tenure: 'Up to 7 Years',
      interestRate: '9.25% - 11.75%',
      processingFee: 'Discounted for Digital Applicants',
      collateral: 'No Collateral Required',
      features: ['Higher credit limit for proven track record borrowers', 'Priority green energy & manufacturing subventions', 'End-to-end digital approval workflow'],
      badgeColor: 'bg-amber-600',
      popular: true
    }
  ],
  successStories: [
    {
      id: 's1',
      name: 'Priya Sharma',
      venture: 'EcoWeave Organics',
      location: 'Varanasi, Uttar Pradesh',
      category: 'Handloom & Textile',
      loanCategory: 'Tarun (₹8 Lakhs)',
      photo: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80',
      quote: 'With MUDRA Tarun loan, I scaled my handloom unit from 2 looms to 18 automated looms, hiring 25 local women artisan weavers.',
      impact: 'Created 25+ local jobs & exporting eco-friendly textiles globally.',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    },
    {
      id: 's2',
      name: 'Rajesh Kumar',
      venture: 'SmartAgri Hydroponics',
      location: 'Pune, Maharashtra',
      category: 'Agri-Tech Enterprise',
      loanCategory: 'Kishore (₹4.5 Lakhs)',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
      quote: 'MUDRA Kishore loan provided the exact working capital needed to setup solar-powered automated hydroponic green shelters.',
      impact: 'Supplies organic produce to 40+ supermarkets across Pune.',
      videoUrl: ''
    },
    {
      id: 's3',
      name: 'Ananya Roy',
      venture: 'TechSparks Electronics Repair Hub',
      location: 'Kolkata, West Bengal',
      category: 'Services & Tech',
      loanCategory: 'Shishu (₹50,000)',
      photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
      quote: 'Starting as a small repair counter, Shishu funding allowed me to buy diagnostic testing kits and register my e-waste recycling firm.',
      impact: 'Recognized as Top 3 Women Technician Startup in Eastern India.',
      videoUrl: ''
    }
  ],
  socialPosts: [
    {
      id: 'sp1',
      platform: 'twitter',
      author: 'MUDRA Ltd (Official)',
      handle: '@MudraLtd',
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=mudra',
      date: '2 hours ago',
      content: '🚀 Empowering MSMEs across India! Over 45 Crore loan accounts sanctioned under Pradhan Mantri MUDRA Yojana. Apply digitally via MUDRA 2.0 portal with zero collateral! #MUDRA2 #FinancialInclusion #AtmanirbharBharat',
      likes: 1240,
      retweets: 432,
      media: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'sp2',
      platform: 'youtube',
      author: 'MUDRA Official Channel',
      handle: '@MUDRAIndiaYoutube',
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=youtube',
      date: '1 day ago',
      content: '📹 WATCH: How Priya Sharma transformed her Varanasi handloom unit into a global export brand with MUDRA Tarun Loan. #SuccessStory #WomenInBusiness',
      likes: 3890,
      retweets: 910,
      videoTitle: 'MUDRA Success Story - EcoWeave Organics Varanasi',
      videoDuration: '3:45',
      thumbnail: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
      id: 'sp3',
      platform: 'linkedin',
      author: 'Micro Units Development & Refinance Agency Ltd.',
      handle: 'MUDRA Bank Official',
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=linkedin',
      date: '2 days ago',
      content: 'We are excited to introduce the Tarun Plus scheme expanding collateral-free micro credit up to ₹20 Lakhs for proven MSME leaders. Partnering with SIDBI, CGTMSE, and NCGTC to guarantee credit access.',
      likes: 2850,
      retweets: 310,
      media: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80'
    }
  ]
};

export const CMSProvider = ({ children }) => {
  const [cmsData, setCmsData] = useState(() => {
    const saved = localStorage.getItem('mudra_cms_data_v2');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          ...initialCMSData,
          ...parsed,
          banners: parsed.banners?.length ? parsed.banners : initialCMSData.banners,
          successStories: parsed.successStories?.length ? parsed.successStories : initialCMSData.successStories,
          schemes: parsed.schemes?.length ? parsed.schemes : initialCMSData.schemes,
        };
      } catch (e) {
        console.error('Failed to parse CMS data from localStorage', e);
      }
    }
    return initialCMSData;
  });

  useEffect(() => {
    localStorage.setItem('mudra_cms_data_v2', JSON.stringify(cmsData));
  }, [cmsData]);

  const updateMockupTheme = (theme) => {
    setCmsData(prev => ({ ...prev, mockupTheme: theme }));
  };

  const updateBanners = (newBanners) => {
    setCmsData(prev => ({ ...prev, banners: newBanners }));
  };

  const updateAnnouncements = (newAnnouncements) => {
    setCmsData(prev => ({ ...prev, announcements: newAnnouncements }));
  };

  const updateImpactStats = (newStats) => {
    setCmsData(prev => ({ ...prev, impactStats: newStats }));
  };

  const updateSuccessStories = (newStories) => {
    setCmsData(prev => ({ ...prev, successStories: newStories }));
  };

  const updateSchemes = (newSchemes) => {
    setCmsData(prev => ({ ...prev, schemes: newSchemes }));
  };

  const updateSocialPosts = (newPosts) => {
    setCmsData(prev => ({ ...prev, socialPosts: newPosts }));
  };

  const resetToDefaults = () => {
    setCmsData(initialCMSData);
    localStorage.removeItem('mudra_cms_data');
    localStorage.removeItem('mudra_cms_data_v2');
  };

  return (
    <CMSContext.Provider
      value={{
        cmsData,
        updateMockupTheme,
        updateBanners,
        updateAnnouncements,
        updateImpactStats,
        updateSuccessStories,
        updateSchemes,
        updateSocialPosts,
        resetToDefaults
      }}
    >
      {children}
    </CMSContext.Provider>
  );
};
