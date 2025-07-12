import { Router } from "express";
import User from "../../models/authModel.js";
import EventsList from "../../models/eventsListModel.js";
import HomepageElementList from "../../models/homepageElementListModel.js";
import AlmanacList from "../../models/almanacListModel.js";
import CricketScore from "../../models/cricketScoreModel.js";
import FootballScore from "../../models/footballScoreModel.js";
import VollyballScore from "../../models/vollyballScoreModel.js";
import BasketballScore from "../../models/basketballScoreModel.js";

const userGetRouter = Router();

userGetRouter.get("/", (req, res) => {
  res.send("Hello, Server is working!!");
})

userGetRouter.get("/api/isAdmin", async (req, res) => {
  try {
    const data = req.headers.authorization;
    const email = data.split(" ")[1];

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ "message": "User not found" });
    }

    res.json({ "isAdmin": user.admin });
  } catch (error) {
    res.status(500).json({ "message": "Internal Server Error" });
  }
});

//Get all events
userGetRouter.get("/api/events", async (req, res) => {
  try {
    const data = await EventsList.find();
    const formattedData = data.map((event) => ({
      "date": event.date,
      "year": event.year,
      "instaURL": event.insta_url,
      "eventName": event.event_name
    })
    )

    res.json(formattedData);
  } catch (error) {
    res.status(500).json({
      "message": "server down! try again later"
    })
  }
})

//Get all almanac
userGetRouter.get("/api/almanacs", async (req, res) => {
  try {
    const data = await AlmanacList.find();
    const formattedData = data.map((almanac) => ({
      photo: almanac.photo,
      username : almanac.username,
      department : almanac.department
    })
    )

    res.json(formattedData);
  } catch (error) {
    res.status(500).json({
      "message": "server down! try again later"
    })
  }
})

//get all homepage elements
userGetRouter.get("/api/homepage-elements", async (req, res) => {
  try {
    const data = await HomepageElementList.find();
    const formattedData = data.map((element) => ({
      "eventName": element.event_name,
      "eventPoster": element.event_poster,
      "eventContent": element.event_content,
      "eventFormLink": element.event_form_link
    }));

    res.json(formattedData);
  } catch (error) {
    res.status(500).json({
      "message": "server down! try again later"
    })
    
  }
})

//get all cricket scores
userGetRouter.get("/api/cricket-scores", async (req, res) => {
  try {
    const data = await CricketScore.find();
    const formattedData = data.map((match) => ({
      "matchType": match.match_type,
      "team1Name": match.team1_name,
      "team2Name": match.team2_name,
      "team1Logo": match.team1_logo,
      "team2Logo": match.team2_logo,
      "completed": match.completed,
      "team1Run": match.team1_run,
      "team2Run": match.team2_run,
      "team1OverPlayed": match.team1_over_played,
      "team2OverPlayed": match.team2_over_played,
      "team1WicketLoss": match.team1_wicket_loss,
      "team2WicketLoss": match.team2_wicket_loss,
    }));

    res.json(formattedData);
  } catch (error) {
    res.status(500).json({
      "message": "server down! try again later"
    })
  }
})

//get all football scores
userGetRouter.get("/api/football-scores", async (req, res) => {
  try {
    const data = await FootballScore.find();
    const formattedData = data.map((match) => ({
      "matchType": match.match_type,
      "team1Name": match.team1_name,
      "team2Name": match.team2_name,
      "team1Logo": match.team1_logo,
      "team2Logo": match.team2_logo,
      "completed": match.completed,
      "team1Goals": match.team1_goals,
      "team2Goals": match.team2_goals
    }));

    res.json(formattedData);
  } catch (error) {
    res.status(500).json({
      "message": "server down! try again later"
    })
  }
})

//get all vollyball scores
userGetRouter.get("/api/vollyball-scores", async (req, res) => {
  try {
    const data = await VollyballScore.find();
    const formattedData = data.map((match) => ({
      "matchType": match.match_type,
      "team1Name": match.team1_name,
      "team2Name": match.team2_name,
      "team1Logo": match.team1_logo,
      "team2Logo": match.team2_logo,
      "completed": match.completed,
      "team1Score": match.team1_score,
      "team2Score": match.team2_score
    }));

    res.json(formattedData);
  } catch (error) {
    res.status(500).json({
      "message": "server down! try again later"
    })
  }
})

//get all basketball scores
userGetRouter.get("/api/basketball-scores", async (req, res) => {
  try {
    const data = await BasketballScore.find();
    const formattedData = data.map((match) => ({
      "matchType": match.match_type,
      "team1Name": match.team1_name,
      "team2Name": match.team2_name,
      "team1Logo": match.team1_logo,
      "team2Logo": match.team2_logo,
      "completed": match.completed,
      "team1Score": match.team1_score,
      "team2Score": match.team2_score
    }));

    res.json(formattedData);
  } catch (error) {
    res.status(500).json({
      "message": "server down! try again later"
    })
  }
})

//other get requests
userGetRouter.get("/api/:id", (req, res) => {
  const id = req.params.id;
  res.json({
    "data": `fetching data... -- ${id}`,
    "HITianInside": "working on backend..."
  })
})

export default userGetRouter;