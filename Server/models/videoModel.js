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
  rollNo :{
    type:String,
    required:true
  },
  contactNo :{
     type:Number,
     required:true
  },
  instaID:{
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