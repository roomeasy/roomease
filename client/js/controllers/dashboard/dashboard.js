angular.module('roomEase')

.controller('dashboardCtrl', function($scope){
  $scope.user = "Abhi"

  $scope.tasks = [
    {
      name: "Wash Dishes",
      frequency: "Daily",
      description: "Pre wash!!",
      user: "Abhi"
    },
    {
      name: "Mow lawn",
      frequency: "Weekly",
      description: "make grass shorter",
      user: "Abhi"
    },
    {
      name: "Brush teeth",
      frequency: "Daily",
      description: "come on, bro",
      user: "Hadley"
    }
  ]

  $scope.users = [
    {
      name: "Hadley",
      image: "https://pbs.twimg.com/profile_images/598565685548036096/tcsYDtn3_400x400.jpg"
    },
    {
      name: "Abhi",
      image: "http://i.imgur.com/uYMnx1zb.jpg"
    }
  ]

  $scope.userTasks = $scope.tasks.filter(function(task) {
    return task.user === $scope.user;
  })
})
.controller('yourTasksCtrl', function($scope) {

})
.controller('tasksHistoryCtrl', function($scope) {

})
.controller('usersDisplayCtrl', function($scope) {

})