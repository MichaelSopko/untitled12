/**
 * Created by Michael on 07.10.2015.
 */
var mongoose = require('mongoose');
var UserSchema = mongoose.schemas.User;
var PostSchema = mongoose.schemas.Post;
var _User = mongoose.model('user', UserSchema);
var Post = mongoose.model('post', PostSchema);

var User = function(){

    this.getAll = function(req, res, next){

        _User
            .find({admin:false})
            .populate('posts', '-_id')
            .lean()
            .exec(function (err, response) {
                console.log("Get all!");
                if (err) {
                    return next(err);
                }

                res.status(200).send(response);
            });
    };

    this.create = function(req, res,next){
        var body = req.body;

        var user = new _User(body);

        user.save(function (err, user) {
            if (err) {
                return next(err);
            }

            res.status(200).send(user);
        });
    };

    this.remove = function(req, res){
        var id = req.body._id;

        _User.findByIdAndRemove(id, function (err, response) {
            if (err) {
                return next(err);
            }

            res.status(200).send(response);
        });
    };

    this.getById = function(req, res, next){
        var id = req.params.id;

        _User
            .findById(id)
            //.populate('posts', '-_id')
            .lean()
            .exec(function (err, response) {
                console.log("Get by id!");

                if (err) {
                    return next(err);
                }

                res.status(200).send(response);
            });
    };

    this.createPost = function(req, res, next){
        var body = req.body;

        var post = new Post(body);
        post._creator = req.params.id;

        post.save(function (err) {
            if (err) return next(err);

            _User.findById(post._creator, function(err, user){
                user.posts.push(post);

                user.save(function (err) {
                    if (err) return next(err);
                });
            });

            res.status(200).send( " posted: " + post);
        });
    };
};

module.exports = User;