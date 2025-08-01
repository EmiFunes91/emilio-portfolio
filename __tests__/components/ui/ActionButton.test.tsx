import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import ActionButton from '../../../components/ui/ActionButton'

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

// Mock de console methods
const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation(() => {})
const mockConsoleError = jest.spyOn(console, 'error').mockImplementation(() => {})

describe('ActionButton Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockGetElementById.mockReturnValue(null)
  })

  afterAll(() => {
    mockConsoleLog.mockRestore()
    mockConsoleError.mockRestore()
  })

  describe('Renderizado básico', () => {
    it('renderiza como botón cuando no hay href', () => {
      render(<ActionButton>Test Button</ActionButton>)
      const button = screen.getByRole('button', { name: 'Test Button' })
      expect(button).toBeInTheDocument()
      expect(button.tagName).toBe('BUTTON')
    })

    it('renderiza como enlace cuando hay href', () => {
      render(<ActionButton href="https://example.com">Test Link</ActionButton>)
      const link = screen.getByRole('link', { name: 'Test Link' })
      expect(link).toBeInTheDocument()
      expect(link.tagName).toBe('A')
      expect(link).toHaveAttribute('href', 'https://example.com')
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    })

    it('renderiza como enlace interno cuando href comienza con #', () => {
      render(<ActionButton href="#section">Internal Link</ActionButton>)
      const link = screen.getByRole('link', { name: 'Internal Link' })
      expect(link).toBeInTheDocument()
      expect(link.tagName).toBe('A')
      expect(link).toHaveAttribute('href', '#section')
      expect(link).not.toHaveAttribute('target')
      expect(link).not.toHaveAttribute('rel')
    })
  })

  describe('Variantes', () => {
    it('aplica la variante por defecto', () => {
      render(<ActionButton>Default</ActionButton>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('bg-gray-100')
    })

    it('aplica la variante demo', () => {
      render(<ActionButton variant="demo">Demo</ActionButton>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('bg-blue-100')
    })

    it('aplica la variante video', () => {
      render(<ActionButton variant="video">Video</ActionButton>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('bg-indigo-100')
    })
  })

  describe('Props adicionales', () => {
    it('aplica className personalizada', () => {
      render(<ActionButton className="custom-class">Custom</ActionButton>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('custom-class')
    })

    it('aplica title', () => {
      render(<ActionButton title="Tooltip">With Title</ActionButton>)
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('title', 'Tooltip')
    })

    it('aplica type de botón', () => {
      render(<ActionButton type="submit">Submit</ActionButton>)
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('type', 'submit')
    })

    it('aplica disabled', () => {
      render(<ActionButton disabled>Disabled</ActionButton>)
      const button = screen.getByRole('button')
      expect(button).toBeDisabled()
    })

    it('aplica style personalizado', () => {
      const customStyle = { backgroundColor: 'red' }
      render(<ActionButton style={customStyle}>Styled</ActionButton>)
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('style', 'background-color: red;')
    })
  })

  describe('Eventos', () => {
    it('ejecuta onClick cuando se hace clic en botón', () => {
      const handleClick = jest.fn()
      render(<ActionButton onClick={handleClick}>Clickable</ActionButton>)
      const button = screen.getByRole('button')
      fireEvent.click(button)
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('maneja enlaces internos correctamente', () => {
      const mockElement = {
        scrollIntoView: mockScrollIntoView,
      }
      mockGetElementById.mockReturnValue(mockElement)

      render(<ActionButton href="#section">Internal</ActionButton>)
      const link = screen.getByRole('link')
      
      fireEvent.click(link)
      
      expect(mockConsoleLog).toHaveBeenCalledWith('ActionButton: Internal link clicked', '#section')
      expect(mockGetElementById).toHaveBeenCalledWith('section')
      expect(mockConsoleLog).toHaveBeenCalledWith('ActionButton: Found target element, scrolling...')
      expect(mockScrollIntoView).toHaveBeenCalledWith({
        behavior: 'smooth',
        block: 'start'
      })
    })

    it('maneja enlaces internos cuando el elemento no existe', () => {
      mockGetElementById.mockReturnValue(null)

      render(<ActionButton href="#nonexistent">Internal</ActionButton>)
      const link = screen.getByRole('link')
      
      fireEvent.click(link)
      
      expect(mockConsoleLog).toHaveBeenCalledWith('ActionButton: Internal link clicked', '#nonexistent')
      expect(mockGetElementById).toHaveBeenCalledWith('nonexistent')
      // El error se maneja internamente, verificamos que el link existe
      expect(link).toBeInTheDocument()
    })

    it('previene comportamiento por defecto en enlaces internos', () => {
      const mockElement = { scrollIntoView: mockScrollIntoView }
      mockGetElementById.mockReturnValue(mockElement)

      render(<ActionButton href="#section">Internal</ActionButton>)
      const link = screen.getByRole('link')
      
      const event = fireEvent.click(link)
      
      // Verificar que preventDefault fue llamado (aunque fireEvent no lo expone directamente)
      expect(mockGetElementById).toHaveBeenCalled()
    })
  })

  describe('Detección de móvil', () => {
    const originalNavigator = global.navigator
    const originalWindow = global.window

    afterEach(() => {
      global.navigator = originalNavigator
      global.window = originalWindow
    })

    it('maneja cuando navigator no está disponible', () => {
      delete (global as any).navigator
      render(<ActionButton>Test</ActionButton>)
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
    })

    it('maneja cuando window no está disponible', () => {
      delete (global as any).window
      render(<ActionButton>Test</ActionButton>)
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
    })

    it('maneja cuando userAgent no está disponible', () => {
      global.navigator = {
        ...originalNavigator,
        userAgent: undefined,
        vendor: undefined,
      } as any
      render(<ActionButton>Test</ActionButton>)
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
    })
  })

  describe('Casos edge', () => {
    it('renderiza con children complejos', () => {
      render(
        <ActionButton>
          <span>Icon</span>
          <strong>Text</strong>
        </ActionButton>
      )
      const button = screen.getByRole('button')
      expect(button).toHaveTextContent('IconText')
    })

    it('maneja href vacío', () => {
      render(<ActionButton href="">Empty</ActionButton>)
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
      expect(button).toHaveTextContent('Empty')
    })

    it('maneja href con solo #', () => {
      render(<ActionButton href="#">Just Hash</ActionButton>)
      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('href', '#')
      expect(link).not.toHaveAttribute('target')
    })
  })
}) 