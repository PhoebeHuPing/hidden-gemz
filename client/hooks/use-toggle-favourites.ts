import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toggleFavourite } from '../apis/favourites'
import { useAuth0 } from '@auth0/auth0-react'
import toast from 'react-hot-toast'

export const useToggleFavourite = () => {
  const queryClient = useQueryClient()
  const { getAccessTokenSilently } = useAuth0()

  return useMutation({
    mutationFn: async (postId: number) => {
      const token = await getAccessTokenSilently()
      return toggleFavourite(postId, token)
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      queryClient.invalidateQueries({ queryKey: ['favourites'] })
    },

    onError: (error: Error) => {
      console.error(error.message)
      toast.error('Failed to update favourite')
    },
  })
}
