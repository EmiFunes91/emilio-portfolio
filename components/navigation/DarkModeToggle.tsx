'use client';

import { Moon, Sun } from 'lucide-react';
import { usePreferences } from '../../context/PreferencesContext';
import { translations } from '../../lib/translations';

export default function DarkModeToggle() {
  const { darkMode, toggleDarkMode, language } = usePreferences();

  const tooltipText = darkMode 
    ? translations[language].darkMode.light 
    : translations[language].darkMode.dark;

  return (
    <button
      onClick={toggleDarkMode}
      className="p-1.5 sm:p-2 rounded-full border border-gray-400 hover:bg-gray-200 dark:border-gray-600 dark:hover:bg-gray-800 transition-colors duration-200"
      title={tooltipText}
    >
      {darkMode ? <Sun className="w-4 h-4 sm:w-5 sm:h-5" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5" />}
    </button>
  );
}


