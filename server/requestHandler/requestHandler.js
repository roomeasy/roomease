var userHandler = require('./userHandler.js');
var taskHandler = require('./taskHandler.js');
var dwellingHandler = require('./dwellingHandler.js');

// This file is the main request handler
// All user-related endpoints are delegated to userHandle.js
// All tasks-related endpoints are delegated to taskHandler.js
// All dwellings-related endpoints are delegated to dwellingsHandler.js
//
// The server endpoints are defined in the server.js file

module.exports = {
  users: userHandler,
  tasks: taskHandler,
  dwellings: dwellingHandler
}