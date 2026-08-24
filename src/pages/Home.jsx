import React from 'react';
import Header from '../components/home/Header';
import HeroVideoBanner from '../components/home/HeroVideoBanner';
import HeroSlideshow from '../components/home/HeroSlideshow';
import SuccessStoriesCarousel from '../components/home/SuccessStoriesCarousel';
import LatestUpdatesTicker from '../components/home/LatestUpdatesTicker';
import ImpactDashboard from '../components/home/ImpactDashboard';
import QuickLinks from '../components/home/QuickLinks';
import AboutPMMY from '../components/home/AboutPMMY';
import VisionMission from '../components/home/VisionMission';
import LoanProducts from '../components/home/LoanProducts';
import LoanJourney from '../components/home/LoanJourney';
import FraudSafetyCenter from '../components/home/FraudSafetyCenter';
import AnnouncementsNews from '../components/home/AnnouncementsNews';
import SocialMediaFeed from '../components/home/SocialMediaFeed';
import Footer from '../components/home/Footer';
import ChatBot from '../components/ChatBot';

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-slate-50 transition-colors duration-300 dark:bg-[#021731]">

      {/* Global heritage backdrop: a faint watermark, not a competing photo —
          kept subtle so every section reads as a clean, high-contrast surface
          like the reference institutional sites (SIDBI/CGTMSE/NCGTC). */}
      <div
        className="pointer-events-none fixed inset-0 z-0 bg-cover bg-center opacity-[0.05] dark:opacity-[0.04]"
        style={{ backgroundImage: `url('/photo/tajmahal.png')` }}
        aria-hidden="true"
      />

      <div className="relative z-10">
        {/* Navigation Header */}
        <Header />

         <main id="main-content">
           {/* 1. Hero video banner with CTA buttons */}
           <HeroVideoBanner />

           {/* 2. PMMY Success Stories */}
           <SuccessStoriesCarousel />

           {/* 2b. Latest updates ticker */}
           <LatestUpdatesTicker />

           {/* 2c. Impact slideshow + trust-stats strip */}
           <HeroSlideshow />

           {/* 3. MUDRA Impact Dashboard — consolidated metric cards, trend chart,
                  demographic reach and PAN-India footprint */}
           <ImpactDashboard />

           {/* 4. Quick links / resource hub cards */}
           <QuickLinks />

           {/* 5. About MUDRA — pillars, process steps and achievements */}
           <AboutPMMY />

           {/* 6. MUDRA Vision & Mission */}
           <VisionMission />

           {/* 7. Schemes overview */}
           <LoanProducts />

           {/* 7b. Guided loan journey — eligibility, scheme, apply, track */}
           <LoanJourney />

           {/* 8. Fraud & Safety Center */}
           <FraudSafetyCenter />

           {/* 9. Announcements and news */}
           <AnnouncementsNews />

           {/* 10. Social media feed */}
           <SocialMediaFeed />
         </main>

        {/* 8. Chatbot widget */}
        <ChatBot />

        <Footer />
      </div>
    </div>
  );
}