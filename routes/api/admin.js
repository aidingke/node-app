const express = require("express");
const path = require('path');
const fs = require('fs');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const router = express.Router();
const pubFun = require('../../config/public');
const passport = require("passport");
const validateIdeasInput = require("../../validation/ideas");
const jwt = require('jsonwebtoken');
const keys = require("../../config/keys");
const StuQuestionItemSchema = require("../../models/StuQuestionItem");
//专题分类
const CataTopic = require("../../models/CataTopic");
const TopicDetails = require("../../models/TopicDetails");

//自定义权限判断
const authorize = require("../../validation/authorize");

const User = require("../../models/User");
const Topic = require("../../models/Topic");
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
  console.log(req.authInfo)
  
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

// $route  POST api/admin/editArticle
// @desc   创建一个编辑文章接口
// @access Private
// router.post("/",ensureAuthenticated,(req,res)=>{
  router.post("/editArticle/:id",passport.authenticate('jwt', { session: false }),(req,res) => {
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
          res.json({"success_msg":"文章编辑成功!",code:1000})
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


// $route  delete api/admin/deleteArticle
// @desc   创建一个删除文章接口
// @access Private
router.delete("/deleteArticle/:id",passport.authenticate('jwt', { session: false }),(req,res)=>{
  if(req.authInfo.authorize==false){
    res.json({"msg":"访客无权限!",code:400})
    return false
  }
  Ideas.findOne({
    _id:req.params.id
  }).then( ideas => {

     //删除图片
     let newArr = pubFun.searchImgUrl(ideas.details)
     newArr.forEach(v=>{
       console.log(v)
       fs.unlink(path.normalize(__dirname+'/../../public' +v), function(err) {
         if (err) {
           return console.error(err);
         }
         console.log("文件删除成功！");
       });
     })


    ideas.remove({
      _id:req.params.id
    }).then(() => {
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

  // $route  delete api/admin/deleteUser
// @desc   创建一个删除文章接口
// @access Private
router.delete("/deleteUser/:id",passport.authenticate('jwt', { session: false }),(req,res)=>{
  if(req.authInfo.authorize==false){
    res.json({"msg":"访客无权限!",code:400})
    return false
  }
  //超管有权限删除
  if(req.authInfo.super==true){
    User.findOne({
      _id:req.params.id
    }).then( User => {
      User.remove({
        _id:req.params.id
      }).then(() => {
        res.json({"msg":"数据删除成功!",code:1000});
        // res.redirect("/ideas");
      })
      .catch(err => res.status(404).json({msg:"没有该用户信息"}))
    })
  }
})


// $route  POST api/admin/loginAdmin
// @desc   返回token jwt passport
// @access public

router.post("/loginAdmin",(req,res) => {
  const email = req.body.email;
  const password = req.body.password;
  // 查询数据库
  User.findOne({email})
    .then(user => {
      if(!user){
        return res.json({msg:"用户不存在!",code:400});
      }
      if(user.status=='0'||user.status=='1'||user.status=='2'){
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
      }else{
        res.json({msg:"无权限访问!",code:400});
        return false
      }
    })
})


//***************************试卷管理**********************************
// $route  POST api/admin/getAnswerListAll
// @desc   获取所有试题接口
// @access Public
router.post("/getAnswerListAll",passport.authenticate('jwt', { session: false }),(req,res)=>{
  var total
  StuQuestionItemSchema.find().count().then(data=>{
    total = data
  })
  let num=Number(req.body.num),pageNum=Number(req.body.pageNum)
  StuQuestionItemSchema.find({},{"bigList":0,"user":0})
  .sort({date:"desc"})
  .skip(num).limit(pageNum).then(data=>{
    res.json({msg:'数据',data,total:total,code:1000})
  })
  .catch(err => res.status(404).json({msg:"查询出错了!"}))
})

/*添加专题*/
// $route  POST api/admin/addTopic
// @desc   添加专题
// @access Public
router.post("/addTopic",passport.authenticate('jwt', { session: false }),(req,res) => {
  if(req.authInfo.authorize==false){
    res.json({"msg":"访客无权限!",code:400})
    return false
  }
  var timestamp=new Date().getTime();
  var timeNow = pubFun.dateFormat(timestamp,'Y年m月d日 H时i分s秒')
  const newInfo= {
    topicStatus:req.body.topicStatus,
    topicName:req.body.topicName,
    user:req.user.id,
    date:timeNow
  }
  //多张图
  if(req.body.imgs){
    newInfo.imgs = req.body.imgs
  }

  new Topic(newInfo)
    .save()
    .then(data => {
      res.json({"success_msg":"数据添加成功!",code:1000,data})
    })
    .catch(err => res.status(404).json({msg:"没添加成功!",code:400}))
})

/*添加专题*/
// $route  POST api/admin/editTopic
// @desc   添加专题
// @access Public
router.post("/editTopic",passport.authenticate('jwt', { session: false }),(req,res) => {
  if(req.authInfo.authorize==false){
    res.json({"msg":"访客无权限!",code:400})
    return false
  }
  var timestamp=new Date().getTime();
  var timeNow = pubFun.dateFormat(timestamp,'Y年m月d日 H时i分s秒')
  Topic.findOne({
    _id:req.body.topicId
  }).then(da=>{
    if(req.body.imgs){
      da.imgs = req.body.imgs
    }
    if(req.body.imgs.length==0){
      da.imgs=[]
    }
    da.topicStatus = req.body.topicStatus
    da.topicName = req.body.topicName
    da.user = req.user.id
    da.date = timeNow
    da.save()
      .then(data => {
        res.json({"msg":"专题编辑成功!",code:1000,data})
      })
      .catch(err => res.status(404).json({msg:"专题没有编辑成功!",code:400}))
  })
})



/*添加专题下面的分类*/
// $route  POST api/admin/addCataTopic
// @desc   添加专题下面的分类
// @access Public
router.post("/addCataTopic",passport.authenticate('jwt', { session: false }),(req,res) => {
  if(req.authInfo.authorize==false){
    res.json({"msg":"访客无权限!",code:400})
    return false
  }
  var timestamp=new Date().getTime();
  var timeNow = pubFun.dateFormat(timestamp,'Y年m月d日 H时i分s秒');
  const newInfo= {
    cataName:req.body.cataName,
    topicId:req.body.topicId,
    user:req.user.id,
    date:timeNow
  }

  new CataTopic(newInfo)
    .save()
    .then(data => {
      res.json({"success_msg":"数据添加成功!",code:1000,data})
    })
    .catch(err => res.status(404).json({msg:"没添加成功!",code:400}))
})

// $route  POST api/admin/getCataTopicList
// @desc   获取所有该专题的所有分类接口
// @access Public
router.post("/getCataTopicList",(req,res)=>{
  if(req.body.topicId==null){
    res.json({msg:'缺少专题ID',code:400})
    return false
  }
  CataTopic.find({'topicId':req.body.topicId})
  .populate('user',["name"])
  .sort({date:1})
  .then(data=>{
    Topic.find({'_id':req.body.topicId},{topicName:1})
    .then(da=>{
      res.json({msg:'数据',data,code:1000,topicName:da[0].topicName})
    })
  })
  .catch(err => res.status(404).json({msg:"查询出错了!"}))
})

// $route  POST api/admin/getTopicList
// @desc   获取所有试题接口
// @access Public
router.post("/getTopicList",(req,res)=>{
  var total
  Topic.find().count().then(data=>{
    total = data
  })
  let num=Number(req.body.num),pageNum=Number(req.body.pageNum)
  Topic.find({})
  .sort({date:-1})
  .skip(num).limit(pageNum).then(data=>{
    res.json({msg:'数据',data,total:total,code:1000})
  })
  .catch(err => res.status(404).json({msg:"查询出错了!"}))
})


/*添加专题分类下面的内容*/
// $route  POST api/admin/addTopicDetails
// @desc   添加专题下面的分类
// @access Public
router.post("/addTopicDetails",passport.authenticate('jwt', { session: false }),(req,res) => {
  if(req.authInfo.authorize==false){
    res.json({"msg":"访客无权限!",code:400})
    return false
  }
  var timestamp=new Date().getTime();
  var timeNow = pubFun.dateFormat(timestamp,'Y年m月d日 H时i分s秒');
  const newInfo= {
    title:req.body.title,
    details:req.body.details,
    topicCataId:req.body.topicCataId,
    topicId:req.body.topicId,
    user:req.user.id,
    date:timeNow
  }

  new TopicDetails(newInfo)
    .save()
    .then(data => {
      res.json({"msg":"数据添加成功!",code:1000,data})
    })
    .catch(err => res.status(404).json({msg:"没添加成功!",code:400}))
})

/*编辑专题分类下面的内容*/
// $route  POST api/admin/editTopicDetails
// @desc   添加专题下面的分类
// @access Public
router.post("/editTopicDetails",passport.authenticate('jwt', { session: false }),(req,res) => {
  if(req.authInfo.authorize==false){
    res.json({"msg":"访客无权限!",code:400})
    return false
  }
  var timestamp=new Date().getTime();
  var timeNow = pubFun.dateFormat(timestamp,'Y年m月d日 H时i分s秒');
  
  TopicDetails.findOne({
    _id:req.body.id
  })
  .then(data=>{
    data.title = req.body.title
    data.details = req.body.details
    data.topicCataId = req.body.topicCataId
    data.topicId = req.body.topicId
    data.date = timeNow
    data.save()
      .then(da => {
        res.json({"msg":"专题编辑成功!",code:1000})
      })
      .catch(err => res.status(404).json({msg:"没添加成功!",code:400}))
  })
  
})

// $route  POST api/admin/getTopicCataAllList
// @desc   获取所有该专题分类的接口
// @access Public
router.post("/getTopicCataAllList",(req,res)=>{
  TopicDetails.find({topicId:req.body.topicId},{title:1,_id:1,topicCataId:1})
  .sort({date:-1})
  .then(data=>{
      CataTopic.find({topicId:req.body.topicId})
      .then(dataCat=>{
        let newList=[]
        dataCat.forEach((v,i)=>{
          let itemobj={},children=[]
          data.forEach(vv=>{
            if(vv.topicCataId==v._id){
              let a={}
              a.title = vv.title
              a.id = vv._id
              children.push(a)
              itemobj.cataName = v.cataName
              itemobj.id = v._id
              itemobj.children=children
            }else{
              itemobj.cataName = v.cataName
              itemobj.id = v._id
            }
          })
          newList.push(itemobj)
        })
        data.forEach(d=>{
          if(d.topicCataId.length==0){
            let a={cataName:d.title,id:d._id}
            newList.unshift(a)
          }
        })

        Topic.find({'_id':req.body.topicId},{topicName:1,topicStatus:1})
          .then(da=>{
            res.json({msg:'数据',newList,code:1000,topicName:da[0].topicName,topicStatus:da[0].topicStatus})
          })  
      })
    
  })
  // .catch(err => res.status(404).json({msg:"查询出错了!"}))
})


// $route  delete api/admin/deleTopicDetail
// @desc   创建一个删除文章接口
// @access Private
router.delete("/deleTopicDetail/:id",passport.authenticate('jwt', { session: false }),(req,res)=>{
  if(req.authInfo.authorize==false){
    res.json({"msg":"访客无权限!",code:400})
    return false
  }
  //超管有权限删除
  if(req.authInfo.super==true){
    TopicDetails.findOne({
      _id:req.params.id
    }).then( data => {
      data.remove({
        _id:req.params.id
      }).then(() => {
        //删除图片文件
        let newArr = pubFun.searchImgUrl(data.details)
        newArr.forEach(v=>{
          console.log(v)
          fs.unlink(path.normalize(__dirname+'/../../public' +v), function(err) {
            if (err) {
              return console.error(err);
            }
            console.log("文件删除成功！");
          });
        })

        res.json({"msg":"数据删除成功!",code:1000});
      })
      .catch(err => res.status(404).json({msg:"没有该用户信息"}))
    })
  }
})


// $route  POST api/admin/getTopicContent
// @desc   获取所有该专题该标题的内容接口
// @access Public
router.post("/getTopicContent",(req,res)=>{
  TopicDetails.findOne({_id:req.body.id})
  .then(data=>{
    res.json({msg:'数据请求成功',code:1000,data})
  }) 
})

module.exports = router;