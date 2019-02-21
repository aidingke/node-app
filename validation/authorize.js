const mongoose = require("mongoose");
const User = mongoose.model("users");
// authorize 思路：通过查库验证 状态 才可以执行增删改操作
module.exports =function authorize(id) {
    let status = {}
    User.findOne({'_id':id})
        .then(user => {
            if(user){
                if(user.status == '0'){//超管
                    status.authorize = true
                    status.super = true
                }
                if(user.status == '1'){//编辑 无删除权限
                    status.authorize = true
                }
                if(user.status == '2'){//临客 无增删改权限
                    status.authorize = true
                }
                if(user.status == '3'||user.status == '4'){//无登录权限
                    status.authorize = false
                }
                console.log(status)
                // return done(null,status)
                // return status
            }
        })
    return status
}


// {
// status:'0',
// Bled:true,
// statusName:'超管'
// },
// {
// status:'1',
// Bled:false,
// statusName:'编辑'
// },
// {
// status:'2',
// Bled:false,
// statusName:'临客'
// },
// {
// status:'3',
// Bled:false,
// statusName:'会员'
// },
// {
// status:'4',
// Bled:false,
// statusName:'黑名单'
// }