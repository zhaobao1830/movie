/**
 * Created by zb on 2016/9/13.
 */
var mongoose = require('mongoose');
//model编译，生成构造函数
var CommentSchema = require('../schemas/comment');
var Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;