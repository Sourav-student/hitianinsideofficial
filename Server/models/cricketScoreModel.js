import mongoose from 'mongoose';

const cricketSchema = new mongoose.Schema({
  match_type: {
    type: String,
    required: true
  },
  team1_name: {
    type: String,
    required: true,
  },
  team2_name: {
    type: String,
    required: true
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
    type : Number,
    default: 0
  },
  team2_run: {
    type : Number,
    default: 0
  },
  team1_over_played: {
    type : Number,
    default: 0
  },
  team2_over_played: {
    type : Number,
    default: 0
  },
  team1_wicket_loss: {
    type : Number,
    default: 0
  },
  team2_wicket_loss: {
    type : Number,
    default: 0
  },

  completed: {
    type: String,
    default: "no"
  }
})

const CricketScore = mongoose.model("CricketScores", cricketSchema);
export default CricketScore;