import { useCallback, useRef, useEffect, useState } from 'react'

// Throttle function para limitar la frecuencia de ejecución
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): T {
  let inThrottle: boolean
  return ((...args: any[]) => {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }) as T
}

// Debounce function para retrasar la ejecución
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): T {
  let timeout: NodeJS.Timeout
  return ((...args: any[]) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(this, args), wait)
  }) as T
}

// Hook para optimizar scroll events
export function useOptimizedScroll(callback: (event: Event) => void, delay = 16) {
  const throttledCallback = useCallback(
    throttle(callback, delay),
    [callback, delay]
  )

  useEffect(() => {
    window.addEventListener('scroll', throttledCallback, { passive: true })
    return () => window.removeEventListener('scroll', throttledCallback)
  }, [throttledCallback])
}

// Hook para optimizar resize events
export function useOptimizedResize(callback: (event: Event) => void, delay = 100) {
  const debouncedCallback = useCallback(
    debounce(callback, delay),
    [callback, delay]
  )

  useEffect(() => {
    window.addEventListener('resize', debouncedCallback, { passive: true })
    return () => window.removeEventListener('resize', debouncedCallback)
  }, [debouncedCallback])
}

// Hook para optimizar animaciones con requestAnimationFrame
export function useOptimizedAnimation(callback: () => void) {
  const animationRef = useRef<number>()

  const startAnimation = useCallback(() => {
    const animate = () => {
      callback()
      animationRef.current = requestAnimationFrame(animate)
    }
    animationRef.current = requestAnimationFrame(animate)
  }, [callback])

  const stopAnimation = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }
  }, [])

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return { startAnimation, stopAnimation }
}

// Hook para lazy loading de componentes
export function useLazyLoad<T>(
  importFunc: () => Promise<{ default: T }>,
  deps: any[] = []
) {
  const [Component, setComponent] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    importFunc()
      .then((module) => {
        if (module && module.default) {
          setComponent(() => module.default)
        } else {
          console.error('Error loading component: module or module.default is null')
        }
      })
      .catch((error) => {
        console.error('Error loading component:', error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, deps)

  return { Component, loading }
}

// Hook para optimizar intersection observer
export function useIntersectionObserver(
  callback: (entries: IntersectionObserverEntry[]) => void,
  options: IntersectionObserverInit = {}
) {
  const observerRef = useRef<IntersectionObserver | null>(null)

  const observe = useCallback((element: Element) => {
    if (observerRef.current) {
      observerRef.current.observe(element)
    }
  }, [])

  const unobserve = useCallback((element: Element) => {
    if (observerRef.current) {
      observerRef.current.unobserve(element)
    }
  }, [])

  useEffect(() => {
    observerRef.current = new IntersectionObserver(callback, {
      rootMargin: '50px 0px',
      threshold: 0.1,
      ...options,
    })

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [callback, options])

  return { observe, unobserve }
} 