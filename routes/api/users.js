// @login & register 
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const keys = require("../../config/keys");
const passport = require("passport");
const pubFun = require('../../config/public');

const formidable = require('formidable');
const path = require('path');
const fs = require('fs');

const User = require("../../models/User");

// 引入验证方法
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

const bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const nodemailer = require('nodemailer');

// $route  GET api/users/test
// @desc   返回的请求的json数据
// @access public
router.get("/test",(req,res) => {
  res.json({msg:"login works"})
})

// $route  POST api/users/register
// @desc   返回的请求的json数据
// @access public
router.post("/register",(req,res) => {

  const {errors,isValid} = validateRegisterInput(req.body);

  // 判断isValid是否通过
  if(!isValid){
    return res.status(400).json(errors);
  }

  // 查询数据库中是否拥有邮箱
  User.findOne({email:req.body.email})
      .then((user) => {
        if(user){
          return res.json({msg:"邮箱已被注册!",code:400})
        }else{
          // const avatar = gravatar.url(req.body.email, {s: '200', r: 'pg', d: 'mm'});
          var avatar = 'head.jpg';  
          var timestamp=new Date().getTime();
          var timeNow = pubFun.dateFormat(timestamp,'Y年m月d日 H时i分s秒');

          const newUser = new User({
            name:req.body.name,
            email:req.body.email,
            avatar:avatar,
            date:timeNow,
            password:req.body.password
          })

          bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if(err) throw err;

                newUser.password = hash;

                newUser.save()
                       .then(user => res.json({code:1000,user,msg:"注册成功，请登录!"}))
                       .catch(err => console.log(err));
            });
          });


        }
      })
})



//上传业务逻辑处理
router.post("/setavator/:id",urlencodedParser,(req,res,next) => { 
  // console.log(req.params.id)
  // 用ID 作后缀
  var form = new formidable.IncomingForm();
  form.uploadDir = path.normalize(__dirname + '/../../dist/static/avatar');
  form.parse(req, (err, fields, files) => {
    var oldpath = files.avator.path;
    var newpath = path.normalize(__dirname + '/../../dist/static/avatar') + '/' + req.params.id + '.jpg';
    fs.rename(oldpath, newpath, (err) => {
      if (err) {
        res.send('失败！');
        return;
      }
      var avatar = req.params.id + '.jpg';
      //更改数据库当前用户的avatar这个值

      // console.log(req.params.id)
      // return false
      User.findOne({
        _id:req.params.id
      })
      .then(user=>{
        
        user.avatar = avatar;
        console.log(user)
        // return false
        user.save().then(user=>{
          // req.flash("success_msg","头像更新成功");
          // res.json(user);
          res.redirect('/myresume?avatar='+avatar);
          res.json(user);
        })
      })
    });
  });
})


// $route  POST api/users/login
// @desc   返回token jwt passport
// @access public

router.post("/login",(req,res) => {
  const {errors,isValid} = validateLoginInput(req.body);

  // 判断isValid是否通过
  if(!isValid){
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;
  // 查询数据库
  User.findOne({email})
      .then(user => {
        if(!user){
          return res.json({msg:"用户不存在!",code:400});
        }

        // 密码匹配
        bcrypt.compare(password, user.password)
              .then(isMatch => {
                if(isMatch){
                  //要想输出内容就在规则里加输出字段
                  const rule = {id:user.id,name:user.name,avatar:user.avatar,status:user.status};
                  jwt.sign(rule,keys.secretOrKey,{expiresIn:28800},(err,token) => {
                    if(err) throw err;
                    res.json({
                      success:true,
                      token:"Bearer " + token,
                      code:1000
                    });
                  })
                  // res.json({msg:"success"});
                }else{
                  return res.json({msg:"密码错误!",code:400});
                }
              })
      })
})

// $route  GET api/users/current
// @desc   return current user
// @access Private
router.get("/current",passport.authenticate('jwt', { session: false }),(req,res) => {
  res.json({
    id:req.user.id,
    name:req.user.name,
    avatar:req.user.avatar,
    email:req.user.email
  });
})

//做请求用，用来做登录验证
// $route  GET api/users/flg
router.get("/flg",passport.authenticate('jwt', { session: false }),(req,res) => {
  res.json({
    id:req.user.id,
    name:req.user.name,
    // avatar:req.user.avatar,
    // email:req.user.email
  });
})

//做请求邮件使用
// $route  POST api/users/nodemail
router.post("/nodemail",(req,res) => {
  let thost = req.body.thost
  let transporter = nodemailer.createTransport({
    // host: 'smtp.ethereal.email',
    service: 'qq', // 使用了内置传输发送邮件 查看支持列表：https://nodemailer.com/smtp/well-known/
    port: 465, // SMTP 端口
    secureConnection: true, // 使用了 SSL
    auth: {
      user: 'xituclub@foxmail.com',
      // 这里密码不是qq密码，是你设置的smtp授权码
      pass: 'ynrpmpoyclbbbjib',
    }
  });
  
  //先执行查库 看看有没有这个人
  User.findOne({email:req.body.email})
    .then(user => {
      if(!user){
        return res.json({msg:"用户不存在!",code:400});
      }

      //要想输出内容就在规则里加输出字段
      const rule = {id:user.id,name:user.name,email:user.email};
      jwt.sign(rule,keys.secretOrKey,{expiresIn:600},(err,token) => {
        if(err) throw err;
        // console.log(token)

        let mailOptions = {
          from: `"稀土club" <xituclub@foxmail.com>`, // sender address
          to: user.email, // list of receivers
          subject: '稀土club重置密码', // Subject line
          // 发送text或者html格式
          // text: 'Hello world?', // plain text body
          html: `
          <p>欢迎使用稀土club重置密码功能。请点击以下链接重置您的密码
          <a href="${thost}/resetPasswordByUrl?email=${user.email}&&token=${'Bearer '+token}">
          ${thost}/resetPasswordByUrl?email=${user.email}&&token=${'Bearer '+token}
          </a>
          （链接10分钟内有效，如无法点击，请复制链接到浏览器访问）
          </p> ` // html body
        };
        
        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            res.json({msg:error,code:400})
            // return console.log(error);
          }
          // token:"Bearer " + token,
          return res.json({msg:'邮件发送成功！请及时修改密码',code:1000})
          // console.log('Message sent: %s', info.messageId);
          // Message sent: <04ec7731-cc68-1ef6-303c-61b0f796b78f@qq.com>
        });
      })
    })
})


// $route  POST api/users/resetPassword
// @desc   修改密码
// @access public
router.post("/resetPassword",(req,res) => {
  let token = req.body.token.substring(7),email =req.body.email
  jwt.verify(token, keys.secretOrKey, function (err, decode) {
    if (err) {  //  时间失效的时候/ 伪造的token          
      console.log('lost')     
      return res.json({msg:'修改密码时间过期，请重发邮件修改',code:400})    
    } else {
      console.log(decode)
      if(decode.email==req.body.email){
        // 查询数据库中是否拥有邮箱
        User.findOne({email:req.body.email})
        .then(da => {
            bcrypt.genSalt(10, function(err, salt) {
              bcrypt.hash(req.body.password, salt, (err, hash) => {
                  if(err) throw err;
                  da.password = hash;
                  da.save()
                    .then(user => res.json({code:1000,user,msg:"修改成功，请登录!"}))
                    .catch(err => console.log(err));
              });
            });
        })
      }
    }
  })
  return false
})


module.exports = router;