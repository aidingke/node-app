const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const IdeaSchema = new Schema({
  title:{
    type:String,
    required:true
  },
  details:{
    type:String,
    required:true
  },
  description:{
    type:String
  },
  user:{
    type:Schema.Types.ObjectId,
    ref:"users"
  },
  // user:{
  //   type: String,
  //   required:true
  // },
  //缩略图
  imgs: {
    type: [String]
  },
  date:{
    type: String,
    required:true
  },
  checkT:{
    type:Boolean,
    default:true
  },
  subjectId:{
    type:Schema.Types.ObjectId,
    ref:"subjectmenu"
  },
  topic:{
    type:Schema.Types.ObjectId,
    ref:"topic"
  }
})

mongoose.model('ideas',IdeaSchema);