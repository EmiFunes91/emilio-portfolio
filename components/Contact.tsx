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
        "Available for freelance, consulting, or remote roles. Let's connect!",
    },
  };

  return (
    <section id="contacto" className="max-w-main flex flex-col items-center py-20">
      <h2 className="section-title text-center mb-2">{t[language].title}</h2>
      <p className="section-subtitle text-center mb-8 max-w-2xl">{t[language].description}</p>
      <ContactForm />
    </section>
  );
}
