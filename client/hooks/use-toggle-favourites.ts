import { toggleFavourite } from '../apis/posts'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useToggleFavourite = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: toggleFavourite,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },

    onError: (error: Error) => {
      console.error(error.message)
    },
  })
}