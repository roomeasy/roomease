var db = require('../db.js').db;

// USERMODEL FILE. Contains utility functions for all the db user get/requests

// getUsers : fetch all the user rows
exports.getAll = function(cb){
  var queryString = "SELECT * FROM users;";
  db.query(queryString, function(err, results){
    console.log('Inside the users getAll Query');
    err ? cb(err, null) : cb(null, results.rows)
  });
}

// addUser : insert a new user row
exports.add = function(user, cb){
  var queryString = "INSERT INTO users (username, password, age, email) VALUES ("
                     + "'" + user.username + "', "
                     + "'" + user.password + "', "
                     + "" + user.age + ", "
                     + "'" + user.email + "') RETURNING id;";

  console.log('queryString: ', queryString)
  db.query(queryString, function(err, results){
    console.log("Inside the POST Query callback");
    err ? cb(err, null) : cb(null, results.rows[0]);
  });
}

// findUser : queries the database w/ the provided username and returns the result
exports.findUser = function(username, cb){
  console.log('Inside the users find query');
  var queryString = "SELECT * FROM users WHERE username = " + "'" + username + "';";
  db.query(queryString, function(err, results){
    // console.log('findUser: ', results)
    err ? cb(err, null) : cb(null, results.rows[0]);
  });
}
