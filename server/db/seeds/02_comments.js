/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  if (knex.client.config.client === 'sqlite3') {
    await knex.raw('PRAGMA foreign_keys = OFF')
  }
  await knex('comments').del()

  await knex('comments').insert([
    { post_id: 1, user_id: 'auth0|user2', author: 'Jane Doe', author_image: 'https://i.pravatar.cc/150?u=JaneDoe', content: 'Love the coffee here.', created_at: knex.fn.now() },
    { post_id: 1, user_id: 'auth0|user3', author: 'Sam Brown', author_image: 'https://i.pravatar.cc/150?u=SamBrown', content: 'Definitely my local.', created_at: knex.fn.now() },
    { post_id: 2, user_id: 'auth0|user4', author: 'Chris White', author_image: 'https://i.pravatar.cc/150?u=ChrisWhite', content: 'Best craft beers in town.', created_at: knex.fn.now() },
    { post_id: 2, user_id: 'auth0|user5', author: 'Pat Green', author_image: 'https://i.pravatar.cc/150?u=PatGreen', content: 'Great atmosphere.', created_at: knex.fn.now() },
    { post_id: 3, user_id: 'auth0|user6', author: 'Taylor Blue', author_image: 'https://i.pravatar.cc/150?u=TaylorBlue', content: 'So good!', created_at: knex.fn.now() },
    { post_id: 4, user_id: 'auth0|user7', author: 'Jordan Black', author_image: 'https://i.pravatar.cc/150?u=JordanBlack', content: 'Special place.', created_at: knex.fn.now() },
    { post_id: 5, user_id: 'auth0|user8', author: 'Morgan Gray', author_image: 'https://i.pravatar.cc/150?u=MorganGray', content: 'Friendly vibe.', created_at: knex.fn.now() },
    { post_id: 6, user_id: 'auth0|user9', author: 'Riley Purple', author_image: 'https://i.pravatar.cc/150?u=RileyPurple', content: 'Snacks are gourmet.', created_at: knex.fn.now() },
    { post_id: 7, user_id: 'auth0|user10', author: 'Casey Yellow', author_image: 'https://i.pravatar.cc/150?u=CaseyYellow', content: 'Loved it too.', created_at: knex.fn.now() },
    { post_id: 8, user_id: 'auth0|user1', author: 'Alex Smith', author_image: 'https://i.pravatar.cc/150?u=AlexSmith', content: 'A favourite spot.', created_at: knex.fn.now() },
  ])

  if (knex.client.config.client === 'sqlite3') {
    await knex.raw('PRAGMA foreign_keys = ON')
  }
}
