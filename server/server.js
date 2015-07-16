// Module initialization
var express = require('express');
var pg = require('pg');
var requestHandlers = require('./routes.js')

var app = express();

// Middleware
app.use(express.static(__dirname + '/../client'));

// Basic Routing
app.get('/users', requestHandlers.users.get);


var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
