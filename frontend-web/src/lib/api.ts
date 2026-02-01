import axios from "axios";

export const api = axios.create({
  baseURL: "https://chemical-equipment-visualizer-xtbs.onrender.com/api/",
});

// 🔐 attach token automatically
api.interceptors.request.use(
  (config) => {
   const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);
