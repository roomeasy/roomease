var passport = require('passport');
var userHandler = require('./requestHandler/userHandler.js');
var taskHandler = require('./requestHandler/taskHandler.js');
var dwellingHandler = require('./requestHandler/dwellingHandler.js');
var documentHandler = require('./requestHandler/documentHandler.js');
var authStore = require('./config/authStore');

//gives reqeust file object (req.file)
var multer = require('multer');
var storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, './server/uploads/');
  },
  filename: function(req, file, cb){
    cb(null, file.originalname);
  }
});
var upload = multer({storage: storage});


var fs = require('fs')



module.exports = function(app){

  // This routes module is exporting a function that will decorate the app (express server instance)
  // with routes.

  /**
   * TWITTER AUTH ROUTES
   */
  app.get('/auth/twitter', passport.authenticate('twitter'));
  app.get('/auth/twitter/callback',
      passport.authenticate('twitter', {failureRedirect: '/#/signin' }),
      function (req, res) {
        //redirects new users to the proper place
        if (req.user.dwelling_id === null || req.user.dwelling_id === undefined){
          res.redirect('/#/createdwelling');
        } else {
          res.redirect('/#/dashboard');
        }
      });

  /**
   * FACEBOOK AUTH ROUTES
   */
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
  });

  /**
   * GOOGLE AUTH ROUTES
   */
  app.get('/auth/google', passport.authenticate('google', {scope: [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email']}));

  app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/#/signin'}),
    function (req, res) {
      //redirects new users to the proper place
      if (req.user.dwelling_id === null || req.user.dwelling_id === undefined){
        res.redirect('/#/createdwelling');
      } else {
        res.redirect('/#/dashboard');
      }
    }
  );

  app.get('/auth/github', passport.authenticate('github'));

  app.get('/auth/github/callback',
      passport.authenticate('github', { failureRedirect: '/#/signin'}),
      function (req, res) {
        //redirects new users to the proper place
        if (req.user.dwelling_id === null || req.user.dwelling_id === undefined){
          res.redirect('/#/createdwelling');
        } else {
          res.redirect('/#/dashboard');
        }
      }
  );

  // BASIC ROUTING ----------------------------------
  //POST Requests

  app.post('/dwellings', dwellingHandler.add);
  app.post('/inviteRoomie', dwellingHandler.inviteRoomie);
  app.post('/joinDwelling', userHandler.joinDwelling);
  app.post('/tasks', taskHandler.add);
  app.post('/taskInstances', taskHandler.updateInstance);
  app.post('/delegateTasks', taskHandler.delegateTasks);
  app.post('/events', taskHandler.addCalendarEvent);
  app.post('/addEvent', taskHandler.addCalendarEvent);
  app.post('/updateEvent', taskHandler.updateCalendarEvent);
  app.post('/deleteEvent', taskHandler.deleteCalendarEvent);

  app.post('/documentsUsers', documentHandler.getAllDocsUser);
  app.post('/documentsDwelling', documentHandler.getAllDocs);

  // GET REQUESTS
  app.get('/tasks', taskHandler.getAll);
  app.get('/taskInstances', taskHandler.getAllInstances);
  app.get('/myInstances', taskHandler.getUserInstances);
  app.get('/users', userHandler.getRoomies);
  app.get('/dwellings', dwellingHandler.getUsersDwelling);
  app.get('/events', taskHandler.getCalendarEventsByDwelling);
  

  app.get('/documents/user', documentHandler.findbyUser);
  app.get('/documents/image/:doc_id', documentHandler.serveImage);
  app.get('/documents/dwelling', documentHandler.findbyDwelling);
  app.post('/documents/upload', upload.single('file'), documentHandler.upload)
  app.post('documents/delete/:doc_id', documentHandler.delet);

  app.post('/dwellings', authStore.authorizeForAPI, dwellingHandler.add);
  app.post('/inviteRoomie', authStore.authorizeForAPI, dwellingHandler.inviteRoomie);
  app.post('/joinDwelling', authStore.authorizeForAPI, userHandler.joinDwelling);
  app.post('/tasks', authStore.authorizeForAPI, taskHandler.add);
  app.post('/taskInstances', authStore.authorizeForAPI, taskHandler.updateInstance);
  app.post('/delegateTasks', authStore.authorizeForAPI, taskHandler.delegateTasks);
  app.post('/events', authStore.authorizeForAPI, taskHandler.addCalendarEvent);
  app.post('/addEvent', authStore.authorizeForAPI, taskHandler.addCalendarEvent);
  app.post('/updateEvent', authStore.authorizeForAPI, taskHandler.updateCalendarEvent);
  app.post('/deleteEvent', authStore.authorizeForAPI, taskHandler.deleteCalendarEvent);


  // GET REQUESTS
  app.get('/tasks', authStore.authorizeForAPI, taskHandler.getAll);
  app.get('/taskInstances', authStore.authorizeForAPI, taskHandler.getAllInstances);
  app.get('/myInstances', authStore.authorizeForAPI, taskHandler.getUserInstances);
  app.get('/users', authStore.authorizeForAPI, userHandler.getRoomies);
  app.get('/dwellings', authStore.authorizeForAPI, dwellingHandler.getUsersDwelling);
  app.get('/events', authStore.authorizeForAPI, taskHandler.getCalendarEventsByDwelling);
  app.get('/auth', authStore.checkUser);

  app.get('/documents/user', authStore.authorizeForAPI, documentHandler.findbyUser);
  app.get('/documents/image/:doc_id', authStore.authorizeForAPI, documentHandler.fileData);
  app.get('/documents/dwelling', authStore.authorizeForAPI, documentHandler.findbyDwelling);
  app.post('/documents/upload', authStore.authorizeForAPI, upload.single('file'), documentHandler.upload)
  app.post('documents/delete', authStore.authorizeForAPI, documentHandler.delet);
  return app;
}


// route middleware to make sure a user is logged in
  // not currently being used
function isLoggedIn(req, res, next) {

  if (req.isAuthenticated())
    return next();
  res.redirect('/#/signin');
}
  if (req.isAuthenticated()) {next();}
  else {res.redirect('/#/signin');}
}

