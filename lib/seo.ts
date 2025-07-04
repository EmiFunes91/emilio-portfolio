import { Metadata } from 'next'

export interface SEOConfig {
  title: string
  description: string
  keywords: string[]
  ogTitle?: string
  ogDescription?: string
  twitterTitle?: string
  twitterDescription?: string
}

export const seoConfig: Record<'es' | 'en', SEOConfig> = {
  es: {
    title: "Emilio Funes - Desarrollador Backend | Java, Spring Boot, PHP, Laravel",
    description: "Portfolio profesional de desarrollador backend especializado en Java Spring Boot, PHP Laravel y desarrollo de APIs RESTful. Proyectos demostrativos y experiencia en software escalable.",
    keywords: [
      "desarrollador backend",
      "java developer",
      "spring boot",
      "php developer",
      "laravel",
      "desarrollo de apis",
      "postgresql",
      "mysql",
      "autenticación jwt",
      "api rest",
      "ingeniero de software",
      "argentina",
      "desarrollo de software",
      "backend development"
    ],
    ogTitle: "Emilio Funes - Desarrollador Backend Portfolio",
    ogDescription: "Portfolio profesional de desarrollador backend con Java, Spring Boot, PHP, Laravel y más tecnologías modernas.",
    twitterTitle: "Emilio Funes - Desarrollador Backend Portfolio",
    twitterDescription: "Portfolio profesional de desarrollador backend especializado en Java Spring Boot, PHP Laravel."
  },
  en: {
    title: "Emilio Funes - Backend Developer | Java, Spring Boot, PHP, Laravel",
    description: "Professional backend developer portfolio specializing in Java Spring Boot, PHP Laravel and RESTful API development. Showcase projects and scalable software development experience.",
    keywords: [
      "backend developer",
      "java developer",
      "spring boot",
      "php developer",
      "laravel",
      "api development",
      "postgresql",
      "mysql",
      "jwt authentication",
      "rest api",
      "software engineer",
      "argentina",
      "software development",
      "backend development"
    ],
    ogTitle: "Emilio Funes - Backend Developer Portfolio",
    ogDescription: "Professional backend developer portfolio with Java, Spring Boot, PHP, Laravel and modern technologies.",
    twitterTitle: "Emilio Funes - Backend Developer Portfolio",
    twitterDescription: "Professional backend developer portfolio specializing in Java Spring Boot, PHP Laravel."
  }
}

export function generateMetadata(language: 'es' | 'en' = 'es'): Metadata {
  const config = seoConfig[language]
  
  return {
    title: config.title,
    description: config.description,
    keywords: config.keywords,
    openGraph: {
      title: config.ogTitle || config.title,
      description: config.ogDescription || config.description,
      locale: language === 'es' ? 'es_ES' : 'en_US',
    },
    twitter: {
      title: config.twitterTitle || config.title,
      description: config.twitterDescription || config.description,
    },
    alternates: {
      languages: {
        'es-ES': 'https://emiliofunes-portfolio.vercel.app/',
        'en-US': 'https://emiliofunes-portfolio.vercel.app/?lang=en',
      },
    },
  }
}

export function generateStructuredData(language: 'es' | 'en' = 'es') {
  const isSpanish = language === 'es'
  
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Emilio Funes",
    "jobTitle": isSpanish ? "Desarrollador Backend" : "Backend Developer",
    "description": isSpanish 
      ? "Desarrollador Backend especializado en Java Spring Boot, PHP Laravel y desarrollo de APIs RESTful"
      : "Backend Developer specializing in Java Spring Boot, PHP Laravel and RESTful API development",
    "url": "https://emiliofunes-portfolio.vercel.app",
    "sameAs": [
      "https://github.com/EmiFunes91",
      "https://www.linkedin.com/in/emilio-funes-8b140b21a/"
    ],
    "knowsAbout": [
      "Java",
      "Spring Boot", 
      "PHP",
      "Laravel",
      "PostgreSQL",
      "MySQL",
      "REST APIs",
      "JWT Authentication",
      "Docker",
      "Git"
    ],
    "worksFor": {
      "@type": "Organization",
      "name": "Freelance"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "AR"
    },
    "knowsLanguage": ["Spanish", "English"]
  }
} 