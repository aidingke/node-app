const JwtStrategy = require('passport-jwt').Strategy,
ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("users");
const keys = require("../config/keys");

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    // console.log(jwt_payload);
    let status = {}
    User.findById(jwt_payload.id)
        .then(user => {
          if(user){
            // console.log(user)
            if(user.status == '0'){//超管
                status.authorize = true
                status.super = true
              }
              if(user.status == '1'){//编辑 无删除权限
                status.authorize = true
              }
              if(user.status == '2'){//临客 无增删改权限
                status.authorize = false
              }
              if(user.status == '3'||user.status == '4'){//无登录权限
                status.authorize = false
                status.admin = false
              }else if(user.status==null){
                status.authorize = false
                status.admin = false
              }  
            return done(null,user,status);
          }
          return done(null,false);
        })
        .catch(err => console.log(err));
  }));
}