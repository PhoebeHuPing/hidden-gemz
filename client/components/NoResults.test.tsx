import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import NoResults from './NoResults'

describe('NoResults', () => {
  it('renders "No matching gemz found" text', () => {
    render(<NoResults />)
    const title = screen.getByText(/No matching gemz found/i)
    expect(title).toBeInTheDocument()
  })

  it('renders "Try adjusting your filters" text', () => {
    render(<NoResults />)
    const text = screen.getByText(/Try adjusting your filters/i)
    expect(text).toBeInTheDocument()
  })
})
