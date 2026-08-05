import React from 'react';
import { LanguageProvider } from './components/LanguageContext';
import { ThemeProvider, useTheme } from './components/ThemeContext';
import ThemeSelector from './components/ThemeSelector';

function LayoutContent({ children }) {
  const { theme } = useTheme();
  
  return (
    <>
      <style>{`
        :root {
          --theme-primary: ${theme.primary};
          --theme-primary-light: ${theme.primaryLight};
          --theme-primary-dark: ${theme.primaryDark};
          --theme-secondary: ${theme.secondary};
          --theme-accent: ${theme.accent};
          --theme-gradient: ${theme.gradient};
        }
        
        /* Theme utility classes */
        .theme-bg-primary { background-color: var(--theme-primary) !important; }
        .theme-bg-gradient { background: var(--theme-gradient) !important; }
        .theme-text-primary { color: var(--theme-primary) !important; }
        .theme-border-primary { border-color: var(--theme-primary) !important; }
        .theme-ring-primary { --tw-ring-color: var(--theme-primary) !important; }
        
        .theme-hover-bg:hover { background-color: var(--theme-primary) !important; }
        .theme-hover-text:hover { color: var(--theme-primary) !important; }
        
        /* Override button primary colors */
        .btn-primary, button.bg-red-600, button.bg-red-700, 
        .bg-red-600, .bg-red-700, .bg-red-500, .bg-red-800, .bg-red-900 {
          background-color: var(--theme-primary) !important;
        }
        
        .hover\\:bg-red-700:hover, .hover\\:bg-red-600:hover, .hover\\:bg-red-800:hover {
          background-color: var(--theme-primary-dark) !important;
        }
        
        .text-red-600, .text-red-700, .text-red-500, .text-red-800, .text-red-900 {
          color: var(--theme-primary) !important;
        }
        
        .border-red-600, .border-red-700, .border-red-500 {
          border-color: var(--theme-primary) !important;
        }
        
        .from-red-600, .from-red-700, .from-red-800 {
          --tw-gradient-from: var(--theme-primary) !important;
        }
        
        .to-red-600, .to-red-700, .to-red-800, .to-red-900, .via-orange-500 {
          --tw-gradient-to: var(--theme-secondary) !important;
        }
        
        /* Progress bars */
        .bg-primary {
          background-color: var(--theme-primary) !important;
        }
        
        /* Amber/Orange colors */
        .text-amber-500, .text-amber-400, .text-amber-200, .text-orange-500 {
          color: var(--theme-accent) !important;
        }
        
        .bg-amber-400, .bg-amber-500, .bg-amber-600 {
          background-color: var(--theme-accent) !important;
        }
        
        .from-amber-400, .from-amber-50 {
          --tw-gradient-from: var(--theme-primary-light) !important;
        }
        
        .to-amber-600, .to-amber-100 {
          --tw-gradient-to: var(--theme-accent) !important;
        }
        
        /* Rings and focus states */
        .ring-red-500, .focus\\:ring-red-500:focus {
          --tw-ring-color: var(--theme-primary) !important;
        }
      `}</style>
      {children}
    </>
  );
}

export default function Layout({ children, currentPageName }) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <LayoutContent>{children}</LayoutContent>
      </LanguageProvider>
    </ThemeProvider>
  );
}