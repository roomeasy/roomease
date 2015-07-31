angular.module('roomEase')

.controller('DocumentsCtrl', function inject($scope, Request, Upload, Document, $location){
  //$scope.dwells.name = 'yo';
  $scope.fetchDwells = function () {
    Request.dwelling.fetch().then(function(results) {
      console.log("cookes fetch results ", results)
      $scope.dwelling = results;
    })
  }
  $scope.fetchDwells();

  //watch files array and execute when the object changes state
  $scope.$watch('files', function () {
    $scope.username = 'Cooke'
    $scope.upload($scope.files);
  });
  $scope.upload = function (files) {
    if (files && files.length) {
      console.log('uploading file')
      for (var i = 0; i < files.length; i++) {
        var file = files[i];
        Document.upload(files[i]);
      }
    }
  };
  $scope.viewDoc = function(file){
    console.log('file ', file)
    Document.fetchImage(file.id)
    .then(function(results){
      console.log(results)
      $scope.bytes = results;

    })

  };

})
.controller('UserDocsCtrl', function inject($scope, Document, Request){
  //$scope.userDocs = [];
  Document.fetchUserDocs()
  .then(function (results){
    console.log(results);
    $scope.userDocs = results;
  })
})
.controller('DocHistoryCtrl', function inject($scope){
  $scope.dwellingDocs = []
})