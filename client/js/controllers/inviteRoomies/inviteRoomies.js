angular.module('roomEase')

.controller('inviteRoomiesCtrl', function ($scope, Request) {
  $scope.roomies = [];

  $scope.roomie = {
    name: "",
    phoneNumber: ""
  }

  $scope.addRoomie = function (newRoomie) {
    //don't add the roomie if the phone number is invalid
    if($scope.phoneWarning) return;

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

  $scope.validatePhone = function () {
    if ( /\d{10}/.test($scope.roomie.phoneNumber) && $scope.roomie.phoneNumber.length === 10) {
      $scope.phoneWarning = false;
    } else {
      $scope.phoneWarning = true;
    }
  }
})
