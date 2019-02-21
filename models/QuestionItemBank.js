const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const QuestionItemBankSchema  = new Schema({
  title:{
    type:String
  },
  description:{
    type:String
  },
  isPublic:{
    type:String
  },
  bigList:[
    {
      questionItemId:{
        type:String
      },
      questKind:{
        type:String
      },
      questDesc:{
        type:String
      },
      questAnswer:{
        type:String
      },
      // 题目图片 (当questKind为4可传，其他类型不用传)
      questImg:{
        type:String
      },
      scores:{
        type:String
      },
      itemList: [
        {
          item:{
            type:String
          },
          itemDesc:{
            type:String
          },
          _id:{
            type:String
          }
        }
      ]
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

module.exports = QuestionItemBank = mongoose.model("questionitembank",QuestionItemBankSchema);
// mongoose.model('QuestionItem',QuestionItemBankSchema);