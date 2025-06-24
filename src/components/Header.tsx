import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Header: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-blue-600/20 dark:from-violet-500/10 dark:to-blue-500/10" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <button
          onClick={toggleTheme}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white to-blue-400 dark:from-white dark:to-blue-300 bg-clip-text text-transparent mb-2">
          AutoExcuser
        </h1>
        
        <p className="text-lg sm:text-xl text-gray-300 dark:text-gray-400 mb-2">
          Auto-generate your next escape plan
        </p>
        
        <p className="text-sm text-gray-400 dark:text-gray-500">
          "It's not lying. It's surviving." • Powered by weather, time, location… and your laziness
        </p>
      </div>
    </header>
  );
};

export default Header;