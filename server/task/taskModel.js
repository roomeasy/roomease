var db = require('../db.js').db;

exports.add = function(task, houseId, cb){
  var queryString = "INSERT INTO tasks (created_at, name, frequency, description) \
                     VALUES ("
                     + "NOW(), "
                     + "'" + task.name + "', "
                     + "'" + task.frequency + "', "
                     + "'" + task.description + "') RETURNING id;";
                     // + "" + houseId + "'); RETURNING id";

  console.log('queryString in addTask(): ', queryString);
  db.query(queryString, function(err, results){
    console.log("Inside the addTask query");
    err ? cb(err, null) : cb(null, results.rows[0]);
  })
}

exports.getAll = function(cb){
  var queryString = "SELECT * FROM tasks;";
  db.query(queryString, function(err, results){
    console.log("Inside the getAllTAsks query");
    err ? cb(err, null) : cb(null, results.rows);
  })
}

exports.findTask = function(taskName, cb){
  console.log('Inside the dwelling find query');
  var queryString = "SELECT * FROM tasks WHERE name = " + "'" + taskName + "';";
  db.query(queryString, function(err, results){
    err ? cb(err, null) : cb(null, results.rows[0]);
  });
}
