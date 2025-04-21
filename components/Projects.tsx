'use client';

import Image from 'next/image';
import { useState } from 'react';
import { FaJava, FaLock, FaGithub } from 'react-icons/fa';
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
} from 'react-icons/si';
import { motion } from 'framer-motion';
import { ExternalLink, Video } from 'lucide-react';

type Project = {
  title: string;
  badge?: string;
  description: string;
  technologies: JSX.Element[];
  codeLink: string;
  demoLink?: string;
  image?: string;
  video?: string;
};

const projects: Project[] = [
  {
    title: 'GestiónPro (Sistema de Administración)',
    badge: 'Sistema completo',
    description:
      'Aplicación robusta con panel de control, gestión de usuarios, productos, cajeros y autenticación JWT. Ideal para entidades comerciales.',
    technologies: [
      <FaJava title="Java" key="java" />,
      <SiSpring title="Spring Boot" key="spring" />,
      <SiPostgresql title="PostgreSQL" key="postgres" />,
      <SiThymeleaf title="Thymeleaf" key="thymeleaf" />,
      <SiBootstrap title="Bootstrap" key="bootstrap" />,
      <FaLock title="JWT" key="jwt" />,
    ],
    codeLink: 'https://github.com/EmiFunes91/adm-empleados',
    image: '/images/panel-de-control.png',
    video: '/video/proyecto-gestioncomercial.mp4',
  },
  {
    title: 'Store API (CRUD + Auth)',
    badge: 'API Backend',
    description:
      'API segura con Spring Security, gestión completa de productos y usuarios. Interfaz con Thymeleaf.',
    technologies: [
      <FaJava title="Java" key="java" />,
      <SiSpring title="Spring Boot" key="spring" />,
      <SiPostgresql title="PostgreSQL" key="postgres" />,,
      <SiThymeleaf title="Thymeleaf" key="thymeleaf" />,
    ],
    codeLink: 'https://github.com/EmiFunes91/store',
    image: '/images/imgAPIproduct.png',
    video: '/video/',
  },
  {
    title: 'QuickTasks (App de Tareas)',
    badge: 'Fullstack en progreso',
    description:
      'Fullstack en desarrollo. Backend en Spring Boot con JWT. Frontend en React + Tailwind. Despliegue en GitHub Pages.',
    technologies: [
      <SiReact title="React" key="react" />,
      <SiTailwindcss title="Tailwind CSS" key="tailwind" />,
      <SiSpring title="Spring Boot" key="spring" />,
      <SiDocker title="Docker" key="docker" />,
      <FaLock title="JWT" key="jwt" />,
    ],
    codeLink: 'https://github.com/EmiFunes91/QuickTasks',
    demoLink: 'https://emilio-organization.github.io/quicktasks',
  },
  {
    title: 'Portfolio Profesional',
    badge: 'Frontend avanzado',
    description:
      'Mi portfolio personal desarrollado con Next.js, TypeScript y Tailwind. Multi-idioma, modo claro/oscuro y diseño responsive.',
    technologies: [
      <SiNextdotjs title="Next.js" key="next" />,
      <SiTypescript title="TypeScript" key="ts" />,
      <SiTailwindcss title="Tailwind CSS" key="tailwind" />,
    ],
    codeLink: 'https://github.com/EmiFunes91/emilio-portfolio',
    image: '/images/mackup.png',
    demoLink: 'https://emiliofunes-portfolio.vercel.app/',
  },
];

export default function Projects({ title }: { title: string }) {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  return (
    <section className="mt-20 max-w-6xl mx-auto px-4" id="proyectos">
      <h2 className="text-3xl font-bold text-center mb-10">{title}</h2>

      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -4 }}
            className="rounded-xl border border-gray-200 dark:border-gray-700 shadow-xl bg-white dark:bg-gray-900 p-6 transition-all"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {project.title}
              </h3>
              {project.badge && (
                <span className="text-xs px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100 font-medium">
                  {project.badge}
                </span>
              )}
            </div>

            {project.image && (
              <Image
                src={project.image}
                alt={project.title}
                width={640}
                height={360}
                className="rounded-md mb-4 border border-gray-300 dark:border-gray-700"
              />
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

      {selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur">
          <div className="bg-white dark:bg-gray-900 rounded-lg p-4 max-w-3xl w-full relative shadow-2xl">
            <button
              className="absolute top-2 right-4 text-gray-500 hover:text-red-500 text-xl"
              onClick={() => setSelectedVideo(null)}
              aria-label="Cerrar video"
            >
              ✕
            </button>
            <video
              src={selectedVideo}
              controls
              className="rounded-lg w-full max-h-[70vh] mt-4"
            />
          </div>
        </div>
      )}
    </section>
  );
}





