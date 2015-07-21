var db = require('../db.js').db;

exports.add = function(task, dwellingId, cb){
  var queryString = "INSERT INTO tasks (name, dwelling_id, frequency, description) \
                     VALUES ("
                     + "'" + task.name + "', "
                     +       dwellingId + ", "
                     +       task.frequency + ", "
                     + "'" + task.description + "') RETURNING id;";

  console.log('queryString in addTask(): ', queryString);
  db.query(queryString, function(err, results){
    console.log("Inside the addTask query");
    err ? cb(err, null) : cb(null, results.rows[0]);
  })
}

exports.getAll = function(dwellingId, cb){
  var queryString = "SELECT * FROM tasks WHERE dwelling_id = " + dwellingId + ";";
  db.query(queryString, function(err, results){
    console.log("Inside the getAllTasks query");
    err ? cb(err, null) : cb(null, results.rows);
  })
}

exports.getAllInstances = function(dwellingId, cb){
  var queryString = "SELECT tasks.name, tasks.description, due_date \
     FROM tasks, task_instances \
     WHERE task_instances.task_id = tasks.id \
     AND tasks.dwelling_id = " + dwellingId + ";";
     
  db.query(queryString, function(err, results){
    console.log("Inside the getAllTaskInstances query");
    console.log("err = ", err);
    console.log("results = ", results);
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
