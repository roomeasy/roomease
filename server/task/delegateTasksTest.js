var taskModel = require('./taskModel');
var userModel = require('../user/userModel');





var dwellingId = 1;

//getAll Instances
taskModel.getAllInstances(dwellingId, function (err, taskInstances){
  userModel.getByDwellingId(dwellingId, function (err, users){
    taskModel.delegateInstances(users, taskInstances, function (err, results){

    })
  })
})





