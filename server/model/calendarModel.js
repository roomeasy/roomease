var db = require('../db/db.js').db;
var _ = require('underscore');

exports.findEvents = function(houseId, cb) {

}

exports.addEvent = function(event, userId, dwellingId, cb){

  var queryString = "INSERT INTO calendar_events (id, title, type, end_at, author_id, dwelling_id) \
                     VALUES ("
      + "'" + event.id + "', "
      + "'" + event.title + ", "
      + "'" + event.type + ", "
      + "'" + event.end_at + ", "
      + "'" + event.userId + ", "
      + "'" + dwellingId  + "') RETURNING id;";

  db.query(queryString, function(err, results){
    console.log("Saving event to the database");
    err ? cb(err, null) : cb(null, results.rows);
  });
}