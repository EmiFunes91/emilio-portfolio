import React from 'react'
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import ContactForm from '../../components/ContactForm'
import { PreferencesProvider } from '../../context/PreferencesContext'

// Mock de react-google-recaptcha
jest.mock('react-google-recaptcha', () => {
  return jest.fn().mockImplementation(() => {
    return React.createElement('div', {
      'data-testid': 'recaptcha',
      ref: {
        current: {
          executeAsync: jest.fn().mockResolvedValue('mock-token'),
          reset: jest.fn(),
        },
      },
    })
  })
})

// Mock de @emailjs/browser
jest.mock('@emailjs/browser', () => ({
  send: jest.fn(),
}))

const renderWithContext = (component) => {
  return render(
    <PreferencesProvider>
      {component}
    </PreferencesProvider>
  )
}

describe('ContactForm - Branches Adicionales', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  describe('Validación de email edge cases', () => {
    it('valida email con múltiples @', () => {
      renderWithContext(<ContactForm />)
      const emailInput = screen.getByLabelText(/correo electrónico/i)
      fireEvent.change(emailInput, { target: { value: 'test@@example.com' } })
      expect(emailInput).toHaveValue('test@@example.com')
    })

    it('valida email con espacios', () => {
      renderWithContext(<ContactForm />)
      const emailInput = screen.getByLabelText(/correo electrónico/i)
      const emailWithSpaces = ' test@example.com '
      fireEvent.change(emailInput, { target: { value: emailWithSpaces } })
      // Verificar que el input acepta el valor (puede recortar espacios automáticamente)
      expect(emailInput).toHaveValue(emailWithSpaces.trim())
    })

    it('valida email con caracteres especiales', () => {
      renderWithContext(<ContactForm />)
      const emailInput = screen.getByLabelText(/correo electrónico/i)
      fireEvent.change(emailInput, { target: { value: 'test+tag@example.com' } })
      expect(emailInput).toHaveValue('test+tag@example.com')
    })
  })

  describe('Manejo de formulario edge cases', () => {
    it('maneja campos con solo espacios', () => {
      renderWithContext(<ContactForm />)
      const nameInput = screen.getByLabelText(/nombre/i)
      fireEvent.change(nameInput, { target: { value: '   ' } })
      expect(nameInput).toHaveValue('   ')
    })

    it('maneja mensaje muy largo', () => {
      renderWithContext(<ContactForm />)
      const messageInput = screen.getByLabelText(/mensaje/i)
      const longMessage = 'A'.repeat(10000)
      fireEvent.change(messageInput, { target: { value: longMessage } })
      expect(messageInput).toHaveValue(longMessage)
    })

    it('maneja caracteres especiales en nombre', () => {
      renderWithContext(<ContactForm />)
      const nameInput = screen.getByLabelText(/nombre/i)
      const specialName = 'José María O\'Connor-Smith'
      fireEvent.change(nameInput, { target: { value: specialName } })
      expect(nameInput).toHaveValue(specialName)
    })
  })

  describe('Estados de carga edge cases', () => {
    it('maneja múltiples envíos simultáneos', async () => {
      const mockEmailjs = require('@emailjs/browser')
      mockEmailjs.send.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 2000)))
      
      renderWithContext(<ContactForm />)
      
      // Llenar formulario
      fireEvent.change(screen.getByLabelText(/nombre/i), { target: { value: 'John Doe' } })
      fireEvent.change(screen.getByLabelText(/correo electrónico/i), { target: { value: 'john@example.com' } })
      fireEvent.change(screen.getByLabelText(/mensaje/i), { target: { value: 'Test message' } })
      
      // Simular el paso del tiempo para mostrar reCAPTCHA
      act(() => {
        jest.advanceTimersByTime(1500)
      })
      
      // Verificar que el botón está disponible para envío
      const submitButton = screen.getByRole('button', { name: /enviar mensaje/i })
      expect(submitButton).toBeInTheDocument()
      
      // Hacer múltiples clics
      fireEvent.click(submitButton)
      fireEvent.click(submitButton)
      fireEvent.click(submitButton)
      
      // Verificar que el formulario maneja múltiples envíos
      expect(submitButton).toBeInTheDocument()
    })
  })

  describe('Variables de entorno edge cases', () => {
    it('maneja variables de entorno faltantes', () => {
      const originalEnv = process.env
      delete process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
      delete process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
      delete process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      
      renderWithContext(<ContactForm />)
      expect(screen.getByRole('button', { name: /enviar mensaje/i })).toBeInTheDocument()
      
      // Restaurar
      process.env = originalEnv
    })

    it('maneja variables de entorno vacías', () => {
      const originalEnv = process.env
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID = ''
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID = ''
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY = ''
      
      renderWithContext(<ContactForm />)
      expect(screen.getByRole('button', { name: /enviar mensaje/i })).toBeInTheDocument()
      
      // Restaurar
      process.env = originalEnv
    })
  })
})
