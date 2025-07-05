import { Router } from "express";
import EventsList from "../../models/eventsListModel.js";

const adminPatchRouter = Router();

adminPatchRouter.patch("/api/admin/event", async (req, res) => {
  try {
    const { id } = req.query;
    const data = req.body;
    await EventsList.findByIdAndUpdate(id, {
      instaURL : data.instaURL,
      date : data.date,
      eventName : data.eventName,
      year : data.year
    });

    res.json({
      "message" : "updated successfully"
    })
    
  } catch (error) {
    res.json({
      "message" : "something went wrong"
    })
  }
})


export default adminPatchRouter;