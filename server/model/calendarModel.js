var db = require('../db/db.js').db;
var _ = require('underscore');

exports.fetchAllEvents = function(houseId, cb) {

};

exports.addEvent = function(event, userId, dwellingId, cb){

  var queryString = "INSERT INTO calendar_events (title, type, start_at, end_at, author_id, dwelling_id) \
                     VALUES ("
      + "'" + event.title + "', "
      + "'" + event.type + "', "
      + "'" + event.start_at + "', "
      + "'" + event.end_at + "', "
      + "'" + userId + "', "
      + "'" + dwellingId  + "') RETURNING id;";

  db.query(queryString, function(err, results){
    console.log("Saving event to the database");
    err ? cb(err, null) : cb(null, results.rows);
  });
};

exports.updateEvent = function(event, userId, dwellingId, cb){

  var queryString = "UPDATE calendar_events SET "
    + "title='" + event.title + "', "
    + "type='" + event.type + "', "
    + "start_at='" + event.start_at + "', "
    + "end_at='" + event.end_at + "' "
    + "WHERE " 
    + "id='" + event.id + "';";

    db.query(queryString, function(err, results){
    console.log("Updating event in the database");
    err ? cb(err, null) : cb(null, results.rows);
  });
};

exports.deleteEvent = function(event, userId, dwelllingId, cb){
  console.log('event from inside deleteEvent: ', event);

  var queryString = "DELETE FROM calendar_events "
    + "WHERE " 
    + "id='" + event.id + "';";

    db.query(queryString, function(err, results){
    console.log("Deleting event from the database");
    err ? cb(err, null) : cb(null, results.rows);
  });
};

exports.fetchEventsByDwellingId = function(dwellingId, cb){

  var queryString = "SELECT * FROM calendar_events WHERE dwelling_id = " + dwellingId + ";";
  db.query(queryString, function(err, results){
    if(err) {
      console.log(err);
    } else {
      if(!results.rows[0]) {
        cb("Invalid dwelling ID", null);
      }else{
        err ? cb(err, null) : cb(null, results.rows);
      }
    }
  });
};
