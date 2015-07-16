// NPM Module Imports
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');

// Our App Imports
var requestHandlers = require('./routes.js')

// Initialize the instance of express
var app = express();

// Express Middleware Setup
app.use(express.static(__dirname + '/../client'));
app.use(bodyParser.json());
app.use(session({
  secret: 'keyboard cat',
  cookie : {},
  resave: false,
  saveUninitialized: true
}));

// Basic Routing
// app.get('/users/"', requestHandlers.users.find);
app.post('/users/create', requestHandlers.users.add);
app.post('/dwellings/create', requestHandlers.dwellings.add);

// Initiate the server
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
