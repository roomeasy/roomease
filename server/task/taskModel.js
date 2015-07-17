var db = require('../db.js').db;

exports.add = function(task, houseId, cb){
  // INPUT: assumes that we are passing in the req.body object which is known as "taskaddTask()

  // convert the frequency to an integer before continuing to the queryString

  var queryString = "INSERT INTO tasks (name, frequency, description, dwelling_id) \
                     VALUES ("
                     + "'" + task.name + "', "
                     + "'" + task.frequency + "', "
                     + "'" + task.description + "', "
                     + "" + houseId + "'); RETURNING id";

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
