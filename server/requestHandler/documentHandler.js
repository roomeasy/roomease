var documentModel = require('../model/documentModel.js');
var responseHandler = require('./responseHandler.js')
var fs = require('fs')
//var userModel = require('../model/userModel.js')

module.exports = {    
  findbyUser : function(req, res){
    documentModel.joinUser(req.user.id, function(err, results){
      responseHandler(err, results, res);
    });
  },
  
  findbyDwelling: function(req, res){
    documentModel.joinDwelling(req.user.dwelling_id, function(err, results){
      responseHandler(err, results, res);
    });
    
  },

  delet: function(req,res){
    var document_id = req.id;
    console.log('inside delete documents');
    documentModel.delet(req.params.doc_id, function(err, results){
      responseHandler(err,results,res)
    });

  },

  serveImage: function(req, res){
    documentModel.fetchImage(req.params.doc_id, function(err, results){
      console.log('Results: ')
      responseHandler(err, results[0].data.toString('base64'), res)
    });
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
      fs.unlink(__dirname + '/../uploads/' + documents.file_name, function(){
        console.log('removed ' + documents.file_name)
      })
      responseHandler(err, results, res);
    })

  }
}//end of module.exports