import mongoose from "mongoose";

const storySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  rollNo: {
    type: String,
    required: true
  },
  contactNo: {
    type: Number,
    required: true
  },
  instaID: {
    type: String
  },
  storyType: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  story: {
    type: String,
    required: true
  },
  video: {
    type: String,
    required: true
  },
  desc: {
    type: String
  }
}, { timestamps: true })

const Storys = mongoose.model("Story", storySchema);

export default Storys;