"use client";

import { motion } from "framer-motion";
import { usePreferences } from "../context/PreferencesContext";
import { FaQuoteLeft, FaArrowRight } from "react-icons/fa";

export default function About() {
  const { language } = usePreferences();

  const t = {
    es: {
      title: "Sobre mí",
      subtitle: "Ingeniero Fullstack especializado en soluciones escalables y experiencias de usuario excepcionales.",
      intro: (
        <>
          Construyo productos digitales robustos y escalables con <span className="font-semibold text-blue-700 dark:text-blue-400">FastAPI, Spring Boot y Next.js</span>. Mi enfoque combina arquitectura limpia, seguridad implementada (JWT, OAuth2) y despliegues optimizados en la nube.
        </>
      ),
      highlight: "He desarrollado sistemas como Smart Advisor App (SaaS legal con OpenAI) e integraciones avanzadas con Stripe, logrando soluciones completas y funcionales para producción.",
      cta: "Ver proyectos",
      quote: "La tecnología es el puente entre las ideas y el impacto real.",
    },
    en: {
      title: "About Me",
      subtitle: "Fullstack Engineer specialized in scalable solutions and exceptional user experiences.",
      intro: (
        <>
          I build robust and scalable digital products with <span className="font-semibold text-blue-700 dark:text-blue-400">FastAPI, Spring Boot and Next.js</span>. My approach combines clean architecture, implemented security (JWT, OAuth2), and optimized cloud deployments.
        </>
      ),
      highlight: "I have developed systems like Smart Advisor App (Legal SaaS with OpenAI) and advanced Stripe integrations, delivering complete, production-ready solutions.",
      cta: "View projects",
      quote: "Technology is the bridge between ideas and real impact.",
    },
  };
  const tLang = t[language];

  return (
    <section id="sobre-mi" className="max-w-4xl mx-auto py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h2 className="section-title mb-2">{tLang.title}</h2>
        <h3 className="section-subtitle text-gray-600 dark:text-gray-400 text-base">{tLang.subtitle}</h3>
      </motion.div>

      <div className="space-y-6">
        {/* Introducción compacta */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center"
        >
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
            {tLang.intro}
          </p>
        </motion.div>

        {/* Highlight de experiencia */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4 border border-gray-100 dark:border-gray-800"
        >
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed text-center">
            {tLang.highlight}
          </p>
        </motion.div>

        {/* CTA sutil */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <a 
            href="#proyectos" 
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium transition-colors"
          >
            {tLang.cta}
            <FaArrowRight className="w-3 h-3" />
          </a>
        </motion.div>

        {/* Cita minimalista */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex items-center justify-center gap-3 pt-2"
        >
          <div className="w-6 h-px bg-gray-300 dark:bg-gray-600"></div>
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
            <FaQuoteLeft className="w-3 h-3" />
            <span className="italic text-xs font-medium">
              {tLang.quote}
            </span>
          </div>
          <div className="w-6 h-px bg-gray-300 dark:bg-gray-600"></div>
        </motion.div>
      </div>
    </section>
  );
}


  