const express = require("express");
const path = require('path');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const router = express.Router();
const pubFun = require('../../config/public');
const passport = require("passport");
const validateIdeasInput = require("../../validation/ideas");
//自定义权限判断
const authorize = require("../../validation/authorize");

const User = require("../../models/User");
const bcrypt = require("bcrypt");

// 引入模型
require("../../models/Idea");
const Ideas = mongoose.model('ideas');
const SubjectMenuSchema = require("../../models/SubjectMenu");

// body-parser middleware
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: true });

//文章列表list,登录者授权
router.get("/listAll",(req,res)=>{
  // let countS= Ideas.distinct("checkT",{"checkT" : true}).length
  // console.log(countS)
  
  Ideas.find({checkT:true},{title:1,description:1,date:1,imgs:1})
    .sort({date:"desc"})
    .populate('user',["name","avatar"])
    .then(ideas=>{
      // console.log(ideas.length)
      let newArr ={}
      newArr.Nums = ideas.length;newArr.data = ideas
      res.json(newArr)
    })
    .catch(err => res.status(404).json({msg:"查询出错了!"}))
})

// db.test.find().sort({"age":1}).skip(2).limit(2);

router.post("/listAlls",(req,res)=>{
  var total
  Ideas.find().count().then(data=>{
    total = data
  })
  let num=Number(req.body.num),pageNum=Number(req.body.pageNum)
  // console.log(num,pageNum)
  // 0,3  /3,3
  Ideas.find({},{title:1,description:1,date:1,checkT:1}).sort({date:-1})
  .populate('user',["name","avatar"])
  .populate('subjectId',["subjectName"])
  .skip(num).limit(pageNum).then(data=>{
    res.json({msg:'数据',data,total:total,code:1000})
  })
  .catch(err => res.status(404).json({msg:"查询出错了!"})) 
  return false 
})



//文章列表list,当前登录者的
router.get("/list",passport.authenticate('jwt', { session: false }),(req,res)=>{
  // console.log(req.user._id+'测试')

  Ideas.find({user:req.user.id},{ description: 1,checkT:1,_id:1,imgs:1,date:1})
    .populate('user',["name","avatar"])
    .populate('subjectId',["subjectName"])
    .sort({date:"desc"})
    .then(ideas=>{
      res.json(ideas)
      // console.log(ideas)
      return false
    })
  })


// $route  POST api/ideas/add
// @desc   创建一个发文章接口
// @access Private
// router.post("/",ensureAuthenticated,(req,res)=>{
router.post("/add",passport.authenticate('jwt', { session: false }),(req,res) => {
  // console.log(req.user)
  if(req.authInfo.authorize==false){
    res.json({"msg":"访客无权限!",code:400})
    return false
  }
  const {errors,isValid} = validateIdeasInput(req.body);
  // 判断isValid是否通过
  if(!isValid){
    return res.status(400).json(errors);
  }

  var timestamp=new Date().getTime();
  var timeNow = pubFun.dateFormat(timestamp,'Y年m月d日 H时i分s秒');

  const newInfo= {
    title:req.body.title,
    subjectId:req.body.subjectId,
    details:req.body.details,
    description:req.body.description,
    user:req.user.id,
    checkT:req.body.checkT,
    date:timeNow
  }

  //多张图
  if(req.body.imgs){
    newInfo.imgs = req.body.imgs.split('|');
  }

  new Ideas(newInfo)
    .save()
    .then(ideas => {
      // req.flash("success_msg","数据添加成功!");
      res.json({"success_msg":"文章添加成功!"})
    })
    .catch(err => res.status(404).json({msg:"文章没添加成功!",code:1000}))
})

//去到查看页面查看详情
router.get("/details/:id",(req,res)=>{
  Ideas.findOne({
    _id:req.params.id
  })
  .populate('user',["name"])
  .populate('subjectId',["subjectName"])
  .then( ideas => {
    res.json(ideas)

    // if(ideas.user != req.user.id){
    //   res.json({"error_msg":"非法操作~!"})
    //   // req.flash("error_msg","非法操作~!");
    //   // res.redirect("/ideas");
    // }else{
    //   res.json(ideas)
    // }
  })
  .catch(err => res.status(404).json({msg:"查询出错再试一次!"}))
})


//去到查看编辑页面详情
router.get("/artedit/:id",passport.authenticate('jwt', { session: false }),(req,res)=>{
  Ideas.findOne({
    _id:req.params.id
  })
  .then( ideas => {
    res.json(ideas)
    // res.json({ideas,code:1000})
  })
  .catch(err => res.status(404).json({msg:"查询出错再试一次!"}))
})

// $route  POST api/ideas/edit
// @desc   创建一个编辑文章接口
// @access Private
// router.post("/",ensureAuthenticated,(req,res)=>{
  router.post("/edit/:id",passport.authenticate('jwt', { session: false }),(req,res) => {
    if(req.authInfo.authorize==false){
      res.json({"msg":"访客无权限!",code:400})
      return false
    }
    
    const {errors,isValid} = validateIdeasInput(req.body);
    // 判断isValid是否通过
    if(!isValid){
      return res.status(400).json(errors);
    }
  
    var timestamp=new Date().getTime();
    var timeNow = pubFun.dateFormat(timestamp,'Y年m月d日 H时i分s秒');
    Ideas.findOne({
      _id:req.params.id
    })
    .then(idea=>{

      //多张图
      if(req.body.imgs){
        idea.imgs = req.body.imgs.split('|');
      }
      idea.title = req.body.title;
      idea.details = req.body.details;
      idea.description = req.body.description;
      idea.checkT=req.body.checkT;
      idea.date = timeNow;
      idea.subjectId = req.body.subjectId;
      idea.save()
        .then(idea => {
          res.json({"success_msg":"文章编辑成功!"})
      })
      .catch(err => res.status(404).json({msg:"文章没编辑成功!"}))
    })
  })


// $route  POST api/ideas/checkT
// @desc   创建一个编辑文章展示的接口
// @access Private
  router.post("/checkT/:id",passport.authenticate('jwt', { session: false }),(req,res) => {
    if(req.authInfo.authorize==false){
      res.json({"msg":"访客无权限!",code:400})
      return false
    }

    Ideas.findOne({
      _id:req.params.id
    })
    .then(idea=>{
      if(idea.user != req.user.id){
        res.json({"msg":"非法操作~!"})
        return false
      }

      idea.checkT = !idea.checkT;
      idea.save()
        .then(idea => {
          res.json({"success_msg":"操作成功!"})
      })
      .catch(err => res.status(404).json({msg:"操作没成功!"}))
    })
  })


// $route  delete api/ideas/delete
// @desc   创建一个删除文章接口
// @access Private
router.delete("/delete/:id",passport.authenticate('jwt', { session: false }),(req,res)=>{
  if(req.authInfo.authorize==false){
    res.json({"msg":"访客无权限!",code:400})
    return false
  }
  
  Ideas.findOne({
    _id:req.params.id
  })
  .then( ideas => {
    ideas.remove({
      _id:req.params.id
    })
    .then(() => {
      res.json({"msg":"数据删除成功!",code:1000});
      // res.redirect("/ideas");
    })
    .catch(err => res.status(404).json({msg:"没有该文章信息"}))
  }) 
})

/***************************  按分类查找文章  ************************ */

router.post("/memu/list",(req,res)=>{
  var mtotal
  Ideas.find({subjectId:req.body.subjectId,checkT:true}).count().then(data=>{
    mtotal = data
  })
  let num=Number(req.body.num),pageNum=Number(req.body.pageNum)
  // console.log(num,pageNum)
  // 0,3  /3,3
  Ideas.find({subjectId:req.body.subjectId,checkT:true},{title:1,description:1,date:1,imgs:1}).sort({date:-1})
    .populate('user',["name","avatar"])
    .skip(num).limit(pageNum).then(data=>{
      res.json({msg:'数据',data,total:mtotal,code:1000})
    })
    .catch(err => res.status(404).json({msg:"查询出错了!"}))
})


//处理用户表
//api/admin/listUsers
router.post("/listUsers",(req,res)=>{
  var total
  User.find().count().then(data=>{
    total = data
  })
  let num=Number(req.body.num),pageNum=Number(req.body.pageNum)
  // console.log(num,pageNum)
  // 0,3  /3,3
  User.find({},{password:0}).sort({date:-1})
  .skip(num).limit(pageNum).then(data=>{
    res.json({msg:'数据',data,total:total,code:1000})
  })
  .catch(err => res.status(404).json({msg:"查询出错了!"})) 
  return false 
})

// $route  POST api/admin/status
// @desc   改变状态
// @access Private
  router.post("/UserStatus",passport.authenticate('jwt', { session: false }),(req,res) => {
    if(req.authInfo.authorize==false){
      res.json({"msg":"访客无权限!",code:400})
      return false
    }

    User.findOne({'_id':req.body._id})
    .then(user=> {
      if(user){
        user.status = req.body.status
        user.save()
          .then(data=>{
            res.json({"msg":"操作成功!",code:1000,data})
          })
          .catch(err => res.status(404).json({msg:"操作没成功!"}))
      }
    })
  })  


// $route  POST api/admin/changeUser
// @desc   改变状态
// @access Private
  router.post("/changeUser",passport.authenticate('jwt', { session: false }),(req,res) => {
    if(req.authInfo.authorize==false){
      res.json({"msg":"访客无权限!",code:400})
      return false
    }

    User.findOne({'_id':req.body._id})
    .then(user=> {
      if(user){
        user.name = req.body.name
        user.email = req.body.email
        if(req.body.password){
          bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(req.body.password, salt, (err, hash) => {
              if(err) throw err;
              user.password = hash;
              user.save()
                .then(user => res.json({code:1000,user,msg:"修改密码成功!"}))
                .catch(err => console.log(err));
            });
          });
        }else if(req.body.password==null){
          user.save()
          .then(data=>{
            res.json({"msg":"操作成功!",code:1000,data})
          })
          .catch(err => res.status(404).json({msg:"操作没成功!"}))  
        }
      }
    })
  })  

module.exports = router;