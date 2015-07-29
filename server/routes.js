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
      if (req.user.dwelling_id === null || req.user.dwelling_id === undefined){
        res.redirect('/#/createdwelling');
      } else {
        res.redirect('/#/dashboard');
      }
  });

 // BASIC ROUTING ----------------------------------
  //POST Requests
  app.post('/dwellings', isLoggedIn, dwellingHandler.add);
  app.post('/inviteRoomie', isLoggedIn, dwellingHandler.inviteRoomie)
  app.post('/joinDwelling', isLoggedIn, userHandler.joinDwelling)
  app.post('/leaveDwelling', isLoggedIn, userHandler.leaveDwelling)
  app.post('/tasks', isLoggedIn, taskHandler.add)
  app.post('/taskInstances', isLoggedIn, taskHandler.updateInstance)
  app.post('/delegateTasks',isLoggedIn, taskHandler.delegateTasks)
   
  // GET REQUESTS
  app.get('/tasks', isLoggedIn, taskHandler.getAll)
  app.get('/taskInstances', isLoggedIn, taskHandler.getAllInstances)
  app.get('/myInstances', isLoggedIn, taskHandler.getUserInstances)
  app.get('/users', isLoggedIn, userHandler.getRoomies)
  app.get('/dwellings', isLoggedIn, dwellingHandler.getUsersDwelling)
  return app;


// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next(req, res);
  res.redirect('/#/signin');
}
}