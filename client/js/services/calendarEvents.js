angular.module('roomEase')

    .factory('eventAPIRequests', function($http){
      var returnObj = {
          createEvent : function(data){
            return $http({
              method: 'POST',
              url: '/events',
              data: data
            }).then(function(response){
              console.log('inside createEvent: ', response);
              return response.data;
            })
          },
          getEvents : function(){
            return $http({
              method: 'GET',
              url: '/events'
            }).then(function(response){
              console.log('inside getEvents : ', response);
              return response.data;
            })
          },

    }