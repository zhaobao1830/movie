/**
 * Created by zb on 2016/10/8.
 */
var Index = require('../app/controllers/index')
var User = require('../app/controllers/user')
var Movie = require('../app/controllers/movie')

//var express = require('express');
//var app = express();

module.exports = function(app) {
//pre handle user 预处理user
app.use(function(req,res,next){
    var _user=req.session.user
        app.locals.user=_user
    next()
})

    //index page
    app.get("/",Index.index)

    //user
    //signup
    app.post('/user/signup',User.signup)
    //signin
    app.post('/user/signin',User.signin)
    //signin
    app.get('/signin',User.showSignin)
    //signin
    app.get('/signup',User.showSignup)
    //logout
    app.get('/logout', User.logout)
    //list
    app.get('/admin/user/list',User.signinRequired,User.adminRequired,User.userList)

    //movie
    //detail
    app.get('/movie/:id', Movie.detail)
    //new
    app.get('/admin/movie/new',User.signinRequired, User.adminRequired, Movie.new)
    //update
    app.get('/admin/movie/update/:id',User.signinRequired, User.adminRequired,Movie.update)
    //save
    app.post('/admin/movie',User.signinRequired, User.adminRequired,Movie.save)
    //list
    app.get('/admin/movie/list', User.signinRequired, User.adminRequired,Movie.list)
    //del
    app.delete('/admin/movie/del',User.signinRequired, User.adminRequired, Movie.del)
};



