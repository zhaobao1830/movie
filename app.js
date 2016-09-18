var express = require('express');
var path = require('path');
var port = process.env.PORT||3000;
var mongoose=require('mongoose');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();

mongoose.connect('mongodb://localhost/imooc')


// view engine setup
app.set('views',  __dirname + '/views/pages')
app.set('view engine', 'jade');
app.set('port',3000);


/*添加这个，才可以再cmd启动node app. js，或者在webstrom里面用工具启动app.js*/
/*不添加。只能在cmd里面用 npm start启动*/
app.listen(3000,function(){
  console.log('server start ...');
});
// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'bower_components')));


//index page
app.get('/', function(req, res) {

  res.render('index', {
    title: 'imooc 首页',
    movies: [{
      title: '机械战警',
      _id: 1,
      poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
    },
      {
        title: '机械战警',
        _id: 2,
        poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
      },
      {
        title: '机械战警',
        _id: 3,
        poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
      },
      {
        title: '机械战警',
        _id: 4,
        poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
      },
      {
        title: '机械战警',
        _id: 5,
        poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
      },
      {
        title: '机械战警',
        _id: 6,
        poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
      }]
  })
})

//detail page
app.get('/movie/:id', function(req, res) {
  res.render('detail', {
    title: 'imooc 详情页',
    movie: {
      doctor: '何塞·帕迪里亚',
      country: '美国',
      title: '机械战警',
      year: '2014',
      poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5',
      language: '英语',
      flash: 'http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf',
      summary: '《机械战警》是由何塞·帕迪里亚执导，乔尔·金纳曼、塞缪尔·杰克逊、加里·奥德曼等主演的一部科幻电影，改编自1987年保罗·范霍文执导的同名电影。影片于2014年2月12日在美国上映，2014年2月28日在中国大陆上映。影片的故事背景与原版基本相同，故事设定在2028年的底特律，男主角亚历克斯·墨菲是一名正直的警察，被坏人安装在车上的炸弹炸成重伤，为了救他，OmniCorp公司将他改造成了生化机器人“机器战警”，代表着美国司法的未来。'
    }
  })
})

//admin page
app.get('/admin/movie', function(req, res) {
  res.render('admin', {
    title: 'imooc 后台录入页',
    movie: {
      title: '',
      doctor: '',
      country: '',
      year: '',
      poster: '',
      flash: '',
      summary: '',
      language: ''
    }
  })
})

//list page
app.get('/admin/list', function(req, res) {
  res.render('list', {
    title: 'imooc 列表页',
    movie: [{
      title: '机械战警',
      _id: 1,
      doctor: '何塞·帕迪里亚',
      country: '美国',
      year: 2014,
      language: '英语',
      flash: 'http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf',
      summary: '《机械战警》是由何塞·帕迪里亚执导，乔尔·金纳曼、塞缪尔·杰克逊、加里·奥德曼等主演的一部科幻电影，改编自1987年保罗·范霍文执导的同名电影。影片于2014年2月12日在美国上映，2014年2月28日在中国大陆上映。影片的故事背景与原版基本相同，故事设定在2028年的底特律，男主角亚历克斯·墨菲是一名正直的警察，被坏人安装在车上的炸弹炸成重伤，为了救他，OmniCorp公司将他改造成了生化机器人“机器战警”，代表着美国司法的未来。'
    }]
  })
})


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;