//user apis
import axios from 'axios';

const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const api = axios.create({
  baseURL: REACT_APP_BACKEND_URL,
  withCredentials: true, 
});

//get the user is admin or not
export const getAdmin = async (token) => {
  const response = await api.get('/api/user/isAdmin',{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
}

//submit contact us to backend
export const contactFormSubmit = async (data) => {
  const res = await api.post("/api/user/form", data);
  return res;
}

//submit artwork to backend
export const artworkFormSubmit = async (data) => {
  const res = await api.post("/api/user/artwork", data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return res;
}

//submit photo to backend
export const photoFormSubmit = async (data) => {
  const res = await api.post("/api/user/photography", data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return res;
}

//submit poem to backend
export const poemFormSubmit = async (data) => {
  const res = await api.post("/api/user/poem", data);
  return res;
}

//submit video to backend
export const videoFormSubmit = async (data) => {
  const res = await api.post("/api/user/video", data);
  return res;
}

//submit story to backend
export const storyFormSubmit = async (data) => {
  const res = await api.post("/api/user/story", data);
  return res;
}

//get events
export const getEvents = async () => {
  const res = await api.get("/api/user/events");
  return res;
}

//get almanac
export const getAlmanacs = async () => {
  const res = await api.get("/api/user/almanacs");
  return res;
}
// get Homepage Elements
export const getHomepageComponents = async () => {
  const res = await api.get("/api/user/homepage-elements");
  return res;
}

//get Scorecard
export const getCricketScores = async () => {
  const res = await api.get("/api/user/cricket-scores");
  return res;
}

export const getFootballScores = async () => {
  const res = await api.get("/api/user/football-scores");
  return res;
}

export const getVolleyballScores = async () => {
  const res = await api.get("/api/user/volleyball-scores");
  return res;
}

export const getBasketballScores = async () => {
  const res = await api.get("/api/user/basketball-scores");
  return res;
}