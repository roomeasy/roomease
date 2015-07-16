var db = require('../db.js').db;

exports.getUsers = function(cb){
  var queryString = "SELECT * FROM users;";
  db.query(queryString, function(err, results){
    console.log('Inside the GET Query callback');
    err ? console.log(err) : cb(null, results)
  });
}

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
