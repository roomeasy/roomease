angular.module('roomEase')

.controller('dashboardCtrl', function($scope){
  $scope.tasks = [
    {
      name: "Wash Dishes",
      frequency: "Daily",
      description: "Pre wash!!"
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
})
.controller('yourTasksCtrl', function($scope) {

})
.controller('tasksHistoryCtrl', function($scope) {

})
.controller('usersDisplayCtrl', function($scope) {

})