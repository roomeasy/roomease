angular.module('roomEase')

.controller('createDwellingCtrl', function ($scope, Request, $location){
  $scope.livingSpace = { name: "", address: "" };
  $scope.nameWarning = false;
  $scope.addressWarning = false;
  $scope.failReason;

  // Join Dwelling Variables

  $scope.createDwelling = function(sendData) {
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


  $scope.joinDwelling = function(){
    //don't submit form if either field is invalid
    if(!$scope.isNumber($scope.pin) || !$scope.isNumber($scope.dwellingId)) return;

    var sendData = {
      dwellingId : $scope.dwellingId,
      pin : $scope.pin
    }

    Request.dwelling.join(sendData).then(function(data){
      console.log(data);
      if(data.joined) {
        $location.path('/dashboard');
      } else {
        $scope.failReason = data.reason;
        console.log(data.reason);
      }
    });
    
  }

  $scope.isNumber = function(str){
    if(str === undefined || str === ""){
      return true;
    }else{
      if(isNaN(parseInt(str))){
        return false;
      }else{
        // case where the input starts with a number but has some characters afterward
        return (''+parseInt(str)).length === str.length ? true : false;
      }
    }
  }

  $scope.hasFailed = function() {
    return !!$scope.failReason;
  }
})
