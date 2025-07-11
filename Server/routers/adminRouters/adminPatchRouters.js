import { Router } from "express";
import EventsList from "../../models/eventsListModel.js";
import AlmanacList from "../../models/almanacListModel.js";
import CricketScore from "../../models/cricketScoreModel.js";
import FootballScore from "../../models/footballScoreModel.js";
import VollyballScore from "../../models/vollyballScoreModel.js";
import BasketballScore from "../../models/basketballScoreModel.js"

const adminPatchRouter = Router();

//update event
adminPatchRouter.patch("/api/admin/event", async (req, res) => {
  try {
    const { id } = req.query;
    const data = req.body;
    await EventsList.findByIdAndUpdate(id, data);

    res.json({
      "message": "updated successfully"
    })

  } catch (error) {
    res.json({
      "message": "something went wrong"
    })
  }
})

//update almanac
adminPatchRouter.patch("/api/admin/almanac", async (req, res) => {
  try {
    const { id } = req.query;
    const data = req.body;
    await AlmanacList.findByIdAndUpdate(id, data);

    res.json({
      "message": "updated successfully"
    })

  } catch (error) {
    res.json({
      "message": "something went wrong"
    })
  }
})

// update cricket score
adminPatchRouter.patch("/api/admin/cricket-scores", async (req, res) => {
  try {
    const { id } = req.query;
    const data = req.body;
    await CricketScore.findByIdAndUpdate(id, data)
    res.json({
      "message": "updated successfully"
    })
  } catch (error) {
    console.log(error);
    res.json({
      "message": "something went wrong"
    })
  }
})

// update football score
adminPatchRouter.patch("/api/admin/football-scores", async (req, res) => {
  try {
    const { id } = req.query;
    const data = req.body;
    await FootballScore.findByIdAndUpdate(id, data)
    res.json({
      "message": "updated successfully"
    })
  } catch (error) {
    console.log(error);
    res.json({
      "message": "something went wrong"
    })
  }
})

// update vollyball score
adminPatchRouter.patch("/api/admin/vollyball-scores", async (req, res) => {
  try {
    const { id } = req.query;
    const data = req.body;
    await VollyballScore.findByIdAndUpdate(id, data)
    res.json({
      "message": "updated successfully"
    })
  } catch (error) {
    console.log(error);
    res.json({
      "message": "something went wrong"
    })
  }
})

// update basketball score
adminPatchRouter.patch("/api/admin/basketball-scores", async (req, res) => {
  try {
    const { id } = req.query;
    const data = req.body;
    await BasketballScore.findByIdAndUpdate(id, data)
    res.json({
      "message": "updated successfully"
    })
  } catch (error) {
    console.log(error);
    res.json({
      "message": "something went wrong"
    })
  }
})


export default adminPatchRouter;