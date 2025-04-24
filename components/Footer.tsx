"use client";

import { FaGithub, FaLinkedin } from "react-icons/fa";
import { usePreferences } from "../context/PreferencesContext";

export default function Footer() {
  const { language } = usePreferences();

  const t = {
    es: {
      rights: "© 2025 Emilio Funes. Todos los derechos reservados.",
      built: "Sitio construido con Next.js + Tailwind CSS",
      follow: "Seguime en",
    },
    en: {
      rights: "© 2025 Emilio Funes. All rights reserved.",
      built: "Site built with Next.js + Tailwind CSS",
      follow: "Follow me on",
    },
  };

  const tLang = t[language];

  return (
    <footer className="mt-24 py-8 border-t border-gray-200 dark:border-gray-700 text-center text-gray-600 dark:text-gray-400 transition-colors duration-300">
      <div className="flex flex-col items-center gap-2">
        <p className="text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300">
          {tLang.rights}
        </p>
        <p className="text-xs sm:text-sm">{tLang.built}</p>

        <div className="flex items-center gap-5 mt-3">
          <a
            href="https://github.com/EmiFunes91/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <FaGithub className="w-6 h-6" />
          </a>
          <a
            href="https://www.linkedin.com/in/emilio-funes-8b140b21a/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <FaLinkedin className="w-6 h-6" />
          </a>
        </div>
      </div>
    </footer>
  );
}
