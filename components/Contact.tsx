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

  const { title, description, buttonText } = t[language];

  return (
    <section className="mt-24 px-4" id="contacto">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-blue-600 dark:text-blue-400 text-center">
          {title}
        </h2>

        <p className="text-gray-600 dark:text-gray-300 text-lg sm:text-xl max-w-xl mx-auto">
          {description}
        </p>
      </div>

      <div className="max-w-xl mx-auto mt-8">
        <ContactForm />
      </div>
    </section>
  );
}
