angular.module('roomEase')

    .factory('Auth', function($http) {

      var authAPI = {
        getAuthorization: function () {
          return $http({
            method: 'GET',
            url: '/auth'
          }).then(function (response) {
            if (response.permission === "false"){
              return false;
            } else {
              return true;
            }
          });
        }
      };
      return authAPI;
    });