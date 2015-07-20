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
    },
    {
      name: "Allen",
      image: "http://i.imgur.com/uYMnx1zb.jpg",
      location: "Nebraska"
    },
    {
      name: "Colin",
      image: "http://i.imgur.com/uYMnx1zb.jpg",
      location: "California"
    },
    {
      name: "Gilbert",
      image: "http://i.imgur.com/uYMnx1zb.jpg",
      location: "New York"
    },
    {
      name: "Johnny",
      image: "http://i.imgur.com/uYMnx1zb.jpg",
      location: "Utah"
    }
  ]

})