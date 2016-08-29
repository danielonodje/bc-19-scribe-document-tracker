var express = require('express');
var router = express.Router();
var DocumentModel = require('../models').Document;
var UserModel = require('../models').User;

/* GET documents listing. */
router.get('/', function(req, res, next) {
  DocumentModel.findAll().then(function(documents){
      res.send({status: "success", documents: documents});
  });
});

router.get('/:id', function(req, res, next) {
    var documentid = req.params.id;
    DocumentModel.find({where: {id: documentid}}).then(function(document){
        if(document !== null){
            res.send({status: "success", document: document, error: ""});
        }
        else{
            res.send({status: "fail", error: "Can't find that document, boss"});
        }
    });
    // res.send('documents page');
});

router.post('/delete/:id', function(req, res, next) {
    var documentid = req.params.id;
    DocumentModel.destroy({where: {id: documentid}}).then(function(document){
        if(document !== null){
            res.send({status: "success", document: document, error: ""});
        }
        else{
            res.send({status: "fail", error: "Can't find that document, boss"});
        }
    });
    // res.send('documents page');
});


router.post('/create',function(req,res,next){
    var token = req.body.token;
    var documentdata = {title: req.body.title, link: req.body.link, description: req.body.description, DepartmentId: req.body.deptid};
    UserModel.find({where: {token : token}}).then(function(user){
        console.log(user);
        if(user === null){
            res.send({status: "fail", error: "Halt. You'll need to login to do that."});
        }
        else{
            documentdata.UserId = user.id;
            console.log(documentdata);
            DocumentModel.update(documentdata).then(function(document){
                if(document !== null){
                    res.send({status: "success", message: "Your book was saved."});
                }else{
                    res.send({status: "fail", error: "Whoa there. Sure you got that right? Check your details, bud"});
                }
            });
        }
    });
});

router.post('/edit/:id',function(req,res,next){
    var token = req.body.token;
    var documentid = req.params.id;
    UserModel.find({where: {token : token}}).then(function(user){
        if(user === null){
            res.send({status: "fail", error: "Halt. You'll need to login to do that."});
        }
        else{
            var documentdata = {title: req.body.title, link: req.body.link, description: req.body.description};
            DocumentModel.find({where: {id: documentid}}).then(function(document){
                if(document !== null){
                    DocumentModel.update(documentdata,{where: {id: documentid}})
                        .then(function(document){
                        if(document !== null){
                            res.send({status: "success", message: "Your book was updated."});
                        }
                        else{
                            res.send({status: "fail", error: "Server seems to have run off. We'll fix it. Check back later?"});
                        }
                    });
                }
                else{
                    res.send({status: "fail", error: "Couldn't find that document boss."});
                }
            });
        }
    });

});


module.exports = router;
