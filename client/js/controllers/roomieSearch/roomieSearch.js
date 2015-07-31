angular.module('roomEase')

.controller('roomieSearchCtrl', function ($scope, Request){
  $scope.lookingUsers = [];


  Request.user.fetchAll().then(function(results){
    
    console.log("user fetchAll results:", results);
    
    var users = results;
    console.log(results);
    for (var i = 0; i < users.length; i++) {
      $scope.lookingUsers.push({
        name     : users[i].username,
        image    : users[i].picture,
        location : users[i].location,
        age      : users[i].age
      });
    }
    
  });

});
