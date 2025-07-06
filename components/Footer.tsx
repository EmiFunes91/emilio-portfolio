"use client";

import { FaGithub, FaLinkedin } from "react-icons/fa";
import { usePreferences } from "../context/PreferencesContext";
import { motion } from "framer-motion";

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
    <footer className="mt-24 py-6 sm:py-10 border-t border-gray-200 dark:border-gray-700 text-center text-xs sm:text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center gap-4"
      >
        <p className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
          {tLang.rights}
        </p>
        <p className="text-xs sm:text-sm">{tLang.built}</p>

        <div className="flex items-center gap-5">
          <a
            href="https://github.com/EmiFunes91/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="group hover:text-black dark:hover:text-white transition-all duration-300 hover:scale-110"
            title={language === 'es' ? 'Ver perfil en GitHub' : 'View GitHub profile'}
          >
            <FaGithub className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:scale-110" />
          </a>
          <a
            href="https://www.linkedin.com/in/emilio-funes-8b140b21a/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="group hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:scale-110"
            title={language === 'es' ? 'Ver perfil en LinkedIn' : 'View LinkedIn profile'}
          >
            <FaLinkedin className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:scale-110" />
          </a>
          <a
            href="https://es.fiverr.com/emiliofunesdev?public_mode=true"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Fiverr"
            className="group hover:text-[#1dbf73] transition-all duration-300 hover:scale-110"
            title={language === 'es' ? 'Ver perfil en Fiverr' : 'View Fiverr profile'}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 508.02 508.02" className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:scale-110" fill="currentColor">
              <circle fill="#1dbf73" cx="254.01" cy="254.01" r="254.01"/>
              <circle fill="#fff" cx="315.97" cy="162.19" r="26.87"/>
              <path fill="#fff" d="M345.87,207.66h-123V199.6c0-15.83,15.83-16.13,23.89-16.13,9.25,0,13.44.9,13.44.9v-43.6a155.21,155.21,0,0,0-19.71-1.19c-25.68,0-73.16,7.16-73.16,61.51V208h-22.4v40.31h22.4v85.1h-20.9v40.31H247.34V333.37H222.85v-85.1H290v85.1H269.13v40.31h97.65V333.37H345.87Z" transform="translate(-1.83 -0.98)"/>
            </svg>
          </a>
          <a
            href="https://www.upwork.com/freelancers/emiliof4?viewMode=1"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Upwork"
            className="group hover:text-white dark:hover:text-white transition-all duration-300 hover:scale-110"
            title={language === 'es' ? 'Ver perfil en Upwork' : 'View Upwork profile'}
          >
            <svg viewBox="0 0 56.7 56.7" className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:scale-110" fill="currentColor">
              <g>
                <path d="M38.8,24.6c-2.8,0-3.7,2.7-3.9,4.3v0.1l-0.4,1.5c1.2,1,2.7,1.7,4.2,1.7c2,0,3.8-1.7,3.9-3.9C42.6,26.3,40.9,24.6,38.8,24.6z"/>
                <path d="M28.9,3.7C15.2,3.7,4.1,14.8,4.1,28.5c0,13.7,11.1,24.8,24.8,24.8c13.7,0,24.8-11.1,24.8-24.8C53.7,14.8,42.6,3.7,28.9,3.7z M38.8,36.1c-2,0-3.7-0.6-5.2-1.5l-1.7,8H28l2.4-11c-1-1.4-2-3-2.7-4.5v1.7c0,4.1-3.3,7.4-7.3,7.4c-4,0-7.3-3.3-7.3-7.4v-10h3.8v10c0,2,1.6,3.6,3.6,3.6c2,0,3.6-1.6,3.6-3.6v-10h3.8c0.8,2.5,2.1,5.5,3.8,8.2c1-3.8,3.8-6.1,7.3-6.1c4.1,0,7.5,3.4,7.5,7.5C46.3,32.7,42.9,36.1,38.8,36.1z"/>
              </g>
            </svg>
          </a>
        </div>
      </motion.div>
    </footer>
  );
}
