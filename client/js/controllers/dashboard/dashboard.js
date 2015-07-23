angular.module('roomEase')

.controller('dashboardCtrl', function($scope, Request){
  $scope.users = [];
  $scope.fetchUsers = function(){
    Request.user.fetch().then(function(results){
      console.log('user fetch results:', results);
      $scope.users = results;
    })
  }
  $scope.fetchUsers();
})
.controller('yourTasksCtrl', function($scope, Request) {
  $scope.userTasks = [];
  $scope.fetchYourTasks = function(){
    Request.task.fetch().then(function(results){
      console.log('task fetch results:', results);
      $scope.userTasks = results;
    })
  }
  $scope.fetchYourTasks();

  Request.task_instances.fetch().then(function(results){
    console.log('task_instance fetch results:', results);
    $scope.userTaskInstances = results;
    $scope.userTaskInstances.forEach(function(taskInstance) {
      var displayDate = moment(taskInstance.due_date).fromNow();
      taskInstance.displayDate = displayDate;
    })
  })
})
.controller('tasksHistoryCtrl', function($scope) {

})
.controller('usersDisplayCtrl', function($scope) {

})