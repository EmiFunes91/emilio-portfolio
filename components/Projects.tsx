"use client";

import Image from "next/image";
import { useState } from "react";
import { usePreferences } from "../context/PreferencesContext";
import { FaGithub, FaLock } from "react-icons/fa";
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
import { ExternalLink, Video, X, FileText } from "lucide-react";
import ProjectCarousel from "./ProjectCarousel";

const projects = [
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
      <FaLock key="jwt" />,
      <SiSpring key="spring" />,
      <SiPostgresql key="pg" />,
      <SiThymeleaf key="thymeleaf" />,
      <SiBootstrap key="bootstrap" />,
      <SiDocker key="docker" />,
    ],
    codeLink: "https://github.com/EmiFunes91/adm-empleados",
    docsLink: "https://emilio-organization.gitbook.io/emilio-organization-docs",
    images: [
      "/projects/gestionpro/1.png",
      "/projects/gestionpro/2.png",
      "/projects/gestionpro/3.png",
    ],
    youtubeLink: "https://youtu.be/3zreFzfJtto",
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
    youtubeLink: "https://youtu.be/nTSNzoPEC7c",
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
    images: ["/projects/quicktasks/1.png", "/projects/quicktasks/2.png"],
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
    images: ["/projects/portfolio/1.png"],
  },
];

function getYouTubeId(url: string) {
  const match = url.match(/(?:youtu\.be\/|v=)([^&]+)/);
  return match ? match[1] : "";
}

export default function Projects() {
  const { language } = usePreferences();
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const t = {
    es: {
      title: "Proyectos Destacados",
      code: "Código",
      demo: "Demo",
      video: "Video",
      youtube: "YouTube",
      docs: "Docs",
      cta: "Explorá algunos de los proyectos que desarrollé con tecnologías modernas y buenas prácticas.",
      count: (n: number) => `${n} proyectos publicados`,
    },
    en: {
      title: "Highlighted Projects",
      code: "Code",
      demo: "Demo",
      video: "Video",
      youtube: "YouTube",
      docs: "Docs",
      cta: "Explore some of the projects I built using modern tech and solid engineering practices.",
      count: (n: number) => `${n} projects published`,
    },
  };

  const tLang = t[language];

  return (
    <section
      id="proyectos"
      className="scroll-mt-24 py-20 px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto"
    >
      {/* CTA introductorio */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-center text-gray-900 dark:text-white mb-4"
      >
        {tLang.title}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-center text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10"
      >
        {tLang.cta}
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, index) => {
          const content = project.content[language];
          return (
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              className="card-glow text-center"
              aria-live="polite"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white leading-snug">
                    {content.title}
                  </h3>
                  {content.badge && (
                    <span className="text-[10px] sm:text-xs px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100 font-medium whitespace-nowrap">
                      {content.badge}
                    </span>
                  )}
                </div>

                <ProjectCarousel
                  images={project.images}
                  title={content.title}
                />

                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed mt-4">
                  {content.description}
                </p>

                {/* Tooltips en tecnologías */}
                <div className="flex flex-wrap gap-3 text-xl text-blue-500 dark:text-blue-400 mt-4">
                  {project.technologies.map((tech, i) => {
                    const key = tech?.key ?? `${project.codeLink}-tech-${i}`;
                    return (
                      <span
                        key={key}
                        className="hover:scale-110 transition-transform"
                        title={tech?.type?.name?.replace(/^Si|Fa/, "") ?? ""}
                      >
                        {tech}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Botones de acción */}
              <div className="flex flex-wrap gap-3 mt-6">
                <a
                  href={project.codeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm btn-outline rounded-xl flex items-center gap-2"
                >
                  <FaGithub className="w-4 h-4" /> {tLang.code}
                </a>
                {project.demoLink && (
                  <a
                    href={project.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-primary rounded-xl flex items-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" /> {tLang.demo}
                  </a>
                )}
                {project.docsLink && (
                  <a
                    href={project.docsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm bg-gray-800 text-white hover:bg-gray-700 rounded-xl flex items-center gap-2"
                  >
                    <FileText className="w-4 h-4" /> {tLang.docs}
                  </a>
                )}
                {project.youtubeLink && (
                  <button
                    onClick={() => setSelectedVideo(project.youtubeLink!)}
                    className="btn btn-sm bg-red-600 text-white hover:bg-red-500 rounded-xl flex items-center gap-2 animate-pulse hover:animate-none"
                  >
                    <Video className="w-4 h-4" /> {tLang.youtube}
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Contador final de proyectos */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400"
      >
        {tLang.count(projects.length)}
      </motion.p>

      {/* Modal de video */}
      {selectedVideo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setSelectedVideo(null)}
          onKeyDown={(e) => e.key === "Escape" && setSelectedVideo(null)}
          tabIndex={-1}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-4xl px-4 sm:px-6"
          >
            <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-xl shadow-lg">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube.com/embed/${getYouTubeId(
                  selectedVideo
                )}`}
                title="YouTube Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
