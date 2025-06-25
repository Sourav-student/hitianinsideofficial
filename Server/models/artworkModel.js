import mongoose from "mongoose";

const artworkSchema = new mongoose.Schema({
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
  file:{
    type:String,
    required:true
  },
  desc:{
    type:String
  }
}, { timestamps: true })

const Artwork = mongoose.model("Artwork", artworkSchema);

export default Artwork;