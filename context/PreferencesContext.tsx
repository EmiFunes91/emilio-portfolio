'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';

type PreferencesContextType = {
  darkMode: boolean;
  toggleDarkMode: () => void;
  language: 'es' | 'en';
  toggleLanguage: () => void;
};

const PreferencesContext = createContext<PreferencesContextType | undefined>(
  undefined
);

export const PreferencesProvider = ({ children }: { children: ReactNode }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState<'es' | 'en'>('es');

  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio-theme');
    const savedLang = localStorage.getItem('portfolio-lang');

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme ?? (prefersDark ? 'dark' : 'light');
    setDarkMode(theme === 'dark');
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('portfolio-theme', theme);

    const lang = savedLang ?? (navigator.language.startsWith('es') ? 'es' : 'en');
    setLanguage(lang as 'es' | 'en');
    localStorage.setItem('portfolio-lang', lang);
  }, []);

  const toggleDarkMode = () => {
    const newValue = !darkMode;
    setDarkMode(newValue);
    localStorage.setItem('portfolio-theme', newValue ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', newValue);
  };

  const toggleLanguage = () => {
    const newLang = language === 'es' ? 'en' : 'es';
    setLanguage(newLang);
    localStorage.setItem('portfolio-lang', newLang);
  };

  return (
    <PreferencesContext.Provider
      value={{ darkMode, toggleDarkMode, language, toggleLanguage }}
    >
      {children}
    </PreferencesContext.Provider>
  );
};

export const usePreferences = () => {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error('usePreferences debe usarse dentro de PreferencesProvider');
  }
  return context;
};
