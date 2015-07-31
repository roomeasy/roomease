// Angular initialization
angular.module('roomEase', [
  'ui.router',
  'ui.bootstrap',
  'ngAnimate',
  'ngFileUpload',
  'mwl.calendar'
])

.config(function ($stateProvider, $urlRouterProvider, Auth) {
  $urlRouterProvider.otherwise('/signin')

  // create states for each of our views
  var appViews = ['taskSetup', 'createDwelling', 'signin', 'roomieSearch', 'inviteRoomies', 'calendar'];
  appViews.forEach(function(stateName) {
    $stateProvider.state(stateName, {
      resolve: Auth.getAuthorization(),
      url: '/' + stateName.toLowerCase(),
      templateUrl: '/js/controllers/' + stateName + '/' + stateName + '.html',
      controller: stateName + 'Ctrl'
    });
  });
  
  // handle dashboard separately since it has nested views
  $stateProvider
  .state('dashboard', {
    resolve: Auth.getAuthorization(),
    url: '/dashboard',
    abstract: true,
    templateUrl: '/js/controllers/dashboard/dashboard.html',
    controller: 'dashboardCtrl'
  })
  .state('dashboard.yourTasks', {
    resolve: Auth.getAuthorization(),
    url: '', // this is empty so that this state loads by default in the dashboard state
    templateUrl: '/js/controllers/dashboard/yourTasks.html',
    controller: 'yourTasksCtrl'
  })
  .state('dashboard.taskHistory', {
    resolve: Auth.getAuthorization(),
    // url: none, because this is a child/nested state
    templateUrl: '/js/controllers/dashboard/taskHistory.html',
    controller: 'tasksHistoryCtrl'
  })
  .state('documents', {
    resolve: Auth.getAuthorization(),
    url: '/documents',
    abstract: true,
    templateUrl: '/js/controllers/documents/documents.html',
    controller: 'DocumentsCtrl'
  })
  .state('documents.yourDocs', {
    resolve: Auth.getAuthorization(),
    url: '',
    templateUrl: '/js/controllers/documents/yourDocs.html',
    controller: 'UserDocsCtrl'
  })
  .state('documents.docHistory', {
    resolve: Auth.getAuthorization(),
    templateUrl: '/js/controllers/documents/docHistory.html',
    controller: 'DocHistoryCtrl'
  })
})
