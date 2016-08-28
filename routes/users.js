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
            res.send({status: "fail", error: "An error occurred. Could not create the user."});
    });
});

router.post('/signin',function(req,res,next){
    email = req.body.email;
    password = req.body.password;
    UserModel.find({where: {email: email}}).then(function(user){
        if(user !== null){
            if(UserModel.validPassword(user,password)){
                res.send({status: "pass", user_id: user.id, token: user.token, error: ''});
            }
        }else{
            res.send({status: "fail", error: "Login Failed."});
        }
    });
});



module.exports = router;