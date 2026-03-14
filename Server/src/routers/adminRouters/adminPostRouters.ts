import { Router, Response, Request} from "express";
import { validateBody } from "../../middleware/validateBody.middleware";
import { sendSuccess, sendError, getTeamLogos, toNum, } from "../../utils/handler.utils";
import upload from "../../utils/multerCloudinaryConfig";
import EventsList from "../../models/eventsListModel";
import CricketScore from "../../models/cricketScoreModel";
import FootballScore from "../../models/footballScoreModel";
import VolleyballScore from "../../models/volleyballScoreModel";
import BasketballScore from "../../models/basketballScoreModel";
import AlmanacList from "../../models/almanacListModel";
import HomepageElementList from "../../models/homepageElementListModel";
import {
  BasketballScoreType,
  CricketScoreType,
  EventType,
  FootballScoreType,
  VolleyballScoreType,
} from "../../types/datatypes";

const adminPostRouter = Router();

interface MulterRequest extends Request {
  file?: Express.Multer.File;
  files?: Record<string, Express.Multer.File[]>;
}

//ADD EVENTS
adminPostRouter.post(
  "/event",
  validateBody(["instaURL", "eventName", "year", "date"]),
  async (req: Request, res: Response) => {
    try {
      const { instaURL, eventName, year, date }: EventType = req.body;

      const newEvent = await EventsList.create({
        insta_url: instaURL,
        event_name: eventName,
        year,
        date,
      });

      sendSuccess(res, "Event saved successfully.", { id: newEvent._id });
    } catch (error) {
      sendError(res, "Failed to save event", error);
    }
  }
);

// ADD CRICKET SCORE
adminPostRouter.post(
  "/cricket-scores",
  upload.fields([
    { name: "team1Logo", maxCount: 1 },
    { name: "team2Logo", maxCount: 1 },
  ]),
  async (req: Request, res: Response) => {
    try {
      const {
        matchType,
        team1Name,
        team2Name,
        team1Run,
        team2Run,
        team1OverPlayed,
        team2OverPlayed,
        team1WicketLoss,
        team2WicketLoss,
        completed,
      }: CricketScoreType = req.body;

      const { team1Logo, team2Logo, team1PublicId, team2PublicId } = getTeamLogos(req);

      if (!team1Logo || !team2Logo) {
        return res
          .status(400)
          .json({ success: false, message: "Both team logos are required." });
      }

      const cricket = await CricketScore.create({
        match_type: matchType,
        team1_name: team1Name,
        team2_name: team2Name,
        team1_logo: team1Logo,
        team2_logo: team2Logo,
        team1_run: toNum(team1Run),
        team2_run: toNum(team2Run),
        team1_over_played: toNum(team1OverPlayed),
        team2_over_played: toNum(team2OverPlayed),
        team1_wicket_loss: toNum(team1WicketLoss),
        team2_wicket_loss: toNum(team2WicketLoss),
        completed,
        team1_logo_id: team1PublicId,
        team2_logo_id: team2PublicId,
      });

      sendSuccess(res, "Cricket score saved successfully.", { id: cricket._id });
    } catch (error) {
      sendError(res, "Failed to save cricket score", error);
    }
  }
);

// ADD FOOTBALL SCORE
adminPostRouter.post(
  "/football-scores",
  upload.fields([
    { name: "team1Logo", maxCount: 1 },
    { name: "team2Logo", maxCount: 1 },
  ]),
  async (req: Request, res: Response) => {
    try {
      const {
        matchType,
        team1Name,
        team2Name,
        team1Goals,
        team2Goals,
        completed,
      }: FootballScoreType = req.body;

      const { team1Logo, team2Logo } = getTeamLogos(req);
      if (!team1Logo || !team2Logo)
        return res
          .status(400)
          .json({ success: false, message: "Both team logos are required." });

      const football = await FootballScore.create({
        match_type: matchType,
        team1_name: team1Name,
        team2_name: team2Name,
        team1_logo: team1Logo,
        team2_logo: team2Logo,
        team1_goals: toNum(team1Goals),
        team2_goals: toNum(team2Goals),
        completed,
      });

      sendSuccess(res, "Football score saved successfully.", { id: football._id });
    } catch (error) {
      sendError(res, "Failed to save football score", error);
    }
  }
);

//ADD VOLLEYBALL SCORE
adminPostRouter.post(
  "/volleyball-scores",
  upload.fields([
    { name: "team1Logo", maxCount: 1 },
    { name: "team2Logo", maxCount: 1 },
  ]),
  async (req: Request, res: Response) => {
    try {
      const { matchType, team1Name, team2Name, team1Score, team2Score, completed }: VolleyballScoreType =
        req.body;

      const { team1Logo, team2Logo } = getTeamLogos(req);

      if (!team1Logo || !team2Logo)
        return res
          .status(400)
          .json({ success: false, message: "Both team logos are required." });

      const volleyball = await VolleyballScore.create({
        match_type: matchType,
        team1_name: team1Name,
        team2_name: team2Name,
        team1_logo: team1Logo,
        team2_logo: team2Logo,
        team1_score: toNum(team1Score),
        team2_score: toNum(team2Score),
        completed,
      });

      sendSuccess(res, "Volleyball score saved successfully.", { id: volleyball._id });
    } catch (error) {
      sendError(res, "Failed to save volleyball score", error);
    }
  }
);

//ADD BASKETBALL SCORE
adminPostRouter.post(
  "/basketball-scores",
  upload.fields([
    { name: "team1Logo", maxCount: 1 },
    { name: "team2Logo", maxCount: 1 },
  ]),
  async (req: Request, res: Response) => {
    try {
      const {
        matchType,
        team1Name,
        team2Name,
        team1Score,
        team2Score,
        completed,
      }: BasketballScoreType = req.body;

      const { team1Logo, team2Logo } = getTeamLogos(req);

      if (!team1Logo || !team2Logo)
        return res
          .status(400)
          .json({ success: false, message: "Both team logos are required." });

      const basketball = await BasketballScore.create({
        match_type: matchType,
        team1_name: team1Name,
        team2_name: team2Name,
        team1_logo: team1Logo,
        team2_logo: team2Logo,
        team1_score: toNum(team1Score),
        team2_score: toNum(team2Score),
        completed,
      });

      sendSuccess(res, "Basketball score saved successfully.", { id: basketball._id });
    } catch (error) {
      sendError(res, "Failed to save basketball score", error);
    }
  }
);

//ADD ALMANAC ENTRY
adminPostRouter.post(
  "/almanac",
  upload.single("file"),
  async (req: Request, res: Response) => {
    try {
      const { username, department } = req.body;
      const photo = (req as MulterRequest).file?.path;
      const publicId = (req as MulterRequest).file?.filename;

      if (!photo)
        return res.status(400).json({ success: false, message: "Photo file is required." });

      const almanac = await AlmanacList.create({
        photo,
        public_id: publicId,
        username,
        department,
      });

      sendSuccess(res, "Almanac entry saved successfully.", { id: almanac._id });
    } catch (error) {
      sendError(res, "Failed to save almanac entry", error);
    }
  }
);

//ADD HOMEPAGE ELEMENT
adminPostRouter.post(
  "/homepage-element",
  upload.single("eventPoster"),
  async (req: Request, res: Response) => {
    try {
      const { eventName, eventContent, eventFormLink } = req.body;
      const eventPoster = (req as MulterRequest).file?.path;
      const publicId = (req as MulterRequest).file?.filename;

      if (!eventPoster)
        return res.status(400).json({ success: false, message: "Poster file is required." });

      const homepageElement = await HomepageElementList.create({
        event_name: eventName,
        event_poster: eventPoster,
        event_poster_id: publicId,
        event_content: eventContent,
        event_form_link: eventFormLink,
      });

      sendSuccess(res, "Homepage element saved successfully.", { id: homepageElement._id });
    } catch (error) {
      sendError(res, "Failed to save homepage element", error);
    }
  }
);

export default adminPostRouter;