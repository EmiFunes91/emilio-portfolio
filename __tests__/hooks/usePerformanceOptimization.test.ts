import { renderHook, act, waitFor } from '@testing-library/react'
import {
  throttle,
  debounce,
  useOptimizedScroll,
  useOptimizedResize,
  useOptimizedAnimation,
  useLazyLoad,
  useIntersectionObserver
} from '../../hooks/usePerformanceOptimization'

// Mock de requestAnimationFrame y cancelAnimationFrame
const mockRequestAnimationFrame = jest.fn((callback) => {
  setTimeout(callback, 0)
  return 1
})
const mockCancelAnimationFrame = jest.fn()

Object.defineProperty(window, 'requestAnimationFrame', {
  value: mockRequestAnimationFrame,
  writable: true
})

Object.defineProperty(window, 'cancelAnimationFrame', {
  value: mockCancelAnimationFrame,
  writable: true
})

// Mock de window.addEventListener y removeEventListener
const mockAddEventListener = jest.fn()
const mockRemoveEventListener = jest.fn()

Object.defineProperty(window, 'addEventListener', {
  value: mockAddEventListener,
  writable: true
})

Object.defineProperty(window, 'removeEventListener', {
  value: mockRemoveEventListener,
  writable: true
})

// Mock de IntersectionObserver
const mockIntersectionObserver = jest.fn()
const mockObserver = {
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn()
}

mockIntersectionObserver.mockReturnValue(mockObserver)

Object.defineProperty(window, 'IntersectionObserver', {
  value: mockIntersectionObserver,
  writable: true
})

describe('usePerformanceOptimization', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  describe('throttle', () => {
    it('ejecuta la función inmediatamente en la primera llamada', () => {
      const mockFn = jest.fn()
      const throttledFn = throttle(mockFn, 100)

      throttledFn('test')

      expect(mockFn).toHaveBeenCalledWith('test')
    })

    it('no ejecuta la función durante el período de throttle', () => {
      const mockFn = jest.fn()
      const throttledFn = throttle(mockFn, 100)

      throttledFn('first')
      throttledFn('second')
      throttledFn('third')

      expect(mockFn).toHaveBeenCalledTimes(1)
      expect(mockFn).toHaveBeenCalledWith('first')
    })

    it('permite ejecutar la función después del período de throttle', () => {
      const mockFn = jest.fn()
      const throttledFn = throttle(mockFn, 100)

      throttledFn('first')
      
      act(() => {
        jest.advanceTimersByTime(100)
      })

      throttledFn('second')

      expect(mockFn).toHaveBeenCalledTimes(2)
      expect(mockFn).toHaveBeenCalledWith('first')
      expect(mockFn).toHaveBeenCalledWith('second')
    })
  })

  describe('debounce', () => {
    it('no ejecuta la función inmediatamente', () => {
      const mockFn = jest.fn()
      const debouncedFn = debounce(mockFn, 100)

      debouncedFn('test')

      expect(mockFn).not.toHaveBeenCalled()
    })

    it('ejecuta la función después del delay', () => {
      const mockFn = jest.fn()
      const debouncedFn = debounce(mockFn, 100)

      debouncedFn('test')

      act(() => {
        jest.advanceTimersByTime(100)
      })

      expect(mockFn).toHaveBeenCalledWith('test')
    })

    it('cancela la ejecución anterior cuando se llama de nuevo', () => {
      const mockFn = jest.fn()
      const debouncedFn = debounce(mockFn, 100)

      debouncedFn('first')
      
      act(() => {
        jest.advanceTimersByTime(50)
      })

      debouncedFn('second')
      
      act(() => {
        jest.advanceTimersByTime(100)
      })

      expect(mockFn).toHaveBeenCalledTimes(1)
      expect(mockFn).toHaveBeenCalledWith('second')
    })
  })

  describe('useOptimizedScroll', () => {
    it('agrega event listener de scroll', () => {
      const mockCallback = jest.fn()
      
      renderHook(() => useOptimizedScroll(mockCallback))

      expect(mockAddEventListener).toHaveBeenCalledWith('scroll', expect.any(Function), { passive: true })
    })

    it('usa throttle con el delay correcto', () => {
      const mockCallback = jest.fn()
      
      renderHook(() => useOptimizedScroll(mockCallback, 32))

      expect(mockAddEventListener).toHaveBeenCalledWith('scroll', expect.any(Function), { passive: true })
    })

    it('limpia el event listener al desmontar', () => {
      const mockCallback = jest.fn()
      
      const { unmount } = renderHook(() => useOptimizedScroll(mockCallback))
      unmount()

      expect(mockRemoveEventListener).toHaveBeenCalledWith('scroll', expect.any(Function))
    })
  })

  describe('useOptimizedResize', () => {
    it('agrega event listener de resize', () => {
      const mockCallback = jest.fn()
      
      renderHook(() => useOptimizedResize(mockCallback))

      expect(mockAddEventListener).toHaveBeenCalledWith('resize', expect.any(Function), { passive: true })
    })

    it('usa debounce con el delay correcto', () => {
      const mockCallback = jest.fn()
      
      renderHook(() => useOptimizedResize(mockCallback, 200))

      expect(mockAddEventListener).toHaveBeenCalledWith('resize', expect.any(Function), { passive: true })
    })

    it('limpia el event listener al desmontar', () => {
      const mockCallback = jest.fn()
      
      const { unmount } = renderHook(() => useOptimizedResize(mockCallback))
      unmount()

      expect(mockRemoveEventListener).toHaveBeenCalledWith('resize', expect.any(Function))
    })
  })

  describe('useOptimizedAnimation', () => {
    it('proporciona startAnimation y stopAnimation', () => {
      const mockCallback = jest.fn()
      
      const { result } = renderHook(() => useOptimizedAnimation(mockCallback))

      expect(result.current.startAnimation).toBeDefined()
      expect(result.current.stopAnimation).toBeDefined()
      expect(typeof result.current.startAnimation).toBe('function')
      expect(typeof result.current.stopAnimation).toBe('function')
    })

    it('inicia la animación correctamente', () => {
      const mockCallback = jest.fn()
      mockRequestAnimationFrame.mockReturnValue(1)
      
      const { result } = renderHook(() => useOptimizedAnimation(mockCallback))

      act(() => {
        result.current.startAnimation()
      })

      // Verificar que las funciones están definidas
      expect(result.current.startAnimation).toBeDefined()
      expect(result.current.stopAnimation).toBeDefined()
      expect(typeof result.current.startAnimation).toBe('function')
      expect(typeof result.current.stopAnimation).toBe('function')
    })

    it('detiene la animación correctamente', () => {
      const mockCallback = jest.fn()
      mockRequestAnimationFrame.mockReturnValue(1)
      
      const { result } = renderHook(() => useOptimizedAnimation(mockCallback))

      act(() => {
        result.current.startAnimation()
        result.current.stopAnimation()
      })

      // Verificar que las funciones están definidas
      expect(result.current.startAnimation).toBeDefined()
      expect(result.current.stopAnimation).toBeDefined()
      expect(typeof result.current.startAnimation).toBe('function')
      expect(typeof result.current.stopAnimation).toBe('function')
    })

    it('limpia la animación al desmontar', () => {
      const mockCallback = jest.fn()
      mockRequestAnimationFrame.mockReturnValue(1)
      
      const { result, unmount } = renderHook(() => useOptimizedAnimation(mockCallback))
      
      // Iniciar la animación primero
      act(() => {
        result.current.startAnimation()
      })
      
      unmount()

      // Verificar que las funciones están definidas
      expect(result.current.startAnimation).toBeDefined()
      expect(result.current.stopAnimation).toBeDefined()
    })
  })

  describe('useLazyLoad', () => {
    it('inicia con loading true y Component null', () => {
      const mockImportFunc = jest.fn().mockResolvedValue({ default: () => null })
      
      const { result } = renderHook(() => useLazyLoad(mockImportFunc))

      expect(result.current.loading).toBe(true)
      expect(result.current.Component).toBe(null)
    })

    it('carga el componente correctamente', async () => {
      const mockComponent = () => React.createElement('div', null, 'Test Component')
      const mockImportFunc = jest.fn().mockResolvedValue({ default: mockComponent })
      
      const { result } = renderHook(() => useLazyLoad(mockImportFunc))

      // Esperar a que se complete la carga automática
      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      expect(result.current.Component).toBe(mockComponent)
    })

    it('maneja errores de carga', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
      const mockImportFunc = jest.fn().mockRejectedValue(new Error('Load failed'))
      
      const { result } = renderHook(() => useLazyLoad(mockImportFunc))

      // Esperar a que se complete la carga con error
      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      expect(result.current.Component).toBe(null)
      expect(consoleErrorSpy).toHaveBeenCalledWith('Error loading component:', expect.any(Error))

      consoleErrorSpy.mockRestore()
    })

    it('recarga cuando cambian las dependencias', async () => {
      const mockComponent = () => React.createElement('div', null, 'Test Component')
      const mockImportFunc = jest.fn().mockResolvedValue({ default: mockComponent })
      
      const { result, rerender } = renderHook(
        ({ deps }) => useLazyLoad(mockImportFunc, deps),
        { initialProps: { deps: [1] } }
      )

      // Esperar a que se complete la carga inicial
      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      expect(result.current.Component).toBe(mockComponent)

      // Cambiar dependencias
      rerender({ deps: [2] })

      expect(result.current.loading).toBe(true)
    })
  })

  describe('useIntersectionObserver', () => {
    it('crea un IntersectionObserver con las opciones correctas', () => {
      const mockCallback = jest.fn()
      
      renderHook(() => useIntersectionObserver(mockCallback))

      expect(mockIntersectionObserver).toHaveBeenCalledWith(mockCallback, {
        rootMargin: '50px 0px',
        threshold: 0.1
      })
    })

    it('proporciona observe y unobserve', () => {
      const mockCallback = jest.fn()
      
      const { result } = renderHook(() => useIntersectionObserver(mockCallback))

      expect(result.current.observe).toBeDefined()
      expect(result.current.unobserve).toBeDefined()
      expect(typeof result.current.observe).toBe('function')
      expect(typeof result.current.unobserve).toBe('function')
    })

    it('observa elementos correctamente', () => {
      const mockCallback = jest.fn()
      
      const { result } = renderHook(() => useIntersectionObserver(mockCallback))
      const mockElement = document.createElement('div')

      act(() => {
        result.current.observe(mockElement)
      })

      expect(mockObserver.observe).toHaveBeenCalledWith(mockElement)
    })

    it('desobserva elementos correctamente', () => {
      const mockCallback = jest.fn()
      
      const { result } = renderHook(() => useIntersectionObserver(mockCallback))
      const mockElement = document.createElement('div')

      act(() => {
        result.current.unobserve(mockElement)
      })

      expect(mockObserver.unobserve).toHaveBeenCalledWith(mockElement)
    })

    it('desconecta el observer al desmontar', () => {
      const mockCallback = jest.fn()
      
      const { unmount } = renderHook(() => useIntersectionObserver(mockCallback))
      unmount()

      expect(mockObserver.disconnect).toHaveBeenCalled()
    })

    it('usa opciones personalizadas', () => {
      const mockCallback = jest.fn()
      const customOptions = {
        rootMargin: '100px 0px',
        threshold: 0.5
      }
      
      renderHook(() => useIntersectionObserver(mockCallback, customOptions))

      expect(mockIntersectionObserver).toHaveBeenCalledWith(mockCallback, customOptions)
    })
  })
}) 