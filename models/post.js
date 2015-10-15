/**
 * Created by Michael on 07.10.2015.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PostSchema = Schema({
    _id: Number,
    name:{ type:String, default: 'Ivann'},
    _creator: {type: Number, ref: 'User'}
});//, {collection: 'Post'});

mongoose.schemas.Post = PostSchema;