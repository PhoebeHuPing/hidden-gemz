import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import AmmenitiesIcon from './AmmenitiesIcon'

describe('AmmenitiesIcon', () => {
  it('renders correctly with label', () => {
    render(<AmmenitiesIcon type="pet" />)
    const label = screen.getByText(/Pet Friendly/i)
    expect(label).toBeInTheDocument()
  })

  it('renders the correct icon', () => {
    const { container } = render(<AmmenitiesIcon type="kids" />)
    const icon = container.querySelector('svg')
    expect(icon).toBeInTheDocument()
  })
})
