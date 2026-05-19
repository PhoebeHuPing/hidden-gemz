import db from './connection.ts'

// GET favourites for a user
export async function getFavourites(userId: string) {
  return db('favourites').where('user_id', userId).select('post_id')
}

// ADD favourite
export async function addFavourite(userId: string, postId: number) {
  return db('favourites').insert({ user_id: userId, post_id: postId })
}

// REMOVE favourite
export async function removeFavourite(userId: string, postId: number) {
  return db('favourites').where({ user_id: userId, post_id: postId }).delete()
}

// GET full post objects for a user's favourites
export async function getFavouritePosts(userId: string) {
  return db('post')
    .join('favourites', 'post.id', 'favourites.post_id')
    .where('favourites.user_id', userId)
    .select('post.*')
    .select(
      db('favourites as f2')
        .count('id')
        .whereRaw('f2.post_id = post.id')
        .as('favourite_count'),
    )
}
