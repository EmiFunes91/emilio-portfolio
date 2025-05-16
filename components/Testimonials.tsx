"use client";

import { useState, useEffect } from "react";
import { Quote } from "lucide-react";
import { usePreferences } from "../context/PreferencesContext";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = {
  es: [
    {
      quote:
        "Emilio demostró compromiso, proactividad y capacidad técnica. Recomendado 100%.",
      client: "Cliente en Fiverr",
    },
    {
      quote:
        "Un desarrollador confiable que entrega código limpio y mantiene una excelente comunicación.",
      client: "Startup de software",
    },
    {
      quote:
        "Excelente experiencia trabajando con Emilio. Siempre va más allá para que todo funcione perfecto.",
      client: "Emprendedor independiente",
    },
  ],
  en: [
    {
      quote:
        "Emilio showed commitment, proactivity, and technical skills. Highly recommended.",
      client: "Client on Fiverr",
    },
    {
      quote:
        "A reliable developer who delivers clean code and maintains excellent communication.",
      client: "Software startup",
    },
    {
      quote:
        "Great experience working with Emilio. He always goes the extra mile to ensure everything works perfectly.",
      client: "Independent entrepreneur",
    },
  ],
};

export default function Testimonials() {
  const { language } = usePreferences();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials[language].length);
    }, 5000);
    return () => clearInterval(interval);
  }, [language]);

  const { quote, client } = testimonials[language][index];
  const t = {
    es: {
      title: "Testimonios",
      subtitle: "Algunas palabras de quienes han trabajado conmigo.",
    },
    en: {
      title: "Testimonials",
      subtitle: "A few words from those who worked with me.",
    },
  };

  return (
    <section id="testimonios" className="scroll-mt-24 mt-24 max-w-4xl mx-auto px-4">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-center mb-4 text-gray-900 dark:text-white"
      >
        {t[language].title}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto"
      >
        {t[language].subtitle}
      </motion.p>

      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3 }}
        className="card-glow text-center"
        aria-live="polite"
      >
        <Quote className="mx-auto mb-4 text-blue-600 dark:text-blue-400 w-6 h-6" />

        <AnimatePresence mode="wait">
          <motion.div
            key={quote}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            <p className="italic text-gray-700 dark:text-gray-300 text-lg sm:text-xl leading-relaxed">
              “{quote}”
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 font-medium">
              – {client}
            </p>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
