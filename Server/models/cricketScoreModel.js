import mongoose from 'mongoose';

const cricketSchema = new mongoose.Schema({
  matchType: {
    type: String,
    required: true
  },
  team1Name: {
    type: String,
    required: true,
  },
  team2Name: {
    type: String,
    required: true
  },
  team1Logo: {
    type: String,
    required: true
  },
  team2Logo: {
    type: String,
    required: true
  },
  team1Run: {
    type : Number,
    default: 0
  },
  team2Run: {
    type : Number,
    default: 0
  },
  team1OverPlayed: {
    type : Number,
    default: 0
  },
  team2OverPlayed: {
    type : Number,
    default: 0
  },
  team1WicketLoss: {
    type : Number,
    default: 0
  },
  team2WicketLoss: {
    type : Number,
    default: 0
  },

  completed: {
    type: String,
    default: "false"
  }
})

const CricketScores = mongoose.model("CricketScores", cricketSchema);
export default CricketScores;