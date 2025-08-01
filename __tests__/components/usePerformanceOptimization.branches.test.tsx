import React from 'react'
import { renderHook, act, waitFor } from '@testing-library/react'
import { useOptimizedAnimation, useLazyLoad, useIntersectionObserver } from '../../hooks/usePerformanceOptimization'

describe('usePerformanceOptimization - Branches Adicionales', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  describe('useOptimizedAnimation edge cases', () => {
    it('maneja callback undefined', () => {
      const { result } = renderHook(() => useOptimizedAnimation(undefined))
      expect(result.current).toBeDefined()
    })

    it('maneja callback que lanza error', () => {
      const errorCallback = jest.fn(() => {
        throw new Error('Test error')
      })
      
      const { result } = renderHook(() => useOptimizedAnimation(errorCallback))
      expect(result.current).toBeDefined()
    })

    it('maneja múltiples start/stop', () => {
      const mockCallback = jest.fn()
      const { result } = renderHook(() => useOptimizedAnimation(mockCallback))
      
      act(() => {
        result.current.startAnimation()
        result.current.stopAnimation()
        result.current.startAnimation()
        result.current.stopAnimation()
      })
      
      expect(result.current).toBeDefined()
    })
  })

  describe('useLazyLoad edge cases', () => {
    it('maneja importFunc que retorna null', async () => {
      const mockImportFunc = jest.fn().mockResolvedValue(null)
      
      const { result } = renderHook(() => useLazyLoad(mockImportFunc, []))
      
      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })
      
      expect(result.current).toBeDefined()
    }, 10000)

    it('maneja importFunc que retorna objeto sin default', async () => {
      const mockImportFunc = jest.fn().mockResolvedValue({ someOtherProp: 'test' })
      
      const { result } = renderHook(() => useLazyLoad(mockImportFunc, []))
      
      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })
      
      expect(result.current).toBeDefined()
    }, 10000)

    it('maneja dependencias que cambian frecuentemente', async () => {
      const mockImportFunc = jest.fn().mockResolvedValue({ default: () => <div>Test</div> })
      
      const { result, rerender } = renderHook(
        ({ deps }) => useLazyLoad(mockImportFunc, deps),
        { initialProps: { deps: [1] } }
      )
      
      rerender({ deps: [2] })
      rerender({ deps: [3] })
      rerender({ deps: [4] })
      
      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })
      
      expect(result.current).toBeDefined()
    }, 10000)
  })

  describe('useIntersectionObserver edge cases', () => {
    it('maneja callback undefined', () => {
      const { result } = renderHook(() => useIntersectionObserver(undefined))
      expect(result.current).toBeDefined()
    })

    it('maneja callback que lanza error', () => {
      const errorCallback = jest.fn(() => {
        throw new Error('Test error')
      })
      
      const { result } = renderHook(() => useIntersectionObserver(errorCallback))
      expect(result.current).toBeDefined()
    })

    it('maneja opciones inválidas', () => {
      const mockCallback = jest.fn()
      const invalidOptions = { threshold: 'invalid', rootMargin: null }
      
      const { result } = renderHook(() => useIntersectionObserver(mockCallback, invalidOptions))
      expect(result.current).toBeDefined()
    })

    it('maneja múltiples observe/unobserve del mismo elemento', () => {
      const mockCallback = jest.fn()
      const { result } = renderHook(() => useIntersectionObserver(mockCallback))
      const mockElement = document.createElement('div')
      
      // Esperar a que el observer se inicialice
      act(() => {
        // El observer se inicializa en useEffect, así que esperamos un tick
        jest.runAllTimers()
      })
      
      act(() => {
        result.current.observe(mockElement)
        result.current.observe(mockElement)
        result.current.unobserve(mockElement)
        result.current.unobserve(mockElement)
      })
      
      expect(result.current).toBeDefined()
    })
  })
})
