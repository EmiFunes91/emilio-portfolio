'use client';

import { motion } from 'framer-motion';
import {
  Code2,
  Database,
  Server,
  TerminalSquare,
} from 'lucide-react';
import {
  FaJava,
  FaLaravel,
  FaDocker,
  FaReact,
} from 'react-icons/fa';

export default function Stack({
  title,
  language,
}: {
  title: string;
  language: 'es' | 'en';
}) {
  const t = {
    es: {
      subtitle:
        'Estas son las tecnologías que utilizo a diario para construir soluciones robustas, escalables y profesionales.',
    },
    en: {
      subtitle:
        'These are the technologies I use daily to build robust, scalable, and professional solutions.',
    },
  };

  const technologies = [
    { icon: <FaJava className="w-8 h-8 text-blue-700 dark:text-blue-400" />, label: 'Java / Spring Boot' },
    { icon: <FaLaravel className="w-8 h-8 text-red-600" />, label: 'PHP / Laravel' },
    { icon: <Database className="w-8 h-8 text-purple-500" />, label: 'PostgreSQL / MySQL' },
    { icon: <Code2 className="w-8 h-8 text-green-500" />, label: 'REST APIs / JWT' },
    { icon: <FaDocker className="w-8 h-8 text-blue-500" />, label: 'Docker / Git' },
    { icon: <TerminalSquare className="w-8 h-8 text-yellow-500" />, label: 'CI/CD' },
    { icon: <FaReact className="w-8 h-8 text-sky-500" />, label: 'React / Next.js' },
    { icon: <Server className="w-8 h-8 text-indigo-500" />, label: 'Tailwind / Bootstrap' },
  ];

  return (
    <section className="mt-20 max-w-6xl mx-auto px-4" id="stack">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-semibold text-center"
      >
        {title}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-center text-gray-600 dark:text-gray-400 mt-2 mb-10 text-sm max-w-xl mx-auto"
      >
        {t[language].subtitle}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
      >
        {technologies.map((tech, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center gap-2 hover:scale-105 transition-transform duration-300"
            whileHover={{ scale: 1.05 }}
          >
            {tech.icon}
            <span className="text-sm text-gray-700 dark:text-gray-300">{tech.label}</span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}


