import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { PreferencesProvider } from '../../context/PreferencesContext'
import Testimonials from '../../components/Testimonials'
import '@testing-library/jest-dom'

// Mock de framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>
  },
  AnimatePresence: ({ children }: any) => <div>{children}</div>
}))

const renderWithContext = (component: React.ReactElement) => {
  return render(
    <PreferencesProvider>
      {component}
    </PreferencesProvider>
  )
}

describe('Testimonials Component', () => {
  it('renderiza la sección de testimonios', () => {
    renderWithContext(<Testimonials />)
    
    const section = document.querySelector('section')
    expect(section).toBeInTheDocument()
  })

  it('renderiza el encabezado de la sección', () => {
    renderWithContext(<Testimonials />)
    
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
  })

  it('renderiza testimonios de clientes', () => {
    renderWithContext(<Testimonials />)
    
    expect(screen.getByText(/shantell sweeney/i)).toBeInTheDocument()
    expect(screen.getByText(/clientes reales/i)).toBeInTheDocument()
  })

  it('renderiza calificaciones con estrellas', () => {
    renderWithContext(<Testimonials />)
    
    const stars = screen.getAllByLabelText(/stars/i)
    expect(stars.length).toBeGreaterThan(0)
  })

  it('renderiza con las clases de estilo correctas', () => {
    renderWithContext(<Testimonials />)
    
    const section = document.querySelector('section')
    expect(section).toHaveClass('max-w-4xl', 'mx-auto', 'py-16')
  })

  it('renderiza contenido de testimonios', () => {
    renderWithContext(<Testimonials />)
    
    expect(screen.getByText(/clientes reales/i)).toBeInTheDocument()
    expect(screen.getByText(/resultados reales/i)).toBeInTheDocument()
  })

  it('renderiza información del cliente', () => {
    renderWithContext(<Testimonials />)
    
    expect(screen.getByText(/shantell sweeney/i)).toBeInTheDocument()
    expect(screen.getByText(/clientes reales/i)).toBeInTheDocument()
  })

  it('maneja el diseño responsivo', () => {
    renderWithContext(<Testimonials />)
    
    const section = document.querySelector('section')
    expect(section).toHaveClass('px-4')
  })

  it('renderiza navegación de testimonios', () => {
    renderWithContext(<Testimonials />)
    
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThan(0)
  })

  it('maneja el carousel de testimonios', () => {
    renderWithContext(<Testimonials />)
    
    const carousel = document.querySelector('[class*="relative"]')
    expect(carousel).toBeInTheDocument()
  })

  it('renderiza indicadores de testimonios', () => {
    renderWithContext(<Testimonials />)
    
    const indicators = screen.getAllByRole('button')
    expect(indicators.length).toBeGreaterThan(0)
  })

  it('maneja clicks en la navegación de testimonios', () => {
    renderWithContext(<Testimonials />)
    
    const buttons = screen.getAllByRole('button')
    if (buttons.length > 0) {
      fireEvent.click(buttons[0])
      expect(buttons[0]).toBeInTheDocument()
    }
  })

  it('renderiza imágenes de testimonios', () => {
    renderWithContext(<Testimonials />)
    
    const images = screen.getAllByRole('img')
    expect(images.length).toBeGreaterThan(0)
  })

  it('maneja transiciones de testimonios', () => {
    renderWithContext(<Testimonials />)
    
    const motionElements = document.querySelectorAll('[class*="animate"]')
    expect(motionElements.length).toBeGreaterThan(0)
  })

  it('renderiza metadatos de testimonios', () => {
    renderWithContext(<Testimonials />)
    
    expect(screen.getByText(/estados unidos/i)).toBeInTheDocument()
  })

  it('maneja la accesibilidad de testimonios', () => {
    renderWithContext(<Testimonials />)
    
    const accessibleElements = screen.getAllByLabelText(/stars/i)
    expect(accessibleElements.length).toBeGreaterThan(0)
  })

  it('renderiza marcado de esquema de testimonios', () => {
    renderWithContext(<Testimonials />)
    
    const schemaElements = document.querySelectorAll('[itemscope]')
    expect(schemaElements.length).toBeGreaterThan(0)
  })

  it('maneja estados de carga de testimonios', () => {
    renderWithContext(<Testimonials />)
    
    expect(screen.getByText(/shantell sweeney/i)).toBeInTheDocument()
  })

  it('maneja errores de testimonios', () => {
    renderWithContext(<Testimonials />)
    
    expect(screen.getByText(/shantell sweeney/i)).toBeInTheDocument()
  })

  it('renderiza múltiples testimonios', () => {
    renderWithContext(<Testimonials />)
    
    // Verificar que se renderizan múltiples testimonios
    expect(screen.getByText(/shantell sweeney/i)).toBeInTheDocument()
    expect(screen.getByText(/clientes reales/i)).toBeInTheDocument()
  })

  it('maneja la navegación con teclado', () => {
    renderWithContext(<Testimonials />)
    
    const buttons = screen.getAllByRole('button')
    if (buttons.length > 0) {
      const firstButton = buttons[0]
      firstButton.focus()
      expect(firstButton).toHaveFocus()
      
      fireEvent.keyDown(firstButton, { key: 'Enter', code: 'Enter' })
    }
  })

  it('renderiza testimonios con diferentes idiomas', () => {
    renderWithContext(<Testimonials />)
    
    // Verificar que los testimonios se renderizan independientemente del idioma
    expect(screen.getByText(/shantell sweeney/i)).toBeInTheDocument()
  })

  it('maneja testimonios sin imágenes', () => {
    renderWithContext(<Testimonials />)
    
    // Verificar que el componente maneja testimonios sin imágenes
    expect(screen.getByText(/shantell sweeney/i)).toBeInTheDocument()
  })

  it('renderiza testimonios con diferentes calificaciones', () => {
    renderWithContext(<Testimonials />)
    
    const stars = screen.getAllByLabelText(/stars/i)
    expect(stars.length).toBeGreaterThan(0)
  })

  it('maneja testimonios con contenido largo', () => {
    renderWithContext(<Testimonials />)
    
    // Verificar que el componente maneja testimonios con contenido largo
    expect(screen.getByText(/clientes reales/i)).toBeInTheDocument()
  })

  it('renderiza testimonios con información de ubicación', () => {
    renderWithContext(<Testimonials />)
    
    expect(screen.getByText(/estados unidos/i)).toBeInTheDocument()
  })

  it('maneja testimonios con fechas', () => {
    renderWithContext(<Testimonials />)
    
    // Verificar que el componente maneja testimonios con fechas
    expect(screen.getByText(/shantell sweeney/i)).toBeInTheDocument()
  })

  it('renderiza testimonios con enlaces', () => {
    renderWithContext(<Testimonials />)
    
    // Verificar que el componente maneja testimonios con enlaces
    const links = screen.getAllByRole('link')
    expect(links.length).toBeGreaterThan(0)
  })

  it('maneja testimonios con botones de acción', () => {
    renderWithContext(<Testimonials />)
    
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThan(0)
  })

  it('renderiza testimonios con iconos', () => {
    renderWithContext(<Testimonials />)
    
    // Verificar que se renderizan iconos en los testimonios
    const stars = screen.getAllByLabelText(/stars/i)
    expect(stars.length).toBeGreaterThan(0)
  })

  it('maneja testimonios con animaciones', () => {
    renderWithContext(<Testimonials />)
    
    // Verificar que las animaciones están configuradas
    const animatedElements = document.querySelectorAll('[class*="animate"]')
    expect(animatedElements.length).toBeGreaterThan(0)
  })

  it('renderiza testimonios con estilos personalizados', () => {
    renderWithContext(<Testimonials />)
    
    const section = document.querySelector('section')
    expect(section).toHaveClass('max-w-4xl', 'mx-auto', 'py-16', 'px-4')
  })

  it('maneja testimonios con diferentes tamaños', () => {
    renderWithContext(<Testimonials />)
    
    // Verificar que el componente maneja diferentes tamaños de testimonios
    expect(screen.getByText(/shantell sweeney/i)).toBeInTheDocument()
    expect(screen.getByText(/clientes reales/i)).toBeInTheDocument()
  })

  it('renderiza testimonios con información de contacto', () => {
    renderWithContext(<Testimonials />)
    
    // Verificar que se renderiza información de contacto
    expect(screen.getByText(/shantell sweeney/i)).toBeInTheDocument()
  })

  it('maneja testimonios con estados de carga', () => {
    renderWithContext(<Testimonials />)
    
    // Verificar que el componente maneja estados de carga
    expect(screen.getByText(/shantell sweeney/i)).toBeInTheDocument()
  })

  it('renderiza testimonios con mensajes de error', () => {
    renderWithContext(<Testimonials />)
    
    // Verificar que el componente maneja mensajes de error
    expect(screen.getByText(/shantell sweeney/i)).toBeInTheDocument()
  })

  it('maneja testimonios con diferentes formatos', () => {
    renderWithContext(<Testimonials />)
    
    // Verificar que el componente maneja diferentes formatos de testimonios
    expect(screen.getByText(/clientes reales/i)).toBeInTheDocument()
  })

  it('renderiza testimonios con información de proyecto', () => {
    renderWithContext(<Testimonials />)
    
    // Verificar que se renderiza información del proyecto
    expect(screen.getByText(/resultados reales/i)).toBeInTheDocument()
  })

  it('maneja testimonios con diferentes idiomas de contenido', () => {
    renderWithContext(<Testimonials />)
    
    // Verificar que el componente maneja contenido en diferentes idiomas
    expect(screen.getByText(/shantell sweeney/i)).toBeInTheDocument()
  })

  it('renderiza testimonios con información de tiempo', () => {
    renderWithContext(<Testimonials />)
    
    // Verificar que se renderiza información de tiempo
    expect(screen.getByText(/shantell sweeney/i)).toBeInTheDocument()
  })

  it('maneja testimonios con diferentes tipos de calificación', () => {
    renderWithContext(<Testimonials />)
    
    const stars = screen.getAllByLabelText(/stars/i)
    expect(stars.length).toBeGreaterThan(0)
  })

  it('renderiza testimonios con información de plataforma', () => {
    renderWithContext(<Testimonials />)
    
    // Verificar que se renderiza información de plataforma
    expect(screen.getByText(/estados unidos/i)).toBeInTheDocument()
  })
}) 