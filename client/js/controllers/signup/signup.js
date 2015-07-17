angular.module('roomEase')

.controller('signupCtrl', function ($scope, $location, Users) {
  $scope.user = {
    username: "",
    email: "",
    password: "",
    age: ""
  }

  $scope.submitSignupInfo = function () {
    Users.addUser($scope.user)
    .then(function() {
      $location.path('/createLivingSpace');
    })
  }

})
