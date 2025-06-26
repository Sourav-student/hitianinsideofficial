import axios from 'axios';

const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const api = axios.create({
  baseURL: REACT_APP_BACKEND_URL
})

//google Auth 
const googleAuth = (code) => {
  return api.get(`/auth/google?code=${code}`)
}

export default googleAuth;

//submit contact us to backend
export const contactFormSubmit = (data) => {
  return api.post("/api/form", data);
}

//submit artwork to backend
export const artworkFormSubmit = (data) => {
  return api.post("/api/artwork", data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

//submit photo to backend
export const photoFormSubmit = (data) => {
  return api.post("/api/photography", data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

//submit poem to backend
export const poemFormSubmit = (data) => {
  return api.post("/api/poem", data);
}

//submit video to backend
export const videoFormSubmit = (data) => {
  return api.post("/api/video", data);
}

//submit story to backend
export const storyFormSubmit = (data) => {
  return api.post("/api/story", data);
}