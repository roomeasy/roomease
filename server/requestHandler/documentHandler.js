var documentModel = require('../model/documentModel.js');
var responseHandler = require('./responseHandler.js')
//var userModel = require('../model/userModel.js')

module.exports = {
	add: function (req, res){
	// if (req.user.dwelling_id === null) {
 //      res.send(400);
 //      return;
 //    }else {
 //      var dwelling_id = req.user.dwelling_id;
 //    }
    console.log('documentHandler', req.body);
    var documents = {
      //document_id = req.body.id,
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
    documentModel.add(documents, userId, dwellingId, function(err, results){
      responseHandler(err, results, res);
    })
   }, // end of add:
   
  getAllDocs : function(req, res){
    // Called by the GET '/tasks' endpoint
    // Gets all tasks based of current users dwelling_id
    var dwelling_id = req.user.dwelling_id;
    console.log('inside the documents getALL DOCS handler');
    documentModel.getDocsDwelling(dwelling_id, function(err, results){
      responseHandler(err, results, res);
    });
  },
    
    getAllDocsUser : function(req, res){
    var user_id = req.user_id;
    console.log('inside the documents get USER DOCS handler');
    documentModel.getDocsUsers(user_id, function(err, results){
      responseHandler(err, results, res);
    });
  },
  deleteDoc: function(req,res){
    var document_id = req.id;
    console.log('inside delete documents');
    documentModel.deleteDoc(document_id, function(err, results){
      responseHandler(err,results,res)
    });

  }, //end of deleteDoc

  upload: function(req, res){
    //TODO: store file in db by using documentModel
    //info in req.file and req.user
    console.log(req.file)
    console.log(req.user)
    

    res.json(req.file)
  }
}//end of module.exports