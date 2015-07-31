var db = require('../db/db.js').db;
var _ = require('underscore');

//main adding functionality to add task
exports.add = function(task, dwellingId, cb){
  var queryString = "INSERT INTO tasks (name, dwelling_id, frequency, description, start_date) \
                     VALUES ($1, $2, $3, $4, $5) RETURNING id;";
  var queryValsArr = [
                      task.name,
                      dwellingId,
                      task.frequency,
                      task.description,
                      task.start_date
                     ];
  console.log('queryString in addTask(): ', queryString);
  db.query(queryString, queryValsArr, function(err, results){
    if(err) console.log(err);
    console.log("Inside the addTask query");
    err ? cb(err, null) : cb(null, results.rows[0]);
  });
};

exports.getAll = function(dwellingId, cb){
  var queryString = "SELECT * FROM tasks WHERE dwelling_id = $1;";

  db.query(queryString, [dwellingId], function(err, results){
    console.log("Inside the getAllTasks query");
    err ? cb(err, null) : cb(null, results.rows);
  });
};

exports.getAllInstances = function(dwellingId, cb){
  var queryString = "SELECT tasks.name, ti.user_id, tasks.description, ti.due_date, ti.completed, ti.id \
     FROM tasks, task_instances ti \
     WHERE ti.task_id = tasks.id \
     AND tasks.dwelling_id = $1;";

  db.query(queryString, [dwellingId], function(err, results){
    console.log("Inside the getAllTaskInstances query");
    err ? cb(err, null) : cb(null, results.rows);
  });
};

//means to load in only a certain users taskInstances
exports.getInstancesByUserId = function(userId, cb){
  var queryString = "SELECT tasks.name, ti.user_id, tasks.description, ti.due_date, ti.completed, ti.id \
     FROM tasks, task_instances ti \
     WHERE ti.task_id = tasks.id \
     AND ti.user_id = $1;";

  db.query(queryString, [userId], function (err, results){
    err ? cb(err, null) : cb(null, results.rows);
  });
};

//adds instances of certain tasks to be assigned
exports.addInstance = function(task_instance, taskId, cb) {
  var queryString = "INSERT INTO task_instances (due_date, completed, task_id) \
                     VALUES ($1, FALSE, $2);"; //task_instance.due_date needs to be properly formatted by caller

  db.query(queryString, [task_instance.due_date, taskId], function(err, results){
    console.log("Inside the addInstance query");
    err ? cb(err, null) : cb(null, results);
  });
};

// right now this function only marks a task_instance as completed
exports.updateInstance = function(task_instance, cb) {
  var queryString = "UPDATE task_instances \
                     SET completed = 'true' \
                     WHERE id = $1;";

  db.query(queryString, [task_instance.id], function(err, results){
    if(err) console.log(err);
    err ? cb(err, null) : cb(null, results);
  });
};

//used by delegateInstances to add a user_id to a task_instance
var assignInstance = exports.assignInstance =  function(task_instance, user, cb) {
  var queryString = "UPDATE task_instances \
                     SET user_id = $1 WHERE id = $2;";

  db.query(queryString, [user.id, task_instance.id], function(err, results){
    if(err) console.log(err);
    err ? cb(err, null) : cb(null, results);
  });
};

//shuffles users and taskInstances then assigns user_ids to task_instances
exports.delegateInstances = function(users, taskInstances, cb){
  var shufUsers = _.shuffle(users);
  var shufTaskInstances = _.shuffle(taskInstances.filter(function(instance){
    return instance.user_id === null;
  }));

  for (var i = 0; i < shufTaskInstances.length; i++) {
    var userIndex = i % shufUsers.length;
    assignInstance(shufTaskInstances[i], shufUsers[userIndex], function(err, results){
      if (err) { console.log("error : ", err); }
    });
  }
};

