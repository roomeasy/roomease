var db = require('../db/db.js').db;


exports.findRoommates = function(houseId, cb){

  // Finds all roommates from a provided houseId
  var queryString = "SELECT * FROM users WHERE dwelling_id = " + houseId;
  db.query(queryString, function(err, results){
    console.log('findRoomates: ', results);
    err ? cb(err, null) : cb(null, results.rows);
  });
};

exports.add = function(dwelling, cb){

  // Adds a dwelling to the database
  // Generates a unique pin for the database
  function generatePIN(){
    var num = 0;
    for (var i = 0; i < 6; i++){
      num = 10 * num + (1 + Math.floor(9 * Math.random()));
    }
    return num;
  }

  var queryString = "INSERT INTO dwellings (address, pin, name) VALUES ($1, $2, $3) RETURNING id";
  var queryValsArr = ["'" + dwelling.address + "'",
                            generatePIN(),
                      "'" + dwelling.name + "'"
                     ];
  db.query(queryString, queryValsArr, function(err, results){
    err ? cb(err, null) : cb(null, results.rows[0]);
  });
};

exports.getPinByDwellingId = function(dwellingId, cb){

  // Selects the pin for the input dwellingId
  var queryString = "SELECT pin FROM dwellings WHERE id = " + dwellingId + ";";
  db.query(queryString, function(err, results){
    // console.log(results.rows);
    if(err) {
      console.log(err);
    } else {
      if(!results.rows[0]) {
        cb("Invalid dwelling ID", null);
      }else{
        err ? cb(err, null) : cb(null, results.rows[0].pin)
      }
    }
  });
};

exports.getById = function(dwellingId, cb){

  // Gets the dwelling row information from the provided dwellingId
  var queryString = "SELECT * FROM dwellings WHERE id = " + dwellingId + ";";
  db.query(queryString, function(err, results){
    console.log('Inside the dwellings getById Query');
    err ? cb(err, null) : cb(null, results.rows[0]);
  });
};