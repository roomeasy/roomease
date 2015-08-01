angular.module('roomEase')

.controller('DocumentsCtrl', function inject($scope, Request, Upload, Document, $modal, $log){
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
      files.forEach(Document.upload);
    }
  };
  $scope.viewDoc = function(file){
    console.log('file ', file)
    Document.fetchImage(file.id)
    .then($scope.open.bind(this, file.file_name))
  };

  $scope.open = function(name, src) {

    var modalInstance = $modal.open({
      animation: true,
      templateUrl: 'modal.html',
      controller: 'DocModalCtrl',
      windowClass: 'large-Modal',
      //size: size,
      resolve: {
        file: function () {
          return {
            name: name,
            src: src
          };
        },
      }
    });

    modalInstance.result.then(function (selectedItem) {
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

})
.controller('UserDocsCtrl', function inject($scope, Document, Request){
  Document.fetchUserDocs()
  .then(function (results){
    console.log(results);
    $scope.userDocs = results;
  })

  $scope.delDoc = function(file){
    console.log('file ', file)
    Document.deleteImage(file.id)
    .then(function(resp){
      return resp;
    })
  };

})
.controller('DocHistoryCtrl', function inject($scope, Document){
  Document.fetchDwellingDocs()
  .then(function (results){
    console.log('DocHistoryCtrl');
    console.log(results);
    $scope.dwellingDocs = results;
  })
})
.controller('DocModalCtrl', function ($scope, $modalInstance, file){
  $scope.file = file;

})