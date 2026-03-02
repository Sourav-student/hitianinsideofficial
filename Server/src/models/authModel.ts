import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  image?: string;
  admin: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const authSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    image: {
      type: String,
      // default: "https://res.cloudinary.com/<your_cloud_name>/image/upload/v1730960000/default_avatar.png"
    },
    admin: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>("User", authSchema);

export default User;
