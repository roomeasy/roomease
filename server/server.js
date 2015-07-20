// NPM Module Imports
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');

// Our App Imports
var requestHandlers = require('./routes.js');
var passportConfig = require('./config/passport.js')(passport);

// Initialize the instance of express
var app = express();

app.use(session({
  secret: 'YES..yess...',
  resave: false,
  saveUninitialized: false,
}));
// Express Middleware Setup
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/../client'));
app.use(bodyParser.json());


// BASIC ROUTING

//Facebook Auth
app.get('/auth/facebook', passport.authenticate('facebook', { display: 'popup'}));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/#/signin' }),
  function (req, res) {
    //redirects new users to the proper place
    if (req.user.dwelling_id === null){
      res.redirect('/#/createLivingSpace');
    } else {
      res.redirect('/#/dashboard');
    }
  })

// app.get('/users/"', requestHandlers.users.find);
app.post('/users', requestHandlers.users.add);
app.post('/dwellings', requestHandlers.dwellings.add);
app.post('/tasks', requestHandlers.tasks.add);

// GET REQUESTS
app.get('/tasks', requestHandlers.tasks.getAll);
app.get('/users', requestHandlers.users.getAll);
app.get('/dwellings', requestHandlers.dwellings.getAll)

app.get('/users/:username', requestHandlers.users.find);
app.get('/dwellings/:dwellingname', requestHandlers.dwellings.find);
app.get('/tasks/:taskname', requestHandlers.tasks.find);

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();

  res.redirect('/#/signin');
  // return req.isAuthenticated() ? next() : res.redirect('/#/signin')
}

// Initiate the server
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
