var express = require('express');
var router = express.Router();
var UserModel = require('../models').User;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('users page');
});

router.post('/signup', function(req, res, next) {
    userdata = {first_name: req.body.first_name, last_name: req.body.last_name, email: req.body.email, password: req.body.password};
    UserModel.create(userdata).then(function(user){
        user !== null ? res.send({status: "pass", user_id: user.id, token: user.token, error: ''}) :
            res.send({status: "fail", error: "Server seems to have run off. We'll fix it. Check back later?"});
    });
});

router.post('/signin',function(req,res,next){
    email = req.body.email;
    password = req.body.password;
    UserModel.find({where: {email: email}}).then(function(user){
        if(user !== null){
            console.log(user);
            if(UserModel.validPassword(password,user)){
                res.send({status: "pass", user_id: user.id, token: user.token, error: ''});
            }
            else{
                res.send({status: "fail", error: "Whoa there. Sure you got that right? Check your login details, bud"});
            }
        }else{
            res.send({status: "fail", error: "Server seems to have run off. We'll fix it. Check back later?"});
        }
    });
});

router.get('/id/token',function(req,res,next){
    // user_id =
});



module.exports = router;