"use client";

import ContactForm from "./ContactForm";
import { usePreferences } from "../context/PreferencesContext";

export default function Contact() {
  const { language } = usePreferences();

  const t = {
    es: {
      title: "¿Charlamos?",
      description:
        "Disponible para proyectos freelance, consultorías o roles remotos. ¡Conectemos!",
      buttonText: "Enviar un correo",
    },
    en: {
      title: "Let's Talk",
      description:
        "Available for freelance, consulting, or remote roles. Let’s connect!",
      buttonText: "Send Email",
    },
  };

  const { title, description } = t[language];

  return (
    <section className="mt-24 px-4" id="contacto">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-6 text-gray-900 dark:text-white">
          {title}
        </h2>

        <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-xl mx-auto leading-relaxed">
          {description}
        </p>
      </div>

      <div className="max-w-xl mx-auto mt-10">
        <ContactForm />
      </div>
    </section>
  );
}

