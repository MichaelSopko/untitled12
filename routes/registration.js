var mongoose = require('mongoose');
var UserSchema = mongoose.schemas.User;
var User = mongoose.model('user', UserSchema);
var async = require('async');
//var session = require('express-session');
var HttpError = require('../error').HttpError;

exports.get = function (req,  res) {
    res.render("registration");
};

exports.post = function(req,res,next) {
    var body = req.body;
    var login = body.login;
    var password = body.password;
    var firstName = body.firstname;
    var lastName = body.lastname;
    var email = body.email;

    var data = {
        name: {
            first: firstName,
            last: lastName
        },
        login: login,
        password: password,
        email: email
    };

    async.waterfall([
        function (callback) {
            User.findOne({login: login}, callback);
        },
        function (user, callback) {
            if (!user) {
                var user = new User(data);
                user.save(function (err) {
                    console.log("save");
                    if (err) return next(err);
                });
                callback(null, user);
           } else {
                console.log("found");
                next(new HttpError(403, 'User is Already exists'));
            }

        }
    ], function (err, user) {
        req.session.user = user._id;
        console.log(req.session.user);
        if (err) return next(err);
        res.send(req.session.user);
    });
};