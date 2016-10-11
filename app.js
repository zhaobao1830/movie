var express = require('express');
var path = require('path');
var port = process.env.PORT||3000;
var mongoose=require('mongoose');
//express4使用connect-mongo时，用下面这钟方法
var session = require('express-session');
var mongoStore=require('connect-mongo')(session);
var _=require('underscore');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var fs=require('fs')

require('./app/models/Category');
require('./app/models/Comment');
require('./app/models/User');
require('./app/models/Movie');

var routes=require('./config/routes')

var app = express();



//连接数据库
mongoose.Promise = global.Promise;
var dbUrl='mongodb://localhost/imooc'
mongoose.connect(dbUrl)

// models loading
var models_path = __dirname + '/app/models'
var walk = function(path) {
  fs
      .readdirSync(path)
      .forEach(function(file) {
        var newPath = path + '/' + file
        var stat = fs.statSync(newPath)

        if (stat.isFile()) {
          if (/(.*)\.(js|coffee)/.test(file)) {
            require(newPath)
          }
        }
        else if (stat.isDirectory()) {
          walk(newPath)
        }
      })
}
walk(models_path)

// view engine setup
app.set('views',  __dirname + '/app/views/pages')
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
app.use(bodyParser({uploadDir:'./uploads'}));
app.use(cookieParser());
app.use(session({
  secret:'movie',
  store:new mongoStore({
    url:dbUrl,
    collection:'sessions'
  })
}))
//静态资源请求路径
//所以可以吧js放到bower_components下面，请求的时候，直接script(src="/js/admin.js")
app.use(express.static(path.join(__dirname, 'bower_components')));
app.use(express.static(path.join(__dirname, 'public')));


//调用routes
routes(app)


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
})




var emptyMovie = {
  title: "",
  doctor: "",
  country: "",
  language: "",
  year: "",
  poster: "",
  summary: ""
};


module.exports = app;
