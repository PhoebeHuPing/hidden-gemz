import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Footer from './Footer'
import { MemoryRouter } from 'react-router'

describe('Footer', () => {
  it('renders copyright text', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    )
    const copyright = screen.getByText(/HiddenGemz/i)
    expect(copyright).toBeInTheDocument()
  })

  it('renders "About Developers" link', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    )
    const link = screen.getByRole('link', { name: /About Developers/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/about')
  })
})
