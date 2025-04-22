"use client";

import Image from "next/image";
import { useState } from "react";
import { FaJava, FaLock, FaGithub } from "react-icons/fa";
import {
  SiSpring,
  SiPostgresql,
  SiThymeleaf,
  SiBootstrap,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiNextdotjs,
  SiDocker,
  SiMysql,
} from "react-icons/si";
import { motion } from "framer-motion";
import { ExternalLink, Video, X } from "lucide-react";
import ProjectCarousel from "./ProjectCarousel";

type Project = {
  title: string;
  badge?: string;
  description: string;
  technologies: JSX.Element[];
  codeLink: string;
  demoLink?: string;
  images?: string[];
  video?: string;
};

const projects: Project[] = [
  {
    title: "GestiónPro (Sistema de Administración)",
    badge: "Sistema completo",
    description:
      "Aplicación robusta con panel de control, gestión de usuarios, productos, cajeros y autenticación JWT. Ideal para entidades comerciales.",
    technologies: [
      <FaJava key="java" title="Java" />,
      <SiSpring key="spring" title="Spring Boot" />,
      <SiPostgresql key="postgres" title="PostgreSQL" />,
      <SiThymeleaf key="thymeleaf" title="Thymeleaf" />,
      <SiBootstrap key="bootstrap" title="Bootstrap" />,
      <SiDocker key="docker" title="Docker" />,
      <FaLock key="jwt" title="JWT" />,
    ],
    codeLink: "https://github.com/EmiFunes91/adm-empleados",
    images: [
      "/projects/gestionpro/1.png",
      "/projects/gestionpro/2.png",
      "/projects/gestionpro/3.png",
    ],
    video: "/video/proyecto-gestioncomercial.mp4",
  },
  {
    title: "Store API (CRUD + Auth)",
    badge: "API Backend",
    description:
      "API segura con Spring Security, gestión completa de productos y usuarios. Interfaz con Thymeleaf.",
    technologies: [
      <FaJava key="java" title="Java" />,
      <SiSpring key="spring" title="Spring Boot" />,
      <SiPostgresql key="postgres" title="PostgreSQL" />,
      <SiThymeleaf key="thymeleaf" title="Thymeleaf" />,
      <SiBootstrap key="bootstrap" title="Bootstrap" />,
    ],
    codeLink: "https://github.com/EmiFunes91/store",
    images: [
      "/projects/store-api/1.png",
      "/projects/store-api/2.png",
      "/projects/store-api/3.png",
    ],
  },
  {
    title: "QuickTasks (App de Tareas)",
    badge: "Fullstack en progreso",
    description:
      "Fullstack en desarrollo. Backend en Spring Boot con JWT. Frontend en React + Tailwind. Despliegue en GitHub Pages.",
    technologies: [
      <SiReact key="react" title="React" />,
      <SiTailwindcss key="tailwind" title="Tailwind CSS" />,
      <SiSpring key="spring" title="Spring Boot" />,
      <SiDocker key="docker" title="Docker" />,
      <FaLock key="jwt" title="JWT" />,
    ],
    codeLink: "https://github.com/EmiFunes91/QuickTasks",
    demoLink: "https://emilio-organization.github.io/quicktasks",
    images: [
      "/projects/quicktasks/1.png",
      "/projects/quicktasks/2.png",
      "/projects/quicktasks/3.png",
    ],
  },
  {
    title: "Portfolio Profesional",
    badge: "Frontend avanzado",
    description:
      "Mi portfolio personal desarrollado con Next.js, TypeScript y Tailwind. Multi-idioma, modo claro/oscuro y diseño responsive.",
    technologies: [
      <SiNextdotjs key="next" title="Next.js" />,
      <SiTypescript key="ts" title="TypeScript" />,
      <SiTailwindcss key="tailwind" title="Tailwind CSS" />,
    ],
    codeLink: "https://github.com/EmiFunes91/emilio-portfolio",
    demoLink: "https://emiliofunes-portfolio.vercel.app/",
    images: [
      "/projects/portfolio/1.png",
      "/projects/portfolio/2.png",
      "/projects/portfolio/3.png",
    ],
  },
];

export default function Projects({ title }: { title: string }) {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  return (
    <section className="mt-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" id="proyectos">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10">{title}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -4 }}
            className="rounded-xl border border-gray-200 dark:border-gray-700 shadow-xl bg-white dark:bg-gray-900 p-5 sm:p-6 transition-all"
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                {project.title}
              </h3>
              {project.badge && (
                <span className="text-[11px] sm:text-xs px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100 font-medium">
                  {project.badge}
                </span>
              )}
            </div>

            {project.images && (
              <ProjectCarousel images={project.images} title={project.title} />
            )}

            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-3 text-xl text-blue-500 dark:text-blue-400 mb-4">
              {project.technologies.map((tech, i) => (
                <span key={i} className="hover:scale-110 transition-transform">{tech}</span>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 mt-2">
              <a
                href={project.codeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-full text-xs font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              >
                <FaGithub className="w-4 h-4" /> Código
              </a>

              {project.demoLink && (
                <a
                  href={project.demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100 rounded-full text-xs font-medium hover:bg-blue-200 dark:hover:bg-blue-700 transition"
                >
                  <ExternalLink className="w-4 h-4" /> Demo
                </a>
              )}

              {project.video && (
                <button
                  onClick={() => setSelectedVideo(project.video!)}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-100 dark:bg-indigo-800 text-indigo-800 dark:text-indigo-100 rounded-full text-xs font-medium hover:bg-indigo-200 dark:hover:bg-indigo-700 transition"
                >
                  <Video className="w-4 h-4" /> Video
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal video */}
      {selectedVideo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative bg-white dark:bg-gray-900 rounded-lg p-4 w-[92%] max-w-3xl shadow-2xl"
          >
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-2 right-3 p-[6px] rounded-full bg-gray-700 text-white hover:bg-red-600 transition"
              aria-label="Cerrar video"
            >
              <X className="w-4 h-4" />
            </button>

            <motion.video
              src={selectedVideo}
              controls
              className="rounded-lg w-full max-h-[70vh] mt-4"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
