// NPM Module Imports
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var routes = require('./routes.js');


// Our App Imports
var passportConfig = require('./config/passport.js')(passport);

// Initialize the instance of express
var app = express();

// Express Middleware Setup
app.use(session({
  secret: 'YES..yess...',
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/../client'));
app.use(bodyParser.json());


// Writes all the routes to the server instance in the routes.js file
routes(app);

// Initiate the server
var server = app.listen(process.env.PORT || 3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
