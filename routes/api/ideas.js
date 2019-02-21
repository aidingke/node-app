const express = require("express");
const path = require('path');
const fs = require('fs');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const router = express.Router();
const pubFun = require('../../config/public');
// const ideas = require("../../models/Idea");
const passport = require("passport");
const validateIdeasInput = require("../../validation/ideas");

// const {ensureAuthenticated} = require('../helpers/auth');
// const ueditor = require("ueditor");


// $route  GET api/profile/test
// @desc   返回的请求的json数据
// @access public
router.get("/test",(req,res) => {
  res.json({msg:"ideas works"})
})

router.post("/fake",(req,res) => {
  console.log(req.body)
  res.json({msg:"fake works "})
})

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
  Ideas.find({checkT:true}).count().then(data=>{
    total = data
  })
  let num=Number(req.body.num),pageNum=Number(req.body.pageNum)
  // console.log(num,pageNum)
  // 0,3  /3,3
  Ideas.find({checkT:true},{title:1,description:1,date:1,imgs:1}).sort({date:-1})
  .populate('user',["name","avatar"])
  .skip(num).limit(pageNum).then(data=>{
    res.json({msg:'数据',data,total:total,code:1000})
  })
  .catch(err => res.status(404).json({msg:"查询出错了!"})) 
  return false 
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





//   /:page/:size
//   上拉加载接口
router.get("/listsAll/:page/:size",(req,res)=>{
  Ideas.find({checkT:true})
    .sort({date:"desc"})
    .populate('user',["name"])
    .then(ideas=>{
      if(!ideas){
        res.status(404).json('没有任何信息')
      }else{
        let size = req.params.size
        let page = req.params.page
        let index = size*(page-1)
        let newArrs = []
        for(let i=index;i<size*page;i++){
          if(ideas[i] !=null){
            newArrs.push(ideas[i]);
          }
        }
        res.json(newArrs)
      }
    })
    .catch(err => res.status(404).json({msg:"查询出错了!"}))
})


//文章列表list,当前登录者的
router.post("/list",passport.authenticate('jwt', { session: false }),(req,res)=>{
  var total
  Ideas.find({user:req.user.id}).count().then(data=>{
    total = data
  })
  let num=Number(req.body.num),pageNum=Number(req.body.pageNum)
  Ideas.find({user:req.user.id},{title:1, description: 1,checkT:1,_id:1,imgs:1,date:1})
    .populate('user',["name","avatar"])
    .populate('subjectId',["subjectName"])
    .sort({date:"desc"}).skip(num).limit(pageNum)
    .then(data=>{
      res.json({msg:'数据请求成功',data,total:total,code:1000})
      return false
    })
  })


// $route  POST api/ideas/add
// @desc   创建一个发文章接口
// @access Private
// router.post("/",ensureAuthenticated,(req,res)=>{
router.post("/add",passport.authenticate('jwt', { session: false }),(req,res) => {
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
    newInfo.imgs = req.body.imgs;
  }

  new Ideas(newInfo)
    .save()
    .then(ideas => {
      // req.flash("success_msg","数据添加成功!");
      res.json({"success_msg":"文章添加成功!"})
    })
    .catch(err => res.status(404).json({msg:"文章没添加成功!"}))
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
    if(ideas.user != req.user.id){
      res.json({"msg":"不是本人的非法操作~!",code:400})
      return false
    }
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
      if(req.body.imgs.length>0){
        idea.imgs = req.body.imgs
        //多张图
        // if(req.body.imgs){
        //   idea.imgs = req.body.imgs.split('|');
        // }
      }
      if(req.body.imgs.length==0){
        idea.imgs=[]
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
  Ideas.findOne({
    _id:req.params.id
  })
  .then( ideas => {

    if(ideas.user != req.user.id){
      res.json({"msg":"非法操作~!"})
    }else{

      ideas.remove({
        _id:req.params.id
      })
      .then(() => {
        res.json({"msg":"数据删除成功!"});
        let newArr = pubFun.searchImgUrl(ideas.details)
        console.log("准备删除文件！");
        newArr.forEach(v=>{
          console.log(v)
          fs.unlink(path.normalize(__dirname+'/../../public' +v), function(err) {
            if (err) {
              return console.error(err);
            }
            console.log("文件删除成功！");
          });
        })

        // res.redirect("/ideas");
      })
      .catch(err => res.status(404).json({msg:"没有该文章信息"}))
    }
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

  // console.log(req.body.subjectId)
  // Ideas.find({subjectId:req.body.subjectId,checkT:true},{title:1,description:1,date:1,imgs:1})
  //   .sort({date:"desc"})
  //   .populate('user',["name",'avatar'])
  //   .then(data=>{
  //     // res.json(data)
  //     res.json({"success":"菜单列表请求成功!","code":1000,data})
  //     if(!data){
  //       res.status(404).json('没有任何信息')
  //     }else{
  //       let size = req.body.size
  //       let page = req.body.page
  //       let index = size*(page-1)
  //       let newArrs = []
  //       for(let i=index;i<size*page;i++){
  //         if(data[i] !=null){
  //           newArrs.push(data[i]);
  //         }
  //       }
  //       res.json(newArrs)
  //     }
  //   })
  //   .catch(err => res.status(404).json({msg:"查询出错了!"}))
})


// $route  POST api/ideas/Search
// @desc   获取搜索内容接口
// @access Public
router.post("/Search",(req,res)=>{
  let reg = new RegExp(req.body.query,'i'),mtotal,num=Number(req.body.num),pageNum=Number(req.body.pageNum);
  Ideas.find({title:{$regex : reg},checkT:true}).count().then(data=>{
    mtotal = data
  })
  Ideas.find({title:{$regex : reg},checkT:true},{title:1,description:1,date:1})
  .populate('user',["name"])
  .populate('subjectId',["subjectName"])
  .sort({date:"desc"})
  .skip(num).limit(pageNum).then(data=>{
    res.json({msg:'数据',data,total:mtotal,code:1000})
  })
  .catch(err => res.status(404).json({msg:"查询出错再试一次!",code:400}))
})




module.exports = router;