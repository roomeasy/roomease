angular.module('roomEase')

    .factory('Auth', function($http, $rootScope) {

      var authAPI = {
        getAuthorization: function () {
          return $http({
            method: 'GET',
            url: '/auth'
          }).then(function (response) {
            console.log(response.data.permission);
            return response.data.permission;
          });
        }
      };
      return authAPI;
    }
);