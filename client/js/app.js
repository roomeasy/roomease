// Angular initialization
angular.module('roomEase', [
  'ngRoute'
])

.config(function ($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: '/js/controllers/houseTaskSetup/houseTaskSetup.html',
    controller: 'houseTaskSetup'
    // controllerAs: 'taskSetup'
  })
  .otherwise({redirectTo: '/'})
})
