//admin apis
import axios from 'axios';

const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const api = axios.create({
  baseURL: REACT_APP_BACKEND_URL
})

//add event
export const addEvent = async (data) => {
  const response = api.post("/api/admin/event", data);
  return response;
}

//edit event
export const editEvent = async (id, data) => {
   const response = api.patch(`/api/admin/event?id=${id}`, data)
   return response;
}

//delete event
export const deleteEvent = async (id) => {
   const response = api.delete(`/api/admin/event?id=${id}`)
   return response;
}

//add Cricke scores
export const addCricketScores = async (data) => {
  const response = api.post("/api/admin/cricket-scores", data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  }); 

  return response;
}