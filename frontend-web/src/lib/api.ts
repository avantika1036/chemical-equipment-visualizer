import axios from "axios";
import { BASE_URL } from "./apiConfig";

export const api = axios.create({
  baseURL: BASE_URL,
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
