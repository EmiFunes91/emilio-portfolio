import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { PreferencesProvider, usePreferences } from '../../context/PreferencesContext'

// Componente de prueba para acceder al contexto
const TestComponent = () => {
  const { darkMode, toggleDarkMode, language, toggleLanguage } = usePreferences()
  
  return (
    <div>
      <div data-testid="dark-mode">{darkMode ? 'dark' : 'light'}</div>
      <div data-testid="language">{language}</div>
      <button onClick={toggleDarkMode} data-testid="toggle-dark">Toggle Dark</button>
      <button onClick={toggleLanguage} data-testid="toggle-lang">Toggle Lang</button>
    </div>
  )
}

describe('PreferencesContext', () => {
  beforeEach(() => {
    // Limpiar localStorage antes de cada test
    localStorage.clear()
    localStorage.getItem.mockClear()
    localStorage.setItem.mockClear()
    // Resetear document.documentElement
    document.documentElement.classList.remove('dark')
    
    // Mock del idioma del navegador para que sea español por defecto
    Object.defineProperty(navigator, 'language', {
      value: 'es-ES',
      writable: true,
    })
  })

  it('provides default values', () => {
    render(
      <PreferencesProvider>
        <TestComponent />
      </PreferencesProvider>
    )

    expect(screen.getByTestId('dark-mode')).toHaveTextContent('light')
    expect(screen.getByTestId('language')).toHaveTextContent('es')
  })

  it('toggles dark mode correctly', async () => {
    render(
      <PreferencesProvider>
        <TestComponent />
      </PreferencesProvider>
    )

    const toggleButton = screen.getByTestId('toggle-dark')
    const darkModeElement = screen.getByTestId('dark-mode')

    // Inicialmente en modo claro
    expect(darkModeElement).toHaveTextContent('light')
    expect(document.documentElement).not.toHaveClass('dark')

    // Cambiar a modo oscuro
    fireEvent.click(toggleButton)
    
    await waitFor(() => {
      expect(darkModeElement).toHaveTextContent('dark')
      expect(document.documentElement).toHaveClass('dark')
    })

    // Cambiar de vuelta a modo claro
    fireEvent.click(toggleButton)
    
    await waitFor(() => {
      expect(darkModeElement).toHaveTextContent('light')
      expect(document.documentElement).not.toHaveClass('dark')
    })
  })

  it('toggles language correctly', async () => {
    render(
      <PreferencesProvider>
        <TestComponent />
      </PreferencesProvider>
    )

    const toggleButton = screen.getByTestId('toggle-lang')
    const languageElement = screen.getByTestId('language')

    // Inicialmente en español
    expect(languageElement).toHaveTextContent('es')

    // Cambiar a inglés
    fireEvent.click(toggleButton)
    
    await waitFor(() => {
      expect(languageElement).toHaveTextContent('en')
    })

    // Cambiar de vuelta a español
    fireEvent.click(toggleButton)
    
    await waitFor(() => {
      expect(languageElement).toHaveTextContent('es')
    })
  })

  it('persists preferences in localStorage', async () => {
    render(
      <PreferencesProvider>
        <TestComponent />
      </PreferencesProvider>
    )

    const toggleDarkButton = screen.getByTestId('toggle-dark')
    const toggleLangButton = screen.getByTestId('toggle-lang')

    // Cambiar preferencias
    fireEvent.click(toggleDarkButton)
    fireEvent.click(toggleLangButton)

    await waitFor(() => {
      expect(localStorage.setItem).toHaveBeenCalledWith('portfolio-theme', 'dark')
      expect(localStorage.setItem).toHaveBeenCalledWith('portfolio-lang', 'en')
    })
  })

  it('loads preferences from localStorage on mount', () => {
    // Simular localStorage con valores guardados
    localStorage.getItem.mockImplementation((key) => {
      if (key === 'portfolio-theme') return 'dark'
      if (key === 'portfolio-lang') return 'en'
      return null
    })

    render(
      <PreferencesProvider>
        <TestComponent />
      </PreferencesProvider>
    )

    expect(screen.getByTestId('dark-mode')).toHaveTextContent('dark')
    expect(screen.getByTestId('language')).toHaveTextContent('en')
    expect(document.documentElement).toHaveClass('dark')
  })

  it('detects system dark mode preference', () => {
    // Simular preferencia del sistema en modo oscuro
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: query === '(prefers-color-scheme: dark)',
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    })

    render(
      <PreferencesProvider>
        <TestComponent />
      </PreferencesProvider>
    )

    expect(screen.getByTestId('dark-mode')).toHaveTextContent('dark')
    expect(document.documentElement).toHaveClass('dark')
  })
}) 