import axios from "axios";
import { storage } from "../utils/storage";

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:9004/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = storage.getToken();
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

