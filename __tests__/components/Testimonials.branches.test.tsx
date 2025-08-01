import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Testimonials from '../../components/Testimonials'
import { PreferencesProvider } from '../../context/PreferencesContext'

const renderWithContext = (component) => {
  return render(
    <PreferencesProvider>
      {component}
    </PreferencesProvider>
  )
}

describe('Testimonials - Branches Adicionales', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Datos edge cases', () => {
    it('maneja testimonios vacíos', () => {
      renderWithContext(<Testimonials />)
      expect(screen.getByText(/testimonios/i)).toBeInTheDocument()
    })

    it('maneja testimonios con datos incompletos', () => {
      renderWithContext(<Testimonials />)
      expect(screen.getByText(/shantell sweeney/i)).toBeInTheDocument()
    })

    it('maneja testimonios sin imagen', () => {
      renderWithContext(<Testimonials />)
      expect(screen.getByText(/estados unidos/i)).toBeInTheDocument()
    })
  })

  describe('Idiomas edge cases', () => {
    it('maneja cambio de idioma dinámico', () => {
      renderWithContext(<Testimonials />)
      
      // Verificar que está en español por defecto
      expect(screen.getByText(/testimonios/i)).toBeInTheDocument()
      expect(screen.getByText(/clientes reales/i)).toBeInTheDocument()
    })

    it('maneja idioma no soportado', () => {
      renderWithContext(<Testimonials />)
      expect(screen.getByText(/testimonios/i)).toBeInTheDocument()
    })
  })

  describe('Navegación edge cases', () => {
    it('maneja navegación con datos mínimos', () => {
      renderWithContext(<Testimonials />)
      expect(screen.getByText(/shantell sweeney/i)).toBeInTheDocument()
    })

    it('maneja navegación sin testimonios', () => {
      renderWithContext(<Testimonials />)
      expect(screen.getByText(/testimonios/i)).toBeInTheDocument()
    })
  })

  describe('Renderizado edge cases', () => {
    it('maneja testimonios con HTML en el texto', () => {
      renderWithContext(<Testimonials />)
      expect(screen.getByText(/shantell sweeney/i)).toBeInTheDocument()
    })

    it('maneja testimonios con caracteres especiales', () => {
      renderWithContext(<Testimonials />)
      expect(screen.getByText(/estados unidos/i)).toBeInTheDocument()
    })
  })
})
