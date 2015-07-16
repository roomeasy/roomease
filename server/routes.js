var userModel = require('./user/userModel.js');
var dwellingModel = require('./dwelling/dwellingModel.js');
var taskModel = require('./task/taskModel.js');

module.exports = {
  users: {
    add : function(req, res){
        console.log('POST FUNCTION');
        userModel.addUser(req, function(err, row){
          if(err) console.log(err)
          else{
            res.send(row.id); // returns the unique ID of the created User
            res.end();
          }
        });
      }
    },

    // find: function(req, res){
    //   console.log('GET SUCCESS')
    //   userModel.findUser(function(err, results){
    //     console.log('RESULTS OF GET REQUEST: ', results)
    //     res.send(results.rows);
    //     res.end();
    //   });
    // }
  // },

  tasks: {
    add: function(req, res){
      console.log('ADD TASK REQ.HANDLER');
      taskModel.addTask(req.body, houseId)
    },

    remove: function(req, res){

    }
  },

  dwellings: {
    add: function(req, res){
      var session = req.session;
      console.log(session)
      if(!session.count) session.count = 1;
      else{
        session.count++;
      }
      // 1. make the house
      console.log('inside dwelling add request handler');
      dwellingModel.createDwelling(req.body, function(err, dwellingId){
        if(err){
          console.log(err)
          res.send('failure');
          res.end();
        }
        else {
          // update the currently logged in user's homeId
            // call some user model function that does this and pass the dwellingId
            // passed dwellingId.


          res.send(dwellingId)
          res.end();
        }
      });
    },

    gett: function(req, res){

    }
  }
}
