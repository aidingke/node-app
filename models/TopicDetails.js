const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TopicDetailsSchema = new Schema({
  title:{
    type:String,
    required:true
  },
  details:{
    type:String,
    required:true
  },
  topicCataId:{
    type:String,
  },
  topicId:{
    type:String,
    required:true
  },
  user:{
    type:Schema.Types.ObjectId,
    ref:"users"
  },
  date:{
    type: String,
    required:true
  }
})

module.exports = TopicDetails = mongoose.model("topicdetails",TopicDetailsSchema);
