import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const themes = {
  red: {
    name: 'MUDRA Red',
    primary: '#dc2626',
    primaryLight: '#fca5a5',
    primaryDark: '#991b1b',
    secondary: '#f97316',
    accent: '#fb923c',
    gradient: 'linear-gradient(135deg, #dc2626 0%, #f97316 100%)',
    cardGradient: 'linear-gradient(135deg, #fef2f2 0%, #fff7ed 100%)',
  },
  blue: {
    name: 'Ocean Blue',
    primary: '#2563eb',
    primaryLight: '#93c5fd',
    primaryDark: '#1e40af',
    secondary: '#3b82f6',
    accent: '#60a5fa',
    gradient: 'linear-gradient(135deg, #2563eb 0%, #06b6d4 100%)',
    cardGradient: 'linear-gradient(135deg, #eff6ff 0%, #ecfeff 100%)',
  },
  green: {
    name: 'Nature Green',
    primary: '#16a34a',
    primaryLight: '#86efac',
    primaryDark: '#15803d',
    secondary: '#22c55e',
    accent: '#4ade80',
    gradient: 'linear-gradient(135deg, #16a34a 0%, #10b981 100%)',
    cardGradient: 'linear-gradient(135deg, #f0fdf4 0%, #d1fae5 100%)',
  },
  purple: {
    name: 'Royal Purple',
    primary: '#9333ea',
    primaryLight: '#d8b4fe',
    primaryDark: '#7e22ce',
    secondary: '#a855f7',
    accent: '#c084fc',
    gradient: 'linear-gradient(135deg, #9333ea 0%, #d946ef 100%)',
    cardGradient: 'linear-gradient(135deg, #faf5ff 0%, #fae8ff 100%)',
  },
  indigo: {
    name: 'Digital Indigo',
    primary: '#4f46e5',
    primaryLight: '#a5b4fc',
    primaryDark: '#4338ca',
    secondary: '#6366f1',
    accent: '#818cf8',
    gradient: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
    cardGradient: 'linear-gradient(135deg, #eef2ff 0%, #f5f3ff 100%)',
  },
  teal: {
    name: 'Fresh Teal',
    primary: '#0d9488',
    primaryLight: '#5eead4',
    primaryDark: '#0f766e',
    secondary: '#14b8a6',
    accent: '#2dd4bf',
    gradient: 'linear-gradient(135deg, #0d9488 0%, #06b6d4 100%)',
    cardGradient: 'linear-gradient(135deg, #f0fdfa 0%, #ecfeff 100%)',
  },
  rose: {
    name: 'Rose Pink',
    primary: '#e11d48',
    primaryLight: '#fda4af',
    primaryDark: '#9f1239',
    secondary: '#f43f5e',
    accent: '#fb7185',
    gradient: 'linear-gradient(135deg, #e11d48 0%, #ec4899 100%)',
    cardGradient: 'linear-gradient(135deg, #fff1f2 0%, #fce7f3 100%)',
  },
  amber: {
    name: 'Golden Amber',
    primary: '#d97706',
    primaryLight: '#fcd34d',
    primaryDark: '#92400e',
    secondary: '#f59e0b',
    accent: '#fbbf24',
    gradient: 'linear-gradient(135deg, #d97706 0%, #f59e0b 100%)',
    cardGradient: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
  },
  slate: {
    name: 'Modern Slate',
    primary: '#475569',
    primaryLight: '#94a3b8',
    primaryDark: '#1e293b',
    secondary: '#64748b',
    accent: '#cbd5e1',
    gradient: 'linear-gradient(135deg, #475569 0%, #64748b 100%)',
    cardGradient: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
  },
  emerald: {
    name: 'Emerald Green',
    primary: '#059669',
    primaryLight: '#6ee7b7',
    primaryDark: '#065f46',
    secondary: '#10b981',
    accent: '#34d399',
    gradient: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
    cardGradient: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
  },
  sky: {
    name: 'Sky Blue',
    primary: '#0284c7',
    primaryLight: '#7dd3fc',
    primaryDark: '#075985',
    secondary: '#0ea5e9',
    accent: '#38bdf8',
    gradient: 'linear-gradient(135deg, #0284c7 0%, #0ea5e9 100%)',
    cardGradient: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
  },
  violet: {
    name: 'Deep Violet',
    primary: '#7c3aed',
    primaryLight: '#c4b5fd',
    primaryDark: '#5b21b6',
    secondary: '#8b5cf6',
    accent: '#a78bfa',
    gradient: 'linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%)',
    cardGradient: 'linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)',
  },
  cyan: {
    name: 'Bright Cyan',
    primary: '#0891b2',
    primaryLight: '#67e8f9',
    primaryDark: '#155e75',
    secondary: '#06b6d4',
    accent: '#22d3ee',
    gradient: 'linear-gradient(135deg, #0891b2 0%, #06b6d4 100%)',
    cardGradient: 'linear-gradient(135deg, #ecfeff 0%, #cffafe 100%)',
  },
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('red');

  useEffect(() => {
    const savedTheme = localStorage.getItem('mudra-theme');
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    if (currentTheme === 'none') {
      const root = document.documentElement;
      root.style.setProperty('--theme-primary', '#dc2626');
      root.style.setProperty('--theme-primary-light', '#fca5a5');
      root.style.setProperty('--theme-primary-dark', '#991b1b');
      root.style.setProperty('--theme-secondary', '#f97316');
      root.style.setProperty('--theme-accent', '#fb923c');
      localStorage.setItem('mudra-theme', 'none');
      return;
    }
    
    const theme = themes[currentTheme];
    const root = document.documentElement;
    
    root.style.setProperty('--theme-primary', theme.primary);
    root.style.setProperty('--theme-primary-light', theme.primaryLight);
    root.style.setProperty('--theme-primary-dark', theme.primaryDark);
    root.style.setProperty('--theme-secondary', theme.secondary);
    root.style.setProperty('--theme-accent', theme.accent);
    
    localStorage.setItem('mudra-theme', currentTheme);
  }, [currentTheme]);

  return (
    <ThemeContext.Provider value={{ currentTheme, setCurrentTheme, theme: currentTheme === 'none' ? themes.red : themes[currentTheme] }}>
      {children}
    </ThemeContext.Provider>
  );
};