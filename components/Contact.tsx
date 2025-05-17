"use client";

import ContactForm from "./ContactForm";
import { usePreferences } from "../context/PreferencesContext";
import { motion } from "framer-motion";

export default function Contact() {
  const { language } = usePreferences();

  const t = {
    es: {
      title: "¿Charlamos?",
      description:
        "Disponible para proyectos freelance, consultorías o roles remotos. ¡Conectemos!",
    },
    en: {
      title: "Let's Talk",
      description:
        "Available for freelance, consulting, or remote roles. Let’s connect!",
    },
  };

  const { title, description } = t[language];

  return (
    <section id="contacto" className="scroll-mt-24 mt-24 max-w-4xl mx-auto px-4">
      <div className="text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-gray-900 dark:text-white"
        >
          {title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto"
        >
          {description}
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <ContactForm />
      </motion.div>
    </section>
  );
}
