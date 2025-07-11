import mongoose from "mongoose";

const poemSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
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
  roll_no: {
    type: String,
    required: true
  },
  contact_no: {
    type: Number,
    required: true
  },
  insta_id: {
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