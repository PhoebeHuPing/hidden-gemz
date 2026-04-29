/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable('follows', (table) => {
    table.increments('id').primary()
    table.string('follower_id').notNullable() // Auth0 sub of the person who is following
    table.string('followed_id').notNullable() // Auth0 sub of the person being followed
    table.string('followed_username').notNullable() // Username of the person being followed
    table.string('followed_image') // Profile image of the person being followed
    table.unique(['follower_id', 'followed_id']) // Ensure only follow once
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.dropTable('follows')
}
