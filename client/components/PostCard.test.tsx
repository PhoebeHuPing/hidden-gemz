import { screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import PostCard from './PostCard'
import { renderWithProviders } from '../test-utils'
import { useAuth0 } from '@auth0/auth0-react'

vi.mock('@auth0/auth0-react')
vi.mock('../apis/posts')
vi.mock('./GoogleMap', () => ({
  default: () => <div data-testid="google-map">Map</div>
}))

const mockPost = {
  id: 1,
  business_name: 'Midnight Espresso',
  business_street: '178 Cuba Street',
  business_suburb: 'Te Aro',
  business_city: 'Wellington',
  venue_type: 'Cafe',
  review: 'Great coffee',
  image_url: 'image.jpg',
  tags: 'cafe,coffee',
  created_by: 'Alex',
  created_by_image: 'alex.jpg',
  created_at: new Date().toISOString(),
  user_id: 'auth0|123',
  favourite_count: 5
}

describe('PostCard', () => {
  beforeEach(() => {
    vi.mocked(useAuth0).mockReturnValue({
      isAuthenticated: true,
      user: { sub: 'auth0|123' },
      getAccessTokenSilently: vi.fn()
    } as any)
  })

  it('renders business details', () => {
    renderWithProviders(<PostCard post={mockPost as any} isFavourite={false} />)
    expect(screen.getByText('Midnight Espresso')).toBeInTheDocument()
    expect(screen.getByText('Te Aro')).toBeInTheDocument()
    expect(screen.getByText('Great coffee')).toBeInTheDocument()
  })

  it('renders edit and delete buttons for owner', () => {
    renderWithProviders(<PostCard post={mockPost as any} isFavourite={false} />)
    expect(screen.getByLabelText(/Edit post/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Delete post/i)).toBeInTheDocument()
  })

  it('opens modal on click', () => {
    renderWithProviders(<PostCard post={mockPost as any} isFavourite={false} />)
    fireEvent.click(screen.getByRole('button', { name: /Midnight Espresso/i }))
    expect(screen.getByText('178 Cuba Street, Te Aro, Wellington')).toBeInTheDocument()
    expect(screen.getByTestId('google-map')).toBeInTheDocument()
  })
})
