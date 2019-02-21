const express = require("express");
const path = require('path');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const router = express.Router();
const pubFun = require('../../config/public');
const passport = require("passport");
const QuestionItemSchema = require("../../models/QuestionItem");
const SubjectMenuSchema = require("../../models/SubjectMenu");
const StuQuestionItemSchema = require("../../models/StuQuestionItem");
const QuestionItemBankSchema = require("../../models/QuestionItemBank");
const AnswerItemSchema = require("../../models/AnswerItem");


// body-parser middleware
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: true });


// $route  POST api/teach/add
// @desc   创建一个发试题接口
// @access Private
// router.post("/",ensureAuthenticated,(req,res)=>{
  router.post("/add",passport.authenticate('jwt', { session: false }),(req,res) => {
    var timestamp=new Date().getTime();
    var timeNow = pubFun.dateFormat(timestamp,'Y年m月d日 H时i分s秒');

    const newInfo= {
      subject:req.body.subjectId.toString(),
      questKind:req.body.questKind.toString(),
      questDesc:req.body.questDesc.toString(),
      questAnswer:req.body.questAnswer.toString(),
      itemList:req.body.itemList,
      date:timeNow,
      user:req.user.id
    }

    req.body.questImg?newInfo.questImg=req.body.questImg:newInfo.questImg=""
    // console.log(newInfo)
    new QuestionItemSchema(newInfo)
      .save()
      .then(data => {
        // req.flash("success_msg","数据添加成功!");
        res.json({"success":"题目添加成功!","code":1000})
      })
      .catch(err => res.status(404).json({msg:"题目没添加成功!"}))
  })

// $route  POST api/teach/addMenu
// @desc   创建一个发菜单分类接口
// @access Private
  router.post("/addMenu",passport.authenticate('jwt', { session: false }),(req,res) => {
    var timestamp=new Date().getTime();
    var timeNow = pubFun.dateFormat(timestamp,'Y年m月d日 H时i分s秒');

    const newInfo= {
      subjectName:req.body.subjectName,
      date:timeNow,
      user:req.user.id
    }
    new SubjectMenuSchema(newInfo)
      .save()
      .then(data => {
        res.json({"success":"菜单添加成功!","code":1000})
      })
      .catch(err => res.status(404).json({msg:"题目没添加成功!"}))
  })


// $route  POST api/teach/listMenu
// @desc   获取分类列表
// @access Public  
router.get("/listMenu",(req,res)=>{
    SubjectMenuSchema.find({},{ subjectName: 1,status:1,_id:1})
    // SubjectMenuSchema.find({})
    .sort({date:"desc"})
    .then(data=>{
      res.json({"success":"菜单列表请求成功!","code":1000,data})
    })
    .catch(err => res.status(404).json({msg:"查询出错了!"}))
})

//题库列表，参数 题目类型单选、菜单分类前端 
router.post("/listAll",(req,res)=>{
  //查询分类，如果传过来的参数是 前端ID 查全部，其他查单个分类
  var mainId='',a={}
  SubjectMenuSchema.find({},{ subjectName: 1,status:1,_id:1})
  .then(data=>{
    //查找前端ID
    data.forEach(v=>{
      if(v.status==1){
        mainId = v._id
      }
    })

    if(req.body.subject==mainId){
      a={questKind:req.body.questKind}
    }else{
      a={subject:req.body.subject,questKind:req.body.questKind}
    }
  
    QuestionItemSchema.find(a)
      .sort({date:"desc"})
      .then(data=>{
        let newArr ={}
        newArr.Nums = data.length;newArr.data = data
        res.json({"success":"题目列表请求成功!","code":1000,newArr})
      })
      .catch(err => res.status(404).json({msg:"查询出错了!"}))
  })
  return false
  
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
router.get("/list",passport.authenticate('jwt', { session: false }),(req,res)=>{
  Ideas.find({user:req.user.id})
    .populate('user',["name"])
    .sort({date:"desc"})
    .then(ideas=>{

      res.json(ideas)
      // console.log(ideas)
      return false
    })
  })

//去到查看页面查看详情
router.get("/details/:id",(req,res)=>{
  Ideas.findOne({
    _id:req.params.id
  })
  .populate('user',["name"])
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

      //多张图
      if(req.body.imgs){
        idea.imgs = req.body.imgs.split('|');
      }
      idea.title = req.body.title;
      idea.details = req.body.details;
      idea.description = req.body.description;
      idea.checkT=req.body.checkT;
      idea.date = timeNow;

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
        // res.redirect("/ideas");
      })
      .catch(err => res.status(404).json({msg:"没有该文章信息"}))
    }
  }) 
})


// $route  delete api/teach/testPaper
// @desc   获取所有试题接口
// @access Public
router.post("/testPaper",(req,res)=>{
  var newList=[],sinData=[],mulData=[],comData=[],DisData=[]
  //查找web前端 和 vue.js 且答案不查出来 questAnswer :0
  QuestionItemSchema.find({"questKind":'0'},{"questAnswer":0}).limit(20)
    .sort({date:1})
    .then(data=>{
      // console.log(data)
      sinData = pubFun.randomArrs(data)
      QuestionItemSchema.find({"questKind":'1'},{"questAnswer":0}).limit(20)
        .sort({date:1})
        .then(data=>{
          // mulData = data
          mulData = pubFun.randomArrs(data);
          res.json({sinData,mulData,code:1000})
        }) 
      // sinData = data
    })
    return false
  // QuestionItemSchema.find({})
  //   .sort({date:1})
  //   .then(data=>{
  //     data.forEach((v,i)=>{
  //       if(v.questKind==0){
  //         sinData.push(v)
  //       }else if(v.questKind==1){
  //         mulData.push(v)
  //       }else if(v.questKind==2){
  //         comData.push(v)
  //       }else if(v.questKind==3){
  //         DisData.push(v)
  //       }
  //     })
  //     res.json({sinData,mulData,comData,DisData,code:1000})
  //     return false
  //   })
  })

// $route  POST api/teach/submitAnswer
// @desc   随机提交试题接口
// @access Public
router.post("/submitAnswer",passport.authenticate('jwt', { session: false }),(req,res)=>{
  var timestamp=new Date().getTime();
  var timeNow = pubFun.dateFormat(timestamp,'Y年m月d日 H时i分s秒');
  let a=req.body.answerList
  console.log(a)
  //先查询出全部web前端和vue 再匹配组成新的数组
  QuestionItemSchema.find({$or:[{"questKind":"0"},{"questKind":"1"}]},{"user":0,"date":0,"subject":0})
  .then(data=>{
    // console.log(data)
    a.forEach((v,i)=>{
      data.forEach((vv,ii)=>{
        if(v.qcId==vv._id){
          v.answerList = vv
        }
      })
    })
    //有用户就入库
    if(req.user.id){
      const newInfo= {
        bigList:a,
        date:timeNow,
        user:req.user.id
      }
      // res.json({code:1000,newInfo})
      new StuQuestionItemSchema(newInfo)
        .save()
        .then(data => {
          res.json({"success":"试卷已经提交!","code":1000,data:data._id})
        })
        .catch(err => res.status(404).json({msg:"试卷没添加成功!"}))
    }
  })
  return false
})


// $route  POST api/teach/stuSubmitAnswer
// @desc   学生提交试题接口
// @access Public
router.post("/stuSubmitAnswer",passport.authenticate('jwt', { session: false }),(req,res)=>{
  var timestamp=new Date().getTime();
  var timeNow = pubFun.dateFormat(timestamp,'Y年m月d日 H时i分s秒');
  var arr=req.body
  
  //再把答案查询出来
  AnswerItemSchema.find({'questionItembanksId':arr.questionItemBankId})
  .then(data=>{
    // console.log(data[0].answerList)
    arr.bigList.forEach(v=>{
      data[0].answerList.forEach(vv=>{
        if(vv.questionItemId == v.questionItemId){
          v.answerList.questAnswer = vv.questAnswer
        }
      })
    })
    
    //有用户就入库
    if(req.user.id){
      const newInfo= {
        title:arr.title,
        description:arr.description,
        isPublic:arr.isPublic,
        bigList:arr.bigList,
        date:timeNow,
        user:req.user.id
      }
      // res.json({code:1000,newInfo})

      new StuQuestionItemSchema(newInfo)
        .save()
        .then(data => {
          res.json({"success":"试卷已经提交!","code":1000,data:data._id})
        })
        .catch(err => res.status(404).json({msg:"试卷没添加成功!"}))
    }
    // console.log(arr)
  })
 
return false




  // //先查询出全部web前端和vue 再匹配组成新的数组
  // QuestionItemSchema.find({$or:[{"questKind":"0"},{"questKind":"1"}]},{"user":0,"date":0,"subject":0})
  // .then(data=>{
  //   // console.log(data)
  //   a.forEach((v,i)=>{
  //     data.forEach((vv,ii)=>{
  //       if(v.qcId==vv._id){
  //         v.answerList = vv
  //       }
  //     })
  //   })
  //   //有用户就入库
  //   if(req.user.id){
  //     const newInfo= {
  //       bigList:a,
  //       date:timeNow,
  //       user:req.user.id
  //     }
  //     // res.json({code:1000,newInfo})
  //     new StuQuestionItemSchema(newInfo)
  //       .save()
  //       .then(data => {
  //         res.json({"success":"试卷已经提交!","code":1000,data:data._id})
  //       })
  //       .catch(err => res.status(404).json({msg:"试卷没添加成功!"}))
  //   }
  // })
  return false
})


// $route  post api/teach/getPaper
// @desc   获取所有试题接口
// @access Public
router.post("/getPaper",(req,res)=>{
StuQuestionItemSchema.find()
    .sort({date:1})
    .then(data=>{
      res.json({"success":"查询成功!","code":2000,data})
    })

return false

  StuQuestionItemSchema.find()
    .sort({date:1})
    .then(data=>{
      let a = data
      a.forEach(
        function(item) {
            item.answerList.forEach(
                function(arr, index) {
                  console.log(item.answerList[index].qcId)
                  


                  QuestionItemSchema.find({'_id':item.answerList[index].qcId}).sort({date:1})
                    .then(data=>{
                      console.log(data)
                      return false
                    })
                }
            )
        }
      )
      // a[0].answerList.forEach(
      //   function(arr, index) {
      //     console.log(arr)
      //   }
      // )
      // console.log(a[0].answerList)
      
    })
})

// $route  POST api/teach/getAnswerPaper
// @desc   获取所有试题接口
// @access Public
router.post("/getAnswerPaper",(req,res)=>{
  StuQuestionItemSchema.find({"_id":req.body.id})
    .populate('user',["name"])
    .then(data=>{
      //组装数组
      let a = data[0],sinData=[],mulData=[],comData=[],DisData=[]
      a.bigList.forEach(v=>{
        if(v.answerList.questKind=='0'){  //单选
          sinData.push(v)
        }else if(v.answerList.questKind=='1'){
          mulData.push(v)
        }else if(v.answerList.questKind=='2'){
          comData.push(v)
        }else if(v.answerList.questKind=='3'){
          DisData.push(v)
        }
      })
      res.json({"success":"查询成功!","code":1000,data,sinData,mulData,comData,DisData,user:data[0].user.name,date:data[0].date})
    })
})


// $route  POST api/teach/getAnswerList
// @desc   获取所有试题接口
// @access Public
router.post("/getAnswerList",passport.authenticate('jwt', { session: false }),(req,res)=>{
  // console.log()
  StuQuestionItemSchema.find({"user":req.user.id},{"bigList":0,"user":0}).limit(20)
  .sort({date:"desc"})
    .then(data=>{
      res.json({"success":"菜单列表请求成功!","code":1000,data})
    })
    .catch(err => res.status(404).json({msg:"查询出错了!"}))
})



// $route  POST api/teach/addTestPaper
// @desc   添加试卷接口
// @access Public
router.post("/addTestPaper",passport.authenticate('jwt', { session: false }),(req,res)=>{
  var timestamp=new Date().getTime();
  var timeNow = pubFun.dateFormat(timestamp,'Y年m月d日 H时i分s秒');
  let a=req.body.bigList
  var b=[]
  // console.log(a)
  // return false
  a.forEach(v=>{
    let c={}
    c.questionItemId = v._id
    c.questKind = v.questKind
    c.questDesc = v.questDesc
    c.questAnswer = v.questAnswer
    c.questImg = v.questImg
    c.scores = v.scores
    c.itemList = v.itemList
    b.push(c)
  })

  //入库
  const newInfo= {
    title:req.body.title,
    description:req.body.description,
    isPublic:req.body.isPublic,
    bigList:b,
    date:timeNow,
    user:req.user.id
  }
  // res.json({code:1000,newInfo})
  new QuestionItemBankSchema(newInfo)
    .save()
    .then(data => {
      //入库答案表
      let answerList=[]
      b.forEach(v=>{
        let a={}
        a.questAnswer=v.questAnswer,a.questionItemId=v.questionItemId
        answerList.push(a)
      })
      const newInfos= {
        questionItembanksId:data._id,
        answerList:answerList
      }
      new AnswerItemSchema(newInfos)
        .save()
        .then(datas=>{
          res.json({"msg":"试卷添加成功!","code":1000,data})
        })
    })
    .catch(err => res.json({msg:"试卷没添加成功!","code":400}))
  return false
})

// $route  POST api/teach/getTestPaperList
// @desc   获取所有试卷接口
// @access Public
router.post("/getTestPaperList",(req,res)=>{
  QuestionItemBankSchema.find({"isPublic":1},{"bigList":0,"user":0,"description":0}).limit(20)
  .sort({date:"desc"})
    .then(data=>{
      res.json({"success":"菜单列表请求成功!","code":1000,data})
    })
    .catch(err => res.status(404).json({msg:"查询出错了!"}))
})


// $route  POST api/teach/getTestPaperDetail
// @desc   创建一个编辑文章展示的接口
// @access Private
router.post("/getTestPaperDetail",passport.authenticate('jwt', { session: false }),(req,res) => {
  QuestionItemBankSchema.findOne({
    _id:req.body.id
  })
  .then(datas=>{
    res.json({"msg":"查询成功!",code:1000,datas})
  })
  .catch(err => res.status(404).json({msg:"操作没成功!"}))

  // QuestionItemBankSchema.findOne({
  //   user:req.user._id
  // })
  // .then(data=>{
  //   if(data.user != req.user.id){
  //     res.json({"msg":"非法操作~!",code:400})
  //     return false
  //   }else{
      
  //   }
  // })
})


// $route  POST api/teach/getStuPaperDetail
// @desc   创建一个试卷展示的接口，不返回答案
// @access Private
router.post("/getStuPaperDetail",passport.authenticate('jwt', { session: false }),(req,res) => {
  QuestionItemBankSchema.findOne({
    _id:req.body.id
  })
  .then(datas=>{
    datas.bigList.forEach(v=>{
      v.questAnswer = ''
    })


    res.json({"msg":"查询成功!",code:1000,datas})
  })
  .catch(err => res.status(404).json({msg:"操作没成功!"}))

  // QuestionItemBankSchema.findOne({
  //   user:req.user._id
  // })
  // .then(data=>{
  //   if(data.user != req.user.id){
  //     res.json({"msg":"非法操作~!",code:400})
  //     return false
  //   }else{
      
  //   }
  // })
})



module.exports = router;