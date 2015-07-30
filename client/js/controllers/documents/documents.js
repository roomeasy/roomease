angular.module('roomEase')

.controller('DocumentsCtrl', function inject($scope, Request, Upload, $location){
  //$scope.dwells.name = 'yo';
  $scope.username = 'Cooke';
  $scope.fetchDwells = function () {
    Request.dwelling.fetch().then(function(results) {
      console.log("cookes fetch results ", results)
      $scope.dwelling = results;
    })
  }
  $scope.fetchDwells();

  //watch files array and execute when the object changes state
  $scope.$watch('files', function () {
    $scope.upload($scope.files);
  });
  $scope.upload = function (files) {
    if (files && files.length) {
      console.log('uploading file')
      for (var i = 0; i < files.length; i++) {
        var file = files[i];
        // Upload.http({
        //   url: 'documents/upload',
        //   headers: {
        //     'Content-Type': 'image',
        //     // 'fileName': 
        //   },
        //   data: file
        // }).
        Upload.upload({
          url: 'documents/upload',
          fields: {'username': $scope.username},
          file: file

        })
        .success(function (data, status, headers, config) {
          // console.log(arguments.length)
          // var args = Array.prototype.slice.call(arguments);
          // args.forEach(function (elm){
          //   console.log('=====================\n' + JSON.stringify(elm)+ '\n=========================\n\n\n\n\n\n')
          // })
          console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
        })
        .progress(function (evt) {
          var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
          console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
        })
        .error(function (data, status, headers, config) {
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