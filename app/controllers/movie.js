/**
 * Created by zb on 2016/10/8.
 */
var Movie=require('../module/movie')


//detail page
exports.detail=function(req, res) {
    var id=req.params.id
    Movie.findById(id,function(err,movie){
        res.render('detail', {
            title: 'imooc '+movie.title,
            movie:movie
        })
    })

}

// 管理员界面
exports.new=function(req, res) {
    res.render('admin', {title: '电影-后台录入页', movie: emptyMovie});
}

// 逻辑控制:插入
exports.save= function (req, res) {
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
};

// 逻辑控制:更新
exports.update=function(req,res){
    var id=req.params.id
    if(id){
        Movie.findById(id,function(err,movie){
            res.render('admin',{
                title:'imooc 后台更新页',
                movie:movie
            })
        })
    }
}



//list page
exports.list=function(req, res) {
    Movie.fetch(function(err,movies){
        if(err){
            console.log(err)
        }
        res.render('list', {
            title: 'imooc 列表页',
            movie:movies
        })
    })
};

// 逻辑控制:删除
exports.delete=function (req, res) {
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
};

// del page
exports.del = function(req, res) {
    var id = req.query.id

    if (id) {
        Movie.remove({_id: id}, function(err, movie) {
            if (err) {
                console.log(err)
                res.json({success: 0})
            }
            else {
                res.json({success: 1})
            }
        })
    }
}