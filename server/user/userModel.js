var db = require('../db.js').db;

exports.getUsers = function(cb){
  var queryString = "SELECT * FROM users;";
  db.query(queryString, function(err, results){
    console.log('Inside the GET Query callback');
    if(err)
      console.log(err)
    else
      cb(null, results);
  });
}
