// findRoomates :
exports.findRoommates = function(houseId, cb){
  var queryString = "SELECT * FROM users WHERE living_space_id = " + houseId;
  db.query(queryString, function(err, results){
    console.log('findRoomates: ', results)
    err ? console.log(err) : cb(null, results.rows);
  });
}
