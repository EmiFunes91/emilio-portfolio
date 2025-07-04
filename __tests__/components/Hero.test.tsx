import { render, screen } from '@testing-library/react'
import { PreferencesProvider } from '../../context/PreferencesContext'
import Hero from '../../components/Hero'
import '@testing-library/jest-dom'

// Wrapper para proporcionar el contexto
const renderWithContext = (component: React.ReactElement) => {
  return render(
    <PreferencesProvider>
      {component}
    </PreferencesProvider>
  )
}

describe('Hero Component', () => {
  it('renders the hero section with correct content', () => {
    renderWithContext(<Hero />)
    
    // Verificar que el nombre se renderiza
    expect(screen.getByText('Emilio Funes')).toBeInTheDocument()
    
    // Verificar que el rol se renderiza
    expect(screen.getByText(/Backend Developer/)).toBeInTheDocument()
    expect(screen.getByText(/Java, Spring Boot, PHP, Laravel/)).toBeInTheDocument()
  })

  it('renders contact button with correct link', () => {
    renderWithContext(<Hero />)
    
    const contactButton = screen.getByText(/Contacto|Contact/)
    expect(contactButton).toBeInTheDocument()
    expect(contactButton.closest('a')).toHaveAttribute('href', 'mailto:emilio.ifunes@hotmail.es')
  })

  it('renders CV button with correct attributes', () => {
    renderWithContext(<Hero />)
    
    const cvButton = screen.getByText(/Ver CV|View CV/)
    expect(cvButton).toBeInTheDocument()
    
    const cvLink = cvButton.closest('a')
    expect(cvLink).toHaveAttribute('target', '_blank')
    expect(cvLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('renders projects button with correct anchor link', () => {
    renderWithContext(<Hero />)
    
    const projectsButton = screen.getByText(/Ver proyectos|View Projects/)
    expect(projectsButton).toBeInTheDocument()
    expect(projectsButton.closest('a')).toHaveAttribute('href', '#proyectos')
  })

  it('renders social media links', () => {
    renderWithContext(<Hero />)
    
    // Verificar enlaces de redes sociales
    const githubLink = screen.getByLabelText('GitHub')
    const linkedinLink = screen.getByLabelText('LinkedIn')
    
    expect(githubLink).toHaveAttribute('href', 'https://github.com/EmiFunes91')
    expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/emilio-funes-8b140b21a/')
  })

  it('renders open source contribution badge', () => {
    renderWithContext(<Hero />)
    
    const openSourceBadge = screen.getByText(/Open Source/)
    expect(openSourceBadge).toBeInTheDocument()
    expect(openSourceBadge.closest('a')).toHaveAttribute('href', 'https://github.com/wintercms/docs/pull/237')
  })

  it('has correct section attributes', () => {
    renderWithContext(<Hero />)
    
    const section = document.querySelector('section')
    expect(section).toHaveAttribute('id', 'inicio')
    expect(section).toHaveClass('scroll-mt-24')
  })
}) 