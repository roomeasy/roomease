angular.module('roomEase')

.controller('houseTaskSetup', function($scope){
  $scope.tasks = [{
    name: "",
    description: "",
    frequency: "Daily"
  }];

  $scope.newTask = function () {
    $scope.tasks.push({
      name: "",
      description: "",
      frequency: "Daily"
    })
  }

})
