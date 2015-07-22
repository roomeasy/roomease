angular.module('roomEase')

.controller('taskSetup', function($scope, $location, Request){
  $scope.tasks = [];

  $scope.task = {
    name: "",
    description: "",
    frequency: "Daily"
  }

  $scope.warning = false;

  $scope.addTask = function (newTask) {
    $scope.tasks.push(newTask);

    // reset the view
    $scope.task = {
      name: "",
      description: "",
      frequency: "Daily"
    }
    $scope.warning = false; // reset the warning
  }

  $scope.deleteTask = function(tasks, index){
    tasks.splice(index, 1);
  } 

  $scope.submit = function(tasks){
    if(tasks.length === 0){
      $scope.warning = true; // trigger the warning
      console.log("Please add a task first");
      return;
    }
    // data packaging for sending
    var sendData = tasks.slice(); // will be an array of tasks
    sendData = sendData.forEach(function(task){
      var taskStr = task['frequency'];  // Data packaging (converting the freq str to an int)
      task["frequency"] = Request.freqToInt[taskStr]; 

      // submit it 
      Request.task.create(task).then(function(results){
        console.log('results inside the response thing :', results);
      });
      $scope.tasks = [];
    });

    $location.path('/dashboard'); // not sure how this will work with async requests


  }
})
