/**
 * Created by zb on 2016/10/8.
 */
var User=require('../module/user')

//showSignup page
exports.showSignup=function(req, res) {
        res.render('signup', {
            title: '注册页'
        })
}
//showSignin page
exports.showSignin=function(req, res) {
    res.render('signin', {
        title: '登陆页'
    })
}

//signup
exports.signup=function(req,res){
    var _user=req.body.user
    //判断是否已经有了
    User.findOne({name:_user.name},function(err,user){
        if(err){
            console.log("err"+err)
        }
        if(user){
            return res.redirect('/signin')
        }else{
            var user=new User(_user)
            user.save(function(err,user){
                if(err){
                    console.log(err);
                }else{
                    res.redirect('/admin/userList')
                }
            })
        }
    })
}

//signin
exports.signin=function(req,res){
    var _user=req.body.user
    var name=_user.name
    var password=_user.password

    User.findOne({name:name},function(err,user){
        if(err){
            console.log(err)
        }
        if(!user){
            return res.redirect('/signup')
        }
        user.comparePassword(password,function(err,isMatch){
            if(err){
                console.log(err)
            }
            if(isMatch){
                req.session.user=user
                return res.redirect("/")
            }else{
                return res.redirect("/signin")
            }
        })

    })
}

//logout
exports.logout=function(req,res){
    delete req.session.user

    //这个不需要，因为app是把session赋值给locals的，session删除user,locals里的user自然为空
  //  delete app.locals.user
    res.redirect('/')
}

//userList page
exports.userList=function(req, res) {
        User.fetch(function(err,users){
            if(err){
                console.log(err)
            }
            res.render('userList', {
                title: '用户 列表页',
                users:users
            })
        })
}

//signinRequired
exports.signinRequired=function(req, res,next) {
    var user=req.session.user
    if(!user){
        return res.redirect('/signin')
    }
    next()
}

//adminRequired
exports.adminRequired=function(req, res,next) {
    var user=req.session.user
    if (user.role <= 10) {
        return res.redirect('/signin')
    }
    next()
}