/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable('favourites', (table) => {
    table.increments('id').primary()
    table.string('user_id') // Auth0 sub
    table.integer('post_id').references('post.id').onDelete('CASCADE')
    table.unique(['user_id', 'post_id']) // Ensure a user can only favourite a post once
  })

  // Remove the global 'favourite' column from the post table
  await knex.schema.alterTable('post', (table) => {
    table.dropColumn('favourite')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.alterTable('post', (table) => {
    table.boolean('favourite').defaultTo(false)
  })

  return knex.schema.dropTable('favourites')
}
