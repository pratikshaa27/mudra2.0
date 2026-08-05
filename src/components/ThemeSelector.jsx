import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Check } from 'lucide-react';
import { useTheme, themes } from './ThemeContext';

export default function ThemeSelector() {
  const { currentTheme, setCurrentTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const themeColors = {
    red: 'bg-gradient-to-r from-red-600 to-orange-500',
    blue: 'bg-gradient-to-r from-blue-600 to-cyan-500',
    green: 'bg-gradient-to-r from-green-600 to-emerald-500',
    purple: 'bg-gradient-to-r from-purple-600 to-fuchsia-500',
    indigo: 'bg-gradient-to-r from-indigo-600 to-violet-500',
    teal: 'bg-gradient-to-r from-teal-600 to-cyan-500',
  };

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-md rounded-full shadow-lg border border-gray-200 hover:shadow-xl transition-all"
      >
        <Palette size={18} className="text-gray-700" />
        <span className="text-sm font-semibold text-gray-700 hidden sm:inline">
          {currentTheme === 'none' ? 'MUDRA Red' : themes[currentTheme].name}
        </span>
        <div className={`w-6 h-6 rounded-full ${currentTheme === 'none' ? 'bg-gradient-to-r from-red-600 to-orange-500' : themeColors[currentTheme]} shadow-md`} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="absolute right-0 top-full mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-50"
            >
              <div className="p-4 border-b border-gray-100">
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                  <Palette size={18} />
                  Choose Theme
                </h3>
                <p className="text-xs text-gray-500 mt-1">Select your preferred color scheme</p>
              </div>

              <div className="p-3 space-y-2 max-h-96 overflow-y-auto">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setCurrentTheme('none');
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                    currentTheme === 'none'
                      ? 'bg-gray-100 ring-2 ring-gray-900 shadow-md'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-red-600 to-orange-500 shadow-lg flex items-center justify-center">
                    {currentTheme === 'none' && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                      >
                        <Check className="text-white" size={24} />
                      </motion.div>
                    )}
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-semibold text-gray-900">None (Original)</div>
                    <div className="text-xs text-gray-500">
                      {currentTheme === 'none' ? 'Currently Active' : 'Click to apply'}
                    </div>
                  </div>
                </motion.button>
                {Object.entries(themes).map(([key, theme]) => (
                  <motion.button
                    key={key}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setCurrentTheme(key);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                      currentTheme === key
                        ? 'bg-gray-100 ring-2 ring-gray-900 shadow-md'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-lg ${themeColors[key]} shadow-lg flex items-center justify-center`}>
                      {currentTheme === key && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                        >
                          <Check className="text-white" size={24} />
                        </motion.div>
                      )}
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-semibold text-gray-900">{theme.name}</div>
                      <div className="text-xs text-gray-500">
                        {currentTheme === key ? 'Currently Active' : 'Click to apply'}
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}