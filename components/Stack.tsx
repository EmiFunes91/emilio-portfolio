"use client";

import { motion } from "framer-motion";
import { Code2, Database, Server, TerminalSquare } from "lucide-react";
import { FaJava, FaLaravel, FaDocker, FaReact } from "react-icons/fa";
import { usePreferences } from "../context/PreferencesContext";

export default function Stack() {
  const { language } = usePreferences();

  const t = {
    es: {
      title: "Tecnologías que uso",
      subtitle:
        "Estas son las tecnologías que utilizo a diario para construir soluciones robustas, escalables y profesionales.",
    },
    en: {
      title: "Tech Stack",
      subtitle:
        "These are the technologies I use daily to build robust, scalable, and professional solutions.",
    },
  };

  const technologies = [
    { icon: <FaJava className="w-8 h-8 text-blue-700 dark:text-blue-400" />, label: "Java / Spring Boot" },
    { icon: <FaLaravel className="w-8 h-8 text-red-600" />, label: "PHP / Laravel" },
    { icon: <Database className="w-8 h-8 text-purple-500" />, label: "PostgreSQL / MySQL" },
    { icon: <Code2 className="w-8 h-8 text-green-500" />, label: "REST APIs / JWT" },
    { icon: <FaDocker className="w-8 h-8 text-blue-500" />, label: "Docker / Git" },
    { icon: <TerminalSquare className="w-8 h-8 text-yellow-500" />, label: "CI/CD" },
    { icon: <FaReact className="w-8 h-8 text-sky-500" />, label: "React / Next.js" },
    { icon: <Server className="w-8 h-8 text-indigo-500" />, label: "Tailwind / Bootstrap" },
  ];

  const { title, subtitle } = t[language];

  return (
    <section className="mt-24 max-w-6xl mx-auto px-4" id="stack">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-6 text-gray-900 dark:text-white text-center"
      >
        {title}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-center text-base sm:text-lg text-gray-600 dark:text-gray-400 mt-2 mb-10 max-w-2xl mx-auto"
      >
        {subtitle}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 text-center"
      >
        {technologies.map((tech, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center justify-center gap-2 p-3 hover:scale-105 transition-transform duration-300"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-9 h-9 flex items-center justify-center">{tech.icon}</div>
            <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
              {tech.label}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

