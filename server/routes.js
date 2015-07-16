var userModel = require('./user/userModel.js');

module.exports = {
  users: {
    get: function(req, res){
      console.log('GET SUCCESS')
      userModel.getUsers(function(err, results){
        console.log('RESULTS OF GET REQUEST: ', results)
        res.send(results.rows);
        res.end();
      });
    },

    post: function(req, res){
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

  tasks: {
    get: function(req, res){

    },

    post: function(req, res){

    }
  },

  living_spaces: {
    get: function(req, res){

    },

    post: function(req, res){

    }
  }
}
