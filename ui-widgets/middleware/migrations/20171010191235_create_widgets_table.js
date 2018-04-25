
exports.up = function(knex, Promise) {
  return knex.schema.createTable('widgets', function(table) {
    table.increments('id').primary()
  	table.string('widget_class').notNullable()
  	table.string('text')
    table.string('color')
  	table.string('content_desc', 512)
  	table.integer('width')
  	table.integer('height')
  	table.string('filepath').notNullable()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('widgets')
};
