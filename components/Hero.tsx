"use client";

import { Mail, FileText } from "lucide-react";
import { FaGithub, FaLinkedin, FaFolderOpen, FaDownload } from "react-icons/fa";
import type { IconBaseProps } from "react-icons";
import Image from "next/image";
import { motion } from "framer-motion";
import { usePreferences } from "../context/PreferencesContext";
import ActionButton from "./ui/ActionButton";

const GithubIcon: React.ComponentType<IconBaseProps> = FaGithub;
const LinkedInIcon: React.ComponentType<IconBaseProps> = FaLinkedin;

export default function Hero() {
  const { language } = usePreferences();

  const t = {
    es: {
      name: "Emilio Funes",
      title: "Fullstack Engineer · Cloud · DevOps · Arquitectura Escalable",
      cta: "Desarrollo soluciones robustas, escalables y modernas para empresas y startups.",
      role: "Backend Developer | Java, Spring Boot, PHP, Laravel",
      contact: "Contacto",
      cvLabel: "Ver CV",
      alt: "Bandera de España",
      viewProjects: "Ver proyectos",
      downloadCV: "Descargar CV",

    },
    en: {
      name: "Emilio Funes",
      title: "Fullstack Engineer · Cloud · DevOps · Scalable Architecture",
      cta: "I build robust, scalable and modern solutions for companies and startups.",
      role: "Backend Developer | Java, Spring Boot, PHP, Laravel",
      contact: "Contact",
      cvLabel: "View CV",
      alt: "UK Flag",
      viewProjects: "View projects",
      downloadCV: "Download CV",

    },
  };

  const { name, title, role, contact, cvLabel, alt, viewProjects, downloadCV } = t[language];
  const cvLink = `https://emifunes91.github.io/emiliofunes-cv/${language}/EmilioFunes-CV-${language}.pdf`;
  const flagSrc = language === "es" ? "/icons/es.svg" : "/icons/gb.svg";

  return (
    <section
      id="inicio"
      className="flex flex-col items-center justify-center min-h-[70vh] sm:min-h-[80vh] lg:min-h-[90vh] text-center gap-4 sm:gap-6 lg:gap-8 px-4 sm:px-6 lg:px-8"
      >
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-2 sm:mb-4 leading-tight">
          {name}
        </h1>
      <h2 className="mt-2 sm:mt-4 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold text-gray-800 dark:text-gray-200 tracking-tight">
        {title}
      </h2>
      <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-300 font-medium max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto mb-4 sm:mb-6 lg:mb-8 leading-relaxed">
        {t[language].cta}
        </p>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mt-4 w-full max-w-sm sm:max-w-md">
        <ActionButton
          href="#proyectos"
          variant="demo"
          title={viewProjects}
          className="group w-4/5 sm:w-auto px-5 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base font-medium bg-blue-600/90 hover:bg-blue-600 text-white rounded-md shadow-sm hover:shadow-md transition-all duration-150 ease-out text-center flex items-center justify-center gap-1.5 sm:gap-2 border-0 backdrop-blur-sm"
          >
          <FaFolderOpen className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-150 group-hover:scale-110" />
          {viewProjects}
        </ActionButton>
        <ActionButton
            href={cvLink}
          variant="default"
          title={language === "es" ? "Descargar CV en español" : "Download CV in English"}
          className="group w-4/5 sm:w-auto px-5 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base font-medium bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200/60 dark:border-gray-600/60 hover:border-gray-300 dark:hover:border-gray-500 rounded-md shadow-sm hover:shadow-md transition-all duration-150 ease-out text-center flex items-center justify-center gap-1.5 sm:gap-2 backdrop-blur-sm"
          >
          <FaDownload className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-150 group-hover:scale-110" />
          {downloadCV}
          <Image src={flagSrc} alt={alt} width={14} height={10} className="rounded-sm shadow-sm transition-transform duration-150 group-hover:scale-110" />
        </ActionButton>
        </div>

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
              className="group hover:text-black dark:hover:text-white transition-all duration-300 hover:scale-110"
              aria-label="GitHub"
              title={language === 'es' ? 'Ver perfil en GitHub' : 'View GitHub profile'}
            >
              <GithubIcon className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
            </a>
            <a
              href="https://www.linkedin.com/in/emilio-funes-8b140b21a/"
              target="_blank"
              rel="noopener noreferrer"
              className="group hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:scale-110"
              aria-label="LinkedIn"
              title={language === 'es' ? 'Ver perfil en LinkedIn' : 'View LinkedIn profile'}
            >
              <LinkedInIcon className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
            </a>
            <a
              href="https://es.fiverr.com/emiliofunesdev?public_mode=true"
              target="_blank"
              rel="noopener noreferrer"
              className="group text-gray-400 hover:text-[#1dbf73] transition-all duration-300 hover:scale-110"
              aria-label="Fiverr"
              title={language === 'es' ? 'Ver perfil en Fiverr' : 'View Fiverr profile'}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 508.02 508.02" className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" fill="none">
                <circle cx="254.01" cy="254.01" r="254.01" fill="currentColor" className="transition-colors duration-300" />
                <circle fill="#fff" cx="315.97" cy="162.19" r="26.87"/>
                <path fill="#111" d="M345.87,207.66h-123V199.6c0-15.83,15.83-16.13,23.89-16.13,9.25,0,13.44.9,13.44.9v-43.6a155.21,155.21,0,0,0-19.71-1.19c-25.68,0-73.16,7.16-73.16,61.51V208h-22.4v40.31h22.4v85.1h-20.9v40.31H247.34V333.37H222.85v-85.1H290v85.1H269.13v40.31h97.65V333.37H345.87Z" transform="translate(-1.83 -0.98)"/>
              </svg>
            </a>
            <a
              href="https://www.upwork.com/freelancers/emiliofunes"
              target="_blank"
              rel="noopener noreferrer"
              className="group text-gray-400 hover:text-black dark:hover:text-white transition-all duration-300 hover:scale-110"
              aria-label="Upwork"
              title={language === 'es' ? 'Ver perfil en Upwork' : 'View Upwork profile'}
            >
              <svg className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 56.7 56.7" fill="currentColor">
                <path d="M38.8,24.6c-2.8,0-3.7,2.7-3.9,4.3v0.1l-0.4,1.5c1.2,1,2.7,1.7,4.2,1.7c2,0,3.8-1.7,3.9-3.3C42.6,26.3,40.9,24.6,38.8,24.6z"/>
                <path d="M28.9,3.7C15.2,3.7,4.1,14.8,4.1,28.5c0,13.7,11.1,24.8,24.8,24.8c13.7,0,24.8-11.1,24.8-24.8C53.7,14.8,42.6,3.7,28.9,3.7z M38.8,36.1c-2,0-3.7-0.6-5.2-1.5l-1.7,8H28l2.4-11c-1-1.4-2-3-2.7-4.5v1.7c0,4.1,3.3,7.4-7.3,7.4c-4,0-7.3-3.3-7.3-7.4v-10h3.8v10c0,2,1.6,3.6,3.6,3.6c2,0,3.6-1.6,3.6-3.6v-10h3.8c0.8,2.5,2.1,5.5,3.8,8.2c1-3.8,3.8-6.1,7.3-6.1c4.1,0,7.5,3.4,7.5,7.5C46.3,32.7,42.9,36.1,38.8,36.1z"/>
              </svg>
            </a>
          </div>
      </motion.div>
    </section>
  );
}
