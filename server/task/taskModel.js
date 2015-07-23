var db = require('../db.js').db;

exports.add = function(task, dwellingId, cb){
  var queryString = "INSERT INTO tasks (name, dwelling_id, frequency, description, start_date) \
                     VALUES ("
                     + "'" + task.name + "', "
                     +       dwellingId + ", "
                     +       task.frequency + ", "
                     + "'" + task.description + "', "
                     + "'" + task.start_date + "') RETURNING id;";

  console.log('queryString in addTask(): ', queryString);
  db.query(queryString, function(err, results){
    if(err) console.log(err);
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
  var queryString = "SELECT tasks.name, tasks.description, ti.due_date, ti.completed, ti.id \
     FROM tasks, task_instances ti \
     WHERE ti.task_id = tasks.id \
     AND tasks.dwelling_id = " + dwellingId + ";";
     
  db.query(queryString, function(err, results){
    console.log("Inside the getAllTaskInstances query");
    console.log("err = ", err);
    console.log("results = ", results);
    err ? cb(err, null) : cb(null, results.rows);
  })
}

exports.addInstance = function(task_instance, taskId, cb) {
  var queryString = "INSERT INTO task_instances (due_date, completed, task_id) \
                     VALUES ("
                     +  task_instance.due_date + ", " // this field needs to be properly formatted by the caller
                     +  "FALSE" + ", "
                     +  taskId + ");";

  db.query(queryString, function(err, results){
    console.log("Inside the addInstance query");
    if(err) {
      cb(err, null);
    } else {
      cb(null, results);
    }
  })
}

// right now this function only marks a task_instance as completed
exports.updateInstance = function(task_instance, cb) {
  var queryString = "UPDATE task_instances \
                     SET completed = 'true' \
                     WHERE id = " + task_instance.id + ";";


  db.query(queryString, function(err, results){
    if(err) console.log(err);
    err ? cb(err, null) : cb(null, results);
  });
}

exports.findTask = function(taskName, cb){
  console.log('Inside the dwelling find query');
  var queryString = "SELECT * FROM tasks WHERE name = " + "'" + taskName + "';";
  db.query(queryString, function(err, results){
    err ? cb(err, null) : cb(null, results.rows[0]);
  });
}
