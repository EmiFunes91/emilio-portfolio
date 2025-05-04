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
    <footer className="mt-24 py-10 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center gap-4"
      >
        <p className="text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300">
          {tLang.rights}
        </p>
        <p className="text-xs sm:text-sm">{tLang.built}</p>

        <div className="flex items-center gap-5">
          <a
            href="https://github.com/EmiFunes91/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:text-black dark:hover:text-white transition-colors"
          >
            <FaGithub className="w-5 h-5 sm:w-6 sm:h-6" />
          </a>
          <a
            href="https://www.linkedin.com/in/emilio-funes-8b140b21a/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <FaLinkedin className="w-5 h-5 sm:w-6 sm:h-6" />
          </a>
        </div>
      </motion.div>
    </footer>
  );
}
