/**
 * Created by zb on 2016/9/27.
 */
var mongoose=require("mongoose")
var bcrypt = require('bcrypt-nodejs')
var SALT_WORK_FACTOR = 10


var UserSchema=new mongoose.schema({
    name:{
        unique:true,
        type:String
    },
    password:{
        unique:true,
        type:String
    },
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
})


UserSchema.pre('save', function (next) {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    } else {
        this.meta.updateAt = Date.now();
    }
    //对密码加盐
    bcrypt.genSalt(SALT_WORK_FACTOR,function(){
       if(err){
          return next(err)
       }
       bcrypt.hash(user.password,salt,function(err,hash){
           if(err){
               return next(err)
               user.password=hash
               next()
           }
       })
    })
});


//添加静态方法
UserSchema.statics={
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


module.exports=UserSchema