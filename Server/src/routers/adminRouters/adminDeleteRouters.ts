import { Router } from "express";
import { deleteCricketScore } from "../../controllers/cricket.controller";
import { deleteFootballScore } from "../../controllers/football.controller";
import { deleteBasketballScore } from "../../controllers/basketball.controller";
import { deleteBlog } from "../../controllers/blog.controller";
import { deleteAlmanac, deleteEvent, deleteHomepageElement } from "../../controllers/admin.controller";
import { deleteVolleyballScore } from "../../controllers/volleyball.controller";

const adminDeleteRouter = Router();

// Delete Event
adminDeleteRouter.delete("/event", deleteEvent);

// Delete Almanac
adminDeleteRouter.delete("/almanac", deleteAlmanac);

// Delete Homepage Element
adminDeleteRouter.delete("/homepage-element", deleteHomepageElement);

// Delete Cricket Score
adminDeleteRouter.delete("/cricket-scores", deleteCricketScore);

// Delete Football Score
adminDeleteRouter.delete("/football-scores", deleteFootballScore);

// Delete Volleyball Score
adminDeleteRouter.delete("/volleyball-scores", deleteVolleyballScore);

// Delete Basketball Score
adminDeleteRouter.delete("/basketball-scores", deleteBasketballScore);

// Delete Blog 
adminDeleteRouter.delete("/delete-blog/:id", deleteBlog);

export default adminDeleteRouter;