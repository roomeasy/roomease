module.exports = function responseHandler(err, resultsData, res){
  if(err){
    console.log(err)
    res.end(JSON.stringify(err));
  }
  else{
    res.send(resultsData);
    res.end();
  }
}
