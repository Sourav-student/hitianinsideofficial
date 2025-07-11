import { Router } from "express";
import upload from "../../utils/multerCloudinaryConfig.js";
import Artwork from "../../models/artworkModel.js";
import Contact from "../../models/contactModel.js";
import Photos from "../../models/photoModel.js";
import Videos from "../../models/videoModel.js";
import Poems from "../../models/poemModel.js";
import Storys from "../../models/storyModel.js"

const userPostRouter = Router();

//post request of contact form 
userPostRouter.post("/api/form", async (req, res) => {
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

// post request of artwork form
userPostRouter.post("/api/artwork", upload.single('file'), async (req, res) => {
  try {
    const { email, name, year, department, rollNo, contactNo, instaID, desc } = req.body;
    const file = req.file.path;

    //create new document in DB
    await Artwork.create({
      email, name, year, department, roll_no : rollNo, contact_no : contactNo, insta_id : instaID, file, desc
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
userPostRouter.post("/api/photography", upload.single('file'), async (req, res) =>{
  try {
    const { email, name, year, department, rollNo, contactNo, instaID, desc } = req.body;
    const file = req.file.path;

    //create new document in DB
    await Photos.create({
     email, name, year, department, roll_no : rollNo, contact_no : contactNo, insta_id : instaID, file, desc
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
userPostRouter.post("/api/poem", async (req, res) => {
  try {
    const { email, name, year, department, rollNo, contactNo, instaID, title, poem} = req.body;

    //create new document in DB
    await Poems.create({
      email, name, year, department, roll_no : rollNo, contact_no : contactNo, insta_id : instaID, title, poem
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
userPostRouter.post("/api/video", async (req, res) => {
  try {
    const { name, year, department, rollNo, contactNo, instaID, video, desc } = req.body;

    //create new document in DB
    await Videos.create({
      name, year, department, roll_no : rollNo, contact_no : contactNo, insta_id : instaID, video, desc
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
userPostRouter.post("/api/story", async (req, res) => {
  try {
    const { name, year, department, rollNo, contactNo, instaID, storyType, title, story, video, desc } = req.body;

    //create new document in DB
    await Storys.create({
      name, year, department, roll_no : rollNo, contact_no : contactNo, insta_id : instaID, story_type : storyType, title, story, video, desc
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


export default userPostRouter;