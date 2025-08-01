import { render, screen } from '@testing-library/react'
import { PreferencesProvider } from '../../context/PreferencesContext'
import Footer from '../../components/Footer'
import '@testing-library/jest-dom'

const renderWithContext = (component: React.ReactElement) => {
  return render(
    <PreferencesProvider>
      {component}
    </PreferencesProvider>
  )
}

describe('Footer Component', () => {
  it('renders the footer with correct structure', () => {
    renderWithContext(<Footer />)
    
    const footer = screen.getByRole('contentinfo')
    expect(footer).toBeInTheDocument()
  })

  it('renders copyright information', () => {
    renderWithContext(<Footer />)
    
    expect(screen.getByText(/emilio funes/i)).toBeInTheDocument()
    expect(screen.getByText(/2025/i)).toBeInTheDocument()
  })

  it('renders with correct styling classes', () => {
    renderWithContext(<Footer />)
    
    const footer = screen.getByRole('contentinfo')
    expect(footer).toHaveClass('mt-24', 'py-6', 'sm:py-10')
  })

  it('renders footer content', () => {
    renderWithContext(<Footer />)
    
    // Verificar que el contenido del footer está presente
    expect(screen.getByText(/next\.js/i)).toBeInTheDocument()
  })
}) 