"use client";

import Image from "next/image";
import { useState } from "react";
import { usePreferences } from "../context/PreferencesContext";
import { FaGithub, FaLock, FaYoutube, FaExternalLinkAlt, FaPlay, FaCode } from "react-icons/fa";
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
  SiFastapi,
  SiStripe,
  SiChakraui,
  SiOpenai,
  SiPhp,
  SiCodeigniter,
  SiMysql,
  SiJquery,
} from "react-icons/si";
import { motion } from "framer-motion";
import { ExternalLink, Video, X, FileText } from "lucide-react";
import ProjectCarousel from "./ProjectCarousel";
import ActionButton from "./ui/ActionButton";

const projects = [
  {
    content: {
      es: {
        title: "Smart Advisor App – Legal AI SaaS",
        badge: "SaaS Completo",
        description:
          "Aplicación SaaS de asesoramiento legal potenciada por IA. Sistema completo con FastAPI + Next.js, integración Stripe, chat con GPT-4 y gestión de suscripciones.",
      },
      en: {
        title: "Smart Advisor App – Legal AI SaaS",
        badge: "Complete SaaS",
        description:
          "AI-powered legal advisory SaaS application. Complete system with FastAPI + Next.js, Stripe integration, GPT-4 chat and subscription management.",
      },
    },
    technologies: [
      <SiFastapi key="fastapi" />,
      <SiNextdotjs key="next" />,
      <SiTypescript key="ts" />,
      <SiStripe key="stripe" />,
      <SiOpenai key="openai" />,
      <SiChakraui key="chakra" />,
      <SiPostgresql key="pg" />,
      <FaLock key="jwt" />,
    ],
    codeLink: "https://github.com/EmiFunes91/smart-advisor-app",
    images: [
      { src: "/projects/smart-advisor/login.webp", alt: { es: "Pantalla de login de Smart Advisor App – SaaS legal con IA", en: "Login screen of Smart Advisor App – Legal AI SaaS" } },
      { src: "/projects/smart-advisor/register.webp", alt: { es: "Registro profesional en Smart Advisor App", en: "Professional registration in Smart Advisor App" } },
      { src: "/projects/smart-advisor/pricing.webp", alt: { es: "Planes y precios de suscripción en Smart Advisor", en: "Subscription plans and pricing in Smart Advisor" } },
      { src: "/projects/smart-advisor/dashboard.webp", alt: { es: "Dashboard principal de Smart Advisor App", en: "Main dashboard of Smart Advisor App" } },
      { src: "/projects/smart-advisor/faq.webp", alt: { es: "Sección de preguntas frecuentes en Smart Advisor", en: "FAQ section in Smart Advisor" } },
      { src: "/projects/smart-advisor/documents.webp", alt: { es: "Gestión de documentos legales en Smart Advisor", en: "Legal documents management in Smart Advisor" } },
      { src: "/projects/smart-advisor/jurisprudence.webp", alt: { es: "Análisis de jurisprudencia en Smart Advisor", en: "Jurisprudence analysis in Smart Advisor" } },
    ],
    youtubeLink: "https://youtu.be/pw2lzGQVkK0",
  },
  {
    content: {
      es: {
        title: "Stripe Subscription Integration",
        badge: "Integración de Pagos",
        description:
          "Integración profesional de Stripe en aplicación SaaS con PHP CodeIgniter. Stripe Checkout, webhooks, gestión de suscripciones y panel administrativo completo.",
      },
      en: {
        title: "Stripe Subscription Integration",
        badge: "Payment Integration",
        description:
          "Professional Stripe integration in SaaS application with PHP CodeIgniter. Stripe Checkout, webhooks, subscription management and complete admin panel.",
      },
    },
    technologies: [
      <SiPhp key="php" />,
      <SiCodeigniter key="codeigniter" />,
      <SiStripe key="stripe" />,
      <SiMysql key="mysql" />,
      <SiJquery key="jquery" />,
      <FaLock key="webhooks" />,
    ],
    codeLink: "https://github.com/EmiFunes91/app.taskaleta.com",
    images: [
      "/projects/stripe-integration/3.png",
      "/projects/stripe-integration/1.png",
      "/projects/stripe-integration/2.png",
      "/projects/stripe-integration/4.png",
    ],
    youtubeLink: "https://youtu.be/Plcjf5iXVZc",
  },
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
      subtitle: "Soluciones reales en web, cloud y DevOps.",
      code: "Ver código fuente",
      demo: "Ver demo en vivo",
      video: "Video",
      youtube: "YouTube",
      apiDemo: "API Demo",
      docs: "Ver documentación",
      // Tooltips específicos para cada proyecto
      smartAdvisorDemo: "Demo de API con FastAPI",
      stripeDemo: "Demo de integración Stripe",
      gestionProDemo: "Demo del sistema de gestión",
      storeApiDemo: "Demo de API REST",
      cta: "Cada proyecto refleja mi compromiso con la calidad, la escalabilidad y las mejores prácticas de ingeniería.",
      count: (n: number) => `${n} proyectos publicados`,
    },
    en: {
      title: "Highlighted Projects",
      subtitle: "Real-world solutions for web, cloud, and DevOps.",
      code: "View source code",
      demo: "View live demo",
      video: "Video",
      youtube: "YouTube",
      apiDemo: "API Demo",
      docs: "View documentation",
      // Specific tooltips for each project
      smartAdvisorDemo: "FastAPI API Demo",
      stripeDemo: "Stripe Integration Demo",
      gestionProDemo: "Management System Demo",
      storeApiDemo: "REST API Demo",
      cta: "Each project demonstrates my commitment to quality, scalability, and modern engineering best practices.",
      count: (n: number) => `${n} projects published`,
    },
  };

  const tLang = t[language];

  // Función para obtener el tooltip específico del video según el proyecto
  const getVideoTooltip = (projectTitle: string) => {
    if (projectTitle.includes("Smart Advisor")) {
      return tLang.smartAdvisorDemo;
    } else if (projectTitle.includes("Stripe")) {
      return tLang.stripeDemo;
    } else if (projectTitle.includes("GestiónPro")) {
      return tLang.gestionProDemo;
    } else if (projectTitle.includes("Store API")) {
      return tLang.storeApiDemo;
    } else {
      return tLang.youtube;
    }
  };

  return (
    <section id="proyectos" className="max-w-main mx-auto py-20">
      <h2 className="section-title text-center mb-2">{tLang.title}</h2>
      <h3 className="section-subtitle text-center mb-8">{tLang.subtitle}</h3>
      <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10 text-center">
        {tLang.cta}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
        {projects.map((project, index) => {
          const content = project.content[language];
          return (
            <div
              key={project.codeLink || index}
              className="relative bg-white dark:bg-gray-900 rounded-xl shadow border border-gray-100 dark:border-gray-800 p-4 flex flex-col gap-3 items-start transition-transform hover:-translate-y-1 hover:shadow-lg duration-300 mx-auto min-h-[320px]"
            >
              <div className="w-full rounded-xl overflow-hidden mb-2 shadow-sm">
                <div className="h-[140px] md:h-[180px] w-full">
                  <ProjectCarousel images={project.images} title={content.title} />
                </div>
              </div>
              <div className="flex items-center w-full mb-1">
                <div className="flex-1">
                  <h3 className="text-base font-bold text-gray-900 dark:text-white leading-tight mb-0.5">
                    {content.title}
                  </h3>
                  {content.badge && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100 font-medium ml-0.5">
                      {content.badge}
                    </span>
                  )}
                </div>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1 line-clamp-2 min-h-[2.5em]">
                {content.description}
              </p>
              <div className="flex flex-wrap gap-1 mb-1">
                {project.technologies.map((tech, i) => {
                  const key = tech?.key ?? `${project.codeLink}-tech-${i}`;
                  return (
                    <span
                      key={key}
                      className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-50 dark:bg-blue-900/20 text-base text-blue-500 dark:text-blue-200 transition-transform duration-200 hover:scale-110 hover:-translate-y-0.5"
                      title={tech?.type?.name?.replace(/^Si|Fa/, "") ?? ""}
                    >
                      {tech}
                    </span>
                  );
                })}
              </div>
              <div className="flex gap-2 mt-auto">
                <ActionButton
                  href={project.codeLink}
                  variant="default"
                  title={tLang.code}
                  className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white shadow-md"
                >
                  <FaGithub className="w-5 h-5" />
                </ActionButton>
                {project.demoLink && (
                  <ActionButton
                    href={project.demoLink}
                    variant="demo"
                    title={tLang.demo}
                    className="bg-blue-600 hover:bg-blue-700 text-white shadow-md"
                  >
                    <FaExternalLinkAlt className="w-5 h-5" />
                  </ActionButton>
                )}
                {project.docsLink && (
                  <ActionButton
                    href={project.docsLink}
                    variant="default"
                    title={tLang.docs}
                    className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white shadow-md"
                  >
                    <FileText className="w-5 h-5" />
                  </ActionButton>
                )}
                {project.youtubeLink && (
                  <ActionButton
                    onClick={() => setSelectedVideo(project.youtubeLink!)}
                    title={getVideoTooltip(content.title)}
                    className="!bg-red-600 hover:!bg-red-700 text-white shadow-md"
                  >
                    <FaYoutube className="w-5 h-5 text-white" />
                  </ActionButton>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <p className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">
        {tLang.count(projects.length)}
      </p>
      {/* Modal de video */}
      {selectedVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setSelectedVideo(null)}
          onKeyDown={(e) => e.key === "Escape" && setSelectedVideo(null)}
          tabIndex={-1}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-4xl px-4 sm:px-6"
          >
            <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-xl shadow-lg">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube.com/embed/${getYouTubeId(selectedVideo)}`}
                title="YouTube Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
