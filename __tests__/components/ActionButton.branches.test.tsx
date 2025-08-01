import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import ActionButton from '../../components/ui/ActionButton'

// Mock de document.getElementById
const mockGetElementById = jest.fn()
Object.defineProperty(document, 'getElementById', {
  writable: true,
  value: mockGetElementById,
})

// Mock de scrollIntoView
const mockScrollIntoView = jest.fn()
Object.defineProperty(HTMLElement.prototype, 'scrollIntoView', {
  writable: true,
  value: mockScrollIntoView,
})

describe('ActionButton - Branches Adicionales', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockGetElementById.mockReturnValue(null)
  })

  describe('Detección de móvil', () => {
    it('maneja cuando navigator.userAgent es undefined', () => {
      const originalUserAgent = navigator.userAgent
      Object.defineProperty(navigator, 'userAgent', {
        writable: true,
        value: undefined,
      })
      
      render(<ActionButton>Test</ActionButton>)
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
      
      // Restaurar
      Object.defineProperty(navigator, 'userAgent', {
        writable: true,
        value: originalUserAgent,
      })
    })

    it('maneja cuando navigator.vendor es undefined', () => {
      const originalVendor = navigator.vendor
      Object.defineProperty(navigator, 'vendor', {
        writable: true,
        value: undefined,
      })
      
      render(<ActionButton>Test</ActionButton>)
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
      
      // Restaurar
      Object.defineProperty(navigator, 'vendor', {
        writable: true,
        value: originalVendor,
      })
    })

    it('maneja cuando window.opera no está disponible', () => {
      const originalWindow = global.window
      delete global.window.opera
      
      render(<ActionButton>Test</ActionButton>)
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
      
      // Restaurar
      global.window = originalWindow
    })
  })

  describe('Casos edge de href', () => {
    it('maneja href con solo espacios', () => {
      render(<ActionButton href="   ">Spaces</ActionButton>)
      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('href', '   ')
      expect(link).toHaveAttribute('target', '_blank')
    })

    it('maneja href con caracteres especiales', () => {
      render(<ActionButton href="#section-123">Special</ActionButton>)
      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('href', '#section-123')
      expect(link).not.toHaveAttribute('target')
    })

    it('maneja href con múltiples #', () => {
      render(<ActionButton href="##section">Multiple</ActionButton>)
      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('href', '##section')
      expect(link).not.toHaveAttribute('target')
    })
  })

  describe('Props edge cases', () => {
    it('maneja className con valores falsy', () => {
      render(<ActionButton className={null}>Null Class</ActionButton>)
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
    })

    it('maneja style con valores undefined', () => {
      render(<ActionButton style={undefined}>Undefined Style</ActionButton>)
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
    })

    it('maneja title vacío', () => {
      render(<ActionButton title="">Empty Title</ActionButton>)
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('title', '')
    })
  })

  describe('Eventos edge cases', () => {
    it('maneja onClick undefined', () => {
      render(<ActionButton onClick={undefined}>No Click</ActionButton>)
      const button = screen.getByRole('button')
      fireEvent.click(button)
      // No debería fallar
      expect(button).toBeInTheDocument()
    })

    it('maneja enlace interno con elemento que no tiene scrollIntoView', () => {
      const mockElement = {}
      mockGetElementById.mockReturnValue(mockElement)
      
      render(<ActionButton href="#section">Internal</ActionButton>)
      const link = screen.getByRole('link')
      
      // No debería fallar aunque el elemento no tenga scrollIntoView
      fireEvent.click(link)
      
      expect(mockGetElementById).toHaveBeenCalledWith('section')
      expect(link).toBeInTheDocument()
    })
  })
})
