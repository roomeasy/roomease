// Angular initialization
angular.module('roomEase', [
  'ui.router',
  'ui.bootstrap',
  'ngAnimate',
  'ngFileUpload',
  'mwl.calendar'
])

.config(function ($stateProvider, $urlRouterProvider) {

      var routeRoleChecks = {
        users: {auth: function($path, Auth) {
          console.log(Auth.getAuthorization());
          return Auth.getAuthorization().then(function(err, res){
            if (err === false){
              console.log(err);
              return $path('/#/signin');
            } else {
              console.log("true");
              return true;
            }
          });
        }}
      };

  $urlRouterProvider.otherwise('/signin');

  // create states for each of our views
  var appViews = ['taskSetup', 'createDwelling', 'roomieSearch', 'inviteRoomies', 'calendar'];
  appViews.forEach(function(stateName) {
    $stateProvider.state(stateName, {
      url: '/' + stateName.toLowerCase(),
      templateUrl: '/js/controllers/' + stateName + '/' + stateName + '.html',
      controller: stateName + 'Ctrl',
      //resolve: routeRoleChecks.users
    });
  });
  
  // handle dashboard separately since it has nested views
  $stateProvider
  .state('signin', {
    url: '/signin',
    templateUrl: '/js/controllers/signin/signin.html',
    controller: 'signinCtrl'
      })
  .state('dashboard', {
    url: '/dashboard',
    abstract: true,
    templateUrl: '/js/controllers/dashboard/dashboard.html',
    controller: 'dashboardCtrl',
    //resolve: routeRoleChecks.users
  })
  .state('dashboard.yourTasks', {
    url: '', // this is empty so that this state loads by default in the dashboard state
    templateUrl: '/js/controllers/dashboard/yourTasks.html',
    controller: 'yourTasksCtrl',
    //resolve: routeRoleChecks.users
  })
  .state('dashboard.taskHistory', {
    // url: none, because this is a child/nested state
    templateUrl: '/js/controllers/dashboard/taskHistory.html',
    controller: 'tasksHistoryCtrl',
    //resolve: routeRoleChecks.users
  })
  .state('documents', {
    url: '/documents',
    abstract: true,
    templateUrl: '/js/controllers/documents/documents.html',
    controller: 'DocumentsCtrl',
    //resolve: routeRoleChecks.users
  })
  .state('documents.yourDocs', {
    url: '',
    templateUrl: '/js/controllers/documents/yourDocs.html',
    controller: 'UserDocsCtrl',
    //resolve: routeRoleChecks.users
  })
  .state('documents.docHistory', {
    templateUrl: '/js/controllers/documents/docHistory.html',
    controller: 'DocHistoryCtrl',
    //resolve: routeRoleChecks.users
  })
})
