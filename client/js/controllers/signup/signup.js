angular.module('roomEase')

.controller('signupCtrl', function ($scope, Users) {
  $scope.user = {
    username: "",
    email: "",
    password: "",
    age: ""
  }

  $scope.submitSignupInfo = function () {
    Users.addUser($scope.user)
  }

})
