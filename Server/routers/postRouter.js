import { Router } from "express";
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import Artwork from "../models/artworkModel.js";
import Contact from "../models/contactModel.js";
import Photos from "../models/photoModel.js";
import Videos from "../models/videoModel.js";
import Poems from "../models/poemModel.js";
import Storys from "../models/storyModel.js"

const postRouter = Router();

// To get __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../uploads')),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

//post request of contact form 
postRouter.post("/api/form", async (req, res) => {
  try {
    const { name, email, message } = req.body;


    await Contact.create({
      name, email, message
    })

    res.status(200).json({
      "message": "Form submitted successfully"
    })

  } catch (error) {
    res.status(500).json({
      "message":" Internal Server Error!!"
    })
  }
})

//post request of artwork form
postRouter.post("/api/artwork", upload.single('file'), async (req, res) => {
  try {
    const { name, year, department, rollNo, contactNo, instaID, desc } = req.body;
    const file = req.file.filename;
    await Artwork.create({
      name, year, department, rollNo, contactNo, instaID, file, desc
    })
    
    res.status(200).json({
       "message" : "Successfully sent!!",
    })

  } catch (error) {
    res.status(500).json({
      "message":" Internal Server Error!!"
    })
  }
})

//post request of photography form
postRouter.post("/api/photography", upload.single('file'), async (req, res) => {
  try {
    const { name, year, department, rollNo, contactNo, instaID, desc } = req.body;
    const file = req.file.filename;
    await Photos.create({
      name:name, year, department, rollNo, contactNo, instaID, file, desc
    })
    
    res.status(200).json({
       "message" : "Successfully sent!!",
    })

  } catch (error) {
    res.status(500).json({
      "message":" Internal Server Error!!"
    })

  }
})

//post request of poem form
postRouter.post("/api/poem", async (req, res) => {
  try {
    const { name, year, department, rollNo, contactNo, instaID, title, poem} = req.body;
    await Poems.create({
      name, year, department, rollNo, contactNo, instaID, title, poem
    })
    
    res.status(200).json({
       "message" : "Successfully sent!!",
    })

  } catch (error) {
    res.status(500).json({
      "message":" Internal Server Error!!"
    })

  }
})

//post request of video
postRouter.post("/api/video", async (req, res) => {
  try {
    const { name, year, department, rollNo, contactNo, instaID, video, desc } = req.body;
    await Videos.create({
      name, year, department, rollNo, contactNo, instaID, video, desc
    })
    
    res.status(200).json({
       "message" : "Successfully sent!!",
    })

  } catch (error) {
    res.status(500).json({
      "message":" Internal Server Error!!"
    })

  }
})

//post request of story
postRouter.post("/api/story", async (req, res) => {
  try {
    const { name, year, department, rollNo, contactNo, instaID, storyType, title, story, video, desc } = req.body;
    await Storys.create({
      name, year, department, rollNo, contactNo, instaID, storyType, title, story, video, desc
    })
    
    res.status(200).json({
       "message" : "Successfully sent!!",
    })

  } catch (error) {
    res.status(500).json({
      "message":" Internal Server Error!!"
    })

  }
})


export default postRouter;