"use client";

import { motion } from "framer-motion";
import { usePreferences } from "../context/PreferencesContext";
import { FaQuoteLeft } from "react-icons/fa";

export default function About() {
  const { language } = usePreferences();

  const t = {
    es: {
      title: "Sobre mí",
      subtitle: "Ingeniero Fullstack apasionado por la calidad, la arquitectura y la innovación.",
      text: (
        <>
          Soy <span className="font-semibold text-blue-700 dark:text-blue-400">ingeniero fullstack</span> con experiencia en <span className="font-semibold">backend, frontend, cloud y DevOps</span>. Me especializo en <span className="font-semibold">arquitectura escalable</span>, desarrollo de <span className="font-semibold">APIs robustas</span> y soluciones <span className="font-semibold">end-to-end</span> para empresas y startups. <br className="hidden sm:block" />
          <span className="text-gray-600 dark:text-gray-400">Mi enfoque es la excelencia técnica, la adaptabilidad y el trabajo en equipo.</span>
        </>
      ),
      quote: "La tecnología es el puente entre las ideas y el impacto real.",
    },
    en: {
      title: "About Me",
      subtitle: "Fullstack Engineer passionate about quality, architecture and innovation.",
      text: (
        <>
          I am a <span className="font-semibold text-blue-700 dark:text-blue-400">fullstack engineer</span> with experience in <span className="font-semibold">backend, frontend, cloud and DevOps</span>. I specialize in <span className="font-semibold">scalable architecture</span>, <span className="font-semibold">robust APIs</span> and <span className="font-semibold">end-to-end solutions</span> for companies and startups. <br className="hidden sm:block" />
          <span className="text-gray-600 dark:text-gray-400">My focus is technical excellence, adaptability and teamwork.</span>
        </>
      ),
      quote: "Technology is the bridge between ideas and real impact.",
    },
  };
  const tLang = t[language];

  return (
    <section id="sobre-mi" className="max-w-main flex flex-col items-center py-20">
      <h2 className="section-title text-center mb-2">{tLang.title}</h2>
      <h3 className="section-subtitle text-center mb-2">{tLang.subtitle}</h3>
      <p className="text-base sm:text-lg text-gray-800 dark:text-gray-200 leading-relaxed mb-8 text-center">
        {tLang.text}
      </p>
      <div className="flex items-center gap-3 bg-blue-50 dark:bg-blue-900/40 rounded-xl px-5 py-3 shadow-sm mb-2">
        <FaQuoteLeft className="w-5 h-5 text-blue-400 dark:text-blue-300" />
        <span className="italic text-gray-700 dark:text-gray-200 text-sm sm:text-base">{tLang.quote}</span>
      </div>
    </section>
  );
}


  