/**
 * Created by zb on 2016/10/8.
 */
//和首页进行交互
//index page
var Movie=require('../models/movie')
exports.index=function(req, res) {
    console.log("fdsf")
    Movie.fetch(function(err,movies){
        if(err){
            console.log(err)
        }
        res.render('index', {
            title: 'imooc 首页',
            movies:movies
        })
    })

}
