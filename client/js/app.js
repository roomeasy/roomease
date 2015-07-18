// Angular initialization
angular.module('roomEase', [
  'ui.router',
  'ui.bootstrap'
])

.config(function ($stateProvider, $urlRouterProvider) {
  // $stateProvider
  //  .state('state1', {
  //    url: "/state1",
  //    templateUrl: "partials/state1.html"
  //  })
  $urlRouterProvider.otherwise('/signin')

  $stateProvider.state('taskSetup', {
    url: '/tasksetup',
    templateUrl: '/js/controllers/houseTaskSetup/houseTaskSetup.html',
    controller: 'houseTaskSetup'
    // controllerAs: 'taskSetup'
  })
  .state('createLivingSpace', {
    url: '/createLivingSpace',
    templateUrl: '/js/controllers/livingSpaceSetup/livingSpaceSetup.html',
    controller: 'livingSpaceSetup'
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
    templateUrl: '/js/controllers/dashboard/dashboard.html',
    controller: 'dashboardCtrl'
  })
  .state('dashboard.yourTasks', {
    // url: '/yourTasks',
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
})


// .state('home.list', {
//         url: '/list',
//         templateUrl: 'partial-home-list.html',
//         controller: function($scope) {
//             $scope.dogs = ['Bernese', 'Husky', 'Goldendoodle'];
//         }
//     })
