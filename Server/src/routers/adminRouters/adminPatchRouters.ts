import { Router, Request, Response } from "express";
import mongoose from "mongoose";
import EventsList from "../../models/eventsListModel";
import AlmanacList from "../../models/almanacListModel";
import CricketScore from "../../models/cricketScoreModel";
import FootballScore from "../../models/footballScoreModel";
import VolleyballScore from "../../models/volleyballScoreModel";
import BasketballScore from "../../models/basketballScoreModel";

const adminPatchRouter = Router();

 // Utility function to update a document safely
const updateDocument = async (
  Model: mongoose.Model<any>,
  id: string,
  data: any,
  itemName: string,
  res: Response
) => {
  try {
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid or missing ID" });
    }

    const updatedItem = await Model.findByIdAndUpdate(id, data, { new: true, runValidators: true });

    if (!updatedItem) {
      return res.status(404).json({ success: false, message: `${itemName} not found` });
    }

    return res.status(200).json({
      success: true,
      message: `${itemName} updated successfully`,
      data: updatedItem,
    });
  } catch (error: any) {
    // console.error(`Error updating ${itemName}:`, error);
    return res.status(500).json({
      success: false,
      message: `Failed to update ${itemName}`,
      error: error.message,
    });
  }
};

// Update Event
adminPatchRouter.patch("/event", async (req: Request, res: Response) => {
  const { id } = req.query;
  await updateDocument(EventsList, id as string, req.body, "Event", res);
});

// Update Almanac
adminPatchRouter.patch("/almanac", async (req: Request, res: Response) => {
  const { id } = req.query;
  await updateDocument(AlmanacList, id as string, req.body, "Almanac", res);
});

// Update Cricket Score
adminPatchRouter.patch("/cricket-scores", async (req: Request, res: Response) => {
  const { id } = req.query;
  await updateDocument(CricketScore, id as string, req.body, "Cricket score", res);
});

// Update Football Score
adminPatchRouter.patch("/football-scores", async (req: Request, res: Response) => {
  const { id } = req.query;
  await updateDocument(FootballScore, id as string, req.body, "Football score", res);
});

// Update Volleyball Score
adminPatchRouter.patch("/volleyball-scores", async (req: Request, res: Response) => {
  const { id } = req.query;
  await updateDocument(VolleyballScore, id as string, req.body, "Volleyball score", res);
});

// Update Basketball Score
adminPatchRouter.patch("/basketball-scores", async (req: Request, res: Response) => {
  const { id } = req.query;
  await updateDocument(BasketballScore, id as string, req.body, "Basketball score", res);
});

export default adminPatchRouter;