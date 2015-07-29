var userModel = require('../model/userModel.js');
var dwellingModel = require('../model/dwellingModel.js');
var responseHandler = require('./responseHandler.js');
var request = require('request');

module.exports = {
  add: function(req, res){
    // Called by the POST '/dwellings' endpoint
    // Adds a dwelling using the provided name + address information
    console.log('inside dwelling add request handler');

    //data packaging
    var dwelling = {
      name    : req.body.name,
      address : req.body.address,
      latLong : req.body.latLong
    }

    dwellingModel.add(dwelling, function (err, results){
      console.log(req.user);

      userModel.updateDwellingId(req.user.id, results.id, function (err, results) {
        responseHandler(err, results, res);
      });
    });
  },

  inviteRoomie : function(req, res){
    // Called by the '/inviteRoomie' endpoint
    // Takes a input of name + phoneNumber and calls the textbelt api
      // to fire the text

    var dwelling_id = req.user.dwelling_id;
    // Data Packaging
    var roomie = {
      name          : req.body.name,
      phoneNumber   : req.body.phoneNumber,
    };

    //query dwelling database for unique PIN
    dwellingModel.getPinByDwellingId(dwelling_id, function (err, pin){
      //composes the actual text message string
      var message = "Hello, " + roomie.name + "! \n \n"
                    + "Your friend " + req.user.username + " has invited you to join RoomEase! "
                    + "Go to localhost:3000 to get started. \n \n"
                    + "Your Dwelling Id is : " + dwelling_id + "\n"
                    + "Your Unique PIN is  : " + pin + "\n \n"
                    + "See you soon!";

      //data packaging
      var data = {
        number  : roomie.phoneNumber,
        message : message,
      }

      //send post request using request node module to textBelt,
      //our free janky texting service.
      request.post({
        url: 'http://textbelt.com/text',
        formData : data,
      }, function (err, httpResponse, body){
        if (err) { console.log('failed: ', err); }
      });
    });
  },

  getUsersDwelling : function(req, res){
    // Called from GET '/dwellings'
    // Retrieves the dwelling information from the currently logged-in user
    var dwellingId = req.user.dwelling_id;
    dwellingModel.getById(dwellingId, function(err, results){
      responseHandler(err, results, res);
    });
  },
}