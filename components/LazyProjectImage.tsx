'use client'

import { useState, useRef, useEffect } from 'react'
import OptimizedImage from './OptimizedImage'

interface LazyProjectImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
}

export default function LazyProjectImage({
  src,
  alt,
  width = 800,
  height = 600,
  className = '',
  priority = false
}: LazyProjectImageProps) {
  const [isInView, setIsInView] = useState(priority)
  const imgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (priority) return // No lazy load para imágenes prioritarias

    // Verificar si IntersectionObserver está disponible
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      // Fallback: cargar la imagen inmediatamente si IntersectionObserver no está disponible
      setIsInView(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      {
        rootMargin: '50px 0px', // Cargar 50px antes de que sea visible
        threshold: 0.1
      }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [priority])

  if (!isInView) {
    return (
      <div
        ref={imgRef}
        className={`bg-gray-200 dark:bg-gray-700 animate-pulse rounded-lg ${className}`}
        style={{ width, height }}
        aria-label="Cargando imagen..."
      />
    )
  }

  return (
    <div ref={imgRef} className={className}>
      <OptimizedImage
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
      />
    </div>
  )
} 