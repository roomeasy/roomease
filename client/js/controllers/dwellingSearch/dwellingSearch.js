angular.module('roomEase')

.controller('dwellingSearchCtrl', function ($scope, Request){
  var dwellings;
  

  Request.dwelling.fetch().then(function(results){
    console.log("dwelling fetch results:", results);
    dwellings = results;
    for(var i = 0; i < dwellings.length; i++) {
      var latLong = new google.maps.LatLng(dwellings[i].lat, dwellings[i].long);
      var newMark = new google.maps.Marker({
        position: latLong,
        title: dwellings[i].name
      })
      console.log('mark made');
      newMark.setMap($scope.map);
    }
  })

  var mapOptions = {
        zoom: 4,
        center: new google.maps.LatLng(40.0000, -98.0000),
        mapTypeId: google.maps.MapTypeId.TERRAIN
    }

  $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
})
