import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Loading from './Loading'

describe('Loading', () => {
  it('renders loading text', () => {
    render(<Loading />)
    const loadingText = screen.getByText(/Finding gemz.../i)
    expect(loadingText).toBeInTheDocument()
  })
})
