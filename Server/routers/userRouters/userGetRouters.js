import { Router } from "express";
import EventsList from "../../models/eventsListModel.js";
import CricketScores from "../../models/cricketScoreModel.js";

const userGetRouter = Router();

userGetRouter.get("/", (req, res) => {
  res.send("Hello World!");
})

userGetRouter.get("/api/:id", (req, res) => {
  res.json({
    "data": "fetching data...",
    "HITianInside": "working on backend..."
  })
})

//Get all events
userGetRouter.get("/api/admin/events", async (req, res) => {
  try {
    const data = await EventsList.find();
    res.json(data);
  } catch (error) {
    res.json({
      "message": "server down! try again later"
    })
  }
})

//get all cricket scores
userGetRouter.get("/api/admin/cricket-scores", async (req, res) => {
  try {
    const data = await CricketScores.find();
    res.json(data);
  } catch (error) {
    res.json({
      "message": "server down! try again later"
    })
  }
})

export default userGetRouter;