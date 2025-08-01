import { render, screen } from '@testing-library/react'
import LoadingSpinner from '../../components/LoadingSpinner'
import '@testing-library/jest-dom'

describe('LoadingSpinner Component', () => {
  it('renders the loading spinner', () => {
    render(<LoadingSpinner />)
    
    const spinner = screen.getByRole('status')
    expect(spinner).toBeInTheDocument()
  })

  it('renders with correct accessibility attributes', () => {
    render(<LoadingSpinner />)
    
    const spinner = screen.getByRole('status')
    expect(spinner).toHaveAttribute('aria-label', 'Loading')
  })

  it('renders with correct styling classes', () => {
    render(<LoadingSpinner />)
    
    const spinner = screen.getByRole('status')
    expect(spinner).toHaveClass('animate-spin')
  })

  it('renders spinner icon', () => {
    render(<LoadingSpinner />)
    
    const spinner = screen.getByRole('status')
    expect(spinner).toBeInTheDocument()
  })
}) 