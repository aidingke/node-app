//答案表
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AnswerItemSchema  = new Schema({
  //试卷ID
  questionItembanksId:{
    type:String,
    required:true
  },
  answerList:[
    {
      questAnswer:{
        type:String,
        required:true
      },
      questionItemId:{
        type:String
      }
    }
  ]
})

module.exports = AnswerItem = mongoose.model("answeritem",AnswerItemSchema);
// mongoose.model('QuestionItem',AnswerItemSchema);