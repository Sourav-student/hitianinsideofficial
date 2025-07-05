import mongoose from "mongoose";

const eventsSchema = new mongoose.Schema({
  instaURL: {
    type: String,
    required: true
  },
  eventName: {
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