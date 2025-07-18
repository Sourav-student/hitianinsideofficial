//user apis
import axios from 'axios';

const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const api = axios.create({
  baseURL: REACT_APP_BACKEND_URL
})

//get the user is admin or not
export const getAdmin = async (email) => {
  const response = await api.get('/api/isAdmin',{
    headers: {
      Authorization: `Bearer ${email}`,
    },
  });
  return response;
}

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
  const res = await api.get("/api/events");
  return res;
}

//get almanac
export const getAlmanacs = async () => {
  const res = await api.get("/api/almanacs");
  return res;
}
// get Homepage Elements
export const getHomepageComponents = async () => {
  const res = await api.get("/api/homepage-elements");
  return res;
}

//get Scorecard
export const getCricketScores = async () => {
  const res = await api.get("/api/cricket-scores");
  return res;
}

export const getFootballScores = async () => {
  const res = await api.get("/api/football-scores");
  return res;
}

export const getVollyballScores = async () => {
  const res = await api.get("/api/vollyball-scores");
  return res;
}

export const getBasketballScores = async () => {
  const res = await api.get("/api/basketball-scores");
  return res;
}