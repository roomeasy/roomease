angular.module('roomEase')

.controller('inviteRoomiesCtrl', function ($scope, Request) {
  $scope.roomies = [];

  $scope.roomie = {
    name: "",
    phoneNumber: ""
  }

  $scope.addRoomie = function (newRoomie) {
    $scope.roomies.push(newRoomie);

    // reset the view
    $scope.roomie = {
      name: "",
      phoneNumber: ""
    }
  }

  $scope.deleteRoomie = function (roomies, index) {
    roomies.splice(index, 1);
  }
  $scope.submit = function (roomies) {
    var sendData = roomies.slice();
    sendData = sendData.forEach(function(roomie) {

      Request.roomie.invite(roomie).then(function(results){
        console.log('results: ', results);
      });
    });
    $scope.roomies = [];
  }
})
