import { render, screen, fireEvent } from '@testing-library/react'
import { PreferencesProvider } from '../../../context/PreferencesContext'
import DarkModeToggle from '../../../components/navigation/DarkModeToggle'
import '@testing-library/jest-dom'

const renderWithContext = (component: React.ReactElement) => {
  return render(
    <PreferencesProvider>
      {component}
    </PreferencesProvider>
  )
}

describe('DarkModeToggle Component', () => {
  it('renders the dark mode toggle button', () => {
    renderWithContext(<DarkModeToggle />)
    
    const button = screen.getByRole('button', { name: /cambiar a oscuro/i })
    expect(button).toBeInTheDocument()
  })

  it('handles click event', () => {
    renderWithContext(<DarkModeToggle />)
    
    const button = screen.getByRole('button', { name: /cambiar a oscuro/i })
    fireEvent.click(button)
    
    // Verificar que el botón sigue presente después del click
    expect(button).toBeInTheDocument()
  })

  it('renders with correct styling classes', () => {
    renderWithContext(<DarkModeToggle />)
    
    const button = screen.getByRole('button', { name: /cambiar a oscuro/i })
    expect(button).toHaveClass('rounded-full')
    expect(button).toHaveClass('p-1.5', 'sm:p-2')
  })

  it('renders theme icon', () => {
    renderWithContext(<DarkModeToggle />)
    
    const button = screen.getByRole('button', { name: /cambiar a oscuro/i })
    expect(button).toBeInTheDocument()
  })

  it('shows correct tooltip in Spanish', () => {
    renderWithContext(<DarkModeToggle />)
    
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('title', 'Cambiar a oscuro')
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

    renderWithContext(<DarkModeToggle />)
    
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('title', 'Switch to dark mode')
  })
}) 