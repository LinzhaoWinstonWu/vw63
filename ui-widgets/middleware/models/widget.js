var bookshelf = require('../bookshelf');
var Widget = bookshelf.Model.extend({
  tableName: 'widgets',
});
module.exports = Widget;