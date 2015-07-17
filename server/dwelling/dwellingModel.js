var db = require('../db.js').db;


exports.findRoommates = function(houseId, cb){
  var queryString = "SELECT * FROM users WHERE dwelling_id = " + houseId;
  db.query(queryString, function(err, results){
    console.log('findRoomates: ', results)
    err ? cb(err, null) : cb(null, results.rows);
  });
}

exports.createDwelling = function(dwellingObj, cb){
  var queryString = "INSERT INTO dwellings (address, name) \
                     VALUES ("
                     + "'" + dwellingObj.address + "', "
                     + "'" + dwellingObj.name + "') "
                     + "RETURNING id;";
  db.query(queryString, function(err, results){
    console.log('createDwelling:', results)
    err ? cb(err, null) : cb(null, results.rows);
  })
}

exports.dwellingId = function(){

}
