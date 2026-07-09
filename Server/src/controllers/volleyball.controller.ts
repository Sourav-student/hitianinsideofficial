import { Request, Response } from "express";
import VolleyballScore from "../models/volleyballScoreModel";
import { toNum, getTeamLogos } from "../utils/handler.utils";
import { VolleyballScoreType } from "../types/datatypes";
import { redis } from "../config/redisConnection";
import { redisKey } from "../utils/redisKeys";

// GET METHOD TO PROVIDE DATA TO USER AND ADMIN
export const getVolleyballScore = async (req: Request, res: Response) => {
  try {
    const volleyballData = await redis.get(redisKey.volleyballKey); //FIRST TRY FROM CACHE MEMORY

    // CACHE HIT
    if (volleyballData) {
      return res.status(201).json({
        message: "fetch successfully",
        success: true,
        data : JSON.parse(volleyballData)
      })
    }

    //CACHE MISS
    const data = await VolleyballScore.find();

    if (!data) {
      return res.status(400).json({
        message: "not fetch",
        success: false
      })
    }

    // DATA STORE IN CACHE BEFORE RETURN WITH TTL OF 30 MIN
    await redis.set(redisKey.volleyballKey, JSON.stringify(data), 'EX', 1800);

    return res.status(201).json({
      message: "fetch successfully",
      success: true,
      data
    })
  } catch (error) {
    return res.status(500).json({
      message: "something went wrong",
      success: false
    })
  }
}

// POST METHOD TO ADD NEW SCORES
export const addVolleyballScore = async (req: Request, res: Response) => {
  try {
    const { matchType, team1Name, team2Name, team1Score, team2Score, completed }: VolleyballScoreType =
      req.body;

    const { team1Logo, team2Logo } = getTeamLogos(req);

    if (!team1Logo || !team2Logo) {
      return res.status(400).json({ success: false, message: "Both team logos are required." });
    }

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

    await redis.del(redisKey.volleyballKey);

    return res.status(201).json({
      message: "add successfully",
      success: true,
      id: volleyball._id
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to save volleyball score",
      success: false
    });
  }
}

// DELETE METHOD
export const deleteVolleyballScore = async (req: Request, res: Response) => {
  try {
    const { id } = req.query;
    const deletedItem = await VolleyballScore.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({
        message: "not found"
      });
    }

    redis.del(redisKey.volleyballKey);

    return res.status(200).json({
      message: "Deleted successfully"
    });
  } catch (error: any) {
    return res.status(500).json({ message: `Failed to delete`, error: error.message });
  }
}