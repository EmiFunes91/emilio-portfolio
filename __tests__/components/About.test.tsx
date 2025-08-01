import { render, screen } from '@testing-library/react'
import { PreferencesProvider } from '../../context/PreferencesContext'
import About from '../../components/About'
import '@testing-library/jest-dom'

const renderWithContext = (component: React.ReactElement) => {
  return render(
    <PreferencesProvider>
      {component}
    </PreferencesProvider>
  )
}

describe('About Component', () => {
  it('renders the about section with correct structure', () => {
    renderWithContext(<About />)
    
    const section = document.querySelector('#sobre-mi')
    expect(section).toBeInTheDocument()
    expect(section).toHaveClass('max-w-4xl', 'mx-auto', 'py-12', 'px-4')
  })

  it('renders the main heading', () => {
    renderWithContext(<About />)
    
    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading).toBeInTheDocument()
  })

  it('renders about content with correct text', () => {
    renderWithContext(<About />)
    
    // Verificar que el contenido principal está presente
    expect(screen.getByText(/fastapi/i)).toBeInTheDocument()
    expect(screen.getByText(/spring boot/i)).toBeInTheDocument()
    expect(screen.getByText(/next.js/i)).toBeInTheDocument()
  })

  it('renders with correct styling classes', () => {
    renderWithContext(<About />)
    
    const section = document.querySelector('#sobre-mi')
    expect(section).toHaveClass('max-w-4xl', 'mx-auto', 'py-12', 'px-4')
  })

  it('renders subtitle text', () => {
    renderWithContext(<About />)
    
    expect(screen.getByText(/ingeniero fullstack/i)).toBeInTheDocument()
    expect(screen.getByText(/soluciones escalables/i)).toBeInTheDocument()
  })

  it('renders CTA link', () => {
    renderWithContext(<About />)
    
    const ctaLink = screen.getByText(/ver proyectos/i)
    expect(ctaLink).toBeInTheDocument()
    expect(ctaLink.closest('a')).toHaveAttribute('href', '#proyectos')
  })

  it('renders highlight section', () => {
    renderWithContext(<About />)
    
    expect(screen.getByText(/smart advisor app/i)).toBeInTheDocument()
    expect(screen.getByText(/stripe/i)).toBeInTheDocument()
  })
}) 