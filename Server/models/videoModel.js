import mongoose from "mongoose";

const videosSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  year:{
    type:String,
    required:true
  },
  department:{
    type:String,
    required:true
  },
  roll_no :{
    type:String,
    required:true
  },
  contact_no :{
     type:Number,
     required:true
  },
  insta_id:{
    type:String
  },
  video:{
    type:String,
    required:true
  },
  desc:{
    type:String,
    required:true
  }
}, { timestamps: true })

const Videos = mongoose.model("Videos", videosSchema);

export default Videos;