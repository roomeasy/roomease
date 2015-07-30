angular.module('roomEase')

.controller('roomieInfoCtrl', function ($scope, Request) {

  $scope.submitInfo = function (newRoomie) {
    Request.user.update(newRoomie);
  }

})
