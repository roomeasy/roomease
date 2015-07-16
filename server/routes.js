var userModel = require('./user/userModel.js');
var livingSpaceModel = require('./livingSpace/livingSpaceModel.js');

module.exports = {
  users: {
    add : function(req, res){
        console.log('POST FUNCTION');
        userModel.addUser(req, function(err, cb){
          if(err) console.log(err)
          else{
            res.send('Successful added user : ', req.body.username);
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
    get: function(req, res){

    },

    post: function(req, res){

    }
  },

  living_spaces: {
    get: function(req, res){
      // req should have the houseId
    },

    post: function(req, res){

    }
  }
}
