"use client";

import { Mail, FileText } from "lucide-react";
import { FaGithub, FaLinkedin, FaSnowflake, FaFolderOpen, FaDownload } from "react-icons/fa";
import type { IconBaseProps } from "react-icons";
import Image from "next/image";
import { motion } from "framer-motion";
import { usePreferences } from "../context/PreferencesContext";
import ActionButton from "./ui/ActionButton";

const GithubIcon: React.ComponentType<IconBaseProps> = FaGithub;
const LinkedInIcon: React.ComponentType<IconBaseProps> = FaLinkedin;
const SnowflakeIcon: React.ComponentType<IconBaseProps> = FaSnowflake;

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
      openSourceContribution: "Contribución a Winter CMS (Canadá)"
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
      openSourceContribution: "Winter CMS Contribution (Canada)"
    },
  };

  const { name, title, role, contact, cvLabel, alt, viewProjects, downloadCV, openSourceContribution } = t[language];
  const cvLink = `https://emifunes91.github.io/emiliofunes-cv/${language}/EmilioFunes-CV-${language}.pdf`;
  const flagSrc = language === "es" ? "/icons/es.svg" : "/icons/gb.svg";

  return (
    <section
      id="inicio"
      className="flex flex-col items-center justify-center min-h-[70vh] text-center gap-6"
      >
      <h1 className="text-4xl md:text-6xl font-extrabold mb-2">
          {name}
        </h1>
      <h2 className="mt-2 text-lg md:text-2xl font-semibold text-white tracking-tight">
        {title}
      </h2>
      <p className="text-base sm:text-lg text-gray-200 dark:text-gray-300 font-medium max-w-xl mx-auto mb-6">
        {t[language].cta}
        </p>
      <div className="flex flex-wrap justify-center gap-4 mt-2">
        <ActionButton
          href="#proyectos"
          variant="demo"
          title={viewProjects}
          className="px-6 py-3 text-base font-semibold shadow-lg"
          >
          <FaFolderOpen className="w-5 h-5" />
          {viewProjects}
        </ActionButton>
        <ActionButton
            href={cvLink}
          variant="default"
          title={language === "es" ? "Descargar CV en español" : "Download CV in English"}
          className="px-6 py-3 text-base font-semibold border-2 border-blue-600 text-blue-700 dark:text-blue-300 bg-transparent hover:bg-blue-50 dark:hover:bg-blue-900/30 shadow"
          >
          <FaDownload className="w-5 h-5" />
          {downloadCV}
          <Image src={flagSrc} alt={alt} width={20} height={20} className="ml-1 rounded shadow-sm" />
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
              className="group hover:text-[#1dbf73] transition-all duration-300 hover:scale-110"
              aria-label="Fiverr"
              title={language === 'es' ? 'Ver perfil en Fiverr' : 'View Fiverr profile'}
            >
              <Image 
                src="/icons/fiverr.svg" 
                alt="Fiverr" 
                width={24} 
                height={24} 
                className="w-6 h-6 transition-transform duration-300 group-hover:scale-110"
              />
            </a>
            <a
              href="https://www.upwork.com/freelancers/emiliof4?viewMode=1"
              target="_blank"
              rel="noopener noreferrer"
              className="group hover:text-white dark:hover:text-white transition-all duration-300 hover:scale-110"
              aria-label="Upwork"
              title={language === 'es' ? 'Ver perfil en Upwork' : 'View Upwork profile'}
            >
              <svg className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 56.7 56.7" fill="currentColor">
                <path d="M38.8,24.6c-2.8,0-3.7,2.7-3.9,4.3v0.1l-0.4,1.5c1.2,1,2.7,1.7,4.2,1.7c2,0,3.8-1.7,3.9-3.3C42.6,26.3,40.9,24.6,38.8,24.6z"/>
                <path d="M28.9,3.7C15.2,3.7,4.1,14.8,4.1,28.5c0,13.7,11.1,24.8,24.8,24.8c13.7,0,24.8-11.1,24.8-24.8C53.7,14.8,42.6,3.7,28.9,3.7z M38.8,36.1c-2,0-3.7-0.6-5.2-1.5l-1.7,8H28l2.4-11c-1-1.4-2-3-2.7-4.5v1.7c0,4.1-3.3,7.4-7.3,7.4c-4,0-7.3-3.3-7.3-7.4v-10h3.8v10c0,2,1.6,3.6,3.6,3.6c2,0,3.6-1.6,3.6-3.6v-10h3.8c0.8,2.5,2.1,5.5,3.8,8.2c1-3.8,3.8-6.1,7.3-6.1c4.1,0,7.5,3.4,7.5,7.5C46.3,32.7,42.9,36.1,38.8,36.1z"/>
              </svg>
            </a>
          </div>
          <a
            href="https://github.com/wintercms/docs/pull/237"
            target="_blank"
            rel="noopener noreferrer"
          className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-sm font-medium shadow-sm border border-blue-100 dark:border-blue-800 animate-pulse hover:animate-none"
            title={openSourceContribution}
          >
            <GithubIcon className="w-4 h-4" />
            <span className="inline-flex items-center gap-1">
              Open Source •
              <SnowflakeIcon className="w-4 h-4 -mt-0.5" />
              Winter CMS
              <Image
                src="/icons/ca.svg"
                alt="Bandera de Canadá"
                width={16}
                height={12}
                className="ml-1"
              />
            </span>
          </a>
      </motion.div>
    </section>
  );
}
