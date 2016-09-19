/**
 * Created by zb on 2016/9/13.
 */
var mongoose = require('mongoose');
//model编译，生成构造函数
var MovieSchema = require('../schemas/movie');
var Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;