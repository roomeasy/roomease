var db = require('../db.js').db;


// getUsers : fetch all the user rows
exports.getUsers = function(cb){
  var queryString = "SELECT * FROM users;";
  db.query(queryString, function(err, results){
    console.log('Inside the GET Query callback');
    err ? console.log(err) : cb(null, results)
  });
}

// addUser : insert a new user row
exports.addUser = function(req, cb){
  console.log('req.body: ', req.body);
  var queryString = "INSERT INTO users (username, password, age, email) VALUES ("
                     + "'" + req.body.username + "', "
                     + "'" + req.body.password + "', "
                     + "" + req.body.age + ", "
                     + "'" + req.body.email + "');";

  console.log('queryString: ', queryString)
  db.query(queryString, function(err, results){
    console.log("Inside the POST Query callback");
    err ? console.log(err) : cb(null, results);
  })
}

// findUser : queries the database w/ the provided username and returns the result
exports.findUser = function(username, cb){
  var queryString = "SELECT * FROM users WHERE username = " + "'" + username + "';";
  db.query(queryString, function(err, results){
    err ? console.log(err) : cb(null,results);
  });
}

// findRoomates :
exports.findRoommates = function(houseId, cb){
  // var queryString = "SELECT * FROM living"
}
