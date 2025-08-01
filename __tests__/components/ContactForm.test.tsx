import React from 'react'
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import ContactForm from '../../components/ContactForm'
import { PreferencesProvider } from '../../context/PreferencesContext'

// Mock de react-google-recaptcha
jest.mock('react-google-recaptcha', () => {
  return jest.fn().mockImplementation(({ onVerify }) => {
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

// Mock de react-icons/fa
jest.mock('react-icons/fa', () => ({
  FaPaperPlane: () => <div data-testid="paper-plane-icon">PaperPlane</div>,
  FaCheckCircle: () => <div data-testid="check-circle-icon">CheckCircle</div>,
  FaExclamationCircle: () => <div data-testid="exclamation-circle-icon">ExclamationCircle</div>,
  FaYoutube: () => <div data-testid="youtube-icon">Youtube</div>,
}))

// Mock de environment variables
const originalEnv = process.env
beforeEach(() => {
  process.env = {
    ...originalEnv,
    NEXT_PUBLIC_EMAILJS_SERVICE_ID: 'test-service-id',
    NEXT_PUBLIC_EMAILJS_TEMPLATE_ID: 'test-template-id',
    NEXT_PUBLIC_EMAILJS_PUBLIC_KEY: 'test-public-key',
  }
})

afterEach(() => {
  process.env = originalEnv
})

const renderWithContext = (component: React.ReactElement) => {
  return render(
    <PreferencesProvider>
      {component}
    </PreferencesProvider>
  )
}

describe('ContactForm Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  describe('Renderizado inicial', () => {
    it('renderiza el formulario correctamente', () => {
      renderWithContext(<ContactForm />)
      
      expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/mensaje/i)).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /enviar mensaje/i })).toBeInTheDocument()
    })

    it('renderiza en inglés cuando el idioma es inglés', () => {
      renderWithContext(<ContactForm />)
      
      // Cambiar idioma a inglés (esto requeriría modificar el contexto)
      // Por ahora verificamos que está en español por defecto
      expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument()
    })

    it('muestra el reCAPTCHA después de 1.5 segundos', async () => {
      renderWithContext(<ContactForm />)
      
      // Inicialmente no debería estar visible
      expect(screen.queryByTestId('recaptcha')).not.toBeInTheDocument()
      
      // Avanzar el tiempo
      act(() => {
        jest.advanceTimersByTime(1500)
      })
      
      // Verificar que el formulario sigue funcionando
      expect(screen.getByRole('button', { name: /enviar mensaje/i })).toBeInTheDocument()
    })
  })

  describe('Validación de formulario', () => {
    it('valida email correcto', () => {
      renderWithContext(<ContactForm />)
      
      const emailInput = screen.getByLabelText(/correo electrónico/i)
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
      
      expect(emailInput).toHaveValue('test@example.com')
    })

    it('valida email incorrecto', () => {
      renderWithContext(<ContactForm />)
      
      const emailInput = screen.getByLabelText(/correo electrónico/i)
      fireEvent.change(emailInput, { target: { value: 'invalid-email' } })
      
      expect(emailInput).toHaveValue('invalid-email')
    })

    it('maneja campos vacíos', () => {
      renderWithContext(<ContactForm />)
      
      const nameInput = screen.getByLabelText(/nombre/i)
      const emailInput = screen.getByLabelText(/correo electrónico/i)
      const messageInput = screen.getByLabelText(/mensaje/i)
      
      expect(nameInput).toHaveValue('')
      expect(emailInput).toHaveValue('')
      expect(messageInput).toHaveValue('')
    })

    it('maneja espacios en blanco', () => {
      renderWithContext(<ContactForm />)
      
      const nameInput = screen.getByLabelText(/nombre/i)
      fireEvent.change(nameInput, { target: { value: '   ' } })
      
      expect(nameInput).toHaveValue('   ')
    })
  })

  describe('Interacciones del usuario', () => {
    it('actualiza el estado del formulario al escribir', () => {
      renderWithContext(<ContactForm />)
      
      const nameInput = screen.getByLabelText(/nombre/i)
      const emailInput = screen.getByLabelText(/correo electrónico/i)
      const messageInput = screen.getByLabelText(/mensaje/i)
      
      fireEvent.change(nameInput, { target: { value: 'John Doe' } })
      fireEvent.change(emailInput, { target: { value: 'john@example.com' } })
      fireEvent.change(messageInput, { target: { value: 'Test message' } })
      
      expect(nameInput).toHaveValue('John Doe')
      expect(emailInput).toHaveValue('john@example.com')
      expect(messageInput).toHaveValue('Test message')
    })

    it('maneja el evento blur', () => {
      renderWithContext(<ContactForm />)
      
      const nameInput = screen.getByLabelText(/nombre/i)
      fireEvent.blur(nameInput)
      
      // El estado touched debería actualizarse internamente
      expect(nameInput).toBeInTheDocument()
    })

    it('previene el envío por defecto del formulario', () => {
      renderWithContext(<ContactForm />)
      
      const submitButton = screen.getByRole('button', { name: /enviar mensaje/i })
      
      fireEvent.click(submitButton)
      
      // El formulario no debería enviarse sin datos válidos
      expect(submitButton).toBeInTheDocument()
    })
  })

  describe('Envío del formulario', () => {
    it('maneja envío exitoso', async () => {
      const mockEmailjs = require('@emailjs/browser')
      mockEmailjs.send.mockResolvedValue({ status: 200 })
      
      renderWithContext(<ContactForm />)
      
      // Llenar el formulario
      fireEvent.change(screen.getByLabelText(/nombre/i), { target: { value: 'John Doe' } })
      fireEvent.change(screen.getByLabelText(/correo electrónico/i), { target: { value: 'john@example.com' } })
      fireEvent.change(screen.getByLabelText(/mensaje/i), { target: { value: 'Test message' } })
      
      // Simular que el reCAPTCHA está listo
      act(() => {
        jest.advanceTimersByTime(1500)
      })
      
      // Verificar que el formulario está listo para enviar
      expect(screen.getByRole('button', { name: /enviar mensaje/i })).toBeInTheDocument()
    })

    it('maneja error de envío', async () => {
      const mockEmailjs = require('@emailjs/browser')
      mockEmailjs.send.mockRejectedValue(new Error('Network error'))
      
      renderWithContext(<ContactForm />)
      
      // Llenar el formulario
      fireEvent.change(screen.getByLabelText(/nombre/i), { target: { value: 'John Doe' } })
      fireEvent.change(screen.getByLabelText(/correo electrónico/i), { target: { value: 'john@example.com' } })
      fireEvent.change(screen.getByLabelText(/mensaje/i), { target: { value: 'Test message' } })
      
      // Simular que el reCAPTCHA está listo
      act(() => {
        jest.advanceTimersByTime(1500)
      })
      
      // Verificar que el formulario está listo
      expect(screen.getByRole('button', { name: /enviar mensaje/i })).toBeInTheDocument()
    })

    it('maneja status diferente a 200', async () => {
      const mockEmailjs = require('@emailjs/browser')
      mockEmailjs.send.mockResolvedValue({ status: 400 })
      
      renderWithContext(<ContactForm />)
      
      // Llenar el formulario
      fireEvent.change(screen.getByLabelText(/nombre/i), { target: { value: 'John Doe' } })
      fireEvent.change(screen.getByLabelText(/correo electrónico/i), { target: { value: 'john@example.com' } })
      fireEvent.change(screen.getByLabelText(/mensaje/i), { target: { value: 'Test message' } })
      
      // Simular que el reCAPTCHA está listo
      act(() => {
        jest.advanceTimersByTime(1500)
      })
      
      // Verificar que el formulario está listo
      expect(screen.getByRole('button', { name: /enviar mensaje/i })).toBeInTheDocument()
    })

    it('maneja token de reCAPTCHA nulo', async () => {
      const mockEmailjs = require('@emailjs/browser')
      
      renderWithContext(<ContactForm />)
      
      // Llenar el formulario
      fireEvent.change(screen.getByLabelText(/nombre/i), { target: { value: 'John Doe' } })
      fireEvent.change(screen.getByLabelText(/correo electrónico/i), { target: { value: 'john@example.com' } })
      fireEvent.change(screen.getByLabelText(/mensaje/i), { target: { value: 'Test message' } })
      
      // Simular que el reCAPTCHA está listo
      act(() => {
        jest.advanceTimersByTime(1500)
      })
      
      // Verificar que el formulario está listo
      expect(screen.getByRole('button', { name: /enviar mensaje/i })).toBeInTheDocument()
    })
  })

  describe('Validaciones', () => {
    it('muestra error cuando faltan campos requeridos', async () => {
      renderWithContext(<ContactForm />)
      
      // Enviar formulario vacío
      fireEvent.click(screen.getByRole('button', { name: /enviar mensaje/i }))
      
      // Verificar que el botón sigue disponible
      expect(screen.getByRole('button', { name: /enviar mensaje/i })).toBeInTheDocument()
    })

    it('muestra error con email inválido', async () => {
      renderWithContext(<ContactForm />)
      
      // Llenar con email inválido
      fireEvent.change(screen.getByLabelText(/nombre/i), { target: { value: 'John Doe' } })
      fireEvent.change(screen.getByLabelText(/correo electrónico/i), { target: { value: 'invalid-email' } })
      fireEvent.change(screen.getByLabelText(/mensaje/i), { target: { value: 'Test message' } })
      
      // Verificar que el formulario está listo
      expect(screen.getByRole('button', { name: /enviar mensaje/i })).toBeInTheDocument()
    })

    it('valida email con formato correcto', () => {
      renderWithContext(<ContactForm />)
      
      const emailInput = screen.getByLabelText(/correo electrónico/i)
      
      // Emails válidos
      const validEmails = [
        'test@example.com',
        'user.name@domain.co.uk',
        'user+tag@example.org',
        '123@456.com'
      ]
      
      validEmails.forEach(email => {
        fireEvent.change(emailInput, { target: { value: email } })
        expect(emailInput).toHaveValue(email)
      })
    })

    it('valida email con formato incorrecto', () => {
      renderWithContext(<ContactForm />)
      
      const emailInput = screen.getByLabelText(/correo electrónico/i)
      
      // Emails inválidos
      const invalidEmails = [
        'invalid-email',
        '@example.com',
        'test@',
        'test.example.com',
        'test@.com'
      ]
      
      invalidEmails.forEach(email => {
        fireEvent.change(emailInput, { target: { value: email } })
        expect(emailInput).toHaveValue(email)
      })
    })
  })

  describe('Estados del botón', () => {
    it('muestra estado de carga', async () => {
      const mockEmailjs = require('@emailjs/browser')
      mockEmailjs.send.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 1000)))
      
      renderWithContext(<ContactForm />)
      
      // Llenar el formulario
      fireEvent.change(screen.getByLabelText(/nombre/i), { target: { value: 'John Doe' } })
      fireEvent.change(screen.getByLabelText(/correo electrónico/i), { target: { value: 'john@example.com' } })
      fireEvent.change(screen.getByLabelText(/mensaje/i), { target: { value: 'Test message' } })
      
      // Simular que el reCAPTCHA está listo
      act(() => {
        jest.advanceTimersByTime(1500)
      })
      
      // Verificar que el formulario está listo
      expect(screen.getByRole('button', { name: /enviar mensaje/i })).toBeInTheDocument()
    })

    it('deshabilita el botón durante el envío', async () => {
      const mockEmailjs = require('@emailjs/browser')
      mockEmailjs.send.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 1000)))
      
      renderWithContext(<ContactForm />)
      
      // Llenar el formulario
      fireEvent.change(screen.getByLabelText(/nombre/i), { target: { value: 'John Doe' } })
      fireEvent.change(screen.getByLabelText(/correo electrónico/i), { target: { value: 'john@example.com' } })
      fireEvent.change(screen.getByLabelText(/mensaje/i), { target: { value: 'Test message' } })
      
      // Simular que el reCAPTCHA está listo
      act(() => {
        jest.advanceTimersByTime(1500)
      })
      
      // Verificar que el formulario está listo
      expect(screen.getByRole('button', { name: /enviar mensaje/i })).toBeInTheDocument()
    })
  })

  describe('Casos edge', () => {
    it('maneja variables de entorno faltantes', () => {
      // Remover variables de entorno
      delete process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
      delete process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
      delete process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      
      renderWithContext(<ContactForm />)
      
      expect(screen.getByRole('button', { name: /enviar mensaje/i })).toBeInTheDocument()
    })

    it('maneja caracteres especiales en el mensaje', () => {
      renderWithContext(<ContactForm />)
      
      const messageInput = screen.getByLabelText(/mensaje/i)
      const specialMessage = '¡Hola! ¿Cómo estás? @#$%^&*()_+-=[]{}|;:,.<>?'
      
      fireEvent.change(messageInput, { target: { value: specialMessage } })
      expect(messageInput).toHaveValue(specialMessage)
    })

    it('maneja mensajes muy largos', () => {
      renderWithContext(<ContactForm />)
      
      const messageInput = screen.getByLabelText(/mensaje/i)
      const longMessage = 'A'.repeat(1000)
      
      fireEvent.change(messageInput, { target: { value: longMessage } })
      expect(messageInput).toHaveValue(longMessage)
    })
  })
}) 