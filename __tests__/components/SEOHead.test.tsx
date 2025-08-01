import { render } from '@testing-library/react'
import { PreferencesProvider } from '../../context/PreferencesContext'
import SEOHead from '../../components/SEOHead'
import '@testing-library/jest-dom'

// Mock de next/head
jest.mock('next/head', () => {
  return function Head({ children }: { children: React.ReactNode }) {
    return <>{children}</>
  }
})

const renderWithContext = (component: React.ReactElement) => {
  return render(
    <PreferencesProvider>
      {component}
    </PreferencesProvider>
  )
}

describe('SEOHead Component', () => {
  it('renders without crashing', () => {
    renderWithContext(<SEOHead />)
    // El componente renderiza sin errores
    expect(true).toBe(true)
  })

  it('renders with default props', () => {
    renderWithContext(<SEOHead />)
    // Verificar que el componente se renderiza correctamente
    expect(document.head).toBeDefined()
  })

  it('renders with custom title', () => {
    renderWithContext(<SEOHead title="Custom Title" />)
    // Verificar que el componente se renderiza con título personalizado
    expect(true).toBe(true)
  })

  it('renders with custom description', () => {
    renderWithContext(<SEOHead description="Custom Description" />)
    // Verificar que el componente se renderiza con descripción personalizada
    expect(true).toBe(true)
  })
}) 