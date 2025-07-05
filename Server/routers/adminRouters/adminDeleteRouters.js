import { Router } from "express";
import EventsList from "../../models/eventsListModel.js";

const adminDeleteRouter = Router();

adminDeleteRouter.delete("/api/admin/event", async (req, res) => {
  try {
    const { id } = req.query;
    await EventsList.findByIdAndDelete(id);

    res.status(200).json({
      "message" : "event is deleted"
    })
  } catch (error) {
    res.json({
      "message" : "something want wrong"
    })
  }
})


export default adminDeleteRouter;