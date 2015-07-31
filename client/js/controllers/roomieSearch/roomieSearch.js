angular.module('roomEase')

.controller('roomieSearchCtrl', function($scope){
  $scope.lookingUsers = [
    {
      name: "Hadley",
      image: "https://pbs.twimg.com/profile_images/598565685548036096/tcsYDtn3_400x400.jpg",
      location: "Baton Rouge,LA",
      age: 30
    },
    {
      name: "Abhi",
      image: "https://avatars0.githubusercontent.com/u/8756983?v=3&s=460",
      location: "Bloomington,IL",
      age: 28
    },
    {
      name: "Allen",
      image: "https://avatars2.githubusercontent.com/u/11891171?v=3&s=400",
      location: "Omaha,NE",
      age: 26
    },
    {
      name: "Colin",
      image: "https://avatars2.githubusercontent.com/u/5582627?v=3&s=400",
      location: "Austin,TX",
      age: 22
    },
  ]

})
