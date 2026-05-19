import { screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import Home from './Home'
import { renderWithProviders } from '../test-utils'
import * as postsApi from '../apis/posts'
import { useAuth0 } from '@auth0/auth0-react'

vi.mock('@auth0/auth0-react')
vi.mock('../apis/posts')
vi.mock('../apis/favourites')

const mockPosts = [
  {
    id: 1,
    business_name: 'Midnight Espresso',
    business_suburb: 'Te Aro',
    venue_type: 'Cafe',
    tags: 'cafe',
    image_url: 'img1.jpg',
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    business_name: 'Garage Project',
    business_suburb: 'Aro Valley',
    venue_type: 'Bar',
    tags: 'beer',
    image_url: 'img2.jpg',
    created_at: new Date().toISOString(),
  },
]

describe('Home', () => {
  beforeEach(() => {
    vi.mocked(useAuth0).mockReturnValue({
      isAuthenticated: false,
      getAccessTokenSilently: vi.fn(),
    } as any)

    vi.mocked(postsApi.getPosts).mockResolvedValue(mockPosts as any)
  })

  it('renders loading state initially', () => {
    renderWithProviders(<Home />)
    expect(screen.getByText(/Finding gemz.../i)).toBeInTheDocument()
  })

  it('renders posts after loading', async () => {
    renderWithProviders(<Home />)
    await waitFor(() => {
      expect(screen.getByText('Midnight Espresso')).toBeInTheDocument()
      expect(screen.getByText('Garage Project')).toBeInTheDocument()
    })
  })

  it('renders NoResults when no posts match filters', async () => {
    vi.mocked(postsApi.getPosts).mockResolvedValue([])
    renderWithProviders(<Home />)
    await waitFor(() => {
      expect(screen.getByText(/No matching gemz found/i)).toBeInTheDocument()
    })
  })
})
