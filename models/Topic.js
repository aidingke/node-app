const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TopicSchema = new Schema({
  topicName:{
    type:String,
    required:true
  },
  //缩略图
  imgs: {
    type: [String]
  },
  date:{
    type: String
  },
  //关联USER表
  user:{
    type:Schema.Types.ObjectId,
    ref:"users"
  },
  //权限,0所有权限，1可浏览不能复制，2可部分浏览(付费服务)
  topicStatus:{
    type: String
  }
  // //关联文章表
  // ideas:{
  //   type:Schema.Types.ObjectId,
  //   ref:"topic"
  // },
})

module.exports = Topic = mongoose.model("topic",TopicSchema);
// mongoose.model('ideas',IdeaSchema);