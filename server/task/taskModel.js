var db = require('../db.js').db;

exports.addTask = function(taskObj, houseId, cb){
  // INPUT: assumes that we are passing in the req.body object which is known as "taskObj" in the scope of addTask()

  // convert the frequency to an integer before continuing to the queryString

  var queryString = "INSERT INTO tasks (name, frequency, description, dwelling_id) \
                     VALUES ("
                     + "'" + taskObj.name + "', "
                     + "'" + taskObj.frequency + "', "
                     + "'" + taskObj.description + "', "
                     + "" + houseId + "');";

  console.log('queryString in addTask(): ', queryString);
  db.query(queryString, function(err, results){
    console.log("Inside the addTask Query callback");
    err ? console.log(err) : cb(null, results.rows);
  })
}
