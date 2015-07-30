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
        Upload.upload({
          url: 'documents/upload',
          fields: {
            'username': $scope.username,
          },
          file: file
        })
        .progress(function (evt) {
          var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
          console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
        })
        .success(function (data, status, headers, config) {
          console.log(arguments)
          var args = Array.prototype.slice.call(arguments);
          console.log('file ' + config.file.name + 'uploaded. Response: ' + JSON.stringify(data));
        }).error(function (data, status, headers, config) {
            console.log('error status: ' + status);
        })
      }
        }
    };
})
.controller('UserDocsCtrl', function inject($scope, Request){

})
.controller('DocHistoryCtrl', function inject($scope){

})