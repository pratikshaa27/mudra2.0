import React from 'react';
import Header from '../components/home/Header';
import HeroSection from '../components/home/HeroSection';
import AboutPMMY from '../components/home/AboutPMMY';
import VisionMission from '../components/home/VisionMission';
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
    <div className="min-h-screen bg-slate-50 dark:bg-[#070b14] transition-colors duration-300 relative overflow-hidden">
      
      {/* Global Taj Mahal Fixed Background Image Effect for Home Page */}
      <div 
        className="absolute inset-0 pointer-events-none bg-cover bg-center bg-fixed filter brightness-105 contrast-110 opacity-75 dark:opacity-55 z-0"
        style={{ backgroundImage: `url('/photo/tajmahal.png')` }}
      />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#fffbeb]/70 via-white/50 to-[#fffbeb]/80 dark:from-[#070b14]/85 dark:via-[#070b14]/75 dark:to-[#070b14]/90 z-0" />

      <div className="relative z-10">
        {/* Navigation Header */}
        <Header />

        {/* 1. Hero banner with CTA buttons */}
        <HeroSection />

        {/* 2. About MUDRA */}
        <AboutPMMY />

        {/* 2b. MUDRA Vision & Mission */}
        <VisionMission />

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
    </div>
  );
}