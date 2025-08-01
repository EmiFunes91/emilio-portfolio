import { render, screen, fireEvent } from '@testing-library/react'
import { PreferencesProvider } from '../../../context/PreferencesContext'
import LanguageToggle from '../../../components/navigation/LanguageToggle'
import '@testing-library/jest-dom'

const renderWithContext = (component: React.ReactElement) => {
  return render(
    <PreferencesProvider>
      {component}
    </PreferencesProvider>
  )
}

describe('LanguageToggle Component', () => {
  it('renders the language toggle button', () => {
    renderWithContext(<LanguageToggle />)
    
    const button = screen.getByRole('button', { name: /cambiar a inglés/i })
    expect(button).toBeInTheDocument()
  })

  it('handles click event', () => {
    renderWithContext(<LanguageToggle />)
    
    const button = screen.getByRole('button', { name: /cambiar a inglés/i })
    fireEvent.click(button)
    
    // Verificar que el botón sigue presente después del click
    expect(button).toBeInTheDocument()
  })

  it('renders with correct styling classes', () => {
    renderWithContext(<LanguageToggle />)
    
    const button = screen.getByRole('button', { name: /cambiar a inglés/i })
    expect(button).toHaveClass('rounded-full')
    expect(button).toHaveClass('p-1.5', 'sm:p-2')
    expect(button).toHaveClass('px-2', 'sm:px-3')
  })

  it('renders language icon', () => {
    renderWithContext(<LanguageToggle />)
    
    const button = screen.getByRole('button', { name: /cambiar a inglés/i })
    expect(button).toBeInTheDocument()
  })

  it('shows correct tooltip in Spanish', () => {
    renderWithContext(<LanguageToggle />)
    
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('title', 'Cambiar a Inglés')
  })

  it('shows correct tooltip in English when language is English', () => {
    // Mock localStorage to set English language
    const mockLocalStorage = {
      getItem: jest.fn((key) => {
        if (key === 'portfolio-lang') return 'en'
        if (key === 'portfolio-theme') return 'light'
        return null
      }),
      setItem: jest.fn(),
    }
    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage,
      writable: true,
    })

    renderWithContext(<LanguageToggle />)
    
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('title', 'Switch to Spanish')
  })
}) 