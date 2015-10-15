/**
 * Created by Michael on 07.10.2015.
 */
var crypto = require('crypto');
var async = require('async');
var util = require('util');

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = Schema({
    login: {
        type: String,
        unique: true,
        required: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    name:{
        first: {type:String, default: 'Ivanko'},
        last: {type:String, default: 'Pupkin'}
    },
    email: String,
    phone: Number,
    posts: [{type: Number, ref: 'post'}],
    age: Number,
    admin: {type: Boolean, default: false},
    created: {
        type: Date,
        default: Date.now
    }
});

UserSchema.methods.encryptPassword = function(password){
    return crypto.createHash("sha1").update(password).digest("hex");
};

UserSchema.virtual('password')
    .set(function(password){
        this._plainPassword = password;
        this.salt = Math.random() + '';
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(function(){
        console.log("3");
        return this._plainPassword;
    });

UserSchema.methods.checkPassword = function(password){
    console.log("4");
    return this.encryptPassword(password) === this.hashedPassword;
};
/*
UserSchema.statics.autorize = function(login, password, callback){
    var User = this;

    async.waterfall([
        function (callback) {
            User.findOne({login: login}, callback);
        },
        function (user, callback) {
            if (user) {
                console.log("found");
                if (user.checkPassword(password)) {
                    console.log("passnorm");
                    callback(null, user);
                } else {
                    callback(new AuthError('Password not right'));
                }
            }else {
                console.log("not found");
                callback(new AuthError('User not found or Password not right'));
            }
        }
    ], callback);
};


function AuthError(message){
    Error.apply(this, arguments);
    Error.captureStackTrace(this, AuthError);
    this.message = message;
}

util.inherits(AuthError, Error);

AuthError.prototype.name = 'AuthError';

exports.AuthError = AuthError;
*/
mongoose.schemas.User = UserSchema;