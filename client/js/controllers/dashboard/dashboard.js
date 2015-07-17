angular.module('roomEase')

.controller('dashboardCtrl', function($scope){
  $scope.tasks = [
    {
      name: "Wash Dishes",
      frequency: "Daily",
      description: "Pre wash!!"
    }
  ]
})
