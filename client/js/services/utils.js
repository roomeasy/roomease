angular.module('roomEase')

.factory('Users', function($http) {

  var getUsers = function() {
    return $http({
      method: 'GET',
      url: '/users'
    })
    .then(function(resp) {
      return resp.data;
    })
  };

  var addUser = function(user) {
    return $http({
      method: 'POST',
      url: '/users',
      data: user
    })
  };

  return {
    getUsers: getUsers,
    addUser: addUser
  }

})