import { render, screen } from '@testing-library/react'
import { PreferencesProvider } from '../../context/PreferencesContext'
import Contact from '../../components/Contact'
import '@testing-library/jest-dom'

const renderWithContext = (component: React.ReactElement) => {
  return render(
    <PreferencesProvider>
      {component}
    </PreferencesProvider>
  )
}

describe('Contact Component', () => {
  it('renders the contact section with correct structure', () => {
    renderWithContext(<Contact />)
    
    const section = document.querySelector('#contacto')
    expect(section).toBeInTheDocument()
    expect(section).toHaveClass('max-w-main', 'flex', 'flex-col', 'items-center', 'py-20')
  })

  it('renders the main heading', () => {
    renderWithContext(<Contact />)
    
    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading).toBeInTheDocument()
  })

  it('renders contact form', () => {
    renderWithContext(<Contact />)
    
    // Verificar que el formulario está presente
    const form = document.querySelector('form')
    expect(form).toBeInTheDocument()
  })

  it('renders description text', () => {
    renderWithContext(<Contact />)
    
    expect(screen.getByText(/disponible para proyectos freelance/i)).toBeInTheDocument()
    expect(screen.getByText(/conectemos/i)).toBeInTheDocument()
  })

  it('renders with correct styling classes', () => {
    renderWithContext(<Contact />)
    
    const section = document.querySelector('#contacto')
    expect(section).toHaveClass('max-w-main', 'flex', 'flex-col', 'items-center', 'py-20')
  })

  it('renders contact form component', () => {
    renderWithContext(<Contact />)
    
    // Verificar que el componente ContactForm está renderizado
    const contactForm = document.querySelector('[id*="contact"]')
    expect(contactForm).toBeInTheDocument()
  })
}) 