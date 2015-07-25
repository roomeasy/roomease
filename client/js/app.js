// Angular initialization
angular.module('roomEase', [
  'ui.router',
  'ui.bootstrap',
  'ngAnimate',
])

.config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/signin')

  $stateProvider.state('taskSetup', {
    url: '/tasksetup',
    templateUrl: '/js/controllers/taskSetup/taskSetup.html',
    controller: 'taskSetup'
  })
  .state('createDwelling', {
    url: '/createdwelling',
    templateUrl: '/js/controllers/createDwelling/createDwelling.html',
    controller: 'createDwelling'
  })
  .state('signin', {
    url: '/signin',
    templateUrl: '/js/controllers/signin/signin.html',
    controller: 'signinCtrl'
  })
  .state('signup', {
    url: '/signup',
    templateUrl: '/js/controllers/signup/signup.html',
    controller: 'signupCtrl'
  })
  .state('dashboard', {
    url: '/dashboard',
    abstract: true,
    templateUrl: '/js/controllers/dashboard/dashboard.html',
    controller: 'dashboardCtrl'
  })
  .state('dashboard.yourTasks', {
    url: '',
    templateUrl: '/js/controllers/dashboard/yourTasks.html',
    controller: 'yourTasksCtrl'
  })
  .state('dashboard.taskHistory', {
    // url: '/taskHistory',
    templateUrl: '/js/controllers/dashboard/taskHistory.html',
    controller: 'tasksHistoryCtrl'
  })
  .state('roomieSearch', {
    url: '/roomiesearch',
    templateUrl: '/js/controllers/roomieSearch/roomieSearch.html',
    controller: 'roomieSearch'
  })
  .state('inviteRoomies', {
    url: '/inviteroomies',
    templateUrl: '/js/controllers/inviteRoomies/inviteRoomies.html',
    controller: 'inviteRoomiesCtrl'
  })
})
