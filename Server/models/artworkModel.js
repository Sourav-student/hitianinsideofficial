import mongoose from "mongoose";

const artworkSchema = new mongoose.Schema({
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
  file: {
    type: String,
    required: true
  },
  desc: {
    type: String
  }
}, { timestamps: true })

const Artwork = mongoose.model("Artwork", artworkSchema);

export default Artwork;