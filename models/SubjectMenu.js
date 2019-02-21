const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SubjectMenuSchema = new Schema({
  subjectName:{
    type:String,
    required:true
  },
  date:{
    type: String,
    required:true
  },
  status:{
    type: String
  },
  //关联USER表
  user:{
    type:Schema.Types.ObjectId,
    ref:"users"
  },
  //关联文章表
  ideas:{
    type:Schema.Types.ObjectId,
    ref:"subjectmenu"
  },
})

module.exports = SubjectMenu = mongoose.model("subjectmenu",SubjectMenuSchema);
// mongoose.model('ideas',IdeaSchema);