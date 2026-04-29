/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable('comments', (table) => {
    table.increments('id').primary()
    table.integer('post_id').references('post.id').onDelete('CASCADE')
    table.string('user_id') // Auth0 sub
    table.string('author')
    table.string('author_image')
    table.text('content')
    table.timestamp('created_at').defaultTo(knex.fn.now())
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.dropTable('comments')
}
