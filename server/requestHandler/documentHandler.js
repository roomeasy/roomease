var documentModel = require('../model/documentModel.js');
var responseHandler = require('./responseHandler.js')
//var userModel = require('../model/userModel.js')

module.exports = {    
  findbyUser : function(req, res){
    var user_id = req.user.id;
    console.log('inside the documents get USER DOCS handler');
    documentModel.joinUser(req.user.id, function(err, results){
      responseHandler(err, results, res);
    });
  },
  
  findbyDwelling: function(req, res){
    console.log('inside the documents getALL DOCS handler');
    documentModel.joinDwelling(req.user.dwelling_id, function(err, results){
      responseHandler(err, results, res);
    });
    
  },

  delet: function(req,res){
    var document_id = req.id;
    console.log('inside delete documents');
    documentModel.delet(document_id, function(err, results){
      responseHandler(err,results,res)
    });

  }, //end of deleteDoc
  fileData: function(req, res){
    console.log(JSON.stringify(req.params))
    console.log('filedata')
    documentModel.image(req.params.doc_id, function(err, results){
      console.log('Results: ')
      //console.log(results[0].data.toString('base64'))
      responseHandler(err, results[0].data.toString('base64'), res)
    });

    // documentModel.image(req.params.doc_id, function(err results){

    // })
  },

  upload: function(req, res){
    var documents = {
      file_name : req.file.originalname,
      dwelling_id : req.user.dwelling_id,
      user_id : req.user.id,
      filesize : 99,
      type : req.file.mimetype,
    };
    //console.log(documents);
    documentModel.create(documents, function(err, results){
      responseHandler(err, results, res);
    })

  }
}//end of module.exports