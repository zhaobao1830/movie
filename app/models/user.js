/**
 * Created by zb on 2016/9/13.
 */
var mongoose = require('mongoose');
//model编译，生成构造函数
var UserSchema = require('../schemas/user');
var User = mongoose.model('User', UserSchema);

module.exports = User;