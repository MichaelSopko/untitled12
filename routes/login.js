var mongoose = require('mongoose');
var UserSchema = mongoose.schemas.User;
var User = mongoose.model('user', UserSchema);
var async = require('async');
var session = require('express-session');

exports.get = function (req,  res) {
    res.send(User);
};

exports.post = function(req,res,next) {
    var username = req.body.username;
    var password = req.body.password;
    console.log(req.body);


    User.autorize(username, password,  function(err, user){
        if(err){
                return next(err);
        }

        req.session.user = user._id;
        res.send({});
    });
};