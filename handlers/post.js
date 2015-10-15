/**
 * Created by Michael on 07.10.2015.
 */
var mongoose = require('mongoose');
var UserSchema = mongoose.schemas.User;
var PostSchema = mongoose.schemas.Post;
var _User = mongoose.model('user', UserSchema);
var _Post = mongoose.model('post', PostSchema);

var Post = function(){

    this.getAll = function(req, res, next){
        _Post
            .find()
            .populate('users', '_id')
            .lean()
            .exec(function (err, response) {
                if (err) {
                    return next(err);
                }

                res.status(200).send(response);
            });
    };

    this.create = function(req, res,next){
        var body = req.body;

        var post = new _Post(body);
        post._creator = req.params.id || 1;

        post.save(function (err, post) {
            if (err) {
                return next(err);
            }

            _User.findById(post._creator, function(err, user){
                user.posts.push(post);

                user.save(function (err) {
                    if (err) return next(err);
                });
            });

            res.status(200).send(post);
        });
    };

    this.remove = function(req, res){
        var id = req.body._id;

        _Post.findByIdAndRemove(id, function (err, response) {
            if (err) {
                return next(err);
            }

            res.status(200).send(response);
        });
    };

    this.getById = function(req, res){
        var id = req.params.id;

        _Post
            .findById(id)
            //.populate('posts', '-_id')
            .lean()
            .exec(function (err, response) {
                if (err) {
                    return next(err);
                }

                res.status(200).send(response);
            });
    };

};

module.exports = Post;