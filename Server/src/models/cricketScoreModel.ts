import mongoose, { Schema, Document } from "mongoose";

export interface ICricketScore extends Document {
  match_type: string;
  team1_name: string;
  team2_name: string;
  team1_logo: string;
  team2_logo: string;
  team1_run: number;
  team2_run: number;
  team1_over_played: number;
  team2_over_played: number;
  team1_wicket_loss: number;
  team2_wicket_loss: number;
  completed: "yes" | "no";
  createdAt?: Date;
  updatedAt?: Date;
}

const cricketSchema = new Schema<ICricketScore>(
  {
    match_type: {
      type: String,
      required: true,
      trim: true
    },
    team1_name: {
      type: String,
      required: true,
      trim: true
    },
    team2_name: {
      type: String,
      required: true,
      trim: true
    },
    team1_logo: {
      type: String,
      required: true
    },
    team2_logo: {
      type: String,
      required: true
    },
    team1_run: {
      type: Number,
      default: 0,
      min: 0
    },
    team2_run: {
      type: Number,
      default: 0,
      min: 0
    },
    team1_over_played: {
      type: Number,
      default: 0,
      min: 0
    },
    team2_over_played: {
      type: Number,
      default: 0,
      min: 0
    },
    team1_wicket_loss: {
      type: Number,
      default: 0,
      min: 0,
      max: 10
    },
    team2_wicket_loss: {
      type: Number,
      default: 0,
      min: 0,
      max: 10
    },
    completed: {
      type: String,
      enum: ["yes", "no"],
      default: "no"
    }
  },
  { timestamps: true }
);

const CricketScore = mongoose.model<ICricketScore>("CricketScore", cricketSchema);
export default CricketScore;
