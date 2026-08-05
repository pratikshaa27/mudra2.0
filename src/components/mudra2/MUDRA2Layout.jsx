import React from 'react';
import Header from '../home/Header';
import Footer from '../home/Footer';
import ChatBot from '../ChatBot';

export default function MUDRA2Layout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070b14] text-slate-900 dark:text-slate-100 transition-colors duration-300 flex flex-col justify-between">
      <Header />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-8 w-full">
        {children}
      </main>
      <Footer />
      <ChatBot />
    </div>
  );
}
