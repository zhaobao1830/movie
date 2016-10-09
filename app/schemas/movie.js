/**
 * Created by zb on 2016/9/13.
 */
//mongoose用来操作mongodb数据库的
var mongoose=require("mongoose");
//模式定义，定义字段的类型
var MovieSchema = new mongoose.Schema({
    doctor: String,
    title: String,
    language: String,
    country: String,
    year: String,
    summary: String,
    poster: String,
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
});

MovieSchema.pre('save', function (next) {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    } else {
        this.meta.updateAt = Date.now();
    }
    next();
});


//添加静态方法
MovieSchema.statics={
    fetch:function(cb){
        return this
            .find({})  //批量查询
            .sort('meta.updateAt')
            .exec(cb)
    },
    findById:function(id,cb){
        return this
            .findOne({_id:id}) //查询单条数据
            .exec(cb)
    }
}


module.exports=MovieSchema