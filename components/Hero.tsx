"use client";

import { Mail, FileText } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import Image from "next/image";
import { motion } from "framer-motion";
import { usePreferences } from "../context/PreferencesContext";
import { FaSnowflake } from "react-icons/fa";

export default function Hero() {
  const { language } = usePreferences();

  const t = {
    es: {
      name: "Emilio Funes",
      role: "Backend Developer | Java, Spring Boot, PHP, Laravel",
      contact: "Contacto",
      cvLabel: "Ver CV",
      alt: "Bandera de España",
      viewProjects: "Ver proyectos",
      openSource: "Contribución Open Source",
    },
    en: {
      name: "Emilio Funes",
      role: "Backend Developer | Java, Spring Boot, PHP, Laravel",
      contact: "Contact",
      cvLabel: "View CV",
      alt: "UK Flag",
      viewProjects: "View Projects",
      openSource: "Open Source Contribution",
    },
  };

  const { name, role, contact, cvLabel, alt, viewProjects, openSource } =
    t[language];
  const cvLink = `https://emifunes91.github.io/emiliofunes-cv/${language}/EmilioFunes-CV-${language}.pdf`;
  const flagSrc = language === "es" ? "/icons/es.svg" : "/icons/gb.svg";

  return (
    <section
      id="inicio"
      className="scroll-mt-24 text-center pt-24 md:pt-36 px-4"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-3xl mx-auto space-y-8"
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-blue-600 dark:text-blue-400">
          {name}
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl font-medium text-gray-600 dark:text-gray-300">
          {role}
        </p>

        {/* Botones de acción */}
        <div className="flex justify-center flex-wrap gap-4 pt-2">
          <a
            href="mailto:emilio.ifunes@hotmail.es"
            className="group inline-flex items-center gap-2 rounded-xl px-5 py-2 bg-blue-600 text-white shadow-md hover:shadow-lg hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <Mail className="w-4 h-4" />
            <span className="text-sm font-medium">{contact}</span>
          </a>

          <a
            href={cvLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-xl px-5 py-2 bg-gray-800 text-white hover:bg-gray-700 shadow-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            <FileText className="w-4 h-4" />
            <span className="text-sm font-medium">{cvLabel}</span>
            <Image src={flagSrc} alt={alt} width={20} height={20} />
          </a>

          <a
            href="#proyectos"
            className="group inline-flex items-center gap-2 rounded-xl px-5 py-2 bg-indigo-600 text-white hover:bg-indigo-500 shadow-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            🚀
            <span className="text-sm font-medium">{viewProjects}</span>
          </a>
        </div>

        {/* Íconos sociales + Open Source */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col items-center gap-4 pt-6 text-gray-600 dark:text-gray-300"
        >
          <div className="flex gap-6">
            <a
              href="https://github.com/EmiFunes91"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black dark:hover:text-white transition"
              aria-label="GitHub"
            >
              <FaGithub className="w-6 h-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/emilio-funes-8b140b21a/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="w-6 h-6" />
            </a>
          </div>
          <a
            href="https://github.com/wintercms/docs/pull/237"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-1.5 text-sm font-medium rounded-full bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100 hover:shadow-md transition animate-pulse hover:animate-none"
            title="Contribución a Winter CMS"
          >
            <FaGithub className="w-4 h-4" />
            <span>
              {language === "es" ? (
                <>
                  Open Source •{" "}
                  <FaSnowflake className="inline-block w-4 h-4 -mt-0.5 mr-1" />
                  Winter CMS
                </>
              ) : (
                <>
                  Open Source •{" "}
                  <FaSnowflake className="inline-block w-4 h-4 -mt-0.5 mr-1" />
                  Winter CMS
                </>
              )}
            </span>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
