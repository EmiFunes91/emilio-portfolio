import { render, screen } from '@testing-library/react'
import { PreferencesProvider } from '../../context/PreferencesContext'
import Stack from '../../components/Stack'
import '@testing-library/jest-dom'

const renderWithContext = (component: React.ReactElement) => {
  return render(
    <PreferencesProvider>
      {component}
    </PreferencesProvider>
  )
}

describe('Stack Component', () => {
  it('renders the stack section with correct structure', () => {
    renderWithContext(<Stack />)
    
    const section = document.querySelector('section')
    expect(section).toBeInTheDocument()
  })

  it('renders the main heading', () => {
    renderWithContext(<Stack />)
    
    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading).toBeInTheDocument()
  })

  it('renders technology categories', () => {
    renderWithContext(<Stack />)
    
    // Verificar que las categorías están presentes
    expect(screen.getByText(/backend/i)).toBeInTheDocument()
    expect(screen.getByText(/frontend/i)).toBeInTheDocument()
    expect(screen.getByText(/devops/i)).toBeInTheDocument()
  })

  it('renders specific technologies', () => {
    renderWithContext(<Stack />)
    
    // Verificar que tecnologías específicas están presentes
    expect(screen.getByText(/java/i)).toBeInTheDocument()
    expect(screen.getByText(/spring boot/i)).toBeInTheDocument()
    expect(screen.getByText(/react/i)).toBeInTheDocument()
  })

  it('renders with correct styling classes', () => {
    renderWithContext(<Stack />)
    
    const section = document.querySelector('section')
    expect(section).toHaveClass('max-w-main', 'mx-auto', 'py-16')
  })

  it('renders technology descriptions', () => {
    renderWithContext(<Stack />)
    
    // Verificar que las descripciones están presentes
    expect(screen.getByText(/rendimiento, seguridad/i)).toBeInTheDocument()
  })
}) 