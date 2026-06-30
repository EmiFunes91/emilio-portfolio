import { render, screen } from '@testing-library/react'
import { PreferencesProvider } from '../../context/PreferencesContext'
import Projects from '../../components/Projects'
import '@testing-library/jest-dom'

const renderWithContext = (component: React.ReactElement) => {
  return render(
    <PreferencesProvider>
      {component}
    </PreferencesProvider>
  )
}

describe('Projects Component', () => {
  it('renders the projects section with correct structure', () => {
    renderWithContext(<Projects />)
    
    const section = document.querySelector('#proyectos')
    expect(section).toBeInTheDocument()
    expect(section).toHaveClass('max-w-main', 'mx-auto', 'py-20')
  })

  it('renders the main heading', () => {
    renderWithContext(<Projects />)
    
    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading).toBeInTheDocument()
  })

  it('renders project cards', () => {
    renderWithContext(<Projects />)
    
    // Verificar que las tarjetas de proyectos están presentes
    const projectCards = document.querySelectorAll('[class*="bg-white"]')
    expect(projectCards.length).toBeGreaterThan(0)
  })

  it('renders specific project names', () => {
    renderWithContext(<Projects />)
    
    // Verificar que los nombres de proyectos específicos están presentes
    expect(screen.getByText(/smart advisor/i)).toBeInTheDocument()
    expect(screen.getByText(/oct to xenforo/i)).toBeInTheDocument()
    expect(screen.getByText(/store api/i)).toBeInTheDocument()
  })

  it('renders with correct styling classes', () => {
    renderWithContext(<Projects />)
    
    const section = document.querySelector('#proyectos')
    expect(section).toHaveClass('max-w-main', 'mx-auto', 'py-20')
  })
}) 