'use client'

import { useEffect } from 'react'

interface ResourcePreloaderProps {
  images?: string[]
  fonts?: string[]
  scripts?: string[]
}

export default function ResourcePreloader({ 
  images = [], 
  fonts = [], 
  scripts = [] 
}: ResourcePreloaderProps) {
  useEffect(() => {
    // Preload imágenes críticas
    images.forEach((src) => {
      try {
        const link = document.createElement('link')
        link.rel = 'preload'
        link.as = 'image'
        link.href = src
        document.head.appendChild(link)
      } catch (error) {
        console.warn(`Failed to preload image: ${src}`, error)
      }
    })

    // Preload fuentes críticas
    fonts.forEach((font) => {
      try {
        const link = document.createElement('link')
        link.rel = 'preload'
        link.as = 'font'
        link.href = font
        link.crossOrigin = 'anonymous'
        document.head.appendChild(link)
      } catch (error) {
        console.warn(`Failed to preload font: ${font}`, error)
      }
    })

    // Preload scripts críticos
    scripts.forEach((src) => {
      try {
        const link = document.createElement('link')
        link.rel = 'preload'
        link.as = 'script'
        link.href = src
        document.head.appendChild(link)
      } catch (error) {
        console.warn(`Failed to preload script: ${src}`, error)
      }
    })

    // DNS prefetch para dominios externos
    const externalDomains = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
      'https://www.googletagmanager.com',
      'https://www.google-analytics.com'
    ]

    externalDomains.forEach((domain) => {
      try {
        const link = document.createElement('link')
        link.rel = 'dns-prefetch'
        link.href = domain
        document.head.appendChild(link)
      } catch (error) {
        console.warn(`Failed to add DNS prefetch for: ${domain}`, error)
      }
    })

    // Preconnect para conexiones críticas
    const criticalDomains = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com'
    ]

    criticalDomains.forEach((domain) => {
      try {
        const link = document.createElement('link')
        link.rel = 'preconnect'
        link.href = domain
        link.crossOrigin = 'anonymous'
        document.head.appendChild(link)
      } catch (error) {
        console.warn(`Failed to add preconnect for: ${domain}`, error)
      }
    })

    // Cleanup function
    return () => {
      // Los elementos se limpian automáticamente al desmontar el componente
    }
  }, [images, fonts, scripts])

  return null // Este componente no renderiza nada
} 