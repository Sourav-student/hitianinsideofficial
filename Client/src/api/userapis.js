//user apis
import axios from 'axios';

const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const api = axios.create({
  baseURL: REACT_APP_BACKEND_URL
})

//submit contact us to backend
export const contactFormSubmit = async (data) => {
  const res = await api.post("/api/form", data);
  return res;
}

//submit artwork to backend
export const artworkFormSubmit = async (data) => {
  const res = await api.post("/api/artwork", data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return res;
}

//submit photo to backend
export const photoFormSubmit = async (data) => {
  const res = await api.post("/api/photography", data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return res;
}

//submit poem to backend
export const poemFormSubmit = async (data) => {
  const res = await api.post("/api/poem", data);
  return res;
}

//submit video to backend
export const videoFormSubmit = async (data) => {
  const res = await api.post("/api/video", data);
  return res;
}

//submit story to backend
export const storyFormSubmit = async (data) => {
  const res = await api.post("/api/story", data);
  return res;
}

//get events
export const getEvents = async () => {
  const res = await api.get("/api/admin/events");
  return res;
}

//get Scorecard
export const getCricketScores = async () => {
  const res = await api.get("/api/admin/cricket-scores");
  return res;
}