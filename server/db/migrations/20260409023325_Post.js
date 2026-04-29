/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable('post', (table) => {
    table.increments('id').primary()
    table.string('business_name')
    table.string('business_street')
    table.string('business_suburb')
    table.string('business_city')
    table.timestamp('created_at')
    table.string('tags')
    table.boolean('pet_friendly')
    table.boolean('kid_friendly')
    table.boolean('vegan')
    table.boolean('gluten_free')
    table.boolean('favourite')
    table.boolean('outdoor')
    table.boolean('indoor')
    table.boolean('smoking')
    table.string('venue_type')
    table.boolean('parking')
    table.string('image_url')
    table.string('created_by')
    table.string('created_by_image')
    table.string('review')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.dropTable('post')
}
