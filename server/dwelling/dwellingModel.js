var db = require('../db.js').db;


exports.findRoommates = function(houseId, cb){
  var queryString = "SELECT * FROM users WHERE dwelling_id = " + houseId;
  db.query(queryString, function(err, results){
    console.log('findRoomates: ', results)
    err ? cb(err, null) : cb(null, results.rows);
  });
}

exports.add = function(dwelling, cb){
  var queryString = "INSERT INTO dwellings (address, name) \
                     VALUES ("
                     + "'" + dwelling.address + "', "
                     + "'" + dwelling.name + "') "
                     + "RETURNING id;";
  db.query(queryString, function(err, results){
    err ? cb(err, null) : cb(null, results.rows[0]);
  })
}

exports.dwellingId = function(){

}


exports.getAll = function(cb){
  var queryString = "SELECT * FROM dwellings;";
  db.query(queryString, function(err, results){
    console.log('Inside the users getAll Query');
    err ? cb(err, null) : cb(null, results.rows)
  });
}

exports.findDwelling = function(dwellingName, cb){
  console.log('Inside the dwelling find query');
  var queryString = "SELECT * FROM dwellings WHERE name = " + "'" + dwellingName + "';";
  db.query(queryString, function(err, results){
    err ? cb(err, null) : cb(null, results.rows[0]);
  });
}
