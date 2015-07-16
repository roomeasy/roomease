angular.module('roomEase')

.controller('houseTaskSetup', function($scope){
  $scope.tasks = [{
    name: "",
    description: "",
    frequency: "Daily"
  }];

})
