import React from 'react';
import { LanguageProvider } from './components/LanguageContext';
import { ThemeProvider } from './components/ThemeContext';

function LayoutContent({ children }) {
  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-amber-500 selection:text-white">
      {children}
    </div>
  );
}

export default function Layout({ children, currentPageName }) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <LayoutContent currentPageName={currentPageName}>{children}</LayoutContent>
      </LanguageProvider>
    </ThemeProvider>
  );
}