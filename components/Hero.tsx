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
              className="hover:text-black dark:hover:text-white transition"
              aria-label="GitHub"
            >
              <GithubIcon className="w-6 h-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/emilio-funes-8b140b21a/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition"
              aria-label="LinkedIn"
            >
              <LinkedInIcon className="w-6 h-6" />
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
