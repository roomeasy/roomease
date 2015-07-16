angular.module('roomEase')

.controller('houseTaskSetup', function($scope){
  $scope.tasks = [];

  $scope.task = {
    name: "",
    description: "",
    frequency: "Daily"
  }

  $scope.addTask = function () {
    $scope.tasks.push($scope.task)

    $scope.task = {
      name: "",
      description: "",
      frequency: "Daily"
    }
  }

})
