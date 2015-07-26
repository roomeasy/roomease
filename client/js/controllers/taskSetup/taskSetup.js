angular.module('roomEase')

.controller('taskSetup', function($scope, $location, Request){
  $scope.tasks = [];

  $scope.task = {
    name: "",
    description: "",
    frequency: "daily",
    start_date : null,
  }

  $scope.warning = false;

  $scope.addTask = function (newTask) {
    newTask['start_date'] = moment($scope.dt).format('MM-DD-YYYY');
    $scope.tasks.push(newTask);

    // reset the view
    $scope.task = {
      name: "",
      description: "",
      frequency: "daily",
      start_date : null,
    }
    $scope.today();

    $scope.warning = false; // reset the warning
  }

  $scope.deleteTask = function(tasks, index){
    tasks.splice(index, 1);
  }

  $scope.submit = function(tasks){
    if(tasks.length === 0){
      $scope.warning = true; // trigger the warning
      console.log("Please add a task first");
      return;
    }
    // data packaging for sending
    var sendData = tasks.slice(); // will be an array of tasks
    var completed = {count:0};

    sendData = sendData.forEach(function(task, i, array){
      var taskStr = task['frequency'];  // Data packaging (converting the freq str to an int)
      task["frequency"] = Request.freqToInt[taskStr];

      // submit it
      Request.task.create(task).then(function(results){
        console.log('results inside the response thing :', results);
        // Call the delegate function at the last index
        completed.count++;
        if(completed.count === array.length){
          Request.task.delegate();
          $location.path('/dashboard'); // not sure how this will work with async requests
        }
      });
      $scope.tasks = [];
    });

  }






  // calendar stuff-----------------------

  $scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();

  $scope.clear = function () {
    $scope.dt = null;
  };

  // Disable weekend selection
  $scope.logger = function(){
    console.log($scope.dt);
  }

  $scope.disabled = function(date, mode) {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  };

  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };
  $scope.toggleMin();

  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];

  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  var afterTomorrow = new Date();
  afterTomorrow.setDate(tomorrow.getDate() + 2);
  $scope.events =
    [
      // {
      //   date: afterTomorrow,
      //   status: 'partially'
      // }
    ];

  $scope.getDayClass = function(date, mode) {
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0,0,0,0);

      for (var i=0;i<$scope.events.length;i++){
        var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

        if (dayToCheck === currentDay) {
          return $scope.events[i].status;
        }
      }
    }

    return '';
  };
})
