var db = require('../db/db.js').db;

// USERMODEL FILE. Contains utility functions for all the db user get/requests

exports.getByDwellingId = function(dwellingId, cb){

  // Returns a dwelling row with the provided dwellingId
  var queryString = "SELECT * FROM users WHERE dwelling_id = $1;";
  db.query(queryString, [dwellingId], function(err, results){
    console.log('Inside the users getByDwellingId Query');
    err ? cb(err, null) : cb(null, results.rows)
  });
},

exports.updatePoints = function(userId, points, cb) {
  var queryString = "UPDATE users SET points = $1 WHERE id = $2;";
  db.query(queryString, [points, userId], function(err, results) {
    err ? cb(err, null) : cb(null, results);
  });
};

exports.addFacebookUser = function(user, cb){

  // addFacebookUser : insert a new user row. Called by Passport.js
  var queryString = "INSERT INTO users (facebook_id, picture, gender, points, username) VALUES ($1, $2, $3, $4, $5) RETURNING id;";
  var queryValsArr = [
                            user.facebook_id,
                            user.picture,
                            user.gender,
                            user.points,
                            user.username
                     ];
  console.log('queryString: ', queryString);
  db.query(queryString, queryValsArr, function(err, results){
    console.log("Inside the POST Query callback");
    err ? cb(err, null) : cb(null, results.rows[0]);
  });
};

exports.updateDwellingId = function(userId, dwellingId, cb) {
  // console.log(dwellingId);
  // Sets the dwelling_id of a provided user (w/ a provided userId)
  var queryString = "UPDATE users SET dwelling_id = $1 WHERE id = $2;";
  db.query(queryString, [dwellingId, userId], function(err, results) {
    err ? cb(err, null) : cb(null, results);
  });
};

exports.findUserById = function(id, cb){

  // findUser : queries the database w/ the provided userId and returns the row
  console.log('Inside the users find query');
  var queryString = "SELECT * FROM users WHERE id = $1;";
  db.query(queryString, [id], function(err, results){
    // console.log('findUser: ', results)
    err ? cb(err, null) : cb(null, results.rows[0]);
  });
};

exports.findUserByFacebookId = function(id, cb){

  // findUserByFacebookId : provides a facebookId and returns the row
  // console.log('Inside the users find query');
  var queryString = "SELECT * FROM users WHERE facebook_id = $1;";
  db.query(queryString, [id], function(err, results){
    // console.log('findUser: ', results)
    err ? cb(err, null) : cb(null, results.rows[0]);
  });
};

exports.findAllUsers = function(cb) {

  // find all users
  // console.log('Inside the users find query');
  var queryString = "SELECT * FROM users;";
  db.query(queryString, function(err, results) {
    // console.log('findUser: ', results)
    err ? cb(err, null) : cb(null, results.rows);
  });
};

exports.insertProfile = function(profile, userId, cb) {
  console.log('profile is', profile);
  console.log('userId is', userId);
  // Initialize newly created profile with info from profile creation page
  console.log('Inside users insert profile variables');
  var queryString = "UPDATE users SET age = $1, location = $2, smoker = $3, vaper = $4, pet = $5 WHERE id = $6;";
  var queryValsArr = [
                            profile.age,
                            profile.location,
                            profile.smoker,
                            profile.vaper,
                            profile.pet,
                            userId
                     ];
  console.log('Query string is', queryString);
  db.query(queryString, queryValsArr, function(err, results) {
    err ? cb(err, null) : cb(null, results.rows);
  });
};
