angular.module('roomEase')

.controller('signinCtrl', function($scope){
  $scope.user = {username:"", password:""};

  $scope.submitLoginInfo = function () {
      // call factory post request
      // pass scope.user into the factory function
  }
})
