angular.module('roomEase')

.controller('roomieSearch', function($scope){
  $scope.lookingUsers = [
    {
      name: "Hadley",
      image: "https://pbs.twimg.com/profile_images/598565685548036096/tcsYDtn3_400x400.jpg",
      location: "Austin"
    },
    {
      name: "Abhi",
      image: "http://i.imgur.com/uYMnx1zb.jpg",
      location: "Mexico"
    }
  ]

})