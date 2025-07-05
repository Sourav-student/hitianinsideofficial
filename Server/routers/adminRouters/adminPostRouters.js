import { Router } from "express";
import upload from "../../utils/multerCloudinaryConfig.js";
import EventsList from "../../models/eventsListModel.js";
import CricketScores from "../../models/cricketScoreModel.js";

const adminPostRouter = Router();

//to add event
adminPostRouter.post("/api/admin/event", async (req, res) => {
  try {
    const { instaURL, eventName, year, date } = req.body;

    await EventsList.create({
      instaURL, eventName, year, date
    })

    res.status(200).json({
      "message": "successfully saved"
    })
  } catch (error) {
    res.status(500).json({
      "message": "server not working"
    })
  }
})

//to add scorecard
adminPostRouter.post("/api/admin/cricket-scores", upload.fields([
  { name: 'team1Logo', maxCount: 1 },
  { name: 'team2Logo', maxCount: 1 }
]), async (req, res) => {
  try {
    const { matchType, team1Name, team2Name, team1Run, team2Run, team1OverPlayed, team2OverPlayed, team1WicketLoss, team2WicketLoss, completed } = req.body;

    const files = req.files;
    const team1Logo = files.team1Logo?.[0]?.path;
    const team2Logo = files.team2Logo?.[0]?.path;

    await CricketScores.create({
      matchType, team1Name, team2Name, team1Logo, team2Logo, team1Run, team2Run, team1OverPlayed, team2OverPlayed, team1WicketLoss, team2WicketLoss ,completed
    })

    res.status(200).json({
      "message": "successfully saved"
    })
  } catch (error) {
    res.status(500).json({
      "message": "server not working"
    })
  }
})

export default adminPostRouter;