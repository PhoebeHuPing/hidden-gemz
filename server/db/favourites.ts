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
    .join('favourites as f1', 'post.id', 'f1.post_id')
    .leftJoin('favourites as f2', 'post.id', 'f2.post_id')
    .where('f1.user_id', userId)
    .select('post.*')
    .count('f2.id as favourite_count')
    .groupBy('post.id')
}
