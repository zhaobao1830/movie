var express = require('express');
var path = require('path');
var port = process.env.PORT||3000;
var mongoose=require('mongoose');
var _=require('underscore');
var favicon = require('serve-favicon');
var Movie=require('./module/movie')
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();

//连接数据库
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/imooc')


// view engine setup
app.set('views',  __dirname + '/views/pages')
app.set('view engine', 'jade');


/*添加这个，才可以再cmd启动node app. js，或者在webstrom里面用工具启动app.js*/
/*不添加。只能在cmd里面用 npm start启动*/
app.listen(port,function(){
  console.log('server start ...'+port);
});
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
//静态资源请求路径
//所以可以吧js放到bower_components下面，请求的时候，直接script(src="/js/admin.js")
app.use(express.static(path.join(__dirname, 'bower_components')));

var emptyMovie = {
  title: "",
  doctor: "",
  country: "",
  language: "",
  year: "",
  poster: "",
  summary: ""
};


//index page
app.get('/', function(req, res) {
  Movie.fetch(function(err,movies){
    if(err){
      console.log(err)
    }
    res.render('index', {
      title: 'imooc 首页',
      movies:movies
    })
  })

})

//detail page
app.get('/detail/:id', function(req, res) {
  var id=req.params.id
  Movie.findById(id,function(err,movie){
    res.render('detail', {
      title: 'imooc '+movie.title,
      movie:movie
    })
  })

})

// 管理员界面
app.get('/admin/movie', function(req, res) {
  res.render('admin', {title: '电影-后台录入页', movie: emptyMovie});
})

// 逻辑控制:插入
app.post('/admin/movie/new', function (req, res) {
  var movieObj = req.body.movie;
  var id = movieObj._id;
  var _movie;
  if (id != 'undefined') {
    Movie.findById(id, function (err, movie) {
      if (err) {
        console.log("11:"+err);
      }
      _movie = _.extend(movie, movieObj);
      _movie.save(function (err, movie) {
        if (err) {
          console.log("22:"+err);
        }
        res.redirect('/detail/' + movie._id);
      });
    });
  } else {
    _movie = new Movie({
      doctor: movieObj.doctor,
      title: movieObj.title,
      country: movieObj.country,
      language: movieObj.language,
      year: movieObj.year,
      poster: movieObj.poster,
      summary: movieObj.summary,
      flash: movieObj.flash
    });
    _movie.save(function (err, movie) {
      if (err) {
        console.log("33:"+err);
      }

      res.redirect('/detail/' + movie._id);
    });
  }
});

// 逻辑控制:更新
app.get('/admin/update/:id',function(req,res){
  var id=req.params.id
  if(id){
    Movie.findById(id,function(err,movie){
      res.render('admin',{
        title:'imooc 后台更新页',
        movie:movie
      })
    })
  }
})



//list page
app.get('/admin/list', function(req, res) {
  Movie.fetch(function(err,movies){
    if(err){
      console.log(err)
    }
    res.render('list', {
      title: 'imooc 列表页',
      movie:movies
    })
  })
})

// 逻辑控制:删除
app.delete('/admin/movie/delete', function (req, res) {
  var id = req.query.id;

  if (id) {
    Movie.remove({_id: id}, function (err, movie) {
      if (err) {
        console.log(err);
      } else {
        res.json({success: true});
        res.render('/admin/list');
      }
    });
  }
});


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