import { Router, Request, Response } from "express";
import mongoose from "mongoose";
import EventsList from "../../models/eventsListModel";
import AlmanacList from "../../models/almanacListModel";
import HomepageElementList from "../../models/homepageElementListModel";
import CricketScore from "../../models/cricketScoreModel";
import FootballScore from "../../models/footballScoreModel";
import VolleyballScore from "../../models/volleyballScoreModel";
import BasketballScore from "../../models/basketballScoreModel";
import Contact from "../../models/contactModel";
import Photos from "../../models/photoModel";
import Poems from "../../models/poemModel";
import Artwork from "../../models/artworkModel";

const adminGetRouter = Router();


//  Reusable data fetch utility with pagination, sorting, and error handling
const fetchData = async (
  Model: mongoose.Model<any>,
  res: Response,
  modelName: string,
  query: any
) => {
  try {
    const { page = 1, limit = 20, sortBy = "createdAt", order = "desc" } = query;

    const skip = (Number(page) - 1) * Number(limit);
    const sortOrder = order === "asc" ? 1 : -1;

    const data = await Model.find()
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(Number(limit));

    const total = await Model.countDocuments();

    return res.status(200).json({
      success: true,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      data,
    });
  } catch (error: any) {
    // console.error(`Error fetching ${modelName}:`, error);
    return res.status(500).json({
      success: false,
      message: `Failed to fetch ${modelName}`,
      error: error.message,
    });
  }
};

// EVENTS
adminGetRouter.get("/event", async (req: Request, res: Response) => {
  await fetchData(EventsList, res, "events", req.query);
});

// ALMANAC
adminGetRouter.get("/almanac", async (req: Request, res: Response) => {
  await fetchData(AlmanacList, res, "almanac entries", req.query);
});

// HOMEPAGE ELEMENTS
adminGetRouter.get("/homepage-element", async (req: Request, res: Response) => {
  await fetchData(HomepageElementList, res, "homepage elements", req.query);
});

// CRICKET SCORES
adminGetRouter.get("/cricket-scores", async (req: Request, res: Response) => {
  await fetchData(CricketScore, res, "cricket scores", req.query);
});

// FOOTBALL SCORES
adminGetRouter.get("/football-scores", async (req: Request, res: Response) => {
  await fetchData(FootballScore, res, "football scores", req.query);
});

// VOLLEYBALL SCORES
adminGetRouter.get("/volleyball-scores", async (req: Request, res: Response) => {
  await fetchData(VolleyballScore, res, "volleyball scores", req.query);
});

// BASKETBALL SCORES
adminGetRouter.get("/basketball-scores", async (req: Request, res: Response) => {
  await fetchData(BasketballScore, res, "basketball scores", req.query);
});

// CONTACT MESSAGES
adminGetRouter.get("/contact-form", async (req: Request, res: Response) => {
  await fetchData(Contact, res, "contact form submissions", req.query);
});

// PHOTOS
adminGetRouter.get("/photography", async (req: Request, res: Response) => {
  await fetchData(Photos, res, "photography entries", req.query);
});

// POEMS
adminGetRouter.get("/poem", async (req: Request, res: Response) => {
  await fetchData(Poems, res, "poems", req.query);
});

// ARTWORKS
adminGetRouter.get("/artwork", async (req: Request, res: Response) => {
  await fetchData(Artwork, res, "artworks", req.query);
});

export default adminGetRouter;