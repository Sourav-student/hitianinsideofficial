import mongoose, { Types } from "mongoose";

const authSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  image: {
    type: String,
  },
  admin: {
    type:Boolean,
    default: false
  }
}, { timestamps: true });

const User = mongoose.model("User", authSchema);

export default User;