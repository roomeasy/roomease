var passport = require('passport');
var userHandler = require('./requestHandler/userHandler.js');
var taskHandler = require('./requestHandler/taskHandler.js');
var dwellingHandler = require('./requestHandler/dwellingHandler.js');

var documentHandler = require('./requestHandler/documentHandler.js');

var fs = require('fs')


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
  app.post('/delegateTasks', taskHandler.delegateTasks);
  app.post('/events', taskHandler.addCalendarEvent);
  app.post('/documentsAdd', documentHandler.add);
  app.post('/documentsUsers', documentHandler.getAllDocsUser);
  app.post('/documentsDwelling', documentHandler.getAllDocs);

  app.post('/documents/upload', function (req, res){
    var data = '';
    fs.writeFileSync('temp.png', '');
    req.on('data', function (chunk){
     console.log(typeof chunk)
      data += chunk
      fs.appendFile('temp.png', chunk, function(){})
    })
    req.on('end', function (){
       fs.writeFile('data.png', data,  {'encoding': 'hex'}, function(){
         console.log('donezo data')
       })
    console.log(data.length)
    res.send('donezo')
    })

  })
  // GET REQUESTS
  app.get('/tasks', taskHandler.getAll);
  app.get('/taskInstances', taskHandler.getAllInstances);
  app.get('/myInstances', taskHandler.getUserInstances);
  app.get('/users', userHandler.getRoomies);
  app.get('/dwellings', dwellingHandler.getUsersDwelling);
  app.get('/events', taskHandler.getCalendarEventsByDwelling);
  app.get('/documents', documentHandler.add);
  app.get('/documentsUsers', documentHandler.getAllDocsUser);
  app.get('/documentsDwelling', documentHandler.getAllDocs);
  return app;
}


// route middleware to make sure a user is logged in
  // not currently being used
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();

  res.redirect('/#/signin');
}