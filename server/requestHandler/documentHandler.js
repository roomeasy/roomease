var documentModel = require('../model/documentModel');
var responseHandler = require('./responseHandler')

module.exports = {
	add: function (req, res){
	if (req.user.dwelling_id === null) {
      res.send(400);
      return;
    }else {
      var dwelling_id = req.user.dwelling_id;
    }
    console.log('documentHandler');
    var documents = {
     field : req.body
     field : req.body
     field : req.body
     field : req.body
     field : req.body
     field : req.body
    };
    console.log(documents);
   } // end of add:
   documentModel 
}//end of module.exports