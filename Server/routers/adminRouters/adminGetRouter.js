import { Router } from "express";
import EventsList from "../../models/eventsListModel.js";
import AlmanacList from "../../models/almanacListModel.js";
import HomepageElementList from "../../models/homepageElementListModel.js";
import CricketScore from "../../models/cricketScoreModel.js";
import FootballScore from "../../models/footballScoreModel.js";
import VollyballScore from "../../models/vollyballScoreModel.js";
import BasketballScore from "../../models/basketballScoreModel.js";
import Contact from "../../models/contactModel.js";
import Photos from "../../models/photoModel.js";
import Poems from "../../models/poemModel.js";
import Artwork from "../../models/artworkModel.js";

const adminGetRouter = Router();

//Get all events
adminGetRouter.get("/api/admin/event", async (req, res) => {
  try {
    const data = await EventsList.find();
    res.json(data);
  } catch (error) {
    res.json({
      "message": "server down! try again later"
    })
  }
})

//Get all almanac
adminGetRouter.get("/api/admin/almanac", async (req, res) => {
  try {
    const data = await AlmanacList.find();
    res.json(data);
  } catch (error) {
    res.json({
      "message": "server down! try again later"
    })
  }
})

//Get all homepage elements
adminGetRouter.get("/api/admin/homepage-element", async (req, res) => {
  try {
    const data = await HomepageElementList.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({
      "message": "server down! try again later"
    })
  }
})

//get all cricket scores
adminGetRouter.get("/api/admin/cricket-scores", async (req, res) => {
  try {
    const data = await CricketScore.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({
      "message": "server down! try again later"
    })
  }
})

//get all football scores
adminGetRouter.get("/api/admin/football-scores", async (req, res) => {
  try {
    const data = await FootballScore.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({
      "message": "server down! try again later"
    })
  }
})

//get all vollyball scores
adminGetRouter.get("/api/admin/vollyball-scores", async (req, res) => {
  try {
    const data = await VollyballScore.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({
      "message": "server down! try again later"
    })
  }
})

//get all basketball scores
adminGetRouter.get("/api/admin/basketball-scores", async (req, res) => {
  try {
    const data = await BasketballScore.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({
      "message": "server down! try again later"
    })
  }
})

//user sent data send to frontend
adminGetRouter.get("/api/admin/contact-form", async (req, res) => {
  try {
    const data = await Contact.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({
      "message": "server down! try again later"
    });
  }
});

adminGetRouter.get("/api/admin/photography", async (req, res) => {
  try {
    const data = await Photos.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({
      "message": "server down! try again later"
    });
  }
})

adminGetRouter.get("/api/admin/poem", async (req, res) => {
  try {
    const data = await Poems.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({
      "message": "server down! try again later"
    });
  }
})

adminGetRouter.get("/api/admin/artwork", async (req, res) => {
  try {
    const data = await Artwork.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({
      "message": "server down! try again later"
    });
  }
})

export default adminGetRouter;