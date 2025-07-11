import mongoose from "mongoose";

const eventsSchema = new mongoose.Schema({
  insta_url: {
    type: String,
    required: true
  },
  event_name: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  date: {
    type: String,
    required: true
  },

})

const EventsList = mongoose.model("EventsList", eventsSchema);

export default EventsList;