angular.module('roomEase')

.controller('dashboardCtrl', function ($scope, Request, $location){
  $scope.users = [];
  $scope.usersObj = {};
  $scope.dwellings = [];

  $scope.fetchUsers = function(){
    Request.user.fetch().then(function(results){
      console.log('user fetch results:', results);
      $scope.users = results;
      $scope.users.forEach(function (user) {
        $scope.usersObj[user.id] = user;
      })
    })
  }
  $scope.fetchUsers();

  $scope.fetchDwelling = function () {
    Request.dwelling.fetch().then(function(results) {
      console.log("dwelling fetch results ", results)
      $scope.dwelling = results;
    })
  }
  $scope.fetchDwelling();


  // this function is used to leave the current dwelling
  $scope.leaveDwelling = function(){
    var sendData = {
      dwellingId : 0
    }

    Request.dwelling.leave(sendData).then(function(data){
      console.log(sendData);
      $location.path('/createdwelling');
    });
  }


  $scope.runDelegator = function(){
    Request.task.delegate().then(function(results){
      console.log(results);
    });
  }
})
.controller('yourTasksCtrl', function($scope, Request) {
  $scope.userTasks = [];

  // this function is used to to limit taskInstances that are displayed to the user
  // in the 'Your Tasks' tab, we only want to show the user's soonest instance
  // of each task
  $scope.removeDups = function (taskInstances) {
    var dupFree = [];
    var seenSoFar = {};
    for (var i = 0; i < taskInstances.length; i++) {
      if (!seenSoFar[taskInstances[i].name] && taskInstances[i].completed !== true) {
        dupFree.push(taskInstances[i])
        seenSoFar[taskInstances[i].name] = true;
      }
    }
    return dupFree;
  }

  // used to mark a task as completed
  // sends a POST req to the server to update the database
  $scope.completeTask = function (task) {
    task.completed = true;
    Request.task_instances.update(task)
  }

  Request.task_instances.fetchMy().then(function(results){

    console.log('task_instance fetch results:', results);
    results.sort(function (a,b) {
        return moment(a.due_date).valueOf() - moment(b.due_date).valueOf()
    })
    $scope.userTaskInstances = $scope.removeDups(results);

    $scope.userTaskInstances.forEach(function(taskInstance) {
      var displayDate = moment(taskInstance.due_date).fromNow();
      taskInstance.displayDate = displayDate;
    })
  })
})
.controller('tasksHistoryCtrl', function($scope, Request) {
  $scope.allTasks = [];
  $scope.fetchAllTasks = function () {
    Request.task_instances.fetch().then(function(results) {
      $scope.allTasks = results;

      $scope.allTasks.forEach(function(taskInstance) {
        var displayDate = moment(taskInstance.due_date).fromNow();
        taskInstance.displayDate = displayDate;
        taskInstance.username = $scope.usersObj[taskInstance.user_id].username;
      })
      // sort the tasks by due date
      $scope.allTasks.sort(function (a,b) {
        return moment(a.due_date).valueOf() - moment(b.due_date).valueOf()
      })
    })
  }
  $scope.fetchAllTasks();
})
.controller('usersDisplayCtrl', function($scope) {

})
