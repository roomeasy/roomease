var userModel = require('../model/userModel.js');
var dwellingModel = require('../model/dwellingModel.js');
var responseHandler = require('./responseHandler.js');

module.exports = {
  add : function(req, res){
    console.log('Add User Request Handler...');
    var user = {  // Data Packaging
      username: req.body.username,
      password: req.body.password,
      age     : req.body.age,
      email   : req.body.email,
    };
    userModel.add(user, function(err, insertedUserId){
      responseHandler(err, insertedUserId, res);
    });
  },
  getAll : function(req, res){
    userModel.getAll(function(err, results){
      responseHandler(err, results, res);
    });
  },
  getRoomies : function(req, res){
    var dwellingId = req.user.dwelling_id;
    userModel.getByDwellingId(dwellingId, function(err, results){
      responseHandler(err, results, res);
    });
  },
  find : function(req, res){
    console.log('inside the user find request handler');
    var username = req.params.username;
    console.log(username)
    userModel.findUser(username, function(err, results){
      console.log('inside response handler: ', results);
      responseHandler(err, results, res);
    });
  },

  joinDwelling : function(req, res){
    var submittedDwellingId = req.body.dwellingId;
    var submittedPin = req.body.pin;
    //authenticate dwelling with PIN number
    dwellingModel.getPinByDwellingId(submittedDwellingId, function (err, pin){
      if (!pin) {
        res.send({joined : false, reason : "Invalid dwelling id"});
        return;
      } else if (pin === +submittedPin) {
        userModel.updateDwellingId(req.user.id, submittedDwellingId, function(){
          if (err) {res.send(err)}
          res.send({joined : true});
        })
      } else {
        console.log("pin mismatch", pin, +submittedPin);
        res.send({joined : false, reason : "Invalid PIN"});
        return;
      }
    })
  },
}