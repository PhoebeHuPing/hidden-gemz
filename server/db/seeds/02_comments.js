/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Disable foreign keys temporarily
  await knex.raw('PRAGMA foreign_keys = OFF')

  // Deletes ALL existing entries
  await knex('comments').del()

  // Inserts entries
  await knex('comments').insert([
    {
      id: 1,
      post_id: 1,
      user_id: 'auth0|123',
      author: 'dev_guy',
      author_image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
      content: 'The Rusty Anchor is indeed a classic. Love the vibe there!',
      created_at: knex.fn.now(),
    },
    {
      id: 2,
      post_id: 1,
      user_id: 'auth0|456',
      author: 'local_legend',
      author_image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=150&q=80',
      content: 'Best fish and chips in Wellington, hands down.',
      created_at: knex.fn.now(),
    },
    {
      id: 3,
      post_id: 2,
      user_id: 'auth0|789',
      author: 'gamer_89',
      author_image: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=150&q=80',
      content: 'That spicy ramen is no joke! Be careful with the level 5 heat.',
      created_at: knex.fn.now(),
    },
    {
      id: 4,
      post_id: 3,
      user_id: 'auth0|123',
      author: 'dev_guy',
      author_image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
      content: 'Such a peaceful spot to get some work done.',
      created_at: knex.fn.now(),
    },
    {
      id: 5,
      post_id: 5,
      user_id: 'auth0|444',
      author: 'Phoebe Hu',
      author_image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      content: 'Love the arcade machines here! Always a good time.',
      created_at: knex.fn.now(),
    },
    {
      id: 6,
      post_id: 8,
      user_id: 'auth0|555',
      author: 'fancy_pants',
      author_image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
      content: 'Great view, though it can get a bit windy up there!',
      created_at: knex.fn.now(),
    },
    {
      id: 7,
      post_id: 9,
      user_id: 'auth0|111',
      author: 'hiker_dan',
      author_image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80',
      content: 'A bit too fancy for my hiking boots, but the tea is excellent!',
      created_at: knex.fn.now(),
    },
  ])

  // Re-enable foreign keys
  await knex.raw('PRAGMA foreign_keys = ON')
}
