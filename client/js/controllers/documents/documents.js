angular.module('roomEase')

.controller('documentsCtrl', function inject($scope, Request, Upload, $location){
  //$scope.dwells.name = 'yo';
  $scope.username = 'Cooke';
  // $scope.fetchDwells = function () {
  //   Request.dwelling.fetch().then(function(results) {
  //     console.log("cookes fetch results ", results)
  //     $scope.dwelling = results;
  //   })
  // }
  // $scope.fetchDwells();
  $scope.$watch('files', function () {
    $scope.upload($scope.files);
  });

  $scope.upload = function (files) {
    if (files && files.length) {
      console.log('uploading file')
      for (var i = 0; i < files.length; i++) {
        var file = files[i];
        //   Upload.upload({
        //     url: 'upload',
        //     fields: {'username': $scope.username},
        //     file: file,
        //   })
        Upload.http({
          url: 'documents/upload',
          headers: {'Content-Type': 'image'},
          data: file
        }).progress(function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            //console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
          }).success(function (data, status, headers, config) {
            //console.log('file ' + config.file.name + 'uploaded. Response: ' + JSON.stringify(data));
            //console.log('config: ' + JSON.stringify(config));
            //console.log('config.file: ' + config.filename);
            //console.log('config.file.name: ' + JSON.stringify(config.file.name));
          }).error(function (data, status, headers, config) {
            console.log('error status: ' + status);
          })
      }
        }
    };
})
.controller('yourDocsCtrl', function inject($scope, Request){

})
.controller('docHistoryCtrl', function inject($scope){

})