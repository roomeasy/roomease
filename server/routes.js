var passport = require('passport');
var userHandler = require('./requestHandler/userHandler.js');
var taskHandler = require('./requestHandler/taskHandler.js');
var dwellingHandler = require('./requestHandler/dwellingHandler.js');

module.exports = function(app){

  // This routes module is exporting a function that will decorate the app (express server instance)
  // with routes.

  // Facebook Auth Routes
  app.get('/auth/facebook', passport.authenticate('facebook', { display: 'popup' }));
  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/#/signin' }),
    function (req, res) {
      //redirects new users to the proper place
      if (req.user.dwelling_id === null || req.user.dwelling_id === undefined){
        res.redirect('/#/createdwelling');
      } else {
        res.redirect('/#/dashboard');
      }
  })

  // BASIC ROUTING ----------------------------------
  //POST Requests
  app.post('/dwellings', dwellingHandler.add);
  app.post('/inviteRoomie', dwellingHandler.inviteRoomie);
  app.post('/joinDwelling', userHandler.joinDwelling);
  app.post('/tasks', taskHandler.add);
  app.post('/taskInstances', taskHandler.updateInstance);
  app.post('/delegateTasks', taskHandler.delegateTasks)
  // GET REQUESTS
  app.get('/tasks', taskHandler.getAll);
  app.get('/taskInstances', taskHandler.getAllInstances);
  app.get('/myInstances', taskHandler.getUserInstances);
  app.get('/users', userHandler.getRoomies);
  app.get('/dwellings', dwellingHandler.getUsersDwelling);
  return app;
}


// route middleware to make sure a user is logged in
  // not currently being used
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();

  res.redirect('/#/signin');
}