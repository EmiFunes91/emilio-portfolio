'use client';

import { IoLanguage } from 'react-icons/io5';
import { usePreferences } from '../../context/PreferencesContext';

export default function LanguageToggle() {
  const { language, toggleLanguage } = usePreferences();

  return (
    <button
      onClick={toggleLanguage}
      className="p-2 px-3 flex items-center gap-1 rounded-full border border-gray-400 hover:bg-gray-300 dark:border-gray-600 dark:hover:bg-gray-800 transition text-sm font-semibold"
      title={language === 'es' ? 'Cambiar a Inglés' : 'Switch to Spanish'}
    >
      <IoLanguage className="w-4 h-4" />
      <span>{language.toUpperCase()}</span>
    </button>
  );
}



