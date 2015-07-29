var taskModel = require('../model/taskModel.js');
var userModel = require('../model/userModel.js');
var calendarModel = require('../model/calendarModel.js');
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
    // Called by POST '/tasks' endpoint
    // Adds a task using the data provided by the client taskSetup.html form

    //see if user is in a house
    if (req.user.dwelling_id === null) {
      res.send(400);
      return;
    }else {
      var dwelling_id = req.user.dwelling_id;
    }

    console.log('inside add task request handler');
    var task = { // Data Packaging
      name        : req.body.name,
      frequency   : req.body.frequency,
      description : req.body.description,
      start_date  : req.body.start_date
    };

    console.log(task);
    taskModel.add(task, dwelling_id, function(err, results){
      //Inside the callback function to the taskModel.add function
      responseHandler(err, results, res);
      var taskId = results.id;
      if(!task.start_date){
        var start_date = "'07-27-15'";
      }else{
        start_date = "'" + task.start_date + "'";
      }

      console.log(start_date);
      for(var i = 1; i < 3; i++) {
        // Create 2 instances of the task. 1 will be due further out, the other will be due on the date selected
        var task_instance = {
          due_date : "date " + start_date + " + " + i + " * interval " + intToInterval[task.frequency]
        }
        taskModel.addInstance(task_instance, taskId, function(err) {
          console.log(err);
        });
      }
    });
  },

  delegateTasks : function(req, res){
    // Called by the POST '/delegateTasks' endpoint (automatically on a task submit by the client)
    // 1. Find all task instances relative to the user's dwelling ID
      // 2. Finds all the users relative to the dwelling Id
        // 3. Calls the delegateInstances method feeding in the data from #1 and #2
    var dwellingId = req.user.dwelling_id;

    //getAll Instances
    taskModel.getAllInstances(dwellingId, function (err, taskInstances){
      userModel.getByDwellingId(dwellingId, function (err, users){
        taskModel.delegateInstances(users, taskInstances, function (err, results){
          // There should be a response handler here. You will have an error.
          // Do you like callback hell? ;) Ohh yea~~
        });
      });
    });
  },

  getAll : function(req, res){
    // Called by the GET '/tasks' endpoint
    // Gets all tasks based of current users dwelling_id
    var dwelling_id = req.user.dwelling_id;

    console.log('inside the get all task request handler');
    taskModel.getAll(dwelling_id, function(err, results){
      responseHandler(err, results, res);
    });
  },

  updateInstance : function(req, res) {
    // Called by the POST '/taskInstances' endpoint
    // Used to set a task instance completed setting to true
    console.log('inside the update instance request handler');
    taskModel.updateInstance(req.body, function(err, results){
      responseHandler(err, results, res);
    });
  },

  getAllInstances : function(req, res){
    // Called by GET '/taskInstances' endpoint
    // Gets all task_instances based of current users dwelling_id
    var dwelling_id = req.user.dwelling_id;

    console.log('inside the get all task_instance request handler');
    taskModel.getAllInstances(dwelling_id, function(err, results){
      responseHandler(err, results, res);
    });
  },

  getUserInstances : function(req, res){
    // Called by the GET '/myInstances' endpoint
    // Gets all the taskInstances by the user's id
    var userId = req.user.id;

    taskModel.getInstancesByUserId(userId, function(err, results){
      responseHandler(err, results, res);
    });
  },

  addCalendarEvent : function(req, res){
    var dwellingId = req.user.dwelling_id;
    var userId = req.user.id;

    var event = {
      id: req.body.id,
      title: req.body.title,
      type: req.body.eventType,
      end_at: req.body.endAt
    };

    calendarModel.addEvent(event, userId, dwellingId, function(err, results){
      responseHandler(err, results, res);
    })
  },

  getCalendarEventsByDwelling : function(req, res){
    var dwellingId = req.user.dwelling_id;

    calendarModel.fetchEventsByDwellingId(dwellingId, function(err, results){
      responseHandler(err, results, res);
    });
  },


};

