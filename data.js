var Datastore = require('nedb')
  , db = new Datastore({ filename: 'rooms.db', autoload: true });

module.exports = {save: function(doc) {	db.insert(doc); },
				  query: function(q, callback) { db.find(q, callback); }
				 };
