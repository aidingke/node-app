const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CataTopicSchema = new Schema({
  cataName:{
    type:String,
    required:true
  },
  topicId:{
    type:String,
    required:true
  },
  date:{
    type: String
  },
  //关联USER表
  user:{
    type:Schema.Types.ObjectId,
    ref:"users"
  }
})

module.exports = CataTopic = mongoose.model("catatopic",CataTopicSchema);
// mongoose.model('ideas',IdeaSchema);