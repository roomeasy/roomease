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
    console.log('documentHandler', req.body);
    var documents = {
     file_name : req.body.file_name,
     dwelling_id : req.body.dwellingId,
     user_id : req.body.userId,
     filesize : req.body.filesize,
     type : req.body.type,
     description : req.body.description,
     data : req.body.data,
     paid : req.body.paid
    };
    console.log(documents);
   } // end of add:
   
}//end of module.exports