import { Router } from "express";
import EventsList from "../../models/eventsListModel.js";
import AlmanacList from "../../models/almanacListModel.js"
import CricketScore from "../../models/cricketScoreModel.js";
import FootballScore from "../../models/footballScoreModel.js";
import VollyballScore from "../../models/vollyballScoreModel.js";
import BasketballScore from "../../models/basketballScoreModel.js";
import HomepageElementList from "../../models/homepageElementListModel.js";

const adminDeleteRouter = Router();

//delete event route
adminDeleteRouter.delete("/api/admin/event", async (req, res) => {
  try {
    const { id } = req.query;
    await EventsList.findByIdAndDelete(id);

    res.json({
      "message": "event is deleted"
    })
  } catch (error) {
    res.json({
      "message": "something want wrong"
    })
  }
})

//delete event route
adminDeleteRouter.delete("/api/admin/almanac", async (req, res) => {
  try {
    const { id } = req.query;
    await AlmanacList.findByIdAndDelete(id);

    res.json({
      "message": "event is deleted"
    })
  } catch (error) {
    res.json({
      "message": "something want wrong"
    })
  }
})

//delete homepage element route
adminDeleteRouter.delete("/api/admin/homepage-element", async (req, res) => {
  try {
    const { id } = req.query;
    await HomepageElementList.findByIdAndDelete(id);

    res.json({
      "message": "homepage element is deleted"
    })
  } catch (error) {
    res.json({
      "message": "something want wrong"
    })
  }
})

//delete cricket score route
adminDeleteRouter.delete("/api/admin/cricket-scores", async (req, res) => {
  try {
    const { id } = req.query;
    await CricketScore.findByIdAndDelete(id);
    res.json({
      "message": "cricket score is deleted"
    })
  } catch (error) {
    res.json({
      "message": "something want wrong"
    })
  }
})

//delete football score route
adminDeleteRouter.delete("/api/admin/football-scores", async (req, res) => {
  try {
    const { id } = req.query;
    await FootballScore.findByIdAndDelete(id);
    res.json({
      "message": "football score is deleted"
    })
  } catch (error) {
    res.json({
      "message": "something want wrong"
    })
  }
})

//delete vollyball score route
adminDeleteRouter.delete("/api/admin/vollyball-scores", async (req, res) => {
  try {
    const { id } = req.query;
    await VollyballScore.findByIdAndDelete(id);
    res.json({
      "message": "vollyball score is deleted"
    })
  } catch (error) {
    res.json({
      "message": "something want wrong"
    })
  }
})

//delete basketball score route
adminDeleteRouter.delete("/api/admin/basketball-scores", async (req, res) => {
  try {
    const { id } = req.query;
    await BasketballScore.findByIdAndDelete(id);
    res.json({
      "message": "basketball score is deleted"
    })
  } catch (error) {
    res.json({
      "message": "something want wrong"
    })
  }
})


export default adminDeleteRouter;