angular.module('roomEase')

.controller('dwellingSearchCtrl', function($scope){
  var mapOptions = {
        zoom: 4,
        center: new google.maps.LatLng(40.0000, -98.0000),
        mapTypeId: google.maps.MapTypeId.TERRAIN
    }

  $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

})
