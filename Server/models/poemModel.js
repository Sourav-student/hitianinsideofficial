import mongoose from "mongoose";

const poemSchema = new mongoose.Schema({
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
  title: {
    type: String,
    required: true
  },
  poem: {
    type: String,
    required: true
  }
}, { timestamps: true })

const Poems = mongoose.model("Poem", poemSchema);

export default Poems;