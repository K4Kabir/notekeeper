import axios from "axios";

const jwtAxios = axios.create({
  baseURL: "https://notekeeper-two-vert.vercel.app",
  withCredentials: true,
  //YOUR_API_URL HERE
  headers: {
    "Content-Type": "application/json",
  },
});

export default jwtAxios;
