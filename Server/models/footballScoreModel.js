import mongoose, { Schema } from 'mongoose';

const footballSchema = new Schema({
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
  team1_goals:{
    type: Number
  },
  team2_goals:{
    type: Number
  },
  completed: {
    type: String,
    default: "no"
  }
})

const FootballScore = mongoose.model("FootballScore", footballSchema);
export default FootballScore;