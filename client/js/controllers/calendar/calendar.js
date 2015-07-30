angular.module('roomEase')

    .controller('calendarCtrl', function ($scope, Request, $location, $modal, $log, eventAPIRequests){
        $scope.calendarView = 'month';
        $scope.currentDay = new Date();

        $scope.getEvents = function() {
            eventAPIRequests.getEvents().then(function(res){
              console.log("response: ", res);
              $scope.events = [];
              for (var i = 0; i < res.length; i++) {
                  // $scope.events[i].title = res[i].title;
                  // $scope.events[i].type = res[i].type;
                  // $scope.events[i].startsAt = res[i].start_at;
                  // $scope.events[i].endsAt = res[i].end_at;
                  // $scope.events[i].editable = true;
                  // $scope.events[i].deletable = true;
                  // $scope.events[i].incrementsBadgeTotal = true;
                  $scope.events.push(res[i]);
              };
            });
        };
        
        $scope.date = function () {
            var newDate = new Date();
            var year = newDate.getFullYear();
            var month = newDate.getMonth();
            var day = newDate.getDate();
            var hour = newDate.getHours();
            var setDate = new Date(year, month, day, hour + 1);
            return setDate;
        };

        // $scope.events = $scope.getEvents();

        //Temp events for testing without db
        $scope.events = [
            {
                title: "Clean house",
                type: 'info',
                startsAt: new Date(2015,6,15,12),
                endsAt: new Date(2015,6,15,12),
            },
            {
                title: "Throw out Gary's stuff",
                type: 'warning',
                startsAt: new Date(2015,6,22,12),
                endsAt: new Date(2015,6,22,12),
            },
            {
                title: "Install projector",
                type: 'inverse',
                startsAt: new Date(2015,6,28,12),
                endsAt: new Date(2015,6,28,12),
            }
        ];

        $scope.createDefaultEvent = function () {
            var defaultEvent = {
                title: 'New event', // The title of the event
                type: 'info', // The type of the event (determines its color). Can be important, warning, info, inverse, success or special
                startsAt: $scope.date(), // A javascript date object for when the event starts
                endsAt: $scope.date(), // Optional - a javascript date object for when the event ends
                editable: true, // If edit-event-html is set and this field is explicitly set to false then dont make it editable.
                deletable: true, // If delete-event-html is set and this field is explicitly set to false then dont make it deleteable
                draggable: false, //Allow an event to be dragged and dropped
                resizable: false, //Allow an event to be resizable
                incrementsBadgeTotal: false, //If set to false then will not count towards the badge total amount on the month and year view
                cssClass: 'a-css-class-name' //A CSS class (or more, just separate with spaces) that will be added to the event when it is displayed on each view. Useful for marking an event as selected / active etc
            };

            eventAPIRequests.createEvent({
                title: defaultEvent.title,
                eventType: defaultEvent.type,
                startAt: defaultEvent.startsAt,
                endAt: defaultEvent.endsAt

            }).then($scope.getEvents(function(err, result) {
                    console.log('result: ', result);
                })
            );

            return defaultEvent;
        };

// Modal

      function showModal(action, event) {
      $modal.open({
        templateUrl: 'modalContent.html',
        controller: function() {
          var vm = this;
          vm.action = action;
          vm.event = event;
        },
        controllerAs: 'vm'
      });
    }

    $scope.eventClicked = function(event) {
      showModal('Clicked', event);
    };

    $scope.eventEdited = function(event) {
      showModal('Edited', event);
    };

    $scope.eventDeleted = function(event) {
      // showModal('Deleted', event);
      $scope.events.slice(event,1);
      console.log($scope.events);
    };

    $scope.eventTimesChanged = function(event) {
      showModal('Dropped or resized', event);
    };

    $scope.toggle = function($event, field, event) {
      $event.preventDefault();
      $event.stopPropagation();
      event[field] = !event[field];
    };

});