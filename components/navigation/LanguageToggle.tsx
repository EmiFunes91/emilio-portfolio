'use client';

import { IoLanguage } from 'react-icons/io5';
import { usePreferences } from '../../context/PreferencesContext';
import { translations } from '../../lib/translations';

export default function LanguageToggle() {
  const { language, toggleLanguage } = usePreferences();

  const tooltipText = language === 'es' 
    ? translations[language].language.switchToEnglish 
    : translations[language].language.switchToSpanish;

  return (
    <button
      onClick={toggleLanguage}
      className="p-1.5 sm:p-2 px-2 sm:px-3 flex items-center gap-1 rounded-full border border-gray-400 hover:bg-gray-300 dark:border-gray-600 dark:hover:bg-gray-800 transition-all duration-100 ease-out hover:scale-105 active:scale-95 text-xs sm:text-sm font-semibold"
      title={tooltipText}
      aria-label={tooltipText}
    >
      <IoLanguage className="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-100 ease-out" />
      <span className="transition-transform duration-100 ease-out">{language.toUpperCase()}</span>
    </button>
  );
}



