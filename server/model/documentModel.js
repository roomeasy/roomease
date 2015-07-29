var db = require('../db/db.js').db;

exports.add = function(documents, dwellingId, userId, cb){
  var queryString = "INSERT INTO documents (file_name, dwelling_id, user_id, filesize, type, description, data, paid) \
                     VALUES ("
                     + "'" + documents.file_name + "', "
                     +       dwellingId + ", "
                     +       userId + ", "
                     +       documents.filesize + ", "
                     + "'" + documents.type + "', "
                     + "'" + documents.description + "', "
                     +       documents.data + ","
                     +       documents.paid+"') RETURNING id;";

  console.log('queryString in addDocument(): ', queryString);
  db.query(queryString, function(err, results){
    if(err) console.log(err);
    console.log("Inside the addDocument query");
    err ? cb(err, null) : cb(null, results.rows[0]);
  });

  exports.getDocs = function(dwellingId, cb){
  var queryString = "SELECT * FROM documents WHERE dwelling_id = " + dwellingId + ";";
  db.query(queryString, function(err, results){
    console.log("Inside the getDocs query");
    err ? cb(err, null) : cb(null, results.rows);
  });
}

}