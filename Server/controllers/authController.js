import User from "../models/authModel.js";
import { oauth2client } from "../utils/googleConfig.js";
import axios from "axios";
import jwt from "jsonwebtoken";

export const googleLogin = async (req, res) => {
  try {
    const { code } = req.query;

    if (!code) {
      return res.status(400).json({ message: "Authorization code is required" });
    }

    // Exchange code for tokens
    const { tokens } = await oauth2client.getToken(code);
    oauth2client.setCredentials(tokens);

    // Fetch user info using access token
    const userRes = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`
    );

    const { email, name, picture } = userRes.data;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        image: picture,
        admin : false
      });
    }

    const token = jwt.sign(
      { _id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_TIMEOUT }
    );

    return res.status(200).json({
      message: "Success",
      token,
      user
    });

  } catch (error) {
    console.error("Google Login Error:", error?.response?.data || error.message || error);
    return res.status(500).json({
      message: "Internal server error",
      error: error?.response?.data || error.message
    });
  }
};