var express = require('express');
var router = express.Router();
var DocumentModel = ('../models').Document;

/* GET documents listing. */
router.get('/', function(req, res, next) {
  res.send('documents page');
});

router.post('/create/{token}',function(req,res,next){
  var documentdata = {title: req.body.title, link: req.body.link, description: req.body.description, DepartmentId: req.body.deptId};
});

router.get('/id/{token}',function(req,res,next){
  id = req.body.id;
  DocumentModel.find({where: {id: id}}).then(function(document) {

  });
});

router.post('/edit/id/{token}',function(req,res,next){
  var documentdata = {title: req.body.title, link: req.body.link, description: req.body.description, DepartmentId: req.body.deptId};
  Document.find({where: {id: id}}).then(function(document) {

  });
});

router.post('/delete/id/{token}',function(req,res,next){
  DocumentModel.destroy({where: {id: id}}).then(function(){

  });
});

module.exports = router;
