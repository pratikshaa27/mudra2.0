import React from 'react';
import Header from '../components/home/Header';
import HeroSection from '../components/home/HeroSection';
import VisionMission from '../components/home/VisionMission';
import AboutPMMY from '../components/home/AboutPMMY';
import QuickLinks from '../components/home/QuickLinks';
import LoanProducts from '../components/home/LoanProducts';
import Footer from '../components/home/Footer';
import ChatBot from '../components/ChatBot';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <VisionMission />
      <AboutPMMY />
      <LoanProducts />
      <QuickLinks />
      <Footer />
      <ChatBot />
    </div>
  );
}