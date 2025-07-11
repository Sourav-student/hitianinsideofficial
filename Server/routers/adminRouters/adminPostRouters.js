import { Router } from "express";
import upload from "../../utils/multerCloudinaryConfig.js";
import EventsList from "../../models/eventsListModel.js";
import CricketScore from "../../models/cricketScoreModel.js";
import FootballScore from "../../models/footballScoreModel.js";
import VollyballScore from "../../models/vollyballScoreModel.js";
import BasketballScore from "../../models/basketballScoreModel.js"
import AlmanacList from "../../models/almanacListModel.js";
import HomepageElementList from "../../models/homepageElementListModel.js";

const adminPostRouter = Router();

//add event
adminPostRouter.post("/api/admin/event", async (req, res) => {
  try {
    const { instaURL, eventName, year, date } = req.body;

    await EventsList.create({
      insta_url : instaURL, event_name : eventName, year, date
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

//add cricket scorecard
adminPostRouter.post("/api/admin/cricket-scores", upload.fields([
  { name: 'team1Logo', maxCount: 1 },
  { name: 'team2Logo', maxCount: 1 }
]), async (req, res) => {
  try {
    const { matchType, team1Name, team2Name, team1Run, team2Run, team1OverPlayed, team2OverPlayed, team1WicketLoss, team2WicketLoss, completed } = req.body;

    const files = req.files;
    const team1Logo = files.team1Logo?.[0]?.path;
    const team2Logo = files.team2Logo?.[0]?.path;

    await CricketScore.create({
      match_type: matchType, team1_name: team1Name, team2_name : team2Name, team1_logo : team1Logo, team2_logo: team2Logo, team1_run : team1Run, team2_run : team2Run, team1_over_played : team1OverPlayed, team2_over_played : team2OverPlayed, team1_wicket_loss :team1WicketLoss, team2_wicket_loss : team2WicketLoss, completed
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

//add football scorecard
adminPostRouter.post("/api/admin/football-scores", upload.fields([
  { name: 'team1Logo', maxCount: 1 },
  { name: 'team2Logo', maxCount: 1 }
]), async (req, res) => {
  try {
    const { matchType, team1Name, team2Name, team1Goals, team2Goals, completed } = req.body;

    const files = req.files;
    const team1Logo = files.team1Logo?.[0]?.path;
    const team2Logo = files.team2Logo?.[0]?.path;

    await FootballScore.create({
      match_type : matchType, team1_name : team1Name, team2_name : team2Name, team1_logo : team1Logo, team2_logo : team2Logo, team1_goals:team1Goals, team2_goals : team2Goals, completed
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

//add vollyball scorecard
adminPostRouter.post("/api/admin/vollyball-scores", upload.fields([
  { name: 'team1Logo', maxCount: 1 },
  { name: 'team2Logo', maxCount: 1 }
]), async (req, res) => {
  try {
    const { matchType, team1Name, team2Name, team1Score, team2Score, completed } = req.body;

    const files = req.files;
    const team1Logo = files.team1Logo?.[0]?.path;
    const team2Logo = files.team2Logo?.[0]?.path;

    await VollyballScore.create({
      match_type : matchType, team1_name : team1Name, team2_name : team2Name, team1_logo : team1Logo, team2_logo : team2Logo, team1_score : team1Score, team2_score : team2Score, completed
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

//add basketball scorecard
adminPostRouter.post("/api/admin/basketball-scores", upload.fields([
  { name: 'team1Logo', maxCount: 1 },
  { name: 'team2Logo', maxCount: 1 }
]), async (req, res) => {
  try {
    const { matchType, team1Name, team2Name, team1Score, team2Score, completed } = req.body;

    const files = req.files;
    const team1Logo = files.team1Logo?.[0]?.path;
    const team2Logo = files.team2Logo?.[0]?.path;

    await BasketballScore.create({
      match_type : matchType, team1_name : team1Name, team2_name : team2Name, team1_logo : team1Logo, team2_logo : team2Logo, team1_score : team1Score, team2_score : team2Score, completed
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

//add Almanac
adminPostRouter.post("/api/admin/almanac", upload.single('file'), async (req, res) => {
  try {
    const { username, department } = req.body;
    const photo = req.file.path;

    await AlmanacList.create({
      photo, username, department
    })

    res.status(200).json({
      "message": "successfully saved"
    })
  } catch (error) {
    res.status(500).json({
      "message": "server not working"
    })
    console.log(error);
  }
})

//add homepage element
adminPostRouter.post("/api/admin/homepage-element", upload.single('eventPoster'), async (req, res) => {
   try {
    const { eventName, eventContent } = req.body;
    const eventPoster = req.file.path;

    await HomepageElementList.create({
      event_name: eventName, event_poster: eventPoster, event_content: eventContent
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