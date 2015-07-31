angular.module('roomEase')

.factory('Request', function($http, $location){
  var noAuthredirect = function(){ $location.path('/');};
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
        }, noAuthredirect);
      },
      join : function(data){
        return $http({
              method: 'POST',
              url: '/joinDwelling',
              data: data
        }).then(function(response){
          console.log('inside join dwelling create factory call : ', response);
          return response.data;
        }, noAuthredirect);
      },
      leave : function(data){
        return $http({
          method: 'POST',
          url: '/leaveDwelling',
          data: data
        }).then(function(response){
          console.log('inside leave dwelling create factory call : ', response);
          return response.data;
        }, noAuthredirect);
      },
      fetchAll : function() {
        return $http({
          method: 'GET',
          url: '/dwellings',
        }).then(function(response) {
          return response.data;
        }, noAuthredirect);
      },
      fetchUser : function() {
        return $http({
          method: 'GET',
          url: '/userDwelling',
        }).then(function(response) {
          return response.data;
        }, noAuthredirect);
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
        }, noAuthredirect);
      },

      fetch : function(){
        return $http({
              method: 'get',
              url: '/tasks',
        }).then(function(response){
          console.log('inside task fetch factory call : ', response);
          return response.data;
        }, noAuthredirect);
      },

      delegate : function(){
        return $http({
                  method: 'POST',
                  url: '/delegateTasks',
            }).then(function(response){
              console.log('inside delegateTasks fetch factory call : ', response);
              return response.data;
            }, noAuthredirect);
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
        }, noAuthredirect);
      },
      fetchMy: function(){
        return $http({
          method: 'GET',
          url: '/myInstances'
        }).then(function(resp) {
          return resp.data;
        }, noAuthredirect);
      },
      update: function(data) {
        return $http({
          method: 'POST',
          url: '/taskInstances',
          data: data,
        }).then(function(resp) {
          return resp.data;
        }, noAuthredirect);
      }
    },

    user: {
      fetch : function(){
        return $http({
          method: 'GET',
          url: '/users'
        }).then(function(resp) {
          return resp.data;
        }, noAuthredirect);
      },
      fetchAll : function(){
        return $http({
          method: 'GET',
          url: '/allUsers'
        }).then(function(resp){
          return resp.data;
        }, noAuthredirect);
      },
      update : function(data){
        return $http({
          method: 'POST',
          url: '/users',
          data: data
        }).then(function(resp){
          return resp.data;
        }, noAuthredirect);
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
        }, noAuthredirect);
      },

    },

    freqToInt : { // ugly styling but sticking this here for now
      daily : 1,
      weekly : 2,
      monthly : 3
    }
  }

  return returnObj;
})