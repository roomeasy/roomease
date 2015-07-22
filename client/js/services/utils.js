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

.factory('Request', function($http){

  //used this to test text message functionality before implementationon client-side
  // $http({
  //   method: 'POST',
  //   url: '/addRoomie',
  //   data : {name: "Colin Harman", phoneNumber :5125773775}
  // });

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

    freqToInt : { // ugly styling but sticing this here for now
      daily : 1,
      weekly : 2,
      monthly : 3
    }
  }

  return returnObj;
})

.factory('TaskSetup', function(){
});