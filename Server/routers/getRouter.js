import { Router } from "express";

const getRouter = Router();

getRouter.get("/", (req, res) => {
  res.send("Hello World!");
})

getRouter.get("/api/:id", (req, res) => {
  res.json({
    "data":"fetching...",
    "HITianInside" : "working on backend..."
  })
})

export default getRouter;