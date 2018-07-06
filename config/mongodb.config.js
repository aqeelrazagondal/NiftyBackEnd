var mongodb = require('mongodb');
var uri = 'mongodb://aaqilcarino:Aqil123**@ds157599.mlab.com:57599/accesscontrol';

module.exports = function(callback) {
  mongodb.MongoClient.connect(uri, callback);
};