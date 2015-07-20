var userModel = require('./user/userModel.js');
var dwellingModel = require('./dwelling/dwellingModel.js');
var taskModel = require('./task/taskModel.js');

module.exports = {
  users: {
    add : function(req, res){
      console.log('Add User Request Handler...');
      var user = {  // Data Packaging
        username: req.body.username,
        password: req.body.password,
        age     : req.body.age,
        email   : req.body.email,
      };
      userModel.add(user, function(err, insertedUserId){
        responseHandler(err, insertedUserId, res);
      });
    },
    getAll : function(req, res){
      userModel.getAll(function(err, results){
        responseHandler(err, results, res);
      });
    },
    find : function(req, res){
      console.log('inside the user find request handler');
      var username = req.params.username;
      console.log(username)
      userModel.findUser(username, function(err, results){
        console.log('inside response handler: ', results);
        responseHandler(err, results, res);
      });
    }
  },

  tasks: {
    add: function(req, res){
      //see if user is in a house
      if (req.user.dwelling_id === null) {
        res.send(400);
      }
      else {
        var dwelling_id = req.user.dwelling_id
      }

      console.log('inside add task request handler');
      var task = { // Data Packaging
        name        : req.body.name,
        frequency   : req.body.frequency,
        description : req.body.description,
      };

      taskModel.add(task, dwelling_id, function(err, results){  // is this correct?
        responseHandler(err, results, res);
      });
    },

    getAll : function(req, res){
      //gets all tasks based of current users dwelling_id
      var dwelling_id = req.user.dwelling_id;

      console.log('inside the get all task request handler');
      taskModel.getAll(dwelling_id, function(err, results){
        responseHandler(err, results, res);
      });
    },

    find : function(req, res){
      console.log('inside the dwelling find request handler');
      var taskname = req.params.taskname;
      console.log(taskname);
      taskModel.findTask(taskname, function(err, results){
        console.log('inside response handler: ', results);
        responseHandler(err, results, res);
      });
    }
  },

  dwellings: {
    add: function(req, res){
      console.log('inside dwelling add request handler');
      var dwelling = { // data packaging
        name    : req.body.name,
        address : req.body.address,
      }
      console.log(req.body);
      dwellingModel.add(dwelling, function(err, results){
        responseHandler(err, results, res);
      });
    },

    getAll: function(req, res){
      dwellingModel.getAll(function(err, results){
        responseHandler(err, results, res);
      })
    },

    find : function(req, res){
      console.log('inside the dwelling find request handler');
      var dwellingName = req.params.dwellingname;
      console.log(dwellingName);
      dwellingModel.findDwelling(dwellingName, function(err, results){
        console.log('inside response handler: ', results);
        responseHandler(err, results, res);
      });
    }
  }
}


// Utility function for user response handling
function responseHandler(err, resultsData, res){
  if(err) res.end(JSON.stringify(err));
  else{
    res.send(resultsData);
    res.end();
  }
}
