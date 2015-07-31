angular.module('roomEase')

    .factory('Auth', function($http) {

      var authAPI = {
        getAuthorization: function () {
          return $http({
            method: 'GET',
            url: '/auth'
          }).then(function (response) {
            return response.data;
          });
        }
      };
      return authAPI;

    });