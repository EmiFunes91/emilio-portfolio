"use client";

import { motion } from "framer-motion";
import {
  FaJava,
  FaReact,
  FaDocker,
  FaAws,
  FaLaravel,
  FaPhp,
  FaPython,
  FaCheckCircle
} from "react-icons/fa";
import {
  SiSpringboot,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiPostgresql,
  SiFastapi,
  SiDjango
} from "react-icons/si";
import { usePreferences } from "../context/PreferencesContext";

export default function Stack() {
  const { language } = usePreferences();

  const t = {
    es: {
      title: "Stack principal",
      tagline: "Ingeniero Fullstack: desarrollo, arquitectura y despliegue.",
      valuePhrase: "Selecciono tecnologías modernas y probadas para garantizar rendimiento, seguridad y escalabilidad.",
      areas: {
        backend: "Backend",
        frontend: "Frontend",
        devops: "Base de datos, DevOps & Cloud"
      },
      tooltips: {
        Java: "Aplicaciones empresariales robustas",
        "Spring Boot": "Microservicios y APIs",
        Python: "Scripting y backend versátil",
        Django: "Framework web seguro",
        PHP: "Desarrollo web dinámico",
        Laravel: "Framework PHP elegante",
        FastAPI: "APIs de alto rendimiento",
        React: "Desarrollo de interfaces modernas",
        "Next.js": "Framework React fullstack",
        TypeScript: "JavaScript tipado",
        Tailwind: "CSS utilitario",
        PostgreSQL: "Base de datos relacional confiable",
        Docker: "Contenerización y despliegue",
        AWS: "Infraestructura cloud escalable"
      },
      expertise: [
        { text: "Arquitectura escalable", key: 1 },
        { text: "Frontend & backend", key: 2 },
        { text: "DevOps & cloud", key: 3 },
        { text: "CI/CD", key: 4 },
      ]
    },
    en: {
      title: "Main Tech Stack",
      tagline: "Fullstack Engineer: development, architecture & deployment.",
      valuePhrase: "I select modern, proven technologies to ensure performance, security, and scalability.",
      areas: {
        backend: "Backend",
        frontend: "Frontend",
        devops: "Database, DevOps & Cloud"
      },
      tooltips: {
        Java: "Robust enterprise applications",
        "Spring Boot": "Microservices & APIs",
        Python: "Versatile scripting & backend",
        Django: "Secure web frameworks",
        PHP: "Dynamic web development",
        Laravel: "Elegant PHP framework",
        FastAPI: "High-performance APIs",
        React: "Modern UI development",
        "Next.js": "Fullstack React framework",
        TypeScript: "Type-safe JavaScript",
        Tailwind: "Utility-first CSS",
        PostgreSQL: "Reliable relational database",
        Docker: "Containerization & deployment",
        AWS: "Scalable cloud infrastructure"
      },
      expertise: [
        { text: "Scalable architecture", key: 1 },
        { text: "Frontend & backend", key: 2 },
        { text: "DevOps & cloud", key: 3 },
        { text: "CI/CD", key: 4 },
      ]
    },
  };

  // Agrupación por área
  const techStack = [
    { name: "Java", icon: <FaJava className="w-10 h-10 text-orange-600" />, area: "backend" },
    { name: "Spring Boot", icon: <SiSpringboot className="w-10 h-10 text-green-600" />, area: "backend" },
    { name: "Python", icon: <FaPython className="w-10 h-10 text-yellow-500" />, area: "backend" },
    { name: "Django", icon: <SiDjango className="w-10 h-10 text-green-900" />, area: "backend" },
    { name: "PHP", icon: <FaPhp className="w-10 h-10 text-purple-600" />, area: "backend" },
    { name: "Laravel", icon: <FaLaravel className="w-10 h-10 text-red-600" />, area: "backend" },
    { name: "FastAPI", icon: <SiFastapi className="w-10 h-10 text-teal-500" />, area: "backend" },
    { name: "React", icon: <FaReact className="w-10 h-10 text-sky-500" />, area: "frontend" },
    { name: "Next.js", icon: <SiNextdotjs className="w-10 h-10 text-black dark:text-white" />, area: "frontend" },
    { name: "TypeScript", icon: <SiTypescript className="w-10 h-10 text-blue-600" />, area: "frontend" },
    { name: "Tailwind", icon: <SiTailwindcss className="w-10 h-10 text-cyan-500" />, area: "frontend" },
    { name: "PostgreSQL", icon: <SiPostgresql className="w-10 h-10 text-blue-700" />, area: "devops" },
    { name: "Docker", icon: <FaDocker className="w-10 h-10 text-blue-500" />, area: "devops" },
    { name: "AWS", icon: <FaAws className="w-10 h-10 text-orange-500" />, area: "devops" }
  ];

  // Agrupar tecnologías por área
  const areas = ["backend", "frontend", "devops"];

  return (
    <section id="stack" className="max-w-main mx-auto py-20">
      <h2 className="section-title text-center mb-2">{t[language].title}</h2>
      <h3 className="section-subtitle text-center mb-2">{t[language].tagline}</h3>
      <p className="text-center text-gray-500 dark:text-gray-400 italic mb-8">
        {t[language].valuePhrase}
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4 sm:gap-8 justify-items-center mb-10">
        {techStack.map((tech) => (
          <div
            key={tech.name}
            title={t[language].tooltips[tech.name]}
            className="flex flex-col items-center min-w-[70px] group"
          >
            <div className="mb-2 transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110 group-hover:shadow-lg">
              {tech.icon}
            </div>
            <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 font-medium mt-1 text-center">
              {tech.name}
            </span>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap justify-center gap-3 mt-8">
        {t[language].expertise.map((b) => (
          <span
            key={b.key}
            className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-sm font-medium shadow-sm border border-blue-100 dark:border-blue-800"
          >
            <FaCheckCircle className="w-3 h-3 text-blue-400 dark:text-blue-400" />
            {b.text}
          </span>
        ))}
      </div>
    </section>
  );
}

