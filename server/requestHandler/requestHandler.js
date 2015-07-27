var userHandler = require('./userHandler.js');
var taskHandler = require('./taskHandler.js');
var dwellingHandler = require('./dwellingHandler.js');

module.exports = {
  users: userHandler,
  tasks: taskHandler,
  dwellings: dwellingHandler
}