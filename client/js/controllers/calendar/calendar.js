angular.module('roomEase')

    .controller('calendarCtrl', function ($scope, Request, $location, $modal, eventAPIRequests){
        $scope.calendarView = 'month';
        $scope.currentDay = new Date();

        $scope.getEvents = function() {
            eventAPIRequests.getEvents().then(function(res){
              console.log(res);
          });
        
        $scope.date = function () {
            var newDate = new Date();
            var year = newDate.getFullYear();
            var month = newDate.getMonth();
            var day = newDate.getDate();
            var hour = newDate.getHours();
            var setDate = new Date(year, month, day, hour + 1);
            return setDate;
        }

        $scope.events = [{
            title: 'Clean the place',
                type: 'info',
                startsAt: $scope.date(),
                endsAt: $scope.date(),
                editable: true,
                deletable: true,
                draggable: false,
                resizable: false,
                incrementsBadgeTotal: false,
                cssClass: 'a-css-class-name'
        }];

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
                console.log(result);
                })
            );

            console.log("logging after createEvent: ", Object.keys($scope.getEvents()));

            return defaultEvent;
        };

        $scope.toggle = function($event, field, event) {
          $event.preventDefault();
          $event.stopPropagation();
          event[field] = !event[field];
        };

        function showModal(action, event) {
          $modal.open({
            templateUrl: './js/controllers/calendar/calendarModal.html',
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
            console.log('Event clicked.');
        };

        $scope.eventEdited = function(event) {
            showModal('Clicked', event);
            console.log('Pencil edit button clicked.');
        };

        $scope.eventDeleted = function(event) {
            $scope.events.slice(event, 1);
            console.log('eventDeleted called.');
        }

    });