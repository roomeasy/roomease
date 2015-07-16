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
  .when('/createDomicile', {
    templateUrl: '/js/controllers/livingSpaceSetup/livingSpaceSetup.html',
    controller: 'livingSpaceSetup'
  })
  .when('/signin', {
    templateUrl: '/js/controllers/signin/signin.html',
    controller: 'signinCtrl'
  })
  .when('/signup', {
    templateUrl: '/js/controllers/signup/signup.html',
    controller: 'signupCtrl'
  })
  .otherwise({redirectTo: '/'})
})
