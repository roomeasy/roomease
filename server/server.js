// NPM Module Imports
var express = require('express');
var bodyParser = require('body-parser');

// Our App Imports
var requestHandlers = require('./routes.js')

// Initialize the instance of express
var app = express();

// Express Middleware Setup
app.use(express.static(__dirname + '/../client'));
app.use(bodyParser.json());

// Basic Routing
// app.get('/users/"', requestHandlers.users.find);
app.post('/users/create', requestHandlers.users.add);



// Initiate the server
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
