import {
  PERFORMANCE_CONFIG,
  performanceUtils,
  ImageFormat,
  AnimationDuration,
  AnimationEasing
} from '../../lib/performance'

// Mock de window.performance
const mockPerformance = {
  now: jest.fn(() => Date.now())
}

Object.defineProperty(window, 'performance', {
  value: mockPerformance,
  writable: true
})

// Mock de window.innerHeight y window.innerWidth
Object.defineProperty(window, 'innerHeight', {
  value: 800,
  writable: true
})

Object.defineProperty(window, 'innerWidth', {
  value: 1200,
  writable: true
})

// Mock de document.documentElement.clientHeight y clientWidth
Object.defineProperty(document.documentElement, 'clientHeight', {
  value: 800,
  writable: true
})

Object.defineProperty(document.documentElement, 'clientWidth', {
  value: 1200,
  writable: true
})

// Mock de window.devicePixelRatio
Object.defineProperty(window, 'devicePixelRatio', {
  value: 2,
  writable: true
})

// Mock de navigator.connection
const mockConnection = {
  effectiveType: '4g'
}

Object.defineProperty(navigator, 'connection', {
  value: mockConnection,
  writable: true
})

// Mock de document.head.appendChild
const mockAppendChild = jest.fn()

Object.defineProperty(document, 'head', {
  value: {
    appendChild: mockAppendChild
  },
  writable: true
})

// Mock de console.log
const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {})

describe('performance.ts', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    consoleLogSpy.mockClear()
  })

  afterAll(() => {
    consoleLogSpy.mockRestore()
  })

  describe('PERFORMANCE_CONFIG', () => {
    it('tiene la configuración de imágenes correcta', () => {
      expect(PERFORMANCE_CONFIG.IMAGES.QUALITY).toBe(85)
      expect(PERFORMANCE_CONFIG.IMAGES.FORMATS).toEqual(['image/webp', 'image/avif'])
      expect(PERFORMANCE_CONFIG.IMAGES.SIZES.THUMBNAIL).toEqual({ width: 400, height: 300 })
      expect(PERFORMANCE_CONFIG.IMAGES.SIZES.MEDIUM).toEqual({ width: 800, height: 600 })
      expect(PERFORMANCE_CONFIG.IMAGES.SIZES.LARGE).toEqual({ width: 1200, height: 900 })
      expect(PERFORMANCE_CONFIG.IMAGES.LAZY_LOAD_OFFSET).toBe('50px 0px')
      expect(PERFORMANCE_CONFIG.IMAGES.PLACEHOLDER_BLUR).toBeDefined()
    })

    it('tiene la configuración de animaciones correcta', () => {
      expect(PERFORMANCE_CONFIG.ANIMATIONS.DURATION.FAST).toBe(0.2)
      expect(PERFORMANCE_CONFIG.ANIMATIONS.DURATION.NORMAL).toBe(0.4)
      expect(PERFORMANCE_CONFIG.ANIMATIONS.DURATION.SLOW).toBe(0.8)
      expect(PERFORMANCE_CONFIG.ANIMATIONS.EASING.SMOOTH).toEqual([0.25, 0.46, 0.45, 0.94])
      expect(PERFORMANCE_CONFIG.ANIMATIONS.EASING.BOUNCE).toEqual([0.68, -0.55, 0.265, 1.55])
      expect(PERFORMANCE_CONFIG.ANIMATIONS.EASING.EASE_OUT).toEqual([0.25, 0.46, 0.45, 0.94])
      expect(PERFORMANCE_CONFIG.ANIMATIONS.THRESHOLD).toBe(0.15)
      expect(PERFORMANCE_CONFIG.ANIMATIONS.ROOT_MARGIN).toBe('50px 0px')
    })

    it('tiene la configuración de scroll correcta', () => {
      expect(PERFORMANCE_CONFIG.SCROLL.THROTTLE_DELAY).toBe(16)
      expect(PERFORMANCE_CONFIG.SCROLL.RESIZE_DELAY).toBe(100)
      expect(PERFORMANCE_CONFIG.SCROLL.SMOOTH_BEHAVIOR).toBe('smooth')
    })

    it('tiene la configuración de cache correcta', () => {
      expect(PERFORMANCE_CONFIG.CACHE.IMAGES_TTL).toBe(60 * 60 * 24 * 30)
      expect(PERFORMANCE_CONFIG.CACHE.STATIC_TTL).toBe(60 * 60 * 24 * 365)
      expect(PERFORMANCE_CONFIG.CACHE.API_TTL).toBe(60 * 5)
    })

    it('tiene la configuración de bundle correcta', () => {
      expect(PERFORMANCE_CONFIG.BUNDLE.CHUNK_SIZE_LIMIT).toBe(244 * 1024)
      expect(PERFORMANCE_CONFIG.BUNDLE.MAX_CHUNKS).toBe(5)
    })
  })

  describe('performanceUtils.debounce', () => {
    beforeEach(() => {
      jest.useFakeTimers()
    })

    afterEach(() => {
      jest.useRealTimers()
    })

    it('debouncea la función correctamente', () => {
      const mockFn = jest.fn()
      const debouncedFn = performanceUtils.debounce(mockFn, 100)

      debouncedFn('test')

      expect(mockFn).not.toHaveBeenCalled()

      jest.advanceTimersByTime(100)

      expect(mockFn).toHaveBeenCalledWith('test')
    })

    it('cancela la ejecución anterior cuando se llama de nuevo', () => {
      const mockFn = jest.fn()
      const debouncedFn = performanceUtils.debounce(mockFn, 100)

      debouncedFn('first')
      jest.advanceTimersByTime(50)
      debouncedFn('second')
      jest.advanceTimersByTime(100)

      expect(mockFn).toHaveBeenCalledTimes(1)
      expect(mockFn).toHaveBeenCalledWith('second')
    })
  })

  describe('performanceUtils.throttle', () => {
    beforeEach(() => {
      jest.useFakeTimers()
    })

    afterEach(() => {
      jest.useRealTimers()
    })

    it('throttlea la función correctamente', () => {
      const mockFn = jest.fn()
      const throttledFn = performanceUtils.throttle(mockFn, 100)

      throttledFn('first')
      throttledFn('second')
      throttledFn('third')

      expect(mockFn).toHaveBeenCalledTimes(1)
      expect(mockFn).toHaveBeenCalledWith('first')

      jest.advanceTimersByTime(100)
      throttledFn('fourth')

      expect(mockFn).toHaveBeenCalledTimes(2)
      expect(mockFn).toHaveBeenCalledWith('fourth')
    })
  })

  describe('performanceUtils.lazyLoad', () => {
    it('carga el módulo correctamente', async () => {
      const mockModule = { default: 'test-component' }
      const mockImportFunc = jest.fn().mockResolvedValue(mockModule)

      const result = await performanceUtils.lazyLoad(mockImportFunc)

      expect(result).toBe('test-component')
      expect(mockImportFunc).toHaveBeenCalled()
    })

    it('maneja errores de carga', async () => {
      const mockError = new Error('Load failed')
      const mockImportFunc = jest.fn().mockRejectedValue(mockError)

      await expect(performanceUtils.lazyLoad(mockImportFunc)).rejects.toThrow('Load failed')
    })
  })

  describe('performanceUtils.preloadResource', () => {
    it('crea un elemento link con las propiedades correctas', () => {
      performanceUtils.preloadResource('/test.js', 'script')

      expect(mockAppendChild).toHaveBeenCalledWith(expect.any(HTMLLinkElement))
      
      const link = mockAppendChild.mock.calls[0][0]
      expect(link.rel).toBe('preload')
      expect(link.as).toBe('script')
      expect(link.href).toContain('/test.js')
    })

    it('agrega crossOrigin cuando se proporciona', () => {
      performanceUtils.preloadResource('/test.woff2', 'font', 'anonymous')

      const link = mockAppendChild.mock.calls[0][0]
      expect(link.crossOrigin).toBe('anonymous')
    })
  })

  describe('performanceUtils.measurePerformance', () => {
    it('mide el rendimiento cuando performance está disponible', () => {
      const startTime = 100
      const endTime = 150
      
      mockPerformance.now
        .mockReturnValueOnce(startTime) // start
        .mockReturnValueOnce(endTime) // end

      const mockFn = jest.fn()

      performanceUtils.measurePerformance('test', mockFn)

      expect(mockFn).toHaveBeenCalled()
      expect(consoleLogSpy).toHaveBeenCalledWith('test took 50ms')
    })

    it('ejecuta la función sin medir cuando performance no está disponible', () => {
      // Guardar performance original
      const originalPerformance = window.performance
      
      // Simular que performance no está disponible
      Object.defineProperty(window, 'performance', {
        value: undefined,
        writable: true
      })

      const mockFn = jest.fn()

      // La función debería manejar el caso cuando performance es undefined
      try {
        performanceUtils.measurePerformance('test', mockFn)
        expect(mockFn).toHaveBeenCalled()
        expect(consoleLogSpy).not.toHaveBeenCalled()
      } finally {
        // Restaurar performance
        Object.defineProperty(window, 'performance', {
          value: originalPerformance,
          writable: true
        })
      }
    })
  })

  describe('performanceUtils.isInViewport', () => {
    it('retorna true cuando el elemento está en el viewport', () => {
      const mockElement = {
        getBoundingClientRect: jest.fn().mockReturnValue({
          top: 100,
          left: 100,
          bottom: 200,
          right: 200
        })
      }

      const result = performanceUtils.isInViewport(mockElement as Element)

      expect(result).toBe(true)
    })

    it('retorna false cuando el elemento está fuera del viewport', () => {
      const mockElement = {
        getBoundingClientRect: jest.fn().mockReturnValue({
          top: 1000,
          left: 100,
          bottom: 1100,
          right: 200
        })
      }

      const result = performanceUtils.isInViewport(mockElement as Element)

      expect(result).toBe(false)
    })

    it('retorna false cuando el elemento está parcialmente fuera del viewport', () => {
      const mockElement = {
        getBoundingClientRect: jest.fn().mockReturnValue({
          top: -50,
          left: 100,
          bottom: 100,
          right: 200
        })
      }

      const result = performanceUtils.isInViewport(mockElement as Element)

      expect(result).toBe(false)
    })
  })

  describe('performanceUtils.getDevicePixelRatio', () => {
    it('retorna el device pixel ratio cuando está disponible', () => {
      const result = performanceUtils.getDevicePixelRatio()

      expect(result).toBe(2)
    })

    it('retorna 1 cuando devicePixelRatio no está disponible', () => {
      Object.defineProperty(window, 'devicePixelRatio', {
        value: undefined,
        writable: true
      })

      const result = performanceUtils.getDevicePixelRatio()

      expect(result).toBe(1)
    })

    it('retorna 1 cuando window no está disponible', () => {
      const originalWindow = global.window
      // @ts-ignore
      delete global.window

      const result = performanceUtils.getDevicePixelRatio()

      expect(result).toBe(1)

      global.window = originalWindow
    })
  })

  describe('performanceUtils.isSlowConnection', () => {
    it('retorna true para conexiones lentas', () => {
      Object.defineProperty(navigator, 'connection', {
        value: { effectiveType: 'slow-2g' },
        writable: true
      })

      expect(performanceUtils.isSlowConnection()).toBe(true)

      Object.defineProperty(navigator, 'connection', {
        value: { effectiveType: '2g' },
        writable: true
      })

      expect(performanceUtils.isSlowConnection()).toBe(true)

      Object.defineProperty(navigator, 'connection', {
        value: { effectiveType: '3g' },
        writable: true
      })

      expect(performanceUtils.isSlowConnection()).toBe(true)
    })

    it('retorna false para conexiones rápidas', () => {
      Object.defineProperty(navigator, 'connection', {
        value: { effectiveType: '4g' },
        writable: true
      })

      expect(performanceUtils.isSlowConnection()).toBe(false)
    })

    it('retorna false cuando connection no está disponible', () => {
      Object.defineProperty(navigator, 'connection', {
        value: undefined,
        writable: true
      })

      expect(performanceUtils.isSlowConnection()).toBe(false)
    })

    it('retorna false cuando navigator no está disponible', () => {
      const originalNavigator = global.navigator
      // @ts-ignore
      delete global.navigator

      expect(performanceUtils.isSlowConnection()).toBe(false)

      global.navigator = originalNavigator
    })
  })

  describe('Types', () => {
    it('ImageFormat tiene los valores correctos', () => {
      const formats: ImageFormat[] = ['image/webp', 'image/avif']
      expect(formats).toEqual(['image/webp', 'image/avif'])
    })

    it('AnimationDuration tiene las claves correctas', () => {
      const durations: AnimationDuration[] = ['FAST', 'NORMAL', 'SLOW']
      expect(durations).toEqual(['FAST', 'NORMAL', 'SLOW'])
    })

    it('AnimationEasing tiene las claves correctas', () => {
      const easings: AnimationEasing[] = ['SMOOTH', 'BOUNCE', 'EASE_OUT']
      expect(easings).toEqual(['SMOOTH', 'BOUNCE', 'EASE_OUT'])
    })
  })
}) 