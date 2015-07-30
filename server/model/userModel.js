var db = require('../db/db.js').db;

// USERMODEL FILE. Contains utility functions for all the db user get/requests

exports.getByDwellingId = function(dwellingId, cb){

  // Returns a dwelling row with the provided dwellingId
  var queryString = "SELECT * FROM users WHERE dwelling_id = " + dwellingId + ";";
  db.query(queryString, function(err, results){
    console.log('Inside the users getByDwellingId Query');
    err ? cb(err, null) : cb(null, results.rows)
  });
},

exports.updatePoints = function(userId, points, cb) {
  var queryString = "UPDATE users SET points =" + points +
                    "WHERE id = " + userId + ";";
  db.query(queryString, function(err, results) {
    err ? cb(err, null) : cb(null, results);
  })
}

exports.addFacebookUser = function(user, cb){

  // addFacebookUser : insert a new user row. Called by Passport.js
  var queryString = "INSERT INTO users (facebook_id, picture, gender, points, username) VALUES ("
                     + "'" + user.facebook_id + "', "
                     + "'" + user.picture + "', "
                     + "'" + user.gender + "', "
                     + "'" + user.points + "',"
                     // + "'" + user.facebook_token + "', "
                     + "'" + user.username + "') RETURNING id;";

  console.log('queryString: ', queryString)
  db.query(queryString, function(err, results){
    console.log("Inside the POST Query callback");
    err ? cb(err, null) : cb(null, results.rows[0]);
  });
}

exports.updateDwellingId = function(userId, dwellingId, cb) {
  console.log(dwellingId);
  // Sets the dwelling_id of a provided user (w/ a provided userId)
  var queryString = "UPDATE users SET dwelling_id = " + dwellingId +
                    " WHERE id = " + userId + ";";
  db.query(queryString, function(err, results) {
    err ? cb(err, null) : cb(null, results);
  })
}

exports.findUserById = function(id, cb){

  // findUser : queries the database w/ the provided userId and returns the row
  console.log('Inside the users find query');
  var queryString = "SELECT * FROM users WHERE id = " + "'" + id + "';";
  db.query(queryString, function(err, results){
    // console.log('findUser: ', results)
    err ? cb(err, null) : cb(null, results.rows[0]);
  });
}

exports.findUserByFacebookId = function(id, cb){

  // findUserByFacebookId : provides a facebookId and returns the row
  console.log('Inside the users find query');
  var queryString = "SELECT * FROM users WHERE facebook_id = " + "'" + id + "';";
  db.query(queryString, function(err, results){
    // console.log('findUser: ', results)
    err ? cb(err, null) : cb(null, results.rows[0]);
  });
}

exports.findAllUsers = function(cb) {

  // find all users
  console.log('Inside the users find query');
  var queryString = "SELECT * FROM users;";
  db.query(queryString, function(err, results) {
    // console.log('findUser: ', results)
    err ? cb(err, null) : cb(null, results.rows);
  });
}

exports.insertProfile = function(profile, userId, cb) {

  // Initialize newly created profile with info from profile creation page
  console.log('Inside users insert profile variables');
  var queryString = "INSERT INTO users (age, location, smoker, vaper, pet) VALUES ("
                     + "'" + profile.age + "', "
                     + "'" + profile.location + "', "
                     + "'" + profile.smoker + "', "
                     + "'" + profile.vaper + "', "
                     + "'" + profile.pet + "') WHERE id = " + "'" + userId + "';";
}