var db = require('../db.js').db;


exports.findRoommates = function(houseId, cb){
  var queryString = "SELECT * FROM users WHERE dwelling_id = " + houseId;
  db.query(queryString, function(err, results){
    console.log('findRoomates: ', results)
    err ? cb(err, null) : cb(null, results.rows);
  });
}

exports.add = function(dwelling, cb){

  function generatePIN(){
    var num = 0;
    for (var i = 0; i < 6; i++){
      num = 10 * num + (1 + Math.floor(9 * Math.random()));
    }
    return num;
  }

  var queryString = "INSERT INTO dwellings (address, pin, name) \
                     VALUES ("
                     + "'" + dwelling.address + "', "
                     +       generatePIN() + ", "
                     + "'" + dwelling.name + "') "
                     + "RETURNING id;";
  db.query(queryString, function(err, results){
    err ? cb(err, null) : cb(null, results.rows[0]);
  })
}

exports.getPinByDwellingId = function(dwellingId, cb){
  var queryString = "SELECT pin FROM dwellings WHERE id = " + dwellingId + ";";
  db.query(queryString, function(err, results){
    err ? cb(err, null) : cb(null, results.rows[0].pin)
  })
}

exports.authenticateDwelling = function(dwellingId, pin, cb){
  var queryString = "SELECT pin FROM dwellings WHERE dwelling_id = " + dwellingId + ";";
  db.query(queryString, function (err, results){
    console.log()
  })
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
