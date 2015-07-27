var taskModel = require('../model/taskModel.js');
var userModel = require('../model/userModel.js');
var responseHandler = require('./responseHandler.js');


// helper for converting frequency integer to number of days
// between instances of the task
var intToInterval = {
  1 : "'1 day'",
  2 : "'7 days'",
  3 : "'1 month'"
}

module.exports = {
  add: function(req, res){
    //see if user is in a house
    if (req.user.dwelling_id === null) {
      res.send(400);
      return;
    }
    else {
      var dwelling_id = req.user.dwelling_id
    }

    console.log('inside add task request handler');
    var task = { // Data Packaging
      name        : req.body.name,
      frequency   : req.body.frequency,
      description : req.body.description,
      start_date : req.body.start_date
    };

    console.log(task);
    taskModel.add(task, dwelling_id, function(err, results){  // is this correct?
      responseHandler(err, results, res);
      var taskId = results.id;
      if(!task.start_date){
        var start_date = "'07-27-15'";
      }else{
        start_date = "'" + task.start_date + "'";
      }

      console.log(start_date);
      for(var i = 1; i < 3; i++) {
        var task_instance = {
          due_date : "date " + start_date + " + " + i + " * interval " + intToInterval[task.frequency]
        }
        taskModel.addInstance(task_instance, taskId, function(err) {
          console.log(err);
        });
        // should the callback be doing anything?
      }
    });
  },

  delegateTasks : function(req, res){
    var dwellingId = req.user.dwelling_id;

    //getAll Instances
    taskModel.getAllInstances(dwellingId, function (err, taskInstances){
      userModel.getByDwellingId(dwellingId, function (err, users){
        taskModel.delegateInstances(users, taskInstances, function (err, results){

        })
      })
    })

  },

  getAll : function(req, res){
    //gets all tasks based of current users dwelling_id
    var dwelling_id = req.user.dwelling_id;

    console.log('inside the get all task request handler');
    taskModel.getAll(dwelling_id, function(err, results){
      responseHandler(err, results, res);
    });
  },

  updateInstance : function(req, res) {
    console.log('inside the update instance request handler');
    taskModel.updateInstance(req.body, function(err, results){
      responseHandler(err, results, res);
    });
  },

  getAllInstances : function(req, res){
    //gets all task_instances based of current users dwelling_id
    var dwelling_id = req.user.dwelling_id;

    console.log('inside the get all task_instance request handler');
    taskModel.getAllInstances(dwelling_id, function(err, results){
      responseHandler(err, results, res);
    });
  },

  getUserInstances : function(req, res){
    var userId = req.user.id;

    taskModel.getInstancesByUserId(userId, function(err, results){
      responseHandler(err, results, res);
    });
  },
}