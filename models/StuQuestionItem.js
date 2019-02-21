const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const StuQuestionItemSchema  = new Schema({
  title:{
    type:String
  },
  description:{
    type:String
  },
  isPublic:{
    type:String
  },
  // 题目答案
  bigList:[
    {
      stuQuestAnswer:{
        type:String
      },
      questionItemId:{
        type:String
      },
      scores:{
        type:String
      },
      answerList:{
        itemList: [
          {
            item:{
              type:String
            },
            itemDesc:{
              type:String
            },
            // _id:{
            //   type:String
            // }
          }
        ],
        questAnswer:{
          type:String
        },
        questDesc:{
          type:String
        },
        // 题目图片 (当questKind为4可传，其他类型不用传)
        questImg:{
          type:String
        },
        questKind:{
          type:String
        }
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

module.exports = StuQuestionItem = mongoose.model("stuquestionitem",StuQuestionItemSchema);
// mongoose.model('QuestionItem',StuQuestionItemSchema);