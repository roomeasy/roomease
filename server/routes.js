var passport = require('passport');
var userHandler = require('./requestHandler/userHandler.js');
var taskHandler = require('./requestHandler/taskHandler.js');
var dwellingHandler = require('./requestHandler/dwellingHandler.js');


module.exports = function(app){

  // This routes module is exporting a function that will decorate the app (express server instance)
  // with routes.

  // Facebook Auth Routes
  app.get('/auth/facebook', passport.authenticate('facebook', { display: 'page' }));
  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/#/signin' }),
    function (req, res) {

      //redirects new users to the proper place
      if(!req.user.age){
        res.redirect('/#/roomieinfo');
      } else if (req.user.dwelling_id === null || req.user.dwelling_id === undefined) {
        res.redirect('/#/createdwelling');
      } else {
        res.redirect('/#/dashboard');
      }
  });

 // BASIC ROUTING ----------------------------------
  //POST Requests
  app.post('/dwellings', function(req, res){
    isLoggedIn(req,res,dwellingHandler.add);
  });
  app.post('/inviteRoomie', function(req, res) {
    isLoggedIn(req, res, dwellingHandler.inviteRoomie);
  });
  app.post('/joinDwelling', function(req, res) {
    isLoggedIn(req, res, userHandler.joinDwelling);
  });
  app.post('/leaveDwelling', function(req, res) {
    isLoggedIn(req, res, userHandler.leaveDwelling);
  });
  app.post('/tasks', function(req, res) {
    isLoggedIn(req, res, taskHandler.add);
  });
  app.post('/taskInstances', function(req, res) {
    isLoggedIn(req, res, taskHandler.updateInstance);
  });
  app.post('/delegateTasks',function(req, res) {
    isLoggedIn(req, res, taskHandler.delegateTasks);
  });
  app.post('/users', function(req, res) {
    isLoggedIn(req, res, userHandler.createProfile);
  });
  // GET REQUESTS
  app.get('/tasks', function(req, res) {
    isLoggedIn(req, res, taskHandler.getAll);
  });
  app.get('/taskInstances', function(req, res) {
    isLoggedIn(req, res, taskHandler.getAllInstances);
  });
  app.get('/myInstances', function(req, res) {
    isLoggedIn(req, res, taskHandler.getUserInstances);
  });
  app.get('/users', function(req, res) {
    isLoggedIn(req, res, userHandler.getRoomies);
  });
  app.get('/allUsers', function(req, res) {
    isLoggedIn(req, res, userHandler.getAllUsers);
  });
  app.get('/dwellings', function(req, res) {
    isLoggedIn(req, res, dwellingHandler.getDwellings);
  });
  app.get('/userDwelling', function(req, res) {
    isLoggedIn(req, res, dwellingHandler.getUsersDwelling);
  });
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });
  return app;
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next(req, res);
  res.redirect('/#/signin');
}

