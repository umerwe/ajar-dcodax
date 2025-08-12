import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.18.64:5000",
});

// Interceptor to add token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;


// http://192.168.18.64:5000