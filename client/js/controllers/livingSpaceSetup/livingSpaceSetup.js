angular.module('roomEase')

.controller('livingSpaceSetup', function($scope){
  $scope.livingSpace = {name:"", address:""};

  $scope.createLivingSpace = function() {
    console.log($scope.livingSpace);
  }
})
