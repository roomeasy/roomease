angular.module('roomEase')

.controller('roomieInfoCtrl', function ($scope, Request, $location) {

  $scope.submitInfo = function (newRoomie) {

    Request.user.update(newRoomie);
    $location.path('/dashboard');
  }

})
