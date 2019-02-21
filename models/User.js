const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  avatar:{
    type:String
  },
  //状态，1是超管，2是HR ，无值是杂牌
  status:{
    type: String
  },
  date:{
    type: String,
    required:true
  }
})

module.exports = User = mongoose.model("users",UserSchema);