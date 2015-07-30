angular.module('roomEase')

.controller('roomieSearchCtrl', function($scope){
  // $scope.lookingUsers = 
  Request.user.fetchAll().then(function(results){
    console.log("user fetchAll results:", results);
    users = results;
    for (var i = 0; i < results.length; i++) {
      $scope.lookingUsers.push({
        name     : results[i].username;
        image    : results[i].picture;
        location : 'placeholder'
        age      : 0
      })
    }
    
  })

})
