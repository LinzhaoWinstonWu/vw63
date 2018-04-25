var knex = require('knex')(require('./knexfile'));

var bookshelf = require('bookshelf')(knex);
bookshelf.plugin('pagination');

module.exports = bookshelf;