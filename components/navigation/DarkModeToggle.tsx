'use client';

import { Moon, Sun } from 'lucide-react';
import { usePreferences } from '../../context/PreferencesContext';

export default function DarkModeToggle() {
  const { darkMode, toggleDarkMode } = usePreferences();

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-full border border-gray-400 hover:bg-gray-200 dark:border-gray-600 dark:hover:bg-gray-800 transition"
      title={darkMode ? 'Cambiar a claro' : 'Cambiar a oscuro'}
    >
      {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
}


