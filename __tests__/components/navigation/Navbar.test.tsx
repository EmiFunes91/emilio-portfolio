import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import Navbar from '../../../components/navigation/Navbar'
import { PreferencesProvider } from '../../../context/PreferencesContext'

// Mock de framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    nav: ({ children, ...props }: any) => <nav {...props}>{children}</nav>,
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>
  },
  AnimatePresence: ({ children }: any) => <div>{children}</div>
}))

// Mock de lucide-react
jest.mock('lucide-react', () => ({
  Menu: () => <div data-testid="menu-icon">Menu</div>,
  X: () => <div data-testid="x-icon">X</div>,
  Home: () => <div data-testid="home-icon">Home</div>,
  User: () => <div data-testid="user-icon">User</div>,
  Layers: () => <div data-testid="layers-icon">Layers</div>,
  Folder: () => <div data-testid="folder-icon">Folder</div>,
  MessageCircle: () => <div data-testid="message-icon">Message</div>,
  Send: () => <div data-testid="send-icon">Send</div>
}))

// Mock de react-icons/fa
jest.mock('react-icons/fa', () => ({
  FaCode: () => <div data-testid="code-icon">Code</div>
}))

// Mock de los componentes de navegación
jest.mock('../../../components/navigation/DarkModeToggle', () => {
  return function MockDarkModeToggle() {
    return <div data-testid="dark-mode-toggle">Dark Mode Toggle</div>
  }
})

jest.mock('../../../components/navigation/LanguageToggle', () => {
  return function MockLanguageToggle() {
    return <div data-testid="language-toggle">Language Toggle</div>
  }
})

// Mock de Next.js Link
jest.mock('next/link', () => {
  return function MockLink({ children, href, ...props }: any) {
    return <a href={href} {...props}>{children}</a>
  }
})

// Mock de document.querySelector y scrollTo
const mockScrollTo = jest.fn()
const mockQuerySelector = jest.fn()
const mockGetBoundingClientRect = jest.fn()

Object.defineProperty(window, 'scrollTo', {
  value: mockScrollTo,
  writable: true
})

Object.defineProperty(document, 'querySelector', {
  value: mockQuerySelector,
  writable: true
})

const renderNavbar = (language = 'es') => {
  return render(
    <PreferencesProvider>
      <Navbar />
    </PreferencesProvider>
  )
}

describe('Navbar', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockQuerySelector.mockReturnValue({
      getBoundingClientRect: mockGetBoundingClientRect.mockReturnValue({
        top: 100
      })
    })
    Object.defineProperty(window, 'pageYOffset', {
      value: 0,
      writable: true
    })
  })

  it('renderiza correctamente con el logo y título', () => {
    renderNavbar()
    
    expect(screen.getByText('Portfolio')).toBeInTheDocument()
    expect(screen.getByTestId('code-icon')).toBeInTheDocument()
  })

  it('renderiza todos los enlaces de navegación', () => {
    renderNavbar()
    
    // Solo hay un elemento "Inicio" visible inicialmente (desktop)
    expect(screen.getByText('Inicio')).toBeInTheDocument()
    expect(screen.getByText('Sobre mí')).toBeInTheDocument()
    expect(screen.getByText('Stack')).toBeInTheDocument()
    expect(screen.getByText('Proyectos')).toBeInTheDocument()
    expect(screen.getByText('Testimonios')).toBeInTheDocument()
    expect(screen.getByText('Contacto')).toBeInTheDocument()
  })

  it('renderiza los toggles de modo oscuro y idioma', () => {
    renderNavbar()
    
    expect(screen.getAllByTestId('dark-mode-toggle')).toHaveLength(2) // Desktop y mobile
    expect(screen.getAllByTestId('language-toggle')).toHaveLength(2) // Desktop y mobile
  })

  it('maneja el scroll y cambia la apariencia del navbar', () => {
    renderNavbar()
    
    const navbar = screen.getByRole('navigation')
    
    // Simular scroll
    Object.defineProperty(window, 'scrollY', {
      value: 100,
      writable: true
    })
    
    fireEvent.scroll(window)
    
    expect(navbar).toBeInTheDocument()
  })

  it('maneja el click en enlaces de navegación', () => {
    renderNavbar()
    
    const homeLink = screen.getByText('Inicio')
    const desktopHomeLink = homeLink.closest('a')
    expect(desktopHomeLink).toBeInTheDocument()
    
    if (desktopHomeLink) {
      fireEvent.click(desktopHomeLink)
      
      expect(mockQuerySelector).toHaveBeenCalledWith('#inicio')
      expect(mockScrollTo).toHaveBeenCalledWith({
        top: 20, // 100 + 0 - 80 (offset)
        behavior: 'smooth'
      })
    }
  })

  it('maneja el toggle del menú móvil', () => {
    renderNavbar()
    
    const menuButton = screen.getByLabelText('Toggle menu')
    expect(menuButton).toBeInTheDocument()
    
    // Inicialmente el menú está cerrado - solo hay un elemento "Inicio" visible
    expect(screen.getByText('Inicio')).toBeInTheDocument()
    
    // Abrir menú
    fireEvent.click(menuButton)
    
    // Verificar que el icono cambia a X
    expect(screen.getByTestId('x-icon')).toBeInTheDocument()
    
    // Cerrar menú
    fireEvent.click(menuButton)
    
    // Verificar que el icono cambia de vuelta a Menu
    expect(screen.getByTestId('menu-icon')).toBeInTheDocument()
  })

  it('maneja el click en enlaces del menú móvil', () => {
    renderNavbar()
    
    const menuButton = screen.getByLabelText('Toggle menu')
    fireEvent.click(menuButton)
    
    // Después de abrir el menú, debería haber dos elementos "Inicio"
    const homeLinks = screen.getAllByText('Inicio')
    expect(homeLinks).toHaveLength(2) // Desktop y mobile
    
    const mobileHomeLink = homeLinks[1] // El segundo es el del menú móvil
    expect(mobileHomeLink).toBeInTheDocument()
    
    if (mobileHomeLink) {
      fireEvent.click(mobileHomeLink)
      
      expect(mockQuerySelector).toHaveBeenCalledWith('#inicio')
      expect(mockScrollTo).toHaveBeenCalled()
    }
  })

  it('maneja el caso cuando no se encuentra la sección', () => {
    renderNavbar()
    
    mockQuerySelector.mockReturnValue(null)
    
    const homeLink = screen.getByText('Inicio')
    const desktopHomeLink = homeLink.closest('a')
    expect(desktopHomeLink).toBeInTheDocument()
    
    if (desktopHomeLink) {
      fireEvent.click(desktopHomeLink)
      
      expect(mockQuerySelector).toHaveBeenCalledWith('#inicio')
      expect(mockScrollTo).not.toHaveBeenCalled()
    }
  })

  it('limpia el event listener de scroll al desmontar', () => {
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener')
    
    const { unmount } = renderNavbar()
    unmount()
    
    expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function))
  })

  it('renderiza con atributos de accesibilidad correctos', () => {
    renderNavbar()
    
    expect(screen.getByRole('navigation')).toHaveAttribute('aria-label', 'Main navigation')
    expect(screen.getByLabelText('Go to homepage')).toBeInTheDocument()
    expect(screen.getByLabelText('Toggle menu')).toBeInTheDocument()
  })
}) 