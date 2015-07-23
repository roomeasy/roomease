var userModel = require('./user/userModel.js');
var dwellingModel = require('./dwelling/dwellingModel.js');
var taskModel = require('./task/taskModel.js');
var request = require('request');

// freqToInt : {
        //   Daily : 1,
        //   Weekly : 2,
        //   Monthly : 3
        // }

// helper for converting frequency integer to number of days
// between instances of the task
var intToInterval = {
  1 : "'1 day'",
  2 : "'7 days'",
  3 : "'1 month'"
}

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
    },

    joinDwelling : function(req, res){

      var submittedDwellingId = req.body.dwellingId;
      var submittedPin = req.body.pin;

      //authenticate dwelling with PIN number
      dwellingModel.getPinByDwellingId(submittedDwellingId, function (err, pin){
        if (pin === submittedPin) {
          userModel.updateDwellingId(req.user.id, submittedDwellingId, function(){
            if (err) {console.log(err)}
            res.send("Congrats! you've joined a dwelling!");
          })
        } else {
          res.send("Invalid PIN");
          return;
        }
      })
    },
  },

  tasks: {
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
      };

      taskModel.add(task, dwelling_id, function(err, results){  // is this correct?
        responseHandler(err, results, res);
        var taskId = results.id;
        var start_date = task.start_date || "'07-27-15'";
        for(var i = 0; i < 4; i++) {
          var task_instance = {
            due_date : "date " + start_date + " + " + i + " * interval " + intToInterval[task.frequency]
          }
          taskModel.addInstance(task_instance, taskId, function() {});
          // should the callback be doing anything?
        }
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

    updateInstance : function(req, res) {
      console.log('inside the update instance request handler');
      taskModel.updateInstance(req.body);
    },

    getAllInstances : function(req, res){
      //gets all task_instances based of current users dwelling_id
      var dwelling_id = req.user.dwelling_id;

      console.log('inside the get all task_instance request handler');
      taskModel.getAllInstances(dwelling_id, function(err, results){
        responseHandler(err, results, res);
      });
    },

    find : function(req, res){
      console.log('inside the dwelling find request handler');
      var taskname = req.params.taskname;
      console.log(taskname);
      taskModel.findTask(taskname, function (err, results){
        console.log('inside response handler: ', results);
        responseHandler(err, results, res);
      });
    }
  },

  dwellings: {
    add: function(req, res){
      console.log('inside dwelling add request handler');

      //data packaging
      var dwelling = {
        name    : req.body.name,
        address : req.body.address,
      }

      dwellingModel.add(dwelling, function (err, results){
        userModel.updateDwellingId(req.user.id, results.id, function (err, results) {
          responseHandler(err, results, res);
        });
      });
    },

    inviteRoomie : function(req, res){

      //gets dwellingId from logged in user.
      var dwelling_id = req.user.dwelling_id;

      //roomies should come through as one obj on the req.body
      // Data Packaging
      var roomie = {
        name        : req.body.name,
        phoneNumber   : req.body.phoneNumber,
      };

      //query dwelling database for unique PIN
      dwellingModel.getPinByDwellingId(dwelling_id, function (err, pin){

        //composes the actual text message string
        var message = "Hello, " + roomie.name + "! \n \n"
                      + "Your friend " + req.user.username + " has invited you to join RoomEase! "
                      + "Go to localhost:3000 to get started. \n \n"
                      + "Your Dwelling Id is : " + dwelling_id + "\n"
                      + "Your Unique PIN is  : " + pin + "\n \n"
                      + "See you soon!";

        //data packaging
        var data = {
          number  : roomie.phoneNumber,
          message : message,
        }

        //send post request using request node module to textBelt,
        //our free janky texting service.
        request.post({
          url: 'http://textbelt.com/text',
          formData : data,
        }, function (err, httpResponse, body){

          if (err) { console.log('failed: ', err); }
        });
      });
    },

    getAll: function(req, res){
      dwellingModel.getAll(function (err, results){
        responseHandler(err, results, res);
      })
    },

    find : function(req, res){
      console.log('inside the dwelling find request handler');
      var dwellingName = req.params.dwellingname;
      console.log(dwellingName);
      dwellingModel.findDwelling(dwellingName, function (err, results){
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
