angular.module('roomEase')

.controller('houseTaskSetup', function($scope){
  $scope.tasks = [];

  $scope.task = {
    name: "",
    description: "",
    frequency: "Daily"
  }

  $scope.addTask = function (sendData) {
    console.log(sendData);
    debugger;
    $scope.tasks.push($scope.task)

    $scope.task = {
      name: "",
      description: "",
      frequency: "Daily"
    }
  }

})
