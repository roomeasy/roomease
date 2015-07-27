var userModel = require('../model/userModel.js');
var dwellingModel = require('../model/dwellingModel.js');
var responseHandler = require('./responseHandler.js');
var request = require('request');

module.exports = {
  add: function(req, res){
    console.log('inside dwelling add request handler');

    //data packaging
    var dwelling = {
      name    : req.body.name,
      address : req.body.address,
    }

    dwellingModel.add(dwelling, function (err, results){
      console.log(req.user);
      userModel.updateDwellingId(req.user.id, results.id, function (err, results) {
        responseHandler(err, results, res);
      });
    });
  },

  inviteRoomie : function(req, res){

    //gets dwellingId from logged in user.
    var dwelling_id = req.user.dwelling_id;

    //roomies should come through as one obj on the req.body
    // Data Packaging
    var roomie = {
      name        : req.body.name,
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

  getAll: function(req, res){
    dwellingModel.getAll(function (err, results){
      responseHandler(err, results, res);
    })
  },

  getUsersDwelling : function(req, res){
    var dwellingId = req.user.dwelling_id;
    dwellingModel.getById(dwellingId, function(err, results){
      responseHandler(err, results, res);
    });
  },

  find : function(req, res){
    console.log('inside the dwelling find request handler');
    var dwellingName = req.params.dwellingname;
    console.log(dwellingName);
    dwellingModel.findDwelling(dwellingName, function (err, results){
      console.log('inside response handler: ', results);
      responseHandler(err, results, res);
    });
  }
}