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
} from "react-icons/si";
import { motion } from "framer-motion";
import { ExternalLink, Video, X } from "lucide-react";
import ProjectCarousel from "./ProjectCarousel";

type ProjectContent = {
  title: string;
  badge?: string;
  description: string;
};

type Project = {
  content: { es: ProjectContent; en: ProjectContent };
  technologies: JSX.Element[];
  codeLink: string;
  demoLink?: string;
  images: string[];
  video?: string;
};

const projects: Project[] = [
  {
    content: {
      es: {
        title: "GestiónPro (Sistema de Administración)",
        badge: "Sistema completo",
        description:
          "Aplicación robusta con panel de control, gestión de usuarios, productos, cajeros y autenticación JWT. Ideal para entidades comerciales.",
      },
      en: {
        title: "GestiónPro (Admin System)",
        badge: "Complete system",
        description:
          "Robust application with dashboard, user/product/cashier management, and JWT auth. Ideal for commercial businesses.",
      },
    },
    technologies: [
      <FaJava key="java" />,
      <SiSpring key="spring" />,
      <SiPostgresql key="pg" />,
      <SiThymeleaf key="thymeleaf" />,
      <SiBootstrap key="bootstrap" />,
      <SiDocker key="docker" />,
      <FaLock key="jwt" />,
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
    content: {
      es: {
        title: "Store API (CRUD + Auth)",
        badge: "API Backend",
        description:
          "API segura con Spring Security, gestión completa de productos y usuarios. Interfaz con Thymeleaf.",
      },
      en: {
        title: "Store API (CRUD + Auth)",
        badge: "Backend API",
        description:
          "Secure API with Spring Security, complete product and user management. Thymeleaf interface.",
      },
    },
    technologies: [
      <FaJava key="java" />,
      <SiSpring key="spring" />,
      <SiPostgresql key="pg" />,
      <SiThymeleaf key="thymeleaf" />,
      <SiBootstrap key="bootstrap" />,
    ],
    codeLink: "https://github.com/EmiFunes91/store",
    images: [
      "/projects/store-api/1.png",
      "/projects/store-api/2.png",
      "/projects/store-api/3.png",
    ],
    video: "/video/",
  },
  {
    content: {
      es: {
        title: "QuickTasks (App de Tareas)",
        badge: "Fullstack en progreso",
        description:
          "Fullstack en desarrollo. Backend en Spring Boot con JWT. Frontend en React + Tailwind. Despliegue en GitHub Pages.",
      },
      en: {
        title: "QuickTasks (Task App)",
        badge: "Fullstack in progress",
        description:
          "Fullstack in development. Backend with Spring Boot + JWT, frontend with React + Tailwind. Hosted on GitHub Pages.",
      },
    },
    technologies: [
      <SiReact key="react" />,
      <SiTailwindcss key="tailwind" />,
      <SiSpring key="spring" />,
      <SiDocker key="docker" />,
      <FaLock key="jwt" />,
    ],
    codeLink: "https://github.com/EmiFunes91/QuickTasks",
    images: [
      "/projects/quicktasks/1.png",
      "/projects/quicktasks/2.png",
    ],
  },
  {
    content: {
      es: {
        title: "Portfolio Profesional",
        badge: "Frontend avanzado",
        description:
          "Mi portfolio personal desarrollado con Next.js, TypeScript y Tailwind. Multi-idioma, modo claro/oscuro y diseño responsive.",
      },
      en: {
        title: "Professional Portfolio",
        badge: "Advanced frontend",
        description:
          "My personal portfolio built with Next.js, TypeScript and Tailwind. Multi-language, dark/light mode and responsive design.",
      },
    },
    technologies: [
      <SiNextdotjs key="next" />,
      <SiTypescript key="ts" />,
      <SiTailwindcss key="tailwind" />,
    ],
    codeLink: "https://github.com/EmiFunes91/emilio-portfolio",
    demoLink: "https://emiliofunes-portfolio.vercel.app/",
    images: [
      "/projects/portfolio/1.png",
    ],
  },
];

export default function Projects({
  title,
  language,
}: {
  title: string;
  language: "es" | "en";
}) {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  return (
    <section
      id="proyectos"
      className="py-20 px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto"
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl sm:text-4xl font-bold text-center mb-12"
      >
        {title}
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-2 gap-8">
        {projects.map((project, index) => {
          const content = project.content[language];
          return (
            <motion.div
              key={index}
              whileHover={{ y: -4 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col justify-between h-full rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg bg-white dark:bg-gray-900 p-6"
            >
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {content.title}
                  </h3>
                  {content.badge && (
                    <span className="text-xs px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100 font-medium">
                      {content.badge}
                    </span>
                  )}
                </div>

                <ProjectCarousel
                  images={project.images}
                  title={content.title}
                />

                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  {content.description}
                </p>

                <div className="flex flex-wrap gap-3 text-xl text-blue-500 dark:text-blue-400 mb-4">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="hover:scale-110 transition-transform"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                <a
                  href={project.codeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm btn-outline"
                >
                  <FaGithub className="w-4 h-4" /> Código
                </a>
                {project.demoLink && (
                  <a
                    href={project.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-primary"
                  >
                    <ExternalLink className="w-4 h-4" /> Demo
                  </a>
                )}
                {project.video && (
                  <button
                    onClick={() => setSelectedVideo(project.video!)}
                    className="btn btn-sm bg-indigo-600 text-white hover:bg-indigo-500"
                  >
                    <Video className="w-4 h-4" /> Video
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {selectedVideo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative w-[90%] max-w-4xl bg-white dark:bg-gray-900 p-6 rounded-lg shadow-2xl"
          >
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-3 right-3 p-2 bg-gray-700 text-white rounded-full hover:bg-red-500 transition"
              aria-label="Cerrar video"
            >
              <X className="w-4 h-4" />
            </button>
            <motion.video
              src={selectedVideo}
              controls
              className="w-full max-h-[75vh] rounded-lg"
              whileHover={{ scale: 1.01 }}
            />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
