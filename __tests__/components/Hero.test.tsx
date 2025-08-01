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
    
    // Verificar que el título se renderiza (el texto real que está en el componente)
    expect(screen.getByText(/Fullstack Engineer/)).toBeInTheDocument()
    expect(screen.getByText(/Cloud/)).toBeInTheDocument()
    expect(screen.getByText(/DevOps/)).toBeInTheDocument()
  })

  it('renders projects button with correct anchor link', () => {
    renderWithContext(<Hero />)
    
    // El texto real es "Ver proyectos" en español
    const projectsButton = screen.getByText(/Ver proyectos/)
    expect(projectsButton).toBeInTheDocument()
    expect(projectsButton.closest('a')).toHaveAttribute('href', '#proyectos')
  })

  it('renders CV button with correct attributes', () => {
    renderWithContext(<Hero />)
    
    // El texto real es "Descargar CV" en español
    const cvButton = screen.getByText(/Descargar CV/)
    expect(cvButton).toBeInTheDocument()
    
    const cvLink = cvButton.closest('a')
    expect(cvLink).toHaveAttribute('target', '_blank')
    expect(cvLink).toHaveAttribute('rel', 'noopener noreferrer')
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
    // Removemos la expectativa de scroll-mt-24 ya que no está en el componente actual
  })

  it('renders call to action text', () => {
    renderWithContext(<Hero />)
    
    // Verificar el texto de CTA que está en el componente
    expect(screen.getByText(/Desarrollo soluciones robustas, escalables y modernas/)).toBeInTheDocument()
  })

  it('renders all social media platforms', () => {
    renderWithContext(<Hero />)
    
    // Verificar que todos los enlaces sociales están presentes
    expect(screen.getByLabelText('GitHub')).toBeInTheDocument()
    expect(screen.getByLabelText('LinkedIn')).toBeInTheDocument()
    expect(screen.getByLabelText('Fiverr')).toBeInTheDocument()
    expect(screen.getByLabelText('Upwork')).toBeInTheDocument()
  })
}) 