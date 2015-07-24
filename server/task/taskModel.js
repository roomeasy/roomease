var db = require('../db.js').db;
var _ = require('underscore');

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
  var queryString = "SELECT tasks.name, ti.user_id, tasks.description, ti.due_date, ti.completed, ti.id \
     FROM tasks, task_instances ti \
     WHERE ti.task_id = tasks.id \
     AND tasks.dwelling_id = " + dwellingId + ";";

  db.query(queryString, function(err, results){
    console.log("Inside the getAllTaskInstances query");
    err ? cb(err, null) : cb(null, results.rows);
  })
}

exports.getInstancesByUserId = function(userId, cb){
  var queryString = "SELECT tasks.name, ti.user_id, tasks.description, ti.due_date, ti.completed, ti.id \
     FROM tasks, task_instances ti \
     WHERE ti.task_id = tasks.id \
     AND ti.user_id = " + userId + ";";
  db.query(queryString, function (err, results){
    err ? cb(err, null) : cb(null, results.rows);
  });
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

var assignInstance = exports.assignInstance =  function(task_instance, user, cb) {
  var queryString = "UPDATE task_instances \
                     SET user_id = " + user.id +
                     "WHERE id = " + task_instance.id + ";";


  db.query(queryString, function(err, results){
    if(err) console.log(err);
    err ? cb(err, null) : cb(null, results);
  });
}

exports.delegateInstances = function(users, taskInstances, cb){
  var users = _.shuffle(users);
  var taskInstances = _.shuffle(taskInstances.filter(function(instance){
    return instance.user_id === null;
  }));

  for (var i = 0; i < taskInstances.length; i++) {
    var userIndex = i % users.length;
    assignInstance(taskInstances[i], users[userIndex], function(err, results){
      if (err) {console.log("error : ", err)}

      console.log("results : ", results);
    });
  }
}

exports.findTask = function(taskName, cb){
  console.log('Inside the dwelling find query');
  var queryString = "SELECT * FROM tasks WHERE name = " + "'" + taskName + "';";
  db.query(queryString, function(err, results){
    err ? cb(err, null) : cb(null, results.rows[0]);
  });
}
