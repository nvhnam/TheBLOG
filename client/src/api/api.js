/* eslint-disable no-unused-vars */
import axios from "axios";

const PORT = import.meta.env.VITE_API_PORT || 8080;
const URL = import.meta.env.VITE_API_URL || `http://localhost:${PORT}`;

const API_URL = `${URL}`;

const api = axios.create({
  baseURL: API_URL,
  validateStatus: (status) => {
    return (status >= 200 && status < 300) || status === 302;
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log("config: ", config);
  return config;
});

export default api;
