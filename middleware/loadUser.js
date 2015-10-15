/**
 * Created by Michael on 17.09.2015.
 */
var mongoose = require('mongoose');
var UserSchema = mongoose.schemas.User;
var User = mongoose.model('user', UserSchema);

module.exports = function(req, res, next){
    req.user = res.locals.user = null;
    if(!req.session.user)  return next();

    User.findById(req.session.user, function(err, user){
        console.log("d");

        if(err) return next(err);

        req.user = res.locals.user = user;
        next();
    });
};
