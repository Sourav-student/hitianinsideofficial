import { Router, Response, Request } from "express";
import jwt from "jsonwebtoken";
import User from "../../models/authModel";
import EventsList from "../../models/eventsListModel";
import HomepageElementList from "../../models/homepageElementListModel";
import AlmanacList from "../../models/almanacListModel";
import CricketScore from "../../models/cricketScoreModel";
import FootballScore from "../../models/footballScoreModel";
import VolleyballScore from "../../models/volleyballScoreModel";
import BasketballScore from "../../models/basketballScoreModel";

const userGetRouter = Router();

userGetRouter.get("/health", (req: Request, res: Response) => {
  res.send("Hello, Server is working!!");
})

//CHECK THAT THE USER IS ADMIN OR NOT
userGetRouter.get("/isAdmin", async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { email: string };
    const user = await User.findOne({ email: decoded.email });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ isAdmin: user.admin });
  } catch (error) {
    res.status(500).json({ message: "Invalid or expired token" });
  }
});

//Get all events
userGetRouter.get("/events", async (req: Request, res: Response) => {
  try {
    const data = await EventsList.find().sort({ year: -1 });
    // res.set("Cache-Control", "public, max-age=600");
    res.status(200).json({
      success: true,
      count: data.length,
      data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server down! Try again later",
      error: (error as Error).message
    });
  }
});


//Get all almanac
userGetRouter.get("/almanacs", async (req: Request, res: Response) => {
  try {
    const data = await AlmanacList.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({
      "message": "server down! try again later"
    })
  }
})

//get all homepage elements
userGetRouter.get("/homepage-elements", async (req: Request, res: Response) => {
  try {
    const data = await HomepageElementList.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({
      "message": "server down! try again later"
    })

  }
})

//get all cricket scores
userGetRouter.get("/cricket-scores", async (req: Request, res: Response) => {
  try {
    const data = await CricketScore.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({
      "message": "server down! try again later"
    })
  }
})

//get all football scores
userGetRouter.get("/football-scores", async (req: Request, res: Response) => {
  try {
    const data = await FootballScore.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({
      "message": "server down! try again later"
    })
  }
})

//get all vollyball scores
userGetRouter.get("/volleyball-scores", async (req: Request, res: Response) => {
  try {
    const data = await VolleyballScore.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({
      "message": "server down! try again later"
    })
  }
})

//get all basketball scores
userGetRouter.get("/basketball-scores", async (req: Request, res: Response) => {
  try {
    const data = await BasketballScore.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({
      "message": "server down! try again later"
    })
  }
})

//other get requests
// userGetRouter.get("/:id", (req : Request, res : Response) => {
//   const id = req.params.id;
//   res.json({
//     "data": `fetching data... -- ${id}`,
//     "HITianInside": "working on backend..."
//   })
// })

export default userGetRouter;