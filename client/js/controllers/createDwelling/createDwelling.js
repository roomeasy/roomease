angular.module('roomEase')

.controller('createDwelling', function ($scope, Request, $location){
  $scope.livingSpace = { name: "", address: "" };
  $scope.nameWarning = false;
  $scope.addressWarning = false;

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

  // User submit handler
  $scope.joinDwelling = function(){
    var sendData = {
      dwellingId : $scope.dwellingId,
      pin : $scope.pin
    }

    Request.dwelling.join(sendData).then(function(){});
    $location.path('/dashboard');
  }

  $scope.isNumber = function(number){
    if(number === undefined || number === ""){
      return false;// dont run the test
    }else{
      if(isNaN(parseInt(number))){
        return true;
      }else{
        // case where the number starts with a number but has some characters afterward
        return (''+parseInt(number)).length === number.length ? false : true;
      }
    }
  }
})
