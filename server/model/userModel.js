var db = require('../db/db.js').db;

// USERMODEL FILE. Contains utility functions for all the db user get/requests

exports.getByDwellingId = function(dwellingId, cb){

  // Returns a dwelling row with the provided dwellingId
  var queryString = "SELECT * FROM users WHERE dwelling_id = " + dwellingId + ";";
  db.query(queryString, function(err, results){
    console.log('Inside the users getByDwellingId Query');
    err ? cb(err, null) : cb(null, results.rows)
  });
}

exports.addUser = function(user, cb){
   console.log("inside addUser", user);
  // addFacebookUser : insert a new user row. Called by Passport.js
  var queryString = "INSERT INTO users (twitter_id, google_id, facebook_id, picture, gender, username) VALUES ("
                     + "'" + user.twitter_id + "', "
                     + "'" + user.google_id + "', "
                     + "'" + user.facebook_id + "', "
                     + "'" + user.picture + "', "
                     + "'" + user.gender + "', "
                     // + "'" + user.facebook_token + "', "
                     + "'" + user.username + "') RETURNING id;";

  console.log('queryString: ', queryString)
  db.query(queryString, function(err, results){
    console.log("Inside the POST Query callback");
    console.log(err, results);
    err ? cb(err, null) : cb(null, results.rows[0]);
  });
};

exports.updateDwellingId = function(userId, dwellingId, cb) {

  // Sets the dwelling_id of a provided user (w/ a provided userId)
  var queryString = "UPDATE users SET dwelling_id = " + dwellingId +
                    " WHERE id = " + userId + ";";
  db.query(queryString, function(err, results) {
    err ? cb(err, null) : cb(null, results);
  })
};

exports.findUserById = function(id, cb){

  // findUser : queries the database w/ the provided userId and returns the row
  console.log('Inside the users find query');
  var queryString = "SELECT * FROM users WHERE id = " + "'" + id + "';";
  db.query(queryString, function(err, results){
    console.log('findUser: ', err, results)
    err ? cb(err, null) : cb(null, results.rows[0]);
  });
};

exports.findUserByGithubId = function(id, cb){

  console.log('Inside the users find query');
  var queryString = "SELECT * FROM users WHERE github_id = " + "'" + id + "';";
  db.query(queryString, function(err, results){
    // console.log('findUser: ', results)
    err ? cb(err, null) : cb(null, results.rows[0]);
  });
};

exports.findUserByGoogleId = function(id, cb){

  // findUserByFacebookId : provides a facebookId and returns the row
  console.log('Inside the users find query');
  var queryString = "SELECT * FROM users WHERE google_id = " + "'" + id + "';";
  db.query(queryString, function(err, results){
    // console.log('findUser: ', results)
    err ? cb(err, null) : cb(null, results.rows[0]);
  });
};

exports.findUserByTwitterId = function(id, cb){

  // findUserByFacebookId : provides a facebookId and returns the row
  console.log('Inside the users find query');
  var queryString = "SELECT * FROM users WHERE twitter_id = " + "'" + id + "';";
  db.query(queryString, function(err, results){
    // console.log('findUser: ', results)
    err ? cb(err, null) : cb(null, results.rows[0]);
  });
};


exports.findUserByFacebookId = function(id, cb){

  // findUserByFacebookId : provides a facebookId and returns the row
  console.log('Inside the users find query');
  var queryString = "SELECT * FROM users WHERE facebook_id = " + "'" + id + "';";
  db.query(queryString, function(err, results){
    // console.log('findUser: ', results)
    err ? cb(err, null) : cb(null, results.rows[0]);
  });
};