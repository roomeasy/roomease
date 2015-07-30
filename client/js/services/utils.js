angular.module('roomEase')

.factory('Request', function($http){
  var returnObj = {
    dwelling : {
      create : function(data){
        return $http({
              method: 'POST',
              url: '/dwellings',
              data: data
        }).then(function(response){
          console.log('inside dwelling create factory call : ', response);
          return response.data;
        })
      },
      join : function(data){
        return $http({
              method: 'POST',
              url: '/joinDwelling',
              data: data
        }).then(function(response){
          console.log('inside join dwelling create factory call : ', response);
          return response.data;
        })
      },
      fetch : function () {
        return $http({
          method: 'GET',
          url: '/dwellings',
        }).then(function(response) {
          return response.data;
        })
      }
    },

    task : {
      create : function(data){
        return $http({
              method: 'POST',
              url: '/tasks',
              data: data
        }).then(function(response){
          console.log('inside task create factory call : ', response);
          return response.data;
        })
      },

      fetch : function(){
        return $http({
              method: 'get',
              url: '/tasks',
        }).then(function(response){
          console.log('inside task fetch factory call : ', response);
          return response.data;
        })
      },

      delegate : function(){
        return $http({
                  method: 'POST',
                  url: '/delegateTasks',
            }).then(function(response){
              console.log('inside delegateTasks fetch factory call : ', response);
              return response.data;
            });
      }
    },

    task_instances : {
      fetch : function(){
        return $http({
          method: 'GET',
          url: '/taskInstances'
        })
        .then(function(resp) {
          return resp.data;
        })
      },
      fetchMy: function(){
        return $http({
          method: 'GET',
          url: '/myInstances'
        }).then(function(resp) {
          return resp.data;
        })
      },
      update: function(data) {
        return $http({
          method: 'POST',
          url: '/taskInstances',
          data: data,
        }).then(function(resp) {
          return resp.data;
        })
      }
    },

    user: {
      fetch : function(){
        return $http({
          method: 'GET',
          url: '/users'
        })
        .then(function(resp) {
          return resp.data;
        })
      }
    },
    roomie: {
      invite: function (data) {
        return $http({
          method: 'POST',
          url: '/inviteRoomie',
          data: data
        }).then(function (resp) {
          return resp.data;
        })
      },

    },

    freqToInt : { // ugly styling but sticing this here for now
      daily : 1,
      weekly : 2,
      monthly : 3
    }
  }

  return returnObj;
})
.factory('Document', function($http){
  var api = {};
  return api;
})