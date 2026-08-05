import React from 'react';
import Header from '../components/home/Header';
import HeroSection from '../components/home/HeroSection';
import AboutPMMY from '../components/home/AboutPMMY';
import LoanProducts from '../components/home/LoanProducts';
import SuccessStoriesCarousel from '../components/home/SuccessStoriesCarousel';
import ImpactStatistics from '../components/home/ImpactStatistics';
import AnnouncementsNews from '../components/home/AnnouncementsNews';
import SocialMediaFeed from '../components/home/SocialMediaFeed';
import QuickLinks from '../components/home/QuickLinks';
import Footer from '../components/home/Footer';
import ChatBot from '../components/ChatBot';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070b14] transition-colors duration-300">
      {/* Navigation Header */}
      <Header />

      {/* 1. Hero banner with CTA buttons */}
      <HeroSection />

      {/* 2. About MUDRA */}
      <AboutPMMY />

      {/* 3. Schemes overview */}
      <LoanProducts />

      {/* 4. Success stories carousel */}
      <SuccessStoriesCarousel />

      {/* 5. Impact statistics */}
      <ImpactStatistics />

      {/* 6. Announcements and news */}
      <AnnouncementsNews />

      {/* 7. Social media feed */}
      <SocialMediaFeed />

      {/* 8. Chatbot widget */}
      <ChatBot />

      {/* 9. Footer with quick links */}
      <QuickLinks />
      <Footer />
    </div>
  );
}