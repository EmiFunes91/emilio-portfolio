'use client';

import { FaGithub, FaLinkedin } from 'react-icons/fa';

export default function Footer({ language }: { language: 'es' | 'en' }) {
  const t = {
    es: {
      rights: '© 2025 Emilio Funes. Todos los derechos reservados.',
      built: 'Sitio construido con Next.js + Tailwind CSS',
      follow: 'Seguime en',
    },
    en: {
      rights: '© 2025 Emilio Funes. All rights reserved.',
      built: 'Site built with Next.js + Tailwind CSS',
      follow: 'Follow me on',
    },
  };

  const tLang = t[language];

  return (
    <footer className="mt-20 py-6 border-t border-gray-300 dark:border-gray-700 text-center text-sm text-gray-600 dark:text-gray-400">
      <div className="flex flex-col items-center gap-2">
        <p>{tLang.rights}</p>
        <p className="text-xs">{tLang.built}</p>

        <div className="flex items-center gap-4 mt-2">
          <a
            href="https://github.com/EmiFunes91/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            <FaGithub className="w-5 h-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/emilio-funes-8b140b21a/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            <FaLinkedin className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}


