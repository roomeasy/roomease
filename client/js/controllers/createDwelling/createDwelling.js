angular.module('roomEase')

.controller('dwellingSetup', function ($scope, Request, $location){
  $scope.livingSpace = { name: "", address: "" };
  $scope.nameWarning = false;
  $scope.addressWarning = false;

  $scope.createdwelling = function(sendData) {
    if($scope.livingSpace.name.trim() === "" || $scope.livingSpace.address.trim() === ""){
      console.log("Please address the warnings");
      return;
    }
    Request.dwelling.create(sendData).then(function(data){
      console.log('data inside create dwelling cb : ', data);
      $location.path('/tasksetup'); 
    });
  }

  $scope.nameValidate = function(){
    if($scope.livingSpace.name.trim() === ""){
      $scope.nameWarning = true;
    }else{
      $scope.nameWarning = false;
    }
  }

  $scope.addressValidate = function(){
    if($scope.livingSpace.address.trim() === ""){
      $scope.addressWarning = true;
    }else{
      $scope.addressWarning = false;
    }

  }
})
