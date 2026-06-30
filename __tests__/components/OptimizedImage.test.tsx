import { render, screen } from '@testing-library/react'
import OptimizedImage from '../../components/OptimizedImage'
import '@testing-library/jest-dom'

describe('OptimizedImage Component', () => {
  it('renders without crashing', () => {
    render(<OptimizedImage src="/test.jpg" alt="Test" />)
    expect(true).toBe(true)
  })

  it('renders image with correct attributes', () => {
    render(<OptimizedImage src="/test.jpg" alt="Test" />)
    const image = screen.getByRole('img')
    expect(image).toHaveAttribute('src', '/test.jpg')
    expect(image).toHaveAttribute('alt', 'Test')
  })

  it('renders with default styling classes', () => {
    render(<OptimizedImage src="/test.jpg" alt="Test" />)
    const image = screen.getByRole('img')
    expect(image).toHaveClass('transition-opacity', 'duration-300')
  })

  it('renders with priority attribute', () => {
    render(<OptimizedImage src="/test.jpg" alt="Test" priority />)
    const image = screen.getByRole('img')
    expect(image).toBeInTheDocument()
  })

  it('renders with quality attribute', () => {
    render(<OptimizedImage src="/test.jpg" alt="Test" quality={90} />)
    const image = screen.getByRole('img')
    expect(image).toBeInTheDocument()
  })

  it('handles loading state', () => {
    render(<OptimizedImage src="/test.jpg" alt="Test" />)
    const image = screen.getByRole('img')
    expect(image).toHaveClass('opacity-0')
  })

  it('renders with different image sources', () => {
    render(<OptimizedImage src="/different.jpg" alt="Different" />)
    const image = screen.getByRole('img')
    expect(image).toHaveAttribute('src', '/different.jpg')
    expect(image).toHaveAttribute('alt', 'Different')
  })
}) 