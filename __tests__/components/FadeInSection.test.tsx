import { render, screen } from '@testing-library/react'
import FadeInSection from '../../components/FadeInSection'
import '@testing-library/jest-dom'

describe('FadeInSection Component', () => {
  it('renders without crashing', () => {
    render(
      <FadeInSection>
        <div data-testid="test-content">Test Content</div>
      </FadeInSection>
    )
    expect(true).toBe(true)
  })

  it('renders children correctly', () => {
    render(
      <FadeInSection>
        <div data-testid="test-content">Test Content</div>
      </FadeInSection>
    )
    
    expect(screen.getByTestId('test-content')).toBeInTheDocument()
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('renders with motion wrapper', () => {
    render(
      <FadeInSection>
        <div>Content</div>
      </FadeInSection>
    )
    
    // Verificar que el contenido se renderiza
    expect(screen.getByText('Content')).toBeInTheDocument()
  })
}) 