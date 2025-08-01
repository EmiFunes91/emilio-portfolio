// Configuración de performance
export const PERFORMANCE_CONFIG = {
  // Configuración de imágenes
  IMAGES: {
    QUALITY: 85,
    FORMATS: ['image/webp', 'image/avif'] as const,
    SIZES: {
      THUMBNAIL: { width: 400, height: 300 },
      MEDIUM: { width: 800, height: 600 },
      LARGE: { width: 1200, height: 900 }
    },
    LAZY_LOAD_OFFSET: '50px 0px',
    PLACEHOLDER_BLUR: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k='
  },

  // Configuración de animaciones
  ANIMATIONS: {
    DURATION: {
      FAST: 0.2,
      NORMAL: 0.4,
      SLOW: 0.8
    },
    EASING: {
      SMOOTH: [0.25, 0.46, 0.45, 0.94],
      BOUNCE: [0.68, -0.55, 0.265, 1.55],
      EASE_OUT: [0.25, 0.46, 0.45, 0.94]
    },
    THRESHOLD: 0.15,
    ROOT_MARGIN: '50px 0px'
  },

  // Configuración de scroll
  SCROLL: {
    THROTTLE_DELAY: 16, // ~60fps
    RESIZE_DELAY: 100,
    SMOOTH_BEHAVIOR: 'smooth'
  },

  // Configuración de cache
  CACHE: {
    IMAGES_TTL: 60 * 60 * 24 * 30, // 30 días
    STATIC_TTL: 60 * 60 * 24 * 365, // 1 año
    API_TTL: 60 * 5 // 5 minutos
  },

  // Configuración de bundle
  BUNDLE: {
    CHUNK_SIZE_LIMIT: 244 * 1024, // 244KB
    MAX_CHUNKS: 5
  }
} as const

// Utilidades de performance
export const performanceUtils = {
  // Debounce function
  debounce<T extends (...args: any[]) => any>(func: T, wait: number): T {
    let timeout: NodeJS.Timeout
    return ((...args: any[]) => {
      clearTimeout(timeout)
      timeout = setTimeout(() => func.apply(this, args), wait)
    }) as T
  },

  // Throttle function
  throttle<T extends (...args: any[]) => any>(func: T, limit: number): T {
    let inThrottle: boolean
    return ((...args: any[]) => {
      if (!inThrottle) {
        func.apply(this, args)
        inThrottle = true
        setTimeout(() => (inThrottle = false), limit)
      }
    }) as T
  },

  // Lazy load function
  lazyLoad<T>(importFunc: () => Promise<{ default: T }>): Promise<T> {
    return new Promise((resolve, reject) => {
      importFunc()
        .then((module) => resolve(module.default))
        .catch(reject)
    })
  },

  // Preload resource
  preloadResource(href: string, as: string, crossOrigin?: string): void {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = as
    link.href = href
    if (crossOrigin) {
      link.crossOrigin = crossOrigin
    }
    document.head.appendChild(link)
  },

  // Measure performance
  measurePerformance(name: string, fn: () => void): void {
    if (typeof window !== 'undefined' && window.performance && typeof window.performance.now === 'function') {
      const start = window.performance.now()
      fn()
      const end = window.performance.now()
      console.log(`${name} took ${end - start}ms`)
    } else {
      fn()
    }
  },

  // Check if element is in viewport
  isInViewport(element: Element): boolean {
    const rect = element.getBoundingClientRect()
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    )
  },

  // Get device pixel ratio
  getDevicePixelRatio(): number {
    return typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
  },

  // Check if connection is slow
  isSlowConnection(): boolean {
    if (typeof navigator !== 'undefined' && 'connection' in navigator) {
      const connection = (navigator as any).connection
      return connection?.effectiveType === 'slow-2g' || 
             connection?.effectiveType === '2g' ||
             connection?.effectiveType === '3g'
    }
    return false
  }
}

// Tipos de performance
export type ImageFormat = typeof PERFORMANCE_CONFIG.IMAGES.FORMATS[number]
export type AnimationDuration = keyof typeof PERFORMANCE_CONFIG.ANIMATIONS.DURATION
export type AnimationEasing = keyof typeof PERFORMANCE_CONFIG.ANIMATIONS.EASING 