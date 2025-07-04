'use client'

import { useEffect } from 'react'
import { usePreferences } from '../context/PreferencesContext'
import { generateStructuredData } from '../lib/seo'

export default function SEOHead() {
  const { language } = usePreferences()

  useEffect(() => {
    // Actualizar el título de la página dinámicamente
    const config = language === 'es' 
      ? {
          title: "Emilio Funes - Desarrollador Backend | Java, Spring Boot, PHP, Laravel",
          description: "Portfolio profesional de desarrollador backend especializado en Java Spring Boot, PHP Laravel y desarrollo de APIs RESTful."
        }
      : {
          title: "Emilio Funes - Backend Developer | Java, Spring Boot, PHP, Laravel", 
          description: "Professional backend developer portfolio specializing in Java Spring Boot, PHP Laravel and RESTful API development."
        }

    document.title = config.title
    
    // Actualizar meta description
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', config.description)
    }

    // Actualizar Open Graph
    const ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) {
      ogTitle.setAttribute('content', config.title)
    }

    const ogDescription = document.querySelector('meta[property="og:description"]')
    if (ogDescription) {
      ogDescription.setAttribute('content', config.description)
    }

    const ogLocale = document.querySelector('meta[property="og:locale"]')
    if (ogLocale) {
      ogLocale.setAttribute('content', language === 'es' ? 'es_ES' : 'en_US')
    }

    // Actualizar Twitter Card
    const twitterTitle = document.querySelector('meta[name="twitter:title"]')
    if (twitterTitle) {
      twitterTitle.setAttribute('content', config.title)
    }

    const twitterDescription = document.querySelector('meta[name="twitter:description"]')
    if (twitterDescription) {
      twitterDescription.setAttribute('content', config.description)
    }

    // Actualizar hreflang
    const hreflangEs = document.querySelector('link[hreflang="es-ES"]')
    const hreflangEn = document.querySelector('link[hreflang="en-US"]')
    
    if (hreflangEs && hreflangEn) {
      hreflangEs.setAttribute('href', 'https://emiliofunes-portfolio.vercel.app/')
      hreflangEn.setAttribute('href', 'https://emiliofunes-portfolio.vercel.app/?lang=en')
    }

    // Actualizar structured data
    const structuredData = generateStructuredData(language)
    const scriptElement = document.querySelector('script[type="application/ld+json"]')
    if (scriptElement) {
      scriptElement.textContent = JSON.stringify(structuredData)
    }

  }, [language])

  return null // Este componente no renderiza nada visual
} 