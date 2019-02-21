const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const QuestionItemSchema  = new Schema({
  //科目，如前端 php java nodejs
  subject:{
    type:String,
    required:true
  },
  //题目类型 0-单选 1-多选 2-判断 3-填空 4-论述
  questKind:{
    type:String,
    required:true
  },
  //题目描述
  questDesc:{
    type:String,
    required:true
  },
  // 题目答案
  questAnswer:{
    type:String,
    required:true
  },
  // 题目图片 (当questKind为4可传，其他类型不用传)
  questImg:{
    type:String
  },
  //题目选项集合
  // itemList: {
  //   type: [String]
  // },
  itemList: [
    {
      item:{
        type:String
      },
      itemDesc:{
        type:String
      }
    }
  ],
  date:{
    type: String
  },
  //关联USER表
  user:{
    type:Schema.Types.ObjectId,
    ref:"users"
  }
})

module.exports = QuestionItem = mongoose.model("questionitem",QuestionItemSchema);
// mongoose.model('QuestionItem',QuestionItemSchema);