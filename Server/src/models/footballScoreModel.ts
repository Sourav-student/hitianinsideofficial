import mongoose, { Schema, Document } from "mongoose";

export interface IFootballScore extends Document {
  match_type: string;
  team1_name: string;
  team2_name: string;
  team1_logo: string;
  team2_logo: string;
  team1_goals?: number;
  team2_goals?: number;
  completed: "yes" | "no";
  createdAt?: Date;
  updatedAt?: Date;
}

const footballSchema = new Schema<IFootballScore>(
  {
    match_type: {
      type: String,
      required: [true, "Match type is required"],
      trim: true
    },
    team1_name: {
      type: String,
      required: [true, "Team 1 name is required"],
      trim: true
    },
    team2_name: {
      type: String,
      required: [true, "Team 2 name is required"],
      trim: true
    },
    team1_logo: {
      type: String,
      required: [true, "Team 1 logo is required"]
    },
    team2_logo: {
      type: String,
      required: [true, "Team 2 logo is required"]
    },
    team1_goals: {
      type: Number,
      min: [0, "Goals cannot be negative"],
      default: 0
    },
    team2_goals: {
      type: Number,
      min: [0, "Goals cannot be negative"],
      default: 0
    },
    completed: {
      type: String,
      enum: ["yes", "no"],
      default: "no"
    }
  },
  { timestamps: true }
);

const FootballScore = mongoose.model<IFootballScore>("FootballScore", footballSchema);

export default FootballScore;