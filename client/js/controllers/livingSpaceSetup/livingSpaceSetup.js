angular.module('roomEase')

.controller('livingSpaceSetup', function ($scope, Request){
  $scope.livingSpace = { name: "", address: "" };

  $scope.createLivingSpace = function(sendData) {
    Request.dwelling.create(sendData).then(function(data){
      console.log('data inside create dwelling cb : ', data);
    });
  }
})
