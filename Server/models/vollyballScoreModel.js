import mongoose, { Schema } from 'mongoose';

const vollyballSchema = new Schema({
  match_type: {
    type: String,
    required: true
  },
  team1_name: {
    type: String,
    required: true
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
  team1_score: {
    type: Number
  },
  team2_score: {
    type: Number
  },
  completed: {
    type: String,
    default: "no"
  }
})

const VollyballScore = mongoose.model("VollyballScore", vollyballSchema);
export default VollyballScore;